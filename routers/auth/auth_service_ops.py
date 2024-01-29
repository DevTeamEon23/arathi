import secrets
from datetime import datetime
import os
import jwt
import traceback
import logging
from dateutil.relativedelta import relativedelta
from fastapi import Header, HTTPException
from passlib.context import CryptContext
from starlette import status
from starlette.responses import JSONResponse
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from config.db_config import n_table_user,users_points
from config import settings
from config.logconfig import logger
from routers.auth.auth_db_ops import UserDBHandler
from routers.db_ops import execute_query
from utils import md5, random_string, validate_email
from schemas.auth_service_schema import (User)
from dotenv import load_dotenv

load_dotenv()

# This is used for the password hashing and validation
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def check_email(email):
    is_valid = validate_email(email)
    if is_valid:
        return str(email).lower()
    else:
        raise ValueError('Invalid email value')


def check_password(email, password):
    query = f"""
    select * from {n_table_user} where email=%(email)s;
    """
    response = execute_query(query, params={'email': email})
    data = response.fetchone()
    if data is None:
        return False
    else:
        hashed_password = data['password']
        if not pwd_context.verify(password, hashed_password):
            raise ValueError('Invalid Password value')
        return True


def generate_token(email):
    base = random_string(8) + email + random_string(8)
    token = md5(base)
    return token


def get_password_hash(password):
    return pwd_context.hash(password)


def random_password(password_length=12):
    return secrets.token_urlsafe(password_length)


def check_existing_user(email):
    """
    Only safe to use after the email has been validated
    :param email: email of the user
    :return: bool, bool is_existing, is_authorized
    """
    query = f"""
    select * from {n_table_user} where email=%(email)s;
    """
    response = execute_query(query, params={'email': email})
    data = response.fetchone()

    if data is None:
        return False, False
    else:
        active = data['active']
        return True, active


def get_user_details(email):
    """
    Only safe to use after the email has been validated
    :param email: email of the user
    :return: bool, bool
            is_existing, is_authorized
    """
    query = f"""
    select * from {n_table_user} where email=%(email)s;
    """
    response = execute_query(query, params={'email': email})
    data = response.fetchone()
    if data is None:
        return None
    else:
        return data


def get_token(email):
    """
    Only safe to use after the email has been validated
    :param email: email of the user
    :return: str
    """
    query = f"""
    select * from {n_table_user} where email=%(email)s;
    """
    response = execute_query(query, params={'email': email})
    data = response.fetchone()
    if data is None:
        return None
    else:
        return data.token


def check_verify_existing_user(email):
    try:
        v_email = check_email(email)
        is_existing, is_active = check_existing_user(v_email)
        response = is_existing
        message = 'User exists' if is_existing else 'User not found or Email Address is invalid'
    except ValueError as exc:
        response = False
        message = exc.args[0]
    return response, message


def generate_email_token(email, auth_token, skip_check=False):
    if skip_check:
        # Called Internally and cautiously
        exists = True
        msg = 'User exists'
    else:
        exists, msg = check_verify_existing_user(email)

    token = None
    if not exists:
        message = msg
    else:
        token = generate_token(email)
        query = f"UPDATE {n_table_user} SET auth_token=%(auth_token)s, token=%(token)s, updated_at=now() WHERE email=%(email)s;"
        response = execute_query(query, params={'email': email, 'token': token, 'auth_token': auth_token})
        message = 'token generated' if response.rowcount >= 1 else 'token not updated'
    return token, message


def get_email_token(email, pwd=None):
    exists, msg = check_verify_existing_user(email)
    token = None
    if not exists:
        message = msg
    else:
        token = get_token(email)
        message = ''
    return token, message


def verify_token(token):
    data = None
    if token is not None:
        # No checks on token might be a vulnerability
        query = f"SELECT * FROM {n_table_user} where token=%(token)s and active=%(active)s and token is not NULL and token != '';"
        resp = execute_query(query=query, params={'token': token, 'active': True})
        data = resp.fetchone()

    if data is None:
        response = False
        message = 'Not Authenticated'
    else:
        response = True
        message = 'Authenticated'
    return response, message, data


def destroy_token(token):
    if token is not None and token != '':
        query = f"UPDATE {n_table_user} SET token='' where token=%(token)s;"
        resp = execute_query(query=query, params={'token': token})
        data = bool(resp.rowcount)
        return data
    else:
        return True


def exists_user_details(email, auth_token):
    message, active, token, is_mfa_enabled, request_token, details = None, True, None, False, None, {}
    message = 'User already exists'

    # Create New TokenData
    generate_email_token_2fa(email, skip_check=True)

    # User details
    user = get_user_details(email)
    token = user['token']

    # User account details
    details['displayName'] = user['full_name']
    details['email'] = email
    details['photoURL'] = "assets/images/avatars/brian-hughes.jpg"
    details['role'] = user['role']

    return message, active, token, request_token, details


def generate_email_token_2fa(email, request_token="", skip_check=False):
    if skip_check:
        # Called Internally and cautiously
        exists = True
        msg = 'User exists'
    else:
        exists, msg = check_verify_existing_user(email)

    token = None
    if not exists:
        message = msg
    else:
        token = generate_token(email)
        query = f"UPDATE {n_table_user} SET request_token=%(request_token)s, token=%(token)s, updated_at=now() WHERE " \
                f"email=%(email)s ; "
        response = execute_query(
            query, params={'email': email, 'token': token, 'request_token': request_token})
        message = 'token generated'
    return token, message

# FETCHING ID for Profile page data fullfillment
def fetch_user_id_from_db(email: str) -> int:
    query = f"SELECT id FROM {n_table_user} WHERE email = %(email)s"
    params = {'email': email}
    result = execute_query(query, params=params)  # Modify this line to match your execute_query function
    
    # Iterate over the MappingResult to extract the user IDs
    user_ids = [row['id'] for row in result]
    
    return user_ids[0] if user_ids else None

def get_user_points_by_user_id(user_id):
    query = f"SELECT points FROM user_points WHERE user_id = %(user_id)s"
    params = {"user_id": user_id}
    resp = execute_query(query=query, params=params)
    data = resp.fetchone()
    
    if data is None:
        raise HTTPException(status_code=404, detail="User points not found")
    else:
        return {"points": data['points']}

def get_dept_by_users_id(id):
    query = f"SELECT dept FROM users WHERE id = %(id)s"
    params = {"id": id}
    resp = execute_query(query=query, params=params)
    data = resp.fetchone()
    
    if data is None:
        raise HTTPException(status_code=404, detail="department not found")
    else:
        return {"dept": data['dept']}
    
def get_user_points_by_user():
    try:
        # Query user IDs from the database for the specified course
        user_ids = UserDBHandler.get_user_points()

        if not user_ids:
            # Handle the case when no user is found for the specified course
            return None

        # Now user_ids is a list of user IDs enrolled in the course
        # You can return this list or process it further as needed

        return {
            "user_ids": user_ids,
            # Include other course attributes as needed
        }
    except Exception as exc:
        logger = logging.getLogger(__name__)
        logger.error(traceback.format_exc())
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={
            "status": "failure",
            "message": "Failed to fetch users data"
        })
    
# def update_user_points(user_id, points):
#     # Fetch the user's points record or create one if it doesn't exist
#     query = """
#         INSERT INTO user_points (user_id, points)
#         VALUES (%(user_id)s, %(points)s)
#         ON DUPLICATE KEY UPDATE points = points + %(points)s;
#     """
#     params = {"user_id": user_id, "points": points}
#     return execute_query(query, params=params)

def update_user_points(user_id, points):
    # Fetch the user's points record or create one if it doesn't exist

    query = """
        INSERT INTO user_points (user_id, points, user_level)
        VALUES (%(user_id)s, %(points)s, 0)
        ON DUPLICATE KEY UPDATE
            points = points + %(points)s,
            user_level = CASE
                WHEN points + %(points)s >= 4000 THEN 4
                WHEN points + %(points)s >= 3000 THEN 3
                WHEN points + %(points)s >= 2000 THEN 2
                WHEN points + %(points)s >= 1000 THEN 1
                ELSE 0
            END;
            """
    params = {"user_id": user_id, "points": points}
    execute_query(query, params=params)

def increment_login_count(user_id):
    # Increment the login count in the user_points table
    query = "UPDATE user_points SET login_count = login_count + 1 WHERE user_id = %s ;"
    params = (user_id,)
    execute_query(query, params=params)

def award_badge_to_user(user_id, badge_name):
    # Update the user_points table to include the badge information
    query = "UPDATE user_points SET badge_name = %s WHERE user_id = %s ;"
    params = (badge_name, user_id)
    execute_query(query, params=params)
    
def award_badges(user_id, login_count):
    if login_count is None:
        login_count = 0

    badges = {
        "Activity Newbie": 4,
        "Activity Grower": 8,
        "Activity Adventurer": 16,
        "Activity Explorer": 32,
        "Activity Star": 64,
        "Activity Superstar": 128,
        "Activity Master": 256,
        "Activity Grandmaster": 512,
    }

    for badge, count in badges.items():
        if login_count >= count:
            # Award the badge to the user
            award_badge_to_user(user_id, badge)

def get_login_count(user_id):
    query = "SELECT login_count FROM user_points WHERE user_id = %s ;"
    params = (user_id)
    result = execute_query(query, params=params)

    if result:
        first_record = result.first()  # Get the first record
        if first_record:
            return first_record['login_count']
    
    return 0

def add_new_user(email: str, generate_tokens: bool = False, auth_token="", inputs={}, password=None, skip_new_user=False):
    message, active, is_mfa_enabled, request_token, token, details = None, False, False, None, None, {}
    try:
        # Check Email Address
        v_email = check_email(email)

        # Check user existence and status
        is_existing, is_active = check_existing_user(v_email)

        # If user Already Exists
        if is_existing and is_active:
            # Check password
            if password is not None:
                check_password(email, password)

            message, active, token, request_token, details = exists_user_details(email, auth_token)

        # If user exsist and is not active
        elif is_existing and not is_active:
            # Check password
            if password is not None:
                check_password(email, password)
            message = 'User not activated'
            active = is_active
        elif skip_new_user:
            message = 'User not Found or Email Address is invalid'

        elif not is_existing and not is_active and skip_new_user == False:

            username = md5(v_email)
            full_name = inputs.get('full_name', None)
            full_name = v_email.split('@')[0] if full_name is None or full_name == '' else full_name

            # Password for manual signing
            if password is None:
                password = random_password()
            if password is None:
                hash_password = ""
            else:
                hash_password = get_password_hash(password)

            # Token Generation
            token = generate_token(v_email)

            request_token = ''

            # Add New User to the list of users
            data = {'full_name': full_name, 'username': username, 'email': v_email, 'password': hash_password,
                    'role': inputs.get('role', 'Learner'),
                    'users_allowed': inputs.get('users_allowed', ''), 'auth_token': auth_token,
                    'request_token': request_token, 'token': token, 'active': False}

            resp = UserDBHandler.add_user_to_db(data)
            message = 'User added successfully. Not activated.'
            active = False

            # If token not required,
            if not generate_tokens and len(auth_token) == 0:
                token = None

    except ValueError as exc:
        logger.error(traceback.format_exc())
        message = exc.args[0]
        logger.error(message)

    return message, active, is_mfa_enabled, request_token, token, details



######################################## Signup Mail ########################################
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
                    <p>This email was sent to {email} because you are using AnandRathi Strategy Maker</p>
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
            subject="Welcome to EonLearning App",
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

def admin_add_new_user(email: str, generate_tokens: bool = False, auth_token="", inputs={}, password=None, skip_new_user=False):
    try:
        # Check Email Address
        v_email = check_email(email)

        # Check user existence and status
        is_existing, is_active = check_existing_user(v_email)

        # If user Already Exists
        if is_existing:
            # Check password
            return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={
                "message": "User Already Exists"
            })

        elif not is_existing and not is_active and skip_new_user == False:

            username = md5(v_email)
            full_name = inputs.get('full_name', None)
            full_name = v_email.split('@')[0] if full_name is None or full_name == '' else full_name

            # Password for manual signing
            if password is None:
                password = random_password()
            if password is None:
                hash_password = ""
            else:
                hash_password = get_password_hash(password)

            # Token Generation
            token = generate_token(v_email)

            request_token = ''

            # Add New User to the list of users
            data = {'full_name': full_name, 'username': username, 'email': v_email, 'password': hash_password,
                    'role': inputs.get('role', 'Learner'),
                    'users_allowed': inputs.get('users_allowed', ''), 'auth_token': auth_token,
                    'request_token': request_token, 'token': token, 'active': True, }

            resp = UserDBHandler.add_user_to_db(data)
            # If token not required,
            if not generate_tokens and len(auth_token) == 0:
                token = None

        user_data = User(email=email, fullname=full_name, password=hash_password)
        send_welcome_email(user_data)

        return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "User registered successfully"})

    except ValueError as exc:
        logger.error(traceback.format_exc())
        message = exc.args[0]
        logger.error(message)
        
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"message": "User is not registered"})

def generate_request_token(email):
    """
    The generate_request_token function takes in an email address and returns a JWT token.
    The token is valid for 120 seconds, after which it expires.

    :param email: Identify the user
    :return: A token string

    """
    payload = {'email': email, 'exp': datetime.utcnow() + relativedelta(seconds=120)}
    token = jwt.encode(payload=payload, key=settings.JWT_SECRECT, algorithm='HS256')
    return token


def verify_request_token(request_token):
    valid, email, msg = False, None, None
    if request_token:
        try:
            decoded = jwt.decode(request_token, key=settings.JWT_SECRECT,
                                 algorithms=['HS256'], leeway=10)
            email = decoded['email']
            msg = "Valid Token"
            valid = True
        except (jwt.InvalidSignatureError, jwt.InvalidTokenError):
            msg = 'Invalid Token'
        except jwt.ExpiredSignatureError:
            msg = 'Token Expired'
        except Exception as exc:
            msg = "Couldn't verify token"
            logger.error(
                f'Unknown error while request token verification: {exc}')

    else:
        msg = "Invalid params or empty values provided"
    return valid, email, msg


def change_user_password(email, password):
    is_existing, _ = check_existing_user(email)
    if is_existing:
        # Update user password
        if password is None:
            password = random_password()
        password_hash = get_password_hash(password)
        UserDBHandler.change_password(email, password_hash)
        #     AWSClient.send_signup(email, password, subject='Password Change')
        return True
    else:
        raise ValueError("User does not exists")


def flush_tokens(token):
    return UserDBHandler.flush_tokens(token)




####################################################### AR STOCK MARKET BACKEND  #############################################


