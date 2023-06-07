import React,{useState, Fragment} from 'react';
import {Link} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { read, utils, writeFile } from 'xlsx';
import {Tab, Nav, Button, Dropdown} from 'react-bootstrap';
import DropDownBlog  from '../Dashboard/DropDownBlog';
import LearningActivityChart from "../Dashboard/Dashboard/LearningActivityChart";


import PerfectScrollbar from "react-perfect-scrollbar";
import TotalCourse from "../../pages/WidgetBasic/TotalCourse";

import courses8 from './../../../images/courses/pic8.jpg';

const ProgressChart = loadable(() =>
	pMinDelay(import("../Dashboard/Dashboard/ProgressChart"), 1000)
);

const CourseOverview = () => {
	const [dropSelect, setDropSelect] = useState('This Month');
    const [ movies, setMovies] = useState([]);
    const handleExport = () => {
        const headings = [[
            'id',
            'FullName',
            'Email_Address',
            'Employee_id',
            'Department',
            'Aadhar_Card_No',
            'Username',
            'Password',
            'Bio',
            'Photo',
            'User_Type',
            'TimeZone',
            'Language',
        ]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, movies, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'Export Report.xlsx');
    }
  return (
    <Fragment>
    <Nav >
      <Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/course_overview">Overview</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/courses_user">Users</Link>
      </Nav.Item>
    </Nav>

    <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Courses Overview </h4>
              <div className="me-2">
                    <button onClick={handleExport} className="btn btn-primary float-right">
                        Export in Excel <i className="fa fa-download"></i>
                    </button>
                </div>
                </div>
                <br/>
                <br/>
                <div className='row'>
                <div className="col-lg-12">						
                    <div className="card-body">
                        <div className="message-box d-flex align-items-center">
                            <img src={courses8} alt="" />
                            <div className="ms-3">
                                <h3 className="mb-0">Give your course a name</h3>
                                <span>the lorem ipsum...</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='row me-2'>
                <div className="col-xl-3 col-lg-2 col-sm-2">
          <div className="widget-stat card bg-light">
            <div className="card-body p-2">
              <div className="media ai-icon">
                <span className="me-2 bgl-primary text-primary">
                  <svg
                    id="icon-customers"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-user"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                <div className="media-body">
                  <p className="mb-1">Assigned Learners</p>
                  <h4 className="mb-0">0</h4>
                  <span className="badge badge-primary">+3.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
                <div className="col-xl-3 col-lg-2 col-sm-2">
          <div className="widget-stat card bg-light">
            <div className="card-body p-2">
              <div className="media ai-icon">
                <span className="me-3 bgl-warning text-warning">
                  <svg
                    id="icon-orders"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-file-text"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </span>
                <div className="media-body">
                  <p className="mb-1">Completed Learner</p>
                  <h4 className="mb-0">0</h4>
                  <span className="badge badge-warning">+3.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
                <div className="col-xl-3 col-xxl-3 col-lg-2 col-sm-2">
          <div className="widget-stat card bg-light">
            <div className="card-body  p-2">
              <div className="media ai-icon">
                <span className="me-3 bgl-danger text-danger">
                  <svg
                    id="icon-revenue"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-dollar-sign"
                  >
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </span>
                <div className="media-body">
                  <p className="mb-1">Learner Progress</p>
                  <h4 className="mb-0">0</h4>
                  <span className="badge badge-danger">-3.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
                <div className="col-xl-3 col-xxl-3 col-lg-2 col-sm-2">
          <div className="widget-stat card bg-light">
            <div className="card-body p-2">
              <div className="media ai-icon">
                <span className="me-3 bgl-success text-success">
                  <svg
                    id="icon-database-widget"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-database"
                  >
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                  </svg>
                </span>
                <div className="media-body">
                  <p className="mb-1">Instructor</p>
                  <h4 className="mb-0">0</h4>
                  <span className="badge badge-success">-3.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-3 col-lg-2 col-sm-2">
          <div className="widget-stat card bg-light">
            <div className="card-body p-2">
              <div className="media ai-icon">
                <span className="me-3 bgl-success text-success">
                  <svg
                    id="icon-database-widget"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-database"
                  >
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                  </svg>
                </span>
                <div className="media-body">
                  <p className="mb-1">Training time</p>
                  <h4 className="mb-0">0h 0m</h4>
                  <span className="badge badge-success">-3.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">

        <div className="col-xl-7 col-xxl-7">
          <div className="card score-active">
            <div className="card-header border-0 flex-wrap">
              <h4>Learning Activity</h4>
              <ul className="d-flex">
                <li>
                  <svg className="me-2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="9" height="9" rx="4.5" fill="white" stroke="var(--primary)" strokeWidth="3"/>
                  </svg>
                  Last Month
                </li>
                <li>
                  <svg className="me-2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="9" height="9" rx="4.5" fill="white" stroke="var(--secondary)" strokeWidth="3"/>
                  </svg>
                  Last Month
                </li>
              </ul>
            </div>
            <div className="d-flex align-items-center">
              <Dropdown className='select-dropdown me-2'>
                <Dropdown.Toggle as='div' className='i-false dashboard-select  selectBtn btn-dark'>{dropSelect} <i className="fa-solid fa-angle-down ms-2" /></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>setDropSelect("This Month")}>This Month</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setDropSelect("This Weekly")}>This Weekly</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setDropSelect("This Day")}>This Day</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <DropDownBlog />
            </div>
            <div className="card-body pb-1 custome-tooltip style-1 py-0 ">
              <LearningActivityChart />
            </div>
          </div>
        </div>
        <div className="col-xl-5 col-lg-2">									
        <ProgressChart />
        <div className="redial-content">
            <h4>Progress Overview</h4>
            <Link to={'./user-infographic'} className="btn btn-primary">View Infographics</Link>
        </div>
    </div>
    </div>
    </div>
	</div>	
    </div>
    </div>
    </div>
    </Fragment>
  )
}

export default CourseOverview