import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import * as Yup from "yup";
import TimePickerPicker from 'react-time-picker';

import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Nav,
  Button,
  FormCheck,
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
const options = [
  { value: "superadmin", label: "SuperAdmin" },
  { value: "admin", label: "Admin - Type" },
  { value: "instructor", label: "Instructor - Type" },
  { value: "learner", label: "Learner - Type" },
];
const options_2 = [
  { value: "hindi", label: "Hindi" },
  { value: "english", label: "English" },
  { value: "marathi", label: "Marathi" },
];
const options_1 = [
  { value: "ist", label: "India Standard Time (IST)" },
  { value: "nst", label: "New Zealand Standard Time (NST)" },
  { value: "ast", label: "Alaska Standard Time (AST)" },
  { value: "gmt", label: "Greenwich Mean Time (GMT)" },
  { value: "ect", label: "European Central Time (ECT)" },
  { value: "arabic", label: "Egypt Standard Time	(Arabic)" },
];


const AdEditUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
}

  return (
    <Fragment>
      <Nav >
	    <Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/ad-edit-user">Info</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/ad-user-groups">Groups</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/ad-user-files">Files</Link>
        </Nav.Item>
      </Nav>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Edit User Form </h4>
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
                          First Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            name="val-username"
                            placeholder="e.g. John Doe"
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          Last Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            name="val-username"
                            placeholder="e.g. John Doe"
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
                            placeholder="e.g. jdoe@example.com"
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
                            placeholder="e.g. jd001"
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
                            placeholder="e.g. Information Technology"
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
                            placeholder="e.g. 0123 3456 6789"
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
                            placeholder="Enter Username"
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
                            placeholder="Enter Password"
                          />
                          <div
                            className="input-group-text "
                            onClick={() => setShowPassword(!showPassword)}
                          >

                              {" "}
								  {showPassword === false ? (<i className="fa fa-eye-slash" />) : (<i className="fa fa-eye" />)}
                            
                          </div>
                          </div>
                      <div className="form-group mb-3 row">

                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-suggestions"
                        >
                          Bio <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-10">
                          <textarea
                            className="form-control"
                            id="val-suggestions"
                            name="val-suggestions"
                            rows="5"
                            placeholder="Short Description about user.."
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
                          <input type="file" onChange={handleChange} />
                          <br/><br/>
                          <img src={file} width="250" height="250"/>
                        </div>
                        </div>
                        </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          User Type
                          <span className="text-danger">*</span>
                        </label>
                      <div className="col-lg-12">
                      <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            >
            </Select>
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
                          htmlFor="val-currency"
                        >
                          Language
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
                            
                        <div className="col-lg-1"></div>
                          <div className="col-lg-2">
                      <br/>
                      <br/>
                        <label
                          className="form-check css-control-primary css-checkbox"
                          htmlFor="val-terms"
                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                          />Active
                          </label>
                        </div>
                          <div className="col-lg-2">
                      <br/>
                      <br/>
                        <label
                          className="form-check css-control-primary css-checkbox"
                          htmlFor="val-terms"
                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                          />Deactive
                          </label>
                        </div>
                          <div className="col-lg-4">
                      <br/>
                      <br/>
                            <label
                            className="form-check css-control-primary css-checkbox"
                            htmlFor="val-terms"
                          >
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="val-terms"
                              name="val-terms"
                              value="1"
                            />Exclude from Email
                        </label>
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
                          Update User
                        </Button> or &nbsp;&nbsp;
                        <Link to="/users-list"><Button className="btn btn-light">
                          Cancel
                        </Button></Link>
                      </div>
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

export default AdEditUser;
