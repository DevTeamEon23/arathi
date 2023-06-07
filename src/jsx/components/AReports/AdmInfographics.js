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

const AdmInfographics = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, onChange] = useState(new Date());
  return (
    <Fragment>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Users Form </h4>
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
                    <div className="col-xl-6">
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
                            id="val-username"
                            name="val-username"
                            placeholder="E.g Start.."
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-email"
                        >
                          Email Address <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="email"
                            className="form-control"
                            id="val-email"
                            name="val-email"
                            placeholder="Enter Email Address..."
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-email"
                        >
                          Employee ID <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-email"
                            name="val-email"
                            placeholder="Your valid email.."
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-email"
                        >
                          Department <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-email"
                            name="val-email"
                            placeholder="Enter Department."
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-email"
                        >
                          Aadhar Card No. <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-email"
                            name="val-email"
                            placeholder="Aadhar Number..."
                          />
                        </div>
                      </div>
                      <label className="text-label">Username</label>
                        <div className="input-group">
                            <span className="input-group-text">
                              <i className="fa fa-user" />{" "}
                            </span>
                          <input
                            type="text"
                            className="form-control"
                            id="val-username1"
                            placeholder="Enter a username.."
                            name="username"
                          />
                          </div>
                          <label className="text-label">Password *</label>
                        <div className="input-group transparent-append mb-2">
                          
                            <span className="input-group-text">
                              {" "}
                              <i className="fa fa-lock" />{" "}
                            </span>
                          
                          <input
                            type={`${showPassword ? "text" : "password"}`}
                            className="form-control"
                            id="val-password1"
                            name="password"
                            placeholder="Choose a safe one.."
                          />

                          </div>
                      <div className="form-group mb-3 row">

                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-suggestions"
                        >
                          Bio <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <textarea
                            className="form-control"
                            id="val-suggestions"
                            name="val-suggestions"
                            rows="5"
                            placeholder="Short Description about you.."
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-04">

                          
                        </div><br />

                      <div className="form-group mb-3 row">
                    </div>
                    </div>


                    </div>


                    <div className="col-xl-6">
                      <div className="form-group mb-3 row">
                      <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-suggestions"
                        >
                          Add Photo<span className="text-danger">*</span>
                        </label>
                        <div className="profile-info">
                          <div className="profile-photo">
                            <img
                              src={profile}
                              className="img-fluid rounded-circle"
                              alt="profile"
                            />
                          </div>
                        </div>
                        </div>
                      <div className="form-group mb-3 row">
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title"></h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <Formik>
                  {({
                  }) => (
                    <form>
                      <div
                      >
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          User Type
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <select
                      defaultValue={"option"}
                      className="form-control"
                      id="sel1"
                    >
                    <option>Select User Type..</option>
                      <option>Administrator</option>
                      <option>Instructor</option>
                      <option>Learner</option>
                    </select>
                          <div
                            id="val-username1-error"
                            className="invalid-feedback animated fadeInUp"
                            style={{ display: "block" }}
                          >
                          </div>
                          </div>

                          <div
                            id="val-username1-error"
                            className="invalid-feedback animated fadeInUp"
                            style={{ display: "block" }}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-website"
                        >
                          Time Zone
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <select
                          defaultValue={"option"}
                          className="form-control"
                          placeholder="Select A Parent Category"
                          id="sel1"
                        >
                        <option>India Standard Time (IST)</option>
                          <option>New Zealand Standard Time (NST)</option>
                          <option>Alaska Standard Time (AST)</option>
                          <option>Greenwich Mean Time (GMT)</option>
                          <option>European Central Time (ECT)</option>
                          <option>Egypt Standard Time	(Arabic) </option>
                        </select>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-currency"
                        >
                          Language
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <select
                          defaultValue={"option"}
                          className="form-control"
                          placeholder="Select A Parent Category"
                          id="sel1"
                        >
                        <option>Hindi</option>
                        <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                        </select>
                        </div>
                      </div>
                      <div className="me-2">
                      <label
                            className="form-check css-control-primary css-checkbox"
                            htmlFor="val-terms"
                          >
                            <input
                              type="checkbox"
                              className="form-check-input me-2"
                              id="val-terms"
                              name="val-terms"
                              value="1"
                            />
                            <span className="css-control-indicator">Active</span>
                            

                            <div className="me-2">
                            <label
                            className="form-check css-control-primary css-checkbox"
                            htmlFor="val-terms"
                          >
                            <input
                              type="checkbox"
                              className="form-check-input me-2"
                              id="val-terms"
                              name="val-terms"
                              value="1"
                            />
                            <span className="css-control-indicator">Exclude from Email</span>
                            
                          </label>
                          </div>
                          </label>
                          </div>

                      <button
                        type="submit"
                        className="btn me-2 btn-primary"
                      >
                        Add User
                      </button>
                      <button type="submit" className="btn btn-light">
                        Cancel
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdmInfographics;
