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

const UserProg = () => {
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
      <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/user-progress">Overview</Link>
      <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/user-course">Courses</Link>
      <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/user-certificates">Certificates</Link>
      <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/user-timeline">Timeline</Link>
      </Nav.Item>
    </Nav>

    <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Saved Files </h4>
              <div className="me-2">
                    <button onClick={handleExport} className="btn btn-primary float-right">
                        Export in Excel <i className="fa fa-download"></i>
                    </button>
                </div>
                </div>
                <br/>
                <br/>
                <div className='row'>
                <div className="col-lg-3">						
                    <div className="card-body">
                        <div className="message-box d-flex align-items-center">
                            <img src={courses8} alt="" />
                            <div className="ms-3">
                                <h3 className="mb-0">Nella Vita</h3>
                                <span>Admin</span>
                            </div>

                        </div>
                    </div>
                </div>
        <div className="col-xl-3 col-xxl-3 col-lg-5 col-sm-6">
          <div className="widget-stat card bg-secondary">
            <div className="card-body p-2">
              <div className="media">
                <span className="me-3">
                  <i className="la la-graduation-cap"></i>
                </span>
                <div className="media-body text-white">
                  <p className="mb-1">Course Progress</p>
                  <h3 className="text-white">9</h3>
                  <div className="progress mb-2 bg-primary">
                    <div
                      className="progress-bar progress-animated bg-light"
                      style={{ width: "76%" }}
                    ></div>
                  </div>
                  {/* <small>76% Increase in 20 Days</small> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-3 col-lg-6 col-sm-6">
          <div className="widget-stat card bg-secondary">
            <div className="card-body p-2">
              <div className="media">
                <span className="me-3">
                    <i class="bi bi-check2-circle"></i>
                </span>
                <div className="media-body text-white">
                  <p className="mb-1">Completed Course</p>
                  <h3 className="text-white">0</h3>
                  <div className="progress mb-2 bg-primary">
                    <div
                      className="progress-bar progress-animated bg-light"
                      style={{ width: "76%" }}
                    ></div>
                  </div>
                  {/* <small>76% Increase in 20 Days</small> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-3 col-lg-6 col-sm-6">
          <div className="widget-stat card bg-secondary">
            <div className="card-body p-2">
              <div className="media">
                <span className="me-3">
                <i class="bi bi-clock"></i>
                </span>
                <div className="media-body text-white">
                  <p className="mb-1">Training Time</p>
                  <h3 className="text-white">1m</h3>
                  <div className="progress mb-2 bg-primary">
                    <div
                      className="progress-bar progress-animated bg-light"
                      style={{ width: "76%" }}
                    ></div>
                  </div>
                  {/* <small>76% Increase in 20 Days</small> */}
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
    </Fragment>
  )
}

export default UserProg