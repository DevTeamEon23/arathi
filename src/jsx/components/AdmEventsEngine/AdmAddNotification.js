import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import TimePickerPicker from 'react-time-picker';
import profile from "../../../images/profile/profile.png";
import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";


const eventtype = [
  { value: "Selectevent", label: "Select event" },
  { value: "Onusercreate", label: "On user create" },
  { value: "Onusersignup", label: "On user signup" },
  { value: "Xhoursafterusersignup", label: "X hours after user signup" },
  { value: "Xhoursafterusersignupandtheuserhasnotmadeapurchase", label: "X hours after user signup and the user has not made a purchase" },
  { value: "Xhoursafterusercreation", label: "X hours after user creation" },
  { value: "Xhoursafterusercreationandtheuserhasnotsignedin", label: "X hours after user creation and the user has not signed in" },
  { value: "Xhoursafterusersignupandtheuserhasnotsignedin", label: "X hours after user signup and the user has not signed in" },
  { value: "Xhourssinceuserlastsignedin", label: "X hours since user last signed in" },
  { value: "Xhourssinceuserfirstsigninandtheuserhasnotcompletedanycourse", label: "X hours since user first sign in and the user has not completed any course" },
  { value: "Xhoursbeforeuserdeactivation", label: "X hours before user deactivation" },
  { value: "Oncourseassignment", label: "On course assignment" },
  { value: "Oncourseselfassignment", label: "On course self assignment" },
  { value: "Xhoursaftercourseacquisition", label: "X hours after course acquisition" },
  { value: "Xhoursbeforecoursestart", label: "X hours before course start" },
  { value: "Oncoursecompletion", label: "On course completion" },
  { value: "Xhoursaftercoursecompletion", label: "X hours after course completion" },
  { value: "Oncoursefailure", label: "On course failure" },
  { value: "Oncourseexpiration", label: "On course expiration" },
  { value: "Xhoursbeforecourseexpiration", label: "X hours before course expiration" },
  { value: "Oncertificateacquisition", label: "On certificate acquisition" },
  { value: "Oncertificateexpiration", label: "On certificate expiration" },
  { value: "Xhoursbeforecertificateexpiration", label: "X hours before certificate expiration" },
  { value: "Ongroupassignment", label: "On group assignment" },
  { value: "Onbranchassignment", label: "On branch assignment" },
  { value: "Onassignmentsubmission", label: "On assignment submission" },
  { value: "Onassignmentgrading", label: "On assignment grading" },
  { value: "OnILTsessioncreate", label: "On ILT session create" },
  { value: "OnILTsessionregistration", label: "On ILT session registration" },
  { value: "XhoursbeforeanILTsessionstarts", label: "X hours before an ILT session starts" },
  { value: "OnILTgrading", label: "On ILT grading" },
  { value: "Onuserpayment", label: "On user payment" },
  { value: "OnlevelXreached", label: "On level X reached" },
];

const recipienttype = [
  { value: "Selectrecipient", label: "Select recipient" },
  { value: "Relateduser", label: "Related user" },
  { value: "Accountowner", label: "Account owner" },
  { value: "SuperAdmins", label: "SuperAdmins" },
  { value: "Branchadmins", label: "Branch admins" },
  { value: "Courseinstructors", label: "Course instructors" },
  { value: "Courselearners", label: "Course learners" },
  { value: "Specificrecipients", label: "Specific recipients" },
];

const AdmAddNotification = () => {
  const [id, setId] = useState('');
  const [ename, setEname] = useState('');
  const [descp, setDescp] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {id, ename, eventtype, recipienttype, descp, isActive};

    fetch('http://localhost:8000/lmsevents', {
      method: 'POST',
    })
    .then((data) => {
      console.log('new event added')
      alert("✔️ Event Added Successfully");
      setEvents(data);
    })
      .catch((err) => {
        console.log(err);
      });
    }
  

  let history = useHistory();
  return (
    <Fragment>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Notification</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
              <form action="http://localhost:8000/lmsevents" method="post" encType="multipart/form-data" >
                  <div className="row">
                    <div className="col-xl-12">
                    <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          id
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            name="id"
                            placeholder="e.g. 1"
                            onChange={(e) => setId(e.target.value)}
                          />
                        </div>
                      </div>  
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="ename"
                            name="ename"
                            placeholder="e.g. John Doe"
                            onChange={(e) => setEname(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                      <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-website"
                        >
                          Event
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                      <Select
                          defaultValue={eventtype}
                          onChange={eventtype}
                          options={eventtype}
                          name="eventtype"
                        >
                      </Select>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                      <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-website"
                        >
                          Recipient
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <Select
                          defaultValue={recipienttype}
                          onChange={recipienttype}
                          options={recipienttype}
                          name="recipienttype"
                        >
                      </Select>
                        </div>
                      </div>

                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-suggestions"
                        >
                          Description <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <textarea
                            className="form-control"
                            id="descp"
                            name="descp"
                            rows="5"
                            placeholder="Short Description about user.."
                            onChange={(e) => setDescp(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-04">

                          
                        </div><br />

                      <div className="form-group mb-3 row">
                    </div>
                      <label
                        className="form-check css-control-primary css-checkbox"
                        htmlFor="val-terms"
                      >
                        <input
                        type="checkbox"
                        className="form-check-input"
                        id="isActive"
                        name="isActive"
                        onChange={(e) => setIsActive(e.target.value)}
                        />
                        <span className="css-control-indicator">Active</span>
                      </label><br/>
                  <button
                    type="submit"
                    className="btn me-2 btn-primary"
                  >
                    Create Notification
                  </button>&nbsp; or &nbsp;&nbsp;
                    <Link to="/events"><Button className="btn btn-light">
                      Cancel
                    </Button></Link>
                </div>
              </div>
            </form>
          </div>
          </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdmAddNotification;




