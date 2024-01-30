import traceback
import json
import random
from fastapi import APIRouter, Depends, status, Query, HTTPException
from fastapi.responses import JSONResponse
from fastapi_mail import FastMail, MessageSchema,ConnectionConfig
from passlib.context import CryptContext
from starlette.requests import Request
from routers.auth.auth_db_ops import UserDBHandler
from ..authenticators import get_user_by_token,verify_email,get_user_by_email
from .auth_service_ops import verify_token, admin_add_new_user,add_new_user, change_user_password, flush_tokens,fetch_user_id_from_db,get_user_points_by_user_id,update_user_points,get_user_points_by_user,get_dept_by_users_id,increment_login_count,get_login_count,award_badges
from config.logconfig import logger
from dotenv import load_dotenv
from schemas.auth_service_schema import (Email, NewUser, User,EmailSchema, UserPassword)
from routers.authenticators import verify_user
import os
import requests
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Authentication Urls
auth = APIRouter(tags=["Service :  Auth Management"])

load_dotenv()

# Utility Functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)

# Actual Login for ALGO
def create_login_response(message, active, is_mfa_enabled, request_token, token, details, user_id, user_dept, xts_access_token, user_points=0):
    if token is None and request_token is None:
        return {"status": "failure", "message": message}

    if is_mfa_enabled:
        return {"status": "success", "message": message, "is_active": active, "is_mfa_enabled": is_mfa_enabled,
                "request_token": request_token, "user_dept": user_dept, "user_points": user_points}
    else:
        user_detail = {
            "user": {
                "role": details.get('role', ''),
                "dept": details.get('dept', user_dept), 
                "data": {
                    "displayName": details.get('displayName', ''),
                    "id": details.get('id', ''),
                    "email": details.get('email', ''),
                    "photoURL": ""  # details.get('photoURL', '')
                }
            }
        }

        return {
            "status": "success",
            "message": message,
            "is_active": active,
            "is_mfa_enabled": is_mfa_enabled,
            "user_id": user_id,
            "user_dept": user_dept,
            "user_points": user_points,
            "token": token,
            "xts_access_token": xts_access_token,
            "data": user_detail,
            "error": None
        }
    
# Actual Login for ALGO
# @auth.post('/login')
# def login(user: User):
#     email = user.email
#     password = user.password

#     # Verify the email and password
#     message, active, is_mfa_enabled, request_token, token, details = add_new_user(email, password=password, auth_token="",
#                                                                                   inputs={
#                                                                                       'full_name': user.fullname, 'role': 'user', 'dept': 'user',
#                                                                                       'users_allowed': '[]', 'active': False,
#                                                                                       'picture': ""}, skip_new_user=True)
    
#     # Fetch the user's ID based on the provided email
#     user_id = fetch_user_id_from_db(email)
    
#     id = fetch_user_id_from_db(email)
#     user_dept = get_dept_by_users_id(id)
    
#     # Award points to the user (e.g., 25 points for each login)
#     if active:
#         points = 25
#         update_user_points(user_id, points)

#     # Get the user's current points
#     user_points = get_user_points_by_user_id(user_id)


#     # Create a login response including the user ID and points
#     login_response = create_login_response(message, active, is_mfa_enabled, request_token, token, details, user_id, user_dept, user_points)

#     # # Add user points to the response
#     # login_response["user_points"] = user_points

#     return JSONResponse(content=login_response)

def get_xts_login_payload():
    # This function should return the XTS login payload
    xts_data_api_key = '9af31b94f3999bd12c6e89'
    xts_data_api_secret = 'Evas244$3H'
    xts_source = 'WebAPI'
    xts_payload = {"appKey": xts_data_api_key, "secretKey": xts_data_api_secret, "source": xts_source}
    return xts_payload

@auth.post("/login")
def login(user: User, xts_payload: dict = Depends(get_xts_login_payload)):
    try:
        # XTS login logic
        xts_url = "https://algozy.rathi.com:3000/apimarketdata/auth/login"
        xts_response = requests.post(url=xts_url, json=xts_payload)
        xts_data = xts_response.json()

        if 'result' in xts_data and 'token' in xts_data['result']:
            # XTS login successful, proceed with local login
            xts_access_token = xts_data['result']['token']

            # Your existing internal login logic
            email = user.email
            password = user.password

            # Verify the email and password
            message, active, is_mfa_enabled, request_token, token, details = add_new_user(
                email, password=password, auth_token="",
                inputs={'full_name': user.fullname, 'role': 'user', 'dept': 'user',
                        'users_allowed': '[]', 'active': False, 'picture': ""},
                skip_new_user=True
            )

            # Fetch the user's ID based on the provided email
            user_id = fetch_user_id_from_db(email)

            id = fetch_user_id_from_db(email)
            user_dept = get_dept_by_users_id(id)

            # Award points to the user (e.g., 25 points for each login)
            if active:
                points = 25
                update_user_points(user_id, points)

            # Get the user's current points
            user_points = get_user_points_by_user_id(user_id)

            # Create a login response including the user ID, points, and XTS access token
            login_response = create_login_response(
                message, active, is_mfa_enabled, request_token, token, details, user_id, user_dept, user_points, xts_access_token
            )
            
            login_response["xts_access_token"] = xts_access_token

            return JSONResponse(content=login_response)

        else:
            raise HTTPException(status_code=400, detail="XTS login failed")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Token Verification for Other apis
@auth.get('/verify-token')
def verify_access_token(request: Request):
    try:
        is_valid, msg, data = verify_token(request.headers['auth-token'])
        if is_valid:
            user = {}
            details = {}
            details['user_id'] = data['id']
            details['displayName'] = data['full_name']
            details['email'] = data['email']
            details['photoURL'] = ""  # You can set the photoURL here or modify as needed
            user['role'] = data['role']

            user['user'] = {}
            user['user']['role'] = data['role']
            user['user']['data'] = details

            # Return a success response with user data and token
            return JSONResponse(status_code=status.HTTP_200_OK, content={
                "status": "success",
                "message": "Authorized user successfully",
                "user_id": user['user']['data']['user_id'],
                "token": request.headers['auth-token'],
                "data": user
            })

    except Exception as exc:
        logger.error(exc.args[0])
        logger.error(traceback.format_exc())
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={
            "status": "failure",
            "message": "Authentication failed"
        })


# Signup &  Wellcome mail
conf = ConnectionConfig(
    MAIL_USERNAME=os.environ.get("MAIL_USERNAME"),
    MAIL_PASSWORD=os.environ.get("MAIL_PASSWORD"),
    MAIL_FROM=os.environ.get("MAIL_FROM"),
    MAIL_PORT=int(os.environ.get("MAIL_PORT")),
    MAIL_SERVER=os.environ.get("MAIL_SERVER"),
    MAIL_STARTTLS=False,  # Disable STARTTLS
    MAIL_SSL_TLS=True,    # Enable SSL/TLS
    USE_CREDENTIALS=bool(os.environ.get("USE_CREDENTIALS")),
    VALIDATE_CERTS=bool(os.environ.get("VALIDATE_CERTS"))
)

async def send_welcome_email(user: User):
    # Customize your welcome email template here
    try:
        template = """
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Welcome to AnandRathi Shares & Stock Brokers LTD.</title>
        </head>
        <body>
            <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
                <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                    <div style="border-bottom: 1px solid #eee">
                        <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">Welcome to AnandRathi Shares & Stock Brokers LTD.</a>
                    </div>
                    <p style="font-size: 1.1em">Hi {fullname},</p>
                    <p>Your AnandRathi account has been successfully created.</p>
                    <p>Get started with basic videos of AnandRathi: <a href="https://youtu.be/ZPs3URGs0KQ?si=ebVSN9zGEkTIAhvC">https://youtu.be/ZPs3URGs0KQ?si=ebVSN9zGEkTIAhvC</a></p>
                    <p>Feel free to contact our support team @ Aniruddha Durgule : +91 7021592861</p>
                    <p>Or anirudhadurgule@rathi.com</p>
                    <p>Make sure you are part of our Whatsapp group for all the updates, alerts, and instant support.</p>
                    <p>WhatsApp Group Link: <a href="https://chat.whatsapp.com/Js8BpIMlhEg0BA47tcjf3E">https://chat.whatsapp.com/Js8BpIMlhEg0BA47tcjf3E</a></p>
                    <p>This email was sent to {email} because you are using AnandRathi Algo App</p>
                    <p style="font-size: 0.9em;">Thanks & Regards,<br />The AnandRathi Team</p>
                    <hr style="border: none; border-top: 1px solid #eee" />
                    <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300">
                        <p>Anand Rathi Share And Stock Brokers LTD</p>
                        <p>Floor No. 2 & 3, Kamala Mill Compound, Trade Link B&C Block, E' Wing, Senapati Bapat Marg, Lower Parel West, Lower Parel,</p>
                        <p>Mumbai, Maharashtra - 400013</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        """
        template = template.replace("{fullname}", user.fullname)
        template = template.replace("{email}", user.email)

        message = MessageSchema(
            subject="Welcome to AnandRathi Strategy Trading App",
            recipients=[user.email],
            body=template,
            subtype="html"
        )

        fm = FastMail(conf)
        await fm.send_message(message)

        # Log success
        logger.info(f"Welcome email sent to {user.email}")

    except Exception as e:
        # Log any exceptions
        logger.error(f"Error sending welcome email: {str(e)}")
    

@auth.post("/signup")
async def signup(user: NewUser):
    try:
        # Create a new user and check if the registration was successful
        registration_result = admin_add_new_user(
            user.email,
            generate_tokens=user.generate_token,
            password=user.password,
            auth_token="",
            inputs={
                'full_name': user.fullname,
                'role': 'Learner',
                'users_allowed': '[]',
                'active': False,
                'picture': "",
                "password": None
            }
        )

        if registration_result.status_code == status.HTTP_200_OK:
            # If the user was added successfully, send the welcome email
            await send_welcome_email(user)
            return JSONResponse(status_code=status.HTTP_200_OK, content={
                "status": "success",
                "message": "User registered successfully"
            })

        return {
            "status": "success",
            "data": registration_result
        }

    except Exception as exc:
        logger.error(traceback.format_exc())
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"message": "User is not registered"})


# Reset Password 
@auth.post("/change-user-password")
def change_password(payload: UserPassword):
    try:
        if change_user_password(payload.email, payload.password):
            return JSONResponse(status_code=status.HTTP_200_OK, content={
                "status": "success",
                "message": "Updated password successfully"
            })
    except ValueError as exc:
        logger.error(traceback.format_exc())
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={
            "status": "failure",
            "message": exc.args[0]
        })

# Logout
@auth.post("/logout", status_code=status.HTTP_200_OK)
def logout(request: Request):
    try:
        if flush_tokens(request.headers['auth-token']):
            return {
                "message": "User Logged out successfully"
            }
    except Exception as exc:
        logger.error(traceback.format_exc())
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={
            "status": "failure",
            "message": ""
        })


# Forgot Password Send OTP on Mail-Id
conf = ConnectionConfig(
    MAIL_USERNAME=os.environ.get("MAIL_USERNAME"),
    MAIL_PASSWORD=os.environ.get("MAIL_PASSWORD"),
    MAIL_FROM=os.environ.get("MAIL_FROM"),
    MAIL_PORT=int(os.environ.get("MAIL_PORT")),
    MAIL_SERVER=os.environ.get("MAIL_SERVER"),
    MAIL_STARTTLS=False,  # Disable STARTTLS
    MAIL_SSL_TLS=True,    # Enable SSL/TLS
    USE_CREDENTIALS=bool(os.environ.get("USE_CREDENTIALS")),
    VALIDATE_CERTS=bool(os.environ.get("VALIDATE_CERTS"))
)

@auth.post("/send_mail")
async def send_mail(email: EmailSchema):
    user = get_user_by_email(email.email[0])  # Assuming only one email is provided in the list

    # Check if the user is found (email is registered)
    try:
        user_data = get_user_by_email(email.email[0])
    except Exception as exc:
        return JSONResponse(status_code=401, content={
            "status": "failure",
            "message": "Email is not registered"
        })

    # Generate 4-digit OTP
    otp = str(random.randint(1000, 9999))

    template = """
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>AnandRathi Algo App</title>
        </head>
        <body>
            <!-- partial:index.partial.html -->
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Reset your AnandRathi Algo App password</a>
                    </div>
                    <p style="font-size:1.1em">Hi,</p>
                    <p>Thank you for choosing AnandRathi Algo. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">{otp}</h2>
                    <p style="font-size:0.9em;">Thanks & Regards,<br />The AnandRathi Team</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                        <p>Anand Rathi Share And Stock Brokers LTD</p>
                        <p>Floor No. 2 & 3, Kamala Mill Compound, Trade Link B&C Block, E' Wing, Senapati Bapat Marg, Lower Parel West, Lower Parel,</p>
                        <p>Mumbai, Maharashtra - 400013</p>
                    </div>
                </div>
            </div>
            <!-- partial -->
        </body>
        </html>
    """
    
    # Replace {otp} with the generated OTP
    template = template.replace("{otp}", otp)

    message = MessageSchema(
        subject="[AnandRathi] OTP For Reset Password",
        recipients=email.email,
        body=template,
        subtype="html"
    )

    fm = FastMail(conf)
    await fm.send_message(message)
    print(message)

    return JSONResponse(status_code=200, content={"status": "success","message": "Email has been sent","OTP":otp})


####################################################### AR STOCK MARKET BACKEND  #############################################
    

