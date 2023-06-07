import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
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

const UserSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, onChange] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState(null);
  const chackbox = document.querySelectorAll(".bs_exam_topper input");
const motherChackBox = document.querySelector(".bs_exam_topper_all input");

const options = [
  { value: "admin", label: "Manually (from Admin)" },
  { value: "", label: "" },
  { value: "", label: "" },
];
const options_1 = [
  { value: "learner", label: "Learner - type" },
  { value: "", label: "" },
  { value: "", label: "" },
  { value: "", label: "" },
];
const options_2 = [
  { value: "group", label: "Select a Group" },
  { value: "", label: "" },
  { value: "", label: "" },
];
const options_3 = [
  { value: "fln", label: "F.Last Name" },
  { value: "", label: "" },
  { value: "", label: "" },
];

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
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/basic-settings">Basic Settings</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/user-settings">Users</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/thoms-page">Themes</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/certificates">Certificates</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/gamification">Gamification</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/ecommerce">E-commerce</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/domains">Domain</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/subscriptions">Subscription</Link>
        </Nav.Item>
      </Nav>
      <div className="row">
        <div className="card">
        <div className="col-lg-12">
          <div className="form-group mb-3 row">
            <br/>
            <br/>
            <div className="card-header">
              <h4 className="card-title">User Settings </h4>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <label
              className="col-lg-4 mt-5 col-form-label"
              htmlFor="val-currency"
            >
              Sign Up
              <span className="text-danger">*</span>
            </label>
            <div className="col-lg-6 mt-5 ">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            >
            </Select>
            </div>
          </div>
          <div className="form-group mb-3 row">
            <label
              className="col-lg-4 col-form-label"
              htmlFor="val-currency"
            >
              Default User Type
              <span className="text-danger">*</span>
            </label>
            <div className="col-lg-6">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options_1}
            >
            </Select>
            </div>
          </div>
          <div className="form-group mb-3 row">
            <label
              className="col-lg-4 col-form-label"
              htmlFor="val-website"
            >
              Default group
              <span className="text-danger">*</span>
            </label>
            <div className="col-lg-6">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options_2}
            >
            </Select>
            </div>
          </div>
          <div className="form-group mb-3 row">
          <div className="card-header">
            <h4 className="card-title">Announcement </h4>
          </div>
                <br/>
                <br/>
                <div className="row">
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
                  >Enforce strong password</label>
                  
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
                  >Enable password change after " " Days</label>
                  
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
                  >Enter password change on first login</label>
                  
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
                  >Lock account after " " Failed Attempts for " " Minutes</label>
                  
                </div>
                </div>
                </div>
                </div>
          <div className="form-group mb-3 row">
          <label
              className="col-lg-4 col-form-label"
              htmlFor="val-suggestions"
            >
              Terms of Service <span className="text-danger">*</span>
            </label>
            <div className="col-xl-6 mb-5">
              <textarea
                className="form-control"
                id="val-suggestions"
                name="val-suggestions"
                rows="5"
                placeholder="The Terms of service is shown to user when they first login into the system. It is 
                neccessary to accepts it in order to continue. leave empty if you don't want to have terms and services."
              ></textarea>
            </div>
            </div>
            <div className="form-group mb-3 row">
            <label
              className="col-lg-4 col-form-label"
              htmlFor="val-website"
            >
              Visible user format
              <span className="text-danger">*</span>
            </label>
            <div className="col-lg-6">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options_3}
            >
            </Select>
            </div>
          </div>
          <div className="card-header">
                  <h4 className="card-title col-lg-6">Social options </h4>
                </div>
                <br/>
                <br/>
                <div className="row">
                <div className="col-lg-1">
                </div>
                <div className="col-lg-8">
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
                  >Allow signups through social media</label>
                  
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
                  >Allow interactions with social media in course catalog</label>
                  
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
                  >Allow sharing certificates on LinkedIn</label>
                  
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
                  >Allow course rating</label>
                  
                </div>
                </div>
                </div>
                <div className="card-header">
                  <h4 className="card-title">Single Sign-On (SSO) </h4>
                </div>
                <div className="form-group mb-10 row">
                  <div className="col-lg-12 ms-auto">
                    <br/>
                    <br/>
                  <Button
                    type="submit"
                    className="btn me-2 btn-primary col-xl-2"
                  >
                  Save  
                </Button> or &nbsp;&nbsp;
                <Button type="submit" className="btn btn-light">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
        </div>
    </Fragment>
  );
};

export default UserSettings;
