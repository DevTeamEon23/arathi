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

import courses8 from './../../../images/courses/pic-2.jpg';

const ProgressChart = loadable(() =>
	pMinDelay(import("../Dashboard/Dashboard/ProgressChart"), 1000)
);

const SurveyOverview = () => {
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
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/survey-overview">Overview</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/survey-analysis">Analysis</Link>
      </Nav.Item>
    </Nav>

    <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Survey Overview </h4>
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
                                <h3 className="mb-0">Working with surveys</h3>
                                <span>Advanced features of lms</span>
                            </div>
                        </div>
                        
                <div className='row'>
                <div className="col-lg-1">	
                </div>
                <div className="col-lg-8">	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <br/>	
                <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;There's no info to report, at the moment</h4>
                <h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Looks like no one has engaged with this, yet. Check back later.</h5>
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

export default SurveyOverview