import traceback
import shutil
import json
import time
import os
import logging
import asyncio
from typing import Optional
import base64
import pandas as pd
import mysql.connector
import subprocess
import xlsxwriter
from pathlib import Path
from typing import List
from zipfile import ZipFile
from PIL import Image
from datetime import timedelta
from moviepy.editor import VideoFileClip
from datetime import datetime
from dateutil import parser
import pytz
from io import BytesIO
import routers.lms_service.lms_service_ops as model
from fastapi.responses import JSONResponse,HTMLResponse,FileResponse
from fastapi_mail import FastMail, MessageSchema,ConnectionConfig
from fastapi import APIRouter, Depends, UploadFile, File,Form, Query,HTTPException, Response,Header
from fastapi import WebSocket as websocket
from starlette import status
from sqlalchemy.orm import Session
from starlette.requests import Request
from schemas.lms_service_schema import DeleteUser
from routers.authenticators import verify_user
from config.db_config import SessionLocal,n_table_user
from ..authenticators import get_user_by_token,verify_email,get_user_by_email
from routers.lms_service.lms_service_ops import sample_data, fetch_all_users_data,fetch_last_eid_data,fetch_last_id_data,fetch_all_dept_data,fetch_all_inst_learn_data,fetch_users_by_onlyid,delete_user_by_id,change_user_details,add_new,fetch_all_courses_data,fetch_active_courses_data,delete_course_by_id,add_course,add_group,fetch_all_groups_data,fetch_all_groups_data_excel,delete_group_by_id,change_course_details,change_group_details,add_category,fetch_all_categories_data,change_category_details,delete_category_by_id,add_event,fetch_all_events_data,change_event_details,delete_event_by_id,fetch_category_by_onlyid,fetch_course_by_onlyid,fetch_group_by_onlyid,fetch_event_by_onlyid,add_classroom,fetch_all_classroom_data,fetch_classroom_by_onlyid,change_classroom_details,delete_classroom_by_id,add_conference,fetch_all_conference_data,fetch_conference_by_onlyid,change_conference_details,delete_conference_by_id,add_virtualtraining,fetch_all_virtualtraining_data,fetch_virtualtraining_by_onlyid,change_virtualtraining_details,delete_virtualtraining_by_id,add_discussion,fetch_all_discussion_data,fetch_discussion_by_onlyid,change_discussion_details,delete_discussion_by_id,add_calender,fetch_all_calender_data,fetch_calender_by_onlyid,change_calender_details,delete_calender_by_id,add_new_excel,clone_course,enroll_courses_touser,user_exists,fetch_users_data_export,fetch_courses_data_export,fetch_users_course_enrolled,enroll_coursegroup_massaction,fetch_enrolled_unenroll_courses_of_user,unenroll_courses_from_userby_id,enroll_groups_touser,fetch_added_unadded_groups_of_user,remove_group_from_userby_id,enroll_users_tocourse,fetch_enrolled_unenroll_users_of_course,unenrolled_users_from_courseby_id,enroll_groups_tocourse,fetch_enrolled_unenroll_groups_of_course,unenrolled_groups_from_courseby_id,enroll_users_togroup,fetch_added_unadded_users_of_group,remove_user_from_groupby_id,enroll_courses_togroup,fetch_added_unadded_courses_of_group,remove_course_from_groupby_id,remove_course_from_all_groups_by_course_id,fetch_enrolled_unenroll_instructors_of_course,fetch_enrolled_unenroll_learners_of_course,fetch_added_unadded_instructors_of_group,fetch_added_unadded_learners_of_group,remove_file_by_id,fetch_enrolled_and_admin_inst_created_course_details_to_admin,fetch_enrolled_courses_of_user,unenroll_courses_from_enrolleduserby_id,fetch_enrolled_courses_of_learner,fetch_added_groups_of_admin,fetch_added_groups_of_learner,fetch_added_groups_of_user,remove_group_from_enrolleduserby_id,update_user,update_course, add_course_content, fetch_course_content_by_onlyid,change_course_content_video, change_course_content_details,change_course_content_scorm,update_course_content, delete_course_content_by_id,fetch_infographics_of_user,fetch_course_to_enroll_to_admin_inst,fetch_course_to_enroll_to_inst_learner,fetch_group_to_enroll_to_admin,fetch_group_to_enroll_to_inst_learner,fetch_users_enroll_to_admin,fetch_users_enroll_to_inst_learner,fetch_group_enroll_to_course_of_inst_learner,fetch_enrollusers_of_group_to_admin,fetch_enrollusers_of_group_to_inst_learner,fetch_course_enroll_to_group_of_inst_learner,change_course_details_new,fetch_overview_of_learner,add_ratings_feedback,fetch_all_data_counts_data,get_user_points_by_superadmin,fetch_all_deptwise_users_counts,fetch_all_admin_data_counts_data,fetch_all_deptwise_users_counts_for_admin,get_user_points_by_user_for_admin,get_user_enrolledcourses_info,get_user_enrolledcourses_info_for_admin,fetch_all_instructor_data_counts_data,get_user_points_by_user_for_instructor,fetch_all_deptwise_users_counts_for_instructor,get_user_enrolledcourses_info_for_instructor,fetch_created_courses_of_user,fetch_all_training_data,fetch_ratings_of_learners,get_user_enrolledcourses_info_by_id,add_test_question,get_tests_by_course_id,get_question_by_test_names,get_correct_answer, add_assignment_data,change_assignment_details,fetch_all_assignment_data,check_assignment,fetch_assignment_for_learner,fetch_assignments_done_from_learner,change_submission_details,add_inst_led_training,change_instructor_led_details,fetch_inst_led_by_session_name,delete_instructor_led_by_id
from routers.lms_service.lms_db_ops import LmsHandler
from schemas.lms_service_schema import (Email,CategorySchema, AddUser,User, UserDetail,DeleteCourse,DeleteGroup,DeleteCategory,DeleteEvent,DeleteClassroom,DeleteConference,DeleteVirtual,DeleteDiscussion,DeleteCalender,UnenrolledUsers_Course,UnenrolledUsers_Group,UnenrolledCourse_Group,UnenrolledUsers_Group,Remove_file, DeleteCourseContent)
from utils import success_response
from config.logconfig import logger
import requests
from ..db_ops import execute_query

def get_database_session():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

service = APIRouter(tags=["Service :  Service Name"], dependencies=[Depends(verify_user)])

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
            <title>Welcome to AnandRathi Algo App</title>
        </head>
        <body>
            <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
                <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                    <div style="border-bottom: 1px solid #eee">
                        <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">Welcome to AnandRathi Algo App</a>
                    </div>
                    <p style="font-size: 1.1em">Hi {fullname},</p>
                    <p>Your account has been successfully created.</p>
                    <p>Here are your login details:</p>
                    <p>Username: {email}</p>
                    <p>Password: {password}</p>
                    <p>Enjoy using our algo app!</p>
                </div>
            </div>
        </body>
        </html>
        """
        template = template.replace("{fullname}", user.fullname)
        template = template.replace("{email}", user.email)
        template = template.replace("{password}", user.password)

        message = MessageSchema(
            subject="Welcome to AnandRathi Algo App",
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



####################################################### AR STOCK MARKET BACKEND  #############################################

def get_expiry(symbol: str, exchangeSegment: int = 2, series: str = 'OPTIDX'):
    """
    Get expiry dates based on the provided symbol.

    Parameters:
        - symbol (str): The symbol for which to retrieve expiry dates.
        - exchangeSegment (int): The exchange segment (default: 2 for OPTIDX).
        - series (str): The series (default: 'OPTIDX').

    Returns:
        - dict: JSON response containing formatted expiry dates.
    """
    ge_url = 'https://algozy.rathi.com:3000/apimarketdata/instruments/instrument/expiryDate'
    ge_payload = {'exchangeSegment': exchangeSegment, 'series': series, 'symbol': symbol}
    ge_response = requests.get(url=ge_url, params=ge_payload)

    if ge_response.status_code == 200:
        ge_data = ge_response.json()
        
        # Print the received data for debugging
        print("Received data:", ge_data)
        
        # Check if the structure is as expected
        if 'result' in ge_data:
            result = ge_data['result']
            formatted_expiry_dates = [datetime.fromisoformat(date).strftime('%d%b%Y').upper() for date in result]
            return {'data': {'result': formatted_expiry_dates}}
        else:
            raise ValueError("Unexpected response structure")
    else:
        raise HTTPException(status_code=ge_response.status_code, detail=f"Error in getting the expiry date: {ge_response.text}")

def get_inst_str(symbol: str, access_token: str, source: str = 'WEB'):
    """
    Get instrument data based on the provided symbol.

    Parameters:
        - symbol (str): The symbol for which to retrieve instrument data.
        - source (str): The source of the data (default: 'WEB').

    Returns:
        - dict: JSON response containing instrument data under the "data" key.
    """
    gis_url = 'https://algozy.rathi.com:3000/apimarketdata/search/instruments'
    gis_payload = {'searchString': symbol, 'source': source}
    gis_header = {'authorization': access_token}
    gis_response = requests.get(url=gis_url, headers=gis_header, params=gis_payload)

    if gis_response.status_code == 200:
        gis_data = gis_response.json()
        return {'data': gis_data}
    else:
        raise HTTPException(status_code=gis_response.status_code, detail=f"Error in finding the instrument id: {gis_response.text}")

# FastAPI route to get expiry dates
@service.get("/expiry/{symbol}")
def read_expiry(symbol: str, exchangeSegment: int = 2, series: str = 'OPTIDX'):
    """
    Get expiry dates based on the provided symbol.

    Parameters:
        - symbol (str): The symbol for which to retrieve expiry dates.
        - exchangeSegment (int): The exchange segment (default: 2 for OPTIDX).
        - series (str): The series (default: 'OPTIDX').

    Returns:
        - dict: JSON response containing expiry dates.
    """
    return get_expiry(symbol, exchangeSegment, series)

# FastAPI route to get instrument data
@service.get("/instruments/{symbol}")
def instruments_strikes(symbol: str, access_token: str, source: str = 'WEB'):
    try:
        return get_inst_str(symbol, access_token, source)
    except HTTPException as e:
        return e
    
logging.basicConfig(level=logging.DEBUG)

@service.get("/get_ltp_price/{symbol}")
def get_ltp_price(
    symbol: str,
    expiry: str,
    strike: str,
    type: str,
    access_token: str,
    source: str = 'WEB'
):
    try:
        # Step 1: Get instrument data
        instrument_data = get_inst_str(symbol, access_token, source)

        # Assuming instrument_data contains the necessary information, extract the relevant part
        strike_api_response = instrument_data['data']['result']

        # Define the target display name
        target_display_name = f"{symbol} {expiry} {type} {strike}"

        # Step 2: Filter the response based on the target display name
        matching_instrument = next(
            (instrument for instrument in strike_api_response if instrument.get("DisplayName") == target_display_name), None
        )
        logging.info(f"Matching Instrument: {matching_instrument}")

        if matching_instrument:
            exchange_instrument_id = matching_instrument.get("ExchangeInstrumentID")
            logging.info(f"Exchange Instrument ID: {exchange_instrument_id}")

            # Step 3: Get ltp using the exchange_instrument_id
            q_url = f'https://algozy.rathi.com:3000/apimarketdata/instruments/quotes'
            q_payload = {
                'instruments': [{'exchangeSegment': 2, 'exchangeInstrumentID': exchange_instrument_id}],
                'xtsMessageCode': 1502,
                'publishFormat': 'JSON'
            }
            q_header = {'authorization': access_token}
            q_response = requests.post(url=q_url, headers=q_header, json=q_payload)
            logging.info(f"Quote API Response: {q_response.text}")

            if q_response.status_code == 200:
                q_data = q_response.json()
                logging.info(f"Quote API Data: {q_data}")
                # print(q_data)
                # Check if 'result', 'listQuotes', and the list itself are present in the response
                if 'result' in q_data and 'listQuotes' in q_data['result'] and q_data['result']['listQuotes']:
                    list_quotes_json = json.loads(q_data['result']['listQuotes'][0])

                    # Check if 'Touchline' and 'LastTradedPrice' are present in the list quotes JSON
                    if 'Touchline' in list_quotes_json and 'LastTradedPrice' in list_quotes_json['Touchline']:
                        ltp = list_quotes_json['Touchline']['LastTradedPrice']
                        bid_info = list_quotes_json['Touchline']['BidInfo']
                        ask_info = list_quotes_json['Touchline']['AskInfo']
                        bid_orders = list_quotes_json['Touchline']['BidInfo']
                        ask_orders = list_quotes_json['Touchline']['AskInfo']

                        bid_price = bid_info['Price']
                        ask_price = ask_info['Price']
                        bid_order = bid_orders['TotalOrders']
                        ask_order = ask_orders['TotalOrders']
                        return {'LastTradedPrice': ltp, 'BidInfo': bid_price, 'AskInfo': ask_price, 'BidTotalOrders': bid_order, 'AskTotalOrders': ask_order}
                    else:
                        raise HTTPException(status_code=500, detail="Error in extracting LastTradedPrice from quote.")
                else:
                    raise HTTPException(status_code=500, detail="Error in fetching listQuotes from quote.")
            else:
                # Handle case when the request to the quotes API fails
                raise HTTPException(status_code=q_response.status_code, detail="Error in fetching ltp.")
        else:
            # Handle case when no match is found in the instrument data
            raise HTTPException(status_code=404, detail="Instrument not found for the given criteria.")

    except HTTPException as e:
        return e


@service.get("/get_spot/{symbol}")
def fetch_spot_price(access_token: str):
    try:
        q_url = f'https://algozy.rathi.com:3000/apimarketdata/instruments/quotes'
        q_payload = {
            'instruments': [{'exchangeSegment': 1, 'exchangeInstrumentID': 26000}],
            'xtsMessageCode': 1502, "publishFormat": "JSON"
        }
        q_header = {'authorization': access_token}

        while True:
            q_response = requests.post(url=q_url, headers=q_header, json=q_payload)

            if q_response.status_code == 200:
                q_data = q_response.json()

                # Check if 'result', 'listQuotes', and the list itself are present in the response
                if 'result' in q_data and 'listQuotes' in q_data['result'] and q_data['result']['listQuotes']:
                    list_quotes_json = json.loads(q_data['result']['listQuotes'][0])

                    # Check if 'Touchline' and 'LastTradedPrice' are present in the list quotes JSON
                    if 'Touchline' in list_quotes_json and 'LastTradedPrice' in list_quotes_json['Touchline']:
                        spot_price = list_quotes_json['Touchline']['LastTradedPrice']

                        # Assuming strike prices are integers
                        strike_interval = 50
                        num_strikes = 40

                        # Generate 40 upper and 40 lower strikes
                        lower_strikes = list(range(int(spot_price // 100 * 100), int(spot_price // 100 * 100 - strike_interval * num_strikes), -strike_interval))
                        upper_strikes = list(range(int(spot_price // 100 * 100 + strike_interval), int(spot_price // 100 * 100 + strike_interval * (num_strikes + 1)), strike_interval))

                        print(f"Spot Price: {int(spot_price)}, Lower Strikes: {lower_strikes}, Upper Strikes: {upper_strikes}")

                        # Return the spot price, lower strikes, and upper strikes
                        return {'SpotPrice': int(spot_price), 'LowerStrikes': lower_strikes, 'UpperStrikes': upper_strikes}
                    else:
                        raise HTTPException(status_code=500, detail="Error in extracting LastTradedPrice from quote.")
                else:
                    raise HTTPException(status_code=500, detail="Error in fetching listQuotes from quote.")
            else:
                raise HTTPException(status_code=q_response.status_code, detail="Error in fetching quote.")

            time.sleep(1)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {e}")
