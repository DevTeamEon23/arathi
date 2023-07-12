import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Nav,
  Button,
  FormCheck,
} from "react-bootstrap";

//select dropdown
const categorytype = [
  { value: "superadmin", label: "SuperAdmin" },
  { value: "admin", label: "Admin" },
  { value: "instructor", label: "Instructor" },
  { value: "learner", label: "Learner" },
];

const timezonetype = [
  { value: "ist", label: "India Standard Time (IST)" },
  { value: "nst", label: "New Zealand Standard Time (NST)" },
  { value: "ast", label: "Alaska Standard Time (AST)" },
  { value: "gmt", label: "Greenwich Mean Time (GMT)" },
  { value: "ect", label: "European Central Time (ECT)" },
  { value: "arabic", label: "Egypt Standard Time	(Arabic)" },
];
const langtype = [
  { value: "hindi", label: "Hindi" },
  { value: "english", label: "English" },
  { value: "marathi", label: "Marathi" },
];

const AddUser = () => {
  const [eid, setEid] = useState("");
  const [userName, setUserName] = useState(""); //Full name
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("");
  const [adhr, setAdhr] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();
  const [file, setFile] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [isDeactive, setIsDeactive] = useState(false);
  const [excludeFromEmail, setExcludeFromEmail] = useState(false); //Exclude from Email
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(""); //show wrong email error
  const [nameErrorMsg, setNameErrorMsg] = useState(""); //show error Name
  const [aadharNoErrorMsg, setAadharNoErrorMsg] = useState(""); //show error Aadhar no
  const [selectedOptionRole, setSelectedOptionRole] = useState(null); // role
  const [selectedOptionTimeZone, setSelectedOptionTimeZone] = useState(null); // timezone
  const [selectedOptionLang, setSelectedOptionLang] = useState(null); // Language

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("eid", eid);
    formData.append("sid", eid);
    formData.append("full_name", userName);
    formData.append("email", email);
    formData.append("dept", dept);
    formData.append("adhr", adhr);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("bio", bio);
    formData.append("role", selectedOptionRole);
    formData.append("timezone", selectedOptionTimeZone);
    formData.append("langtype", selectedOptionLang);
    formData.append("active", isActive);
    formData.append("deactive", isDeactive);
    formData.append("exclude_from_email", excludeFromEmail);
    formData.append("generate_token", true);
    formData.append("file", file);

    const url = "http://127.0.0.1:8000/lms-service/addusers";
    const authToken = window.localStorage.getItem("jwt_access_token");

    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Auth-Token": authToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("User added successfully!!!");
        setIsActive(false);
        clearAllState();
      })
      .catch((error) => {
        // Handle error
        console.error(error);
        toast.error("Failed !!! Unable to add user...");
      });
  };

  function handleChange(e) {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  }

  const handleEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validateName = () => {
    if (!/^[a-zA-Z\s]+$/.test(userName)) {
      setNameErrorMsg("Please enter a valid full name");
    } else {
      setNameErrorMsg("");
    }
    if (userName.length < 3) {
      setNameErrorMsg("Must contain at least 3 characters");
    } else {
      setNameErrorMsg("");
    }
  };

  const handleAadhaarNo = () => {
    const regexp = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;
    if (!regexp.test(adhr)) {
      setAadharNoErrorMsg("Please enter Valid Aadhar no.");
    } else {
      setAadharNoErrorMsg("");
    }
  };

  const clearAllState = () => {
    console.log("inside clear function");
    setEid("");
    setUserName("");
    setEmail("");
    setDept("");
    setAdhr("");
    setBio("");
    setUsername("");
    setPassword("");
    setFile(null);
    setIsActive(true);
    setIsDeactive(false);
    setExcludeFromEmail(false);
    setShowPassword(false);
    setEmailError("");
    setNameErrorMsg("");
    setAadharNoErrorMsg("");
    setSelectedOptionRole(null);
    setSelectedOptionTimeZone(null);
    setSelectedOptionLang(null);
  };

  return (
    <Fragment>
      <Nav>
        <Nav.Item as="div" className="nav nav-tabs" id="nav-tab" role="tablist">
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventkey="Follow"
            type="button"
            to="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventkey="Follow"
            type="button"
            to="/users-list"
          >
            Users
          </Link>
        </Nav.Item>
      </Nav>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Users Form </h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-6">
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
                            value={eid}
                            placeholder="e.g. jd001"
                            onChange={(e) => setEid(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          Full Name <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Full name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            onBlur={validateName}
                            required
                          />
                          {nameErrorMsg && (
                            <span className="text-danger fs-14 m-2">
                              {nameErrorMsg}
                            </span>
                          )}{" "}
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
                            id="email"
                            value={email}
                            placeholder="e.g. jdoe@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={handleEmail}
                            required
                          />
                          {emailError && (
                            <span className="text-danger fs-14 m-2">
                              {emailError}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-email"
                        >
                          Department
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="dept"
                            name="dept"
                            value={dept}
                            placeholder="e.g. Information Technology"
                            onChange={(e) => setDept(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-email"
                        >
                          Aadhar Card No.
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="adhr"
                            value={adhr}
                            placeholder="e.g. 0123 3456 6789"
                            onChange={(e) => setAdhr(e.target.value)}
                            onBlur={handleAadhaarNo}
                          />
                          {aadharNoErrorMsg && (
                            <span className="text-danger fs-14 m-2">
                              {aadharNoErrorMsg}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          Username <span className="text-danger">*</span>
                        </label>
                        <div className="input-group col-lg-6">
                          <span className="input-group-text">
                            <i className="fa fa-user" />{" "}
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            placeholder="Enter Username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label className="col-lg-4 col-form-label">
                          Password <span className="text-danger">*</span>
                        </label>
                        <div className="input-group col-lg-6">
                          <span className="input-group-text">
                            {" "}
                            <i className="fa fa-lock" />{" "}
                          </span>

                          <input
                            type={`${showPassword ? "text" : "password"}`}
                            className="form-control"
                            id="password"
                            value={password}
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <div
                            className="input-group-text "
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {" "}
                            {showPassword === false ? (
                              <i className="fa fa-eye-slash" />
                            ) : (
                              <i className="fa fa-eye" />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <div className="form-group mb-3 row">
                          <label
                            className="col-lg-4 col-form-label"
                            htmlFor="val-suggestions"
                          >
                            Bio
                          </label>
                          <div className="col-lg-8">
                            <textarea
                              className="form-control"
                              style={{ marginLeft: "7px" }}
                              id="bio"
                              value={bio}
                              rows="5"
                              maxLength={300}
                              placeholder="Short Description about user..."
                              onChange={(e) => setBio(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                        <br />
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          User Type
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <Select
                            defaultValue={selectedOptionRole}
                            onChange={(selectedValue) =>
                              setSelectedOptionRole(selectedValue.value)
                            }
                            options={categorytype}
                            name="categorytype"
                            required
                          ></Select>
                          <div
                            id="val-username1-error"
                            className="invalid-feedback animated fadeInUp"
                            style={{ display: "block" }}
                          ></div>
                        </div>
                        <div
                          id="val-username1-error"
                          className="invalid-feedback animated fadeInUp"
                          style={{ display: "block" }}
                        />
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-website"
                        >
                          Time Zone
                        </label>
                        <div className="col-lg-6">
                          <Select
                            defaultValue={selectedOptionTimeZone}
                            options={timezonetype}
                            onChange={(timezonetype) =>
                              setSelectedOptionTimeZone(timezonetype.value)
                            }
                            name="timezonetype"
                          ></Select>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-currency"
                        >
                          Language
                        </label>
                        <div className="col-lg-6">
                          <Select
                            defaultValue={selectedOptionLang}
                            onChange={(langtype) =>
                              setSelectedOptionLang(langtype.value)
                            }
                            options={langtype}
                            name="langtype"
                          ></Select>
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
                        <div className="profile-info col-lg-6">
                          <div className="profile-photo">
                            {file ? (
                              <>
                                {" "}
                                <img
                                  src={file && URL.createObjectURL(file)}
                                  width="250"
                                  height="250"
                                  alt="file"
                                />{" "}
                                <br />
                                <br />
                              </>
                            ) : (
                              ""
                            )}

                            <input
                              type="file"
                              name="file"
                              accept=".jpeg, .png, .jpg"
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group mb-3 row ">
                      <div className="col-lg-4 d-flex mt-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="isActive"
                          name="isActive"
                          value={isActive}
                          onChange={(e) => setIsActive(e.target.value)}
                          required
                        />
                        <label
                          className="form-check css-control-primary css-checkbox"
                          htmlFor="val-terms"
                        >
                          Active <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-lg-4 d-flex mt-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="isDeactive"
                          name="isDeactive"
                          onChange={(e) => setIsDeactive(e.target.value)}
                        />
                        <label
                          className="form-check css-control-primary css-checkbox"
                          htmlFor="val-terms"
                        >
                          Deactive
                        </label>
                      </div>
                      <div className="col-lg-4 d-flex mt-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="isExcludefromEmail"
                          name="isExcludefromEmail"
                          onChange={(e) => setExcludeFromEmail(e.target.value)}
                        />
                        <label
                          className="form-check css-control-primary css-checkbox"
                          htmlFor="val-terms"
                        >
                          Exclude from Email
                        </label>
                      </div>
                    </div>
                    <div className="form-group mb-5 row">
                      <div className="col-lg-8 ms-auto">
                        <br />
                        <br />
                        <Button
                          type="submit"
                          value="submit"
                          className="btn me-2 btn-primary"
                        >
                          Add User
                        </Button>{" "}
                        or &nbsp;&nbsp;
                        <Link to="/users-list">
                          <Button className="btn btn-light">Cancel</Button>
                        </Link>
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

export default AddUser;
