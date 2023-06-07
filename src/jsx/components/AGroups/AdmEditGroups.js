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

const AdmEditGroups = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, onChange] = useState(new Date());
  return (
    <Fragment>
      <Nav >
	      <Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
          <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/edit-groups">Info</Link>
          <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/groups-users">Users</Link>
          <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/group-courses">Courses</Link>
          <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/group-files">Files</Link>
        </Nav.Item>
      </Nav>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Edit Groups</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form
                  className="form-valide"
                  action="#"
                  method="post"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="row">
                    <div className="col-xl-10">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-12">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            name="val-username"
                            placeholder="E.g Startup Courses"
                          />
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
                            id="val-suggestions"
                            name="val-suggestions"
                            rows="5"
                            placeholder="Short Description about course.."
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-04">

                          
                        </div><br />

                      <div className="form-group mb-3 row">
                    </div>
                    <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          Group Key
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            name="val-username"
                            placeholder="Enter Group Key"
                          />
                        </div>
                      </div>
                  <button
                    type="submit"
                    className="btn me-2 btn-primary"
                  >
                    Add Group
                  </button>
                  <Link to="/groups"><Button className="btn btn-light">
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

export default AdmEditGroups;
