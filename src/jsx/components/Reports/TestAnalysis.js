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

const TestAnalysis = () => {
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
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/test-overview">Overview</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/test-analysis">Analysis</Link>
      </Nav.Item>
    </Nav>

    <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Test Analysis </h4>
              
              </div>
              <div className='row mt-5'>
                <div className='col-lg-1'>
                  </div>
                <div className='col-lg-4'>
                  <h3>Answers distribution</h3>
                  
              </div>
                  <div className='col-lg-6'>
                  <h3>Questions</h3>
                  <h5>"Content types TalentLMS supports include:"(0 Times answered)</h5>
                </div>
                <div className='row mt-5'>
                <div className='col-lg-1'>
                </div>
                <div className='col-lg-3'>
                <input
                    type="text"
                    className="form-control"
                    id="val-email"
                    placeholder=""
                    />
                  </div>
                  <div className='col-lg-1 col-xxl-1'>
                    
                  <input type="checkbox"
                  className="form-check-input mt-3"
                  />
                  </div>
                  <div className='col-lg-3 mt-3'>
                  <h5>Video</h5>
                  </div>
              </div>
              <div className='row mt-5'>
                <div className='col-lg-1'>
                </div>
                <div className='col-lg-3'>
                <input
                    type="text"
                    className="form-control"
                    id="val-email"
                    placeholder=""
                    />
                  </div>
                  <div className='col-lg-1 col-xxl-1'>
                    
                  <input type="checkbox"
                  className="form-check-input mt-3"
                  />
                  </div>
                  <div className='col-lg-3 mt-3'>
                  <h5>Audio</h5>
                  </div>
              </div>
              <div className='row mt-5'>
                <div className='col-lg-1'>
                </div>
                <div className='col-lg-3'>
                <input
                    type="text"
                    className="form-control"
                    id="val-email"
                    placeholder=""
                    />
                  </div>
                  <div className='col-lg-1 col-xxl-1'>
                    
                  <input type="checkbox"
                  className="form-check-input mt-3"
                  />
                  </div>
                  <div className='col-lg-3 mt-3'>
                  <h5>Presentations & documents</h5>
                  </div>
              </div>
              <div className='row mt-5'>
                <div className='col-lg-1'>
                </div>
                <div className='col-lg-3'>
                <input
                    type="text"
                    className="form-control"
                    id="val-email"
                    placeholder=""
                    />
                  </div>
                  <div className='col-lg-1 col-xxl-1'>
                  <input type="checkbox"
                  className="form-check-input mt-3"
                  />
                  </div>
                  <div className='col-lg-3 mt-3'>
                  <h5>iFrame</h5>
                  </div>
              </div>
              <div className='row mt-5'>
                <div className='col-lg-1'>
                </div>
                <div className='col-lg-3'>
                <input
                    type="text"
                    className="form-control"
                    id="val-email"
                    placeholder=""
                    />
                  </div>
                  <div className='col-lg-1 col-xxl-1'>
                    
                  <input type="checkbox"
                  className="form-check-input mt-3"
                  />
                  </div>
                  <div className='col-lg-3 mt-3'>
                  <h5>Assessment</h5>
                  <label>Daily pop-culture news</label>
                  </div>
              </div>
            </div>
            <div className="card-header">
            </div>
            
            <div className='row mt-5'>
            <div className='col-lg-1'>
                </div>
                <div className='col-lg-10'>
            <label className='mt-4'>'When it comes to iFrame, you can embed and entire page[straight into a course], or choose...'(0 times answered)</label>
            </div>
            <div className='row mt-5'>
                <div className='col-lg-1'>
                </div>
                <div className='col-lg-4'>
                <input
                    type="text"
                    className="form-control"
                    id="val-email"
                    placeholder=""
                    />
                  </div>
                  <div className='col-lg-3 mt-3'>
                  <h5>Straight into a course</h5>
                  </div>
                </div>	
                </div>	
                <div className='row mt-5'>
                <div className='col-lg-1'>
                </div>
                <div className='col-lg-4 mb-5'>
                <input
                    type="text"
                    className="form-control"
                    id="val-email"
                    placeholder=""
                    />
                  </div>
                  <div className='col-lg-3 mt-3'>
                  <h5>appear as a pop-up</h5>
                  </div>
                </div>	
            </div>
        </div>
      </div>
</Fragment>
)
}

export default TestAnalysis