import React, { Fragment, useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "src/store/user/userSlice";

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
  const [deptError, setDeptError] = useState(""); //dept error
  const [adhr, setAdhr] = useState("");
  const [bio, setBio] = useState("");
  const [bioError, setBioError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [isDeactive, setIsDeactive] = useState(false);
  const [excludeFromEmail, setExcludeFromEmail] = useState(false); //Exclude from Email
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(""); //show wrong email error
  const [nameErrorMsg, setNameErrorMsg] = useState(""); //show error Name
  const [aadharNoErrorMsg, setAadharNoErrorMsg] = useState(""); //show error Aadhar no
  const [selectedOptionRole, setSelectedOptionRole] = useState(null); // role
  const [selectedOptionTimeZone, setSelectedOptionTimeZone] = useState(""); // timezone
  const [selectedOptionTimeZoneError, setSelectedOptionTimeZoneError] =
    useState(""); // timezone error
  const [selectedOptionLang, setSelectedOptionLang] = useState(""); // Language
  const [selectedOptionLangError, setSelectedOptionLangError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [errorImg, setErrorImg] = useState(null);
  const roleType = useSelector(selectUser).role[0];
  const history = useHistory();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  useEffect(() => {
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1);
    setActiveTab(tab);
    handleEID();
    const dept = window.localStorage.getItem("dept");
    console.log(roleType, dept);
    if (roleType !== "Superadmin") {
      setDept(dept);
    }
  }, [history.location.pathname]);

  const handleEID = () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const config = {
      headers: {
        "Auth-Token": jwtToken,
      },
    };
    axios
      .get("lms-service/eids", config)
      .then((response) => {
        setEid(response.data.data.eid_data[0].next_eid);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleActiveChange = (e) => {
    setIsActive(e.target.checked);
    setIsDeactive(false); // Uncheck "Deactive" when "Active" is checked
  };

  const handleDeactiveChange = (e) => {
    setIsDeactive(e.target.checked);
    setIsActive(false); // Uncheck "Active" when "Deactive" is checked
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName) {
      setNameErrorMsg("Full Name is required.");
    } else {
      setNameErrorMsg("");
    }
    if (file === null) {
      setErrorImg("Please select a Image File.");
    } else {
      setErrorImg("");
    }
    if (!email) {
      setEmailError("Email ID is required.");
    } else {
      setEmailError("");
    }
    if (!adhr) {
      setAadharNoErrorMsg("Aadhar Card number is required.");
    } else {
      setAadharNoErrorMsg("");
    }
    if (!username) {
      setUsernameError("Username is required.");
    } else {
      setUsernameError("");
    }
    if (!password) {
      setPasswordError("Password is required.");
    } else {
      setPasswordError("");
    }
    if (!bio) {
      setBioError("Bio is required.");
    } else {
      setBioError("");
    }
    if (!dept) {
      setDeptError("Department is required.");
    } else {
      setDeptError("");
    }
    if (!selectedOptionTimeZone) {
      setSelectedOptionTimeZoneError("Please select a Timezone.");
    } else {
      setSelectedOptionTimeZoneError("");
    }
    if (!selectedOptionLang) {
      setSelectedOptionLangError("Please select a Language.");
    } else {
      setSelectedOptionLangError("");
    }
    if (
      !userName ||
      file === null ||
      !email ||
      !adhr ||
      !username ||
      !password ||
      !bio ||
      !dept ||
      !selectedOptionTimeZone ||
      !selectedOptionLang
    ) {
      console.log("Validation failed. Please check all fields.");
    } else {
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
      formData.append("role", "Learner");
      formData.append("timezone", selectedOptionTimeZone.value);
      formData.append("langtype", selectedOptionLang.value);
      formData.append("active", isActive);
      formData.append("deactive", isDeactive);
      formData.append("exclude_from_email", excludeFromEmail);
      formData.append("generate_token", true);
      formData.append("file", file);

      const url = "lms-service/addusers";
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
          if (response.data === null) {
            toast.error("User Already Exists!!!");
          } else {
            toast.success("User Added Successfully!!!");
            history.push(`/insusers-list`);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed !!! Unable to add user...");
        });
    }
  };

  // To set img file
  // function handleChange(e) {
  //   console.log(e.target.files);
  //   setFile(e.target.files[0]);
  // }

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && isValidFileType(selectedFile)) {
      setFile(selectedFile);
      setErrorImg("");
    } else {
      setFile(null);
      setErrorImg(
        "Please select a valid image file (jpeg, jpg, png) that is no larger than 3 MB."
      );
    }
  };

  const isValidFileType = (file) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 3 * 1024 * 1024; // 3MB in bytes
    return allowedTypes.includes(file.type) && file.size <= maxSize;
  };

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
    const regexp = /^\d{12}$/;
    if (!regexp.test(adhr)) {
      setAadharNoErrorMsg("Please enter Valid Aadhar no.");
    } else {
      setAadharNoErrorMsg("");
    }
  };

  const clearAllState = () => {
    setEid("");
    setUserName("");
    setEmail("");
    setDept("");
    setAdhr("");
    setBio("");
    setUsername("");
    setPassword("");
    setFile(null);
    fileRef.current.value = "";
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
      <Tabs activeKey={activeTab} onSelect={handleTabChange}>
        <Tab eventKey="dashboard" title="Dashboard"></Tab>
        <Tab eventKey="insusers-list" title="Users"></Tab>
      </Tabs>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Users Form (Learner)</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="form-group mb-3 row">
                        <label className="col-lg-4 col-form-label">
                          Employee ID <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            value={eid}
                            onChange={(e) => setEid(e.target.value)}
                            style={{ cursor: "not-allowed" }}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username">
                          Full Name <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            placeholder="Enter Full name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            onBlur={validateName}
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
                          htmlFor="email">
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
                          htmlFor="dept">
                          Department<span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="dept"
                            value={dept}
                            onChange={(e) => setDept(e.target.value)}
                            style={{ cursor: "not-allowed" }}
                            disabled
                            onBlur={() => setDeptError()}
                          />
                          {deptError && (
                            <div className="error-message">{deptError}</div>
                          )}
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="adhr">
                          Aadhar Card No.<span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="adhr"
                            value={adhr}
                            placeholder="e.g. 369934566789"
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
                          htmlFor="username">
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
                            onBlur={() => setUsernameError()}
                          />
                        </div>
                        <label className="col-lg-4 col-form-label"></label>
                        <div className="col-lg-6">
                          {usernameError && (
                            <div className="error-message">{usernameError}</div>
                          )}{" "}
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="password">
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
                            onBlur={() => setPasswordError("")}
                          />
                          <div
                            className="input-group-text "
                            onClick={() => setShowPassword(!showPassword)}>
                            {" "}
                            {showPassword === false ? (
                              <i className="fa fa-eye-slash" />
                            ) : (
                              <i className="fa fa-eye" />
                            )}
                          </div>
                          <label className="col-lg-4 col-form-label"></label>
                          <div className="col-lg-6">
                            {passwordError && (
                              <div className="error-message">
                                {passwordError}
                              </div>
                            )}{" "}
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-website">
                          User Role
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            value={roleType === "Instructor" ? "Learner" : ""}
                            style={{ cursor: "not-allowed" }}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="bio">
                          Bio
                        </label>
                        <div className="col-lg-8">
                          <textarea
                            className="form-control"
                            id="bio"
                            value={bio}
                            rows="5"
                            maxLength={300}
                            placeholder="Short Description about user..."
                            onChange={(e) => setBio(e.target.value)}
                            style={{ resize: "none" }}></textarea>
                          {bioError && (
                            <div className="error-message">{bioError}</div>
                          )}
                        </div>
                      </div>
                      <br />

                      <div className="form-group mb-3 row">
                        <label className="col-lg-4 col-form-label">
                          Time Zone
                        </label>
                        <div className="col-lg-6">
                          <Select
                            value={selectedOptionTimeZone}
                            options={timezonetype}
                            onChange={(selectedOptionTimeZone) =>
                              setSelectedOptionTimeZone(selectedOptionTimeZone)
                            }
                            onBlur={() =>
                              setSelectedOptionTimeZoneError()
                            }></Select>
                          {selectedOptionTimeZoneError && (
                            <div className="error-message">
                              {selectedOptionTimeZoneError}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label className="col-lg-4 col-form-label">
                          Language
                        </label>
                        <div className="col-lg-6">
                          <Select
                            value={selectedOptionLang}
                            onChange={(selectedOptionLang) =>
                              setSelectedOptionLang(selectedOptionLang)
                            }
                            options={langtype}
                            name="langtype"
                            onBlur={() =>
                              setSelectedOptionLangError()
                            }></Select>
                          {selectedOptionLangError && (
                            <div className="error-message">
                              {selectedOptionLangError}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="img">
                          Add Photo<span className="text-danger">*</span>
                        </label>
                        <div className="profile-info col-lg-6">
                          <div className="profile-photo">
                            {file ? (
                              <>
                                {" "}
                                <img
                                  src={file && URL.createObjectURL(file)}
                                  id="img"
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
                              ref={fileRef}
                              accept=".jpeg, .png, .jpg"
                              onChange={handleChange}
                            />
                            <br />
                            {errorImg && (
                              <div className="error-message text-danger fs-14">
                                {errorImg}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group mb-3 row ">
                      <div className="col-lg-2 d-flex mt-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="isActive"
                          name="isActive"
                          checked={isActive}
                          onChange={handleActiveChange}
                        />
                        <label
                          className="form-check css-control-primary css-checkbox mt-1"
                          htmlFor="isActive">
                          Active
                        </label>
                      </div>
                      <div className="col-lg-2 d-flex mt-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="isDeactive"
                          name="isDeactive"
                          checked={isDeactive}
                          onChange={handleDeactiveChange}
                        />
                        <label
                          className="form-check css-control-primary css-checkbox mt-1"
                          htmlFor="isDeactive">
                          Deactive
                        </label>
                      </div>
                      <div className="col-lg-3 d-flex mt-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exclude"
                          name="excludeFromEmail"
                          checked={excludeFromEmail}
                          onChange={(e) =>
                            setExcludeFromEmail(e.target.checked)
                          }
                        />
                        <label
                          className="form-check css-control-primary css-checkbox mt-1"
                          htmlFor="exclude">
                          Exclude from Email&nbsp;&nbsp;
                        </label>

                        <i
                          className="fa-regular fa-circle-question fa-xl mt-3 "
                          style={{ color: "#3065d0" }}
                          title="check if you'd like to exclude the user from all automated notification,except for essential system emails.(i.e- password and username reset)"></i>
                      </div>
                    </div>

                    <div className="form-group mb-5 row">
                      <div className="col-lg-8 ms-auto">
                        <br />
                        <Button
                          type="submit"
                          value="submit"
                          className="btn me-2 btn-primary">
                          Add User
                        </Button>{" "}
                        or &nbsp;&nbsp;
                        <Link to="/insusers-list">
                          <Button className="btn me-2 btn-light">Cancel</Button>
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
