import React,{useState, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Select from "react-select";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { read, utils, writeFile } from 'xlsx';
import {Tab, Nav, Button, Dropdown} from 'react-bootstrap';
import DropDownBlog  from '../Dashboard/DropDownBlog';
import LearningActivityChart from "../Dashboard/Dashboard/LearningActivityChart";


import PerfectScrollbar from "react-perfect-scrollbar";
import TotalCourse from "../../pages/WidgetBasic/TotalCourse";

import courses8 from './../../../images/courses/pic-2.jpg';
import pic1 from '../../../images/Users/Selectquestion.svg';

const options = [
  { value: "certificate_1", label: "Certificate 1" },
  { value: "certificate_2", label: "Certificate 2" },
  { value: "certificate_3", label: "Certificate 3" },
  { value: "certificate_4", label: "Certificate 4" },
];
  
const AdmTestOption = () => {
	const [dropSelect, setDropSelect] = useState('This Month');
    const [selectedOption, setSelectedOption] = useState(null);
    const [ movies, setMovies] = useState([]);
    const chackbox = document.querySelectorAll(".bs_exam_topper input");
    const motherChackBox = document.querySelector(".bs_exam_topper_all input");
    
    const chackboxFun = (type) => {
      for (let i = 0; i < chackbox.length; i++) {
        const element = chackbox[i];
        if (type === "all") {
          if (motherChackBox.checked) {
            element.checked = true;
          } else {
            element.checked = false;
          }
        } else {
          if (!element.checked) {
            motherChackBox.checked = false;
            break;
          } else {
            motherChackBox.checked = true;
          }
        }
      }
    };

  return (
    <Fragment>
    <Nav >
      <Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/adm_test-question">Select Question</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/adm_test-order">Set Question Order</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/adm_test-weight">Set Question Weight</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/adm_test-option">Test Options</Link>
      </Nav.Item>
    </Nav>

    <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">

              <div className="me-2">
              <input
                type="text"
                className="form-control"
                id="val-username"
                placeholder="Hitesh 100"
                />
                </div>
                </div>
                <br/>
                <br/>
                <div className="row">
                  <div className='col-lg-1'>
                  </div>
                    <div className="col-xl-8">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="val-username"
                        >
                          Duration
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            name="val-username"
                            placeholder="Minutes"
                          />
                        </div>
                        </div>
                        <div className="row mb-3">
                    <div className="col-xl-8">
                      <div className="form-group mb-3 row">
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          Pass Score
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            name="val-username"
                            placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;%"
                          />
                        </div>
                      </div>
                    </div>
                <div className='row mb-3'>
                  <label>Randomization</label>
                </div>
                <div className='row'>
                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Suffle Question</label>
                  </div>
                </div>
                </div>
                <div className='row'>
                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Suffle possible options</label>
                  <br/>
                  <br/>
                  </div>
                </div>
                <div className='row mb-3'>
                  <label>Repetitions</label>
                </div>
                <div className='row'>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input 
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    // onClick={() => chackboxFun(toggleCheckboxes)}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Allow repetitions</label>
                  </div>
                  <div className='col-lg-3'>
                  <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                  >
                  </Select>
                  <br/>
                </div>
                </div>
                <div className='row'>
                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maximum number of attempt</label>
                  <br/>
                  <br/>
                </div>
                </div>
                <div className='row mb-3'>
                          <label>Completion</label>
                        </div>
                        <div className='row'>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input 
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    // onClick={() => chackboxFun(toggleCheckboxes)}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Show correct answer</label>
                  </div>
                  <div className='col-lg-3'>
                  <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                  >
                  </Select>
                  <br/>
                </div>
                </div>
                <div className='row'>
                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show given answer</label>
                  <br/>
                  <br/>
                  </div>
                </div>
                <div className='row'>
                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show correct/incorrect labels</label>
                  <br/>
                  <br/>
                  </div>
                </div>
                <div className='row'>
                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show Stats after completion</label>
                  <br/>
                  <br/>
                  </div>
                </div>
                <div className='row'>
                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Limit answer feebback</label>
                  <br/>
                  <br/>
                  </div>
                </div>
                <div className='row mb-3'>
                  <label>Behaviour</label>
                </div>
                <div className='row'>
                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Allow movement to next/previous question</label>
                  <br/>
                  <br/>
                  </div>
                </div>
                <div className='row'>
                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Check answers and do not continue until the correct answer is chosen</label>
                  <br/>
                  <br/>
                  </div>
                </div>
                <div className='row'>
                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Abandon immediately whenever cannot pass</label>
                  </div>
                </div>
                <br/>
                <div className='row mb-3'>
                  <label>Security</label>
                </div>
                <div className='row'>
                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Require learner snapshot to start the test</label>
                  <br/>
                  <br/>
                  </div>
                </div>
                <div className='row'>
                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Require password to start the test</label>
                  <br/>
                  <br/>
                  </div>
                </div>
                <div className='row mb-3'>
                  <label>Description&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Message(if passed)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Message(if not passed)</label>
                </div>

                <div className='row mb-2'>
                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <textarea
                className="form-control"
                id="val-suggestions"
                name="val-suggestions"
                rows="5"
                placeholder="Add a Text"
              ></textarea>
                  <br/>
                  <br/>
                  </div>
                </div>
                </div>
                </div>
                <div className='row mb-5'>
                <div className="col-lg-1">	
                </div>
                <div className="col-lg-10">	
                <h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please add some questions to the test first</h5>
                </div>
              </div>
              </div>
              </div>
                </div>
    </Fragment>
  )
}

export default AdmTestOption