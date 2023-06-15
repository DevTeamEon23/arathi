import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomClearIndicator from "../PluginsMenu/Select2/MultiSelect";
import TimePickerPicker from 'react-time-picker';
import DateRangePicker from "react-bootstrap-daterangepicker";
import {
   Button,
   Nav,
 } from "react-bootstrap";

 const AdEvent = () => {
  const [value, onChange] = useState(new Date());
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

         <div className="h-80">
            <div className="row">
            <Nav >
                <Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
                  <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/message_users">Message Users</Link>
                  <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/ad_event">Add Event</Link>
                  <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="#">Make course public</Link>
                  <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="#">lock Course Content</Link>
                  <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/mobileapp_compt">Mobile App Compatibility</Link>
                </Nav.Item>
            </Nav>
               <div className="col-xl-12 col-xxl-12">
                  <div className="card">
                     <div className="card-header">
                        <h4 className="card-title">Add Event</h4>
                     </div>
                     <br/>
                     <br/>
                     <div className="row">
                    <div className="col-xl-1">
                      </div>
                    <div className="col-xl-8">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="val-username"
                        >
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            name="val-username"
                            placeholder="E.g. meeting"
                          />
                        </div>
                        </div>
                        </div>
                        <div className="form-group mb-3 row">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="val-currency"
                        >
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Time Options
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-4 mb-3">
                          <div className="example rangeDatePicker">
                            <p className="mb-1">Date Range With Time</p>
                            {/* <DateRangePicker
                              startText="Start"
                              endText="End"
                              startPlaceholder="Start Date"
                              endPlaceholder="End Date"
                            />   */}

                            <DateRangePicker>
                                <input type="text" className="form-control input-daterange-timepicker" />
                            </DateRangePicker>
                            <br/>
                            <br/>Pick Your Time of Course
                            <TimePickerPicker className="form-control input-daterange-timepicker" onChange={onChange} value={value} />
                              </div>
                          </div>
                      </div>
                     </div>
                  <div className="row">
                    <div className="col-xl-1">
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
                        <div className="col-lg-4">
                          <input
                          type="text"
                          className="form-control"
                          id="val-username"
                          name="val-username"
                          placeholder=""
                        />
                     </div>
                  <div className="row">
                     <div className="col-xl-2">
                     <br/>
                     <br/>
                        <label className="card-title">Audience</label>
                      </div>
                      <div className="col-xl-8">
                     <br/>
                     <br/>
                          <CustomClearIndicator></CustomClearIndicator>
                        </div>
                     <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-suggestions"
                        >
                        <br/>
                        <br/>
                          Description <span className="text-danger">*</span>
                        </label>
                        <div className="col-xl-12">
                          <textarea
                            className="form-control"
                            id="val-suggestions"
                            name="val-suggestions"
                            rows="5"
                            placeholder="Add a text"
                          ></textarea>
                        </div>
                      </div>
                      <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                    <div className="col-xl-1">
                      </div>
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
                        >This is a recurring event</label>
                        
                      </div>
                      </div>
                     <div className="form-group mb-3 row">
                        <div className="col-lg-8 ms-auto">
                          <br/>
                          <br/>
                        <Button
                          type="submit"
                          className="btn me-2 btn-primary"
                        >
                          Save & view
                        </Button> or &nbsp;&nbsp;
                        <Button type="submit" className="btn btn-light">
                          <Link to="/add-courses" >Cancel</Link>
                        </Button>
                      </div>
                      </div>
                  </div>
               </div>
            </div> 
                                </div>
                     </div>
                     </div>
                     </div>
      );
   }

export default AdEvent;
