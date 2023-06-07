import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import TimePickerPicker from 'react-time-picker';
import profile from "../../../images/profile/profile.png";
import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Nav,
  Button,
} from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Your username must consist of at least 3 characters ")
    .max(50, "Your username must consist of at least 3 characters ")
    .required("Please enter a username"),
  password: Yup.string()
    .min(5, "Your password must be at least 5 characters long")
    .max(50, "Your password must be at least 5 characters long")
    .required("Please provide a password"),
});

const SurveyOption = () => {
  const [showPassword, setShowPassword] = useState(false);
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
    <Fragment>
    <Nav >
      <Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/survey-question">Select Question</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/survey-order">Set Question Order</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/survey-option">Survey Options</Link>
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
                placeholder="Survey Name"
                />
                </div>
                </div>
                <div className='row'>
                <div className="col-lg-12">						
                    <div className="card-body">

                        
                <div className='row'>
                <div className="col-lg-1">	
                </div>
                <div className="col-lg-8 mt-5 mb-5">
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
                  >Show answers after completion</label>
                </div>
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
                  >Do not continue until an answer is chosen</label>
                  </div>
                </div>
                <div className="form-group mb-3 row">
          <label
              className="col-lg-4 col-form-label"
              htmlFor="val-suggestions"
            >
              Description <span className="text-danger">*</span>
            </label>
            <div className="col-xl-10 mb-5">
              <textarea
                className="form-control"
                id="val-suggestions"
                name="val-suggestions"
                rows="5"
                placeholder="Add a Text"
              ></textarea>
            </div>
            </div>
              </div>
            </div>	
        </div>
        </div>
                </div>
            </div>
          </div>
    </Fragment>
  );
};

export default SurveyOption;
