import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { Nav, Button, Tab, Tabs } from "react-bootstrap";
import { RotatingLines } from "react-loader-spinner";

// const categorytype = [
//   { value: "Superadmin", label: "SuperAdmin" },
//   { value: "Admin", label: "Admin" },
//   { value: "Instructor", label: "Instructor" },
//   { value: "Learner", label: "Learner" },
// ];

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

const EditUser = (props) => {
  const userId = props.match.params.id;
  console.log({ userId });
  const [id, setId] = useState();
  const [userName, setUserName] = useState(""); //Full name
  const [eid, setEid] = useState("");
  const [sid, setSid] = useState("");
  const [nameErrorMsg, setNameErrorMsg] = useState(""); //show error Name
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("");
  const [adhr, setAdhr] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  // const [selectedOption, setSelectedOption] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isDeactive, setIsDeactive] = useState(false);
  const [excludeFromEmail, setExcludeFromEmail] = useState(false); //Exclude from Email
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState(); //user list data
  const [token, setToken] = useState(); //auth token
  const [aadharNoErrorMsg, setAadharNoErrorMsg] = useState(""); //show error Aadhar no
  // const [selectedOptionRole, setSelectedOptionRole] = useState({}); // role
  const [selectedOptionTimeZone, setSelectedOptionTimeZone] = useState({}); // timezone
  const [selectedOptionLang, setSelectedOptionLang] = useState({}); // Language
  const [activeTab, setActiveTab] = useState("edit-user/:id");
  const backendBaseUrl = "https://v1.eonlearning.tech";
  const history = useHistory();

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    if (userId !== undefined) {
      setId(userId);
      getUsersById(userId, token);
    }
  }, []);

  // User details by ID
  const getUsersById = async (id, authToken) => {
    console.log("inside get user by id", id, authToken);
    try {
      const response = await axios.get(
        "https://v1.eonlearning.tech/lms-service/users_by_onlyid",
        {
          headers: {
            "Auth-Token": authToken,
          },
          params: {
            id: userId,
          },
        }
      );
      setUserData(response.data.data);
      if (response.data.status === "success") {
        console.log(response.data.data);
        const res = response.data.data;
        setEid(res.eid);
        setSid(res.sid);
        setUserName(res.full_name);
        setPassword(res.password);
        setEmail(res.email);
        setDept(res.dept);
        setAdhr(res.adhr);
        setBio(res.bio);
        setUsername(res.username);
        // setSelectedOptionRole({ value: res.role, label: res.role });
        setSelectedOptionTimeZone({ value: res.timezone, label: res.timezone });
        setSelectedOptionLang({ value: res.langtype, label: res.langtype });
        // setFile(res.file);
        setFile(`${backendBaseUrl}/${res.file}`);
        setIsActive(res.active);
        setIsDeactive(res.deactive);
        setExcludeFromEmail(res.exclude_from_email);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users!"); // Handle the error
    }
  };

  const handleActiveChange = (e) => {
    setIsActive(e.target.checked);
    setIsDeactive(false); // Uncheck "Deactive" when "Active" is checked
  };

  const handleDeactiveChange = (e) => {
    setIsDeactive(e.target.checked);
    setIsActive(false); // Uncheck "Active" when "Deactive" is checked
  };

  //Update User info API
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("eid", eid);
    formData.append("sid", sid);
    formData.append("full_name", userName);
    formData.append("email", email);
    formData.append("dept", dept);
    formData.append("adhr", adhr);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("bio", bio);
    formData.append("role", "admin");
    formData.append("timezone", selectedOptionTimeZone.value);
    formData.append("langtype", selectedOptionLang.value);
    formData.append("active", isActive);
    formData.append("deactive", isDeactive === false ? 0 : 1);
    formData.append("exclude_from_email", excludeFromEmail === false ? 0 : 1);
    formData.append("file", file);

    const url = "https://v1.eonlearning.tech/lms-service/update_users";
    const authToken = token;
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Auth-Token": authToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("User updated successfully!!!");
        clearAllState();
        history.push(`/users-list`);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to update user...");
      });
  };

  function handleChange(e) {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  }

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
    setIsActive(false);
    setIsDeactive(false);
    setExcludeFromEmail(false);
    setShowPassword(false);
    setNameErrorMsg("");
    setAadharNoErrorMsg("");
    // setSelectedOptionRole(null);
    setSelectedOptionTimeZone(null);
    setSelectedOptionLang(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  useEffect(() => {
    // When the component mounts, set the active tab based on the current route
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1); // Remove the leading slash
    setActiveTab(tab);
  }, [history.location.pathname]);

  return (
    <Fragment>
      {/* <Nav>
        <Nav.Item as="div" className="nav nav-tabs" id="nav-tab" role="tablist">
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventKey="Follow"
            type="button"
            to="/edit-user/:id">
            Info
          </Link>
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventkey="Follow"
            type="button"
            to="/user-courses-info">
            Courses
          </Link>
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventkey="Follow"
            type="button"
            to="/user-groups">
            Groups
          </Link>
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventkey="Follow"
            type="button"
            to="/user-files">
            Files
          </Link>
        </Nav.Item>
      </Nav> */}

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey={`edit-user/${userId}`} title="Info"></Tab>
              <Tab
                eventKey={`user-courses-info/${userId}`}
                title="Courses"></Tab>
              <Tab eventKey={`user-groups/${userId}`} title="Groups"></Tab>
              <Tab eventKey={`user-files/${userId}`} title="Files"></Tab>
            </Tabs>
            <div className="card-header">
              <h4 className="card-title">Edit User Form (Admin)</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                {userData === undefined ? (
                  <div className="loader-container">
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="100"
                      visible={true}
                    />
                  </div>
                ) : (
                  <>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-xl-6">
                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="val-email">
                              Employee ID <span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control"
                                id="eid"
                                value={eid}
                                placeholder="e.g. jd001"
                                onChange={(e) => setEid(e.target.value)}
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
                              htmlFor="val-email">
                              Email Address{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-6">
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                disabled // Add the disabled attribute here
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ cursor: "not-allowed" }}
                              />
                            </div>
                          </div>

                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="val-email">
                              Department <span className="text-danger">*</span>
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
                              htmlFor="val-email">
                              Aadhar Card No.{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control"
                                id="adhr"
                                value={adhr}
                                placeholder="e.g. 012334566789"
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
                              htmlFor="val-username">
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
                              />
                            </div>
                          </div>
                          <div className="form-group mb-3 row">
                            <label className="col-lg-4 col-form-label">
                              Password <span className="text-danger">*</span>
                            </label>
                            <div className="input-group col-lg-6">
                              {/* <span className='input-group-text'>
                            {' '}
                            <i className='fa fa-lock' />{' '}
                          </span> */}

                              <input
                                // type={`${showPassword ? 'text' : 'password'}`}
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                disabled // Add the disabled attribute here
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ cursor: "not-allowed" }}
                              />
                              {/* <div
                            className='input-group-text '
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {' '}
                            {showPassword === false ? (
                              <i className='fa fa-eye-slash' />
                            ) : (
                              <i className='fa fa-eye' />
                            )}
                          </div> */}
                            </div>
                          </div>

                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="val-suggestions">
                              Bio <span className="text-danger">*</span>
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
                            </div>
                          </div>
                          <br />

                          <div className="form-group mb-3 row"></div>
                          {/* <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="val-username">
                              User Type
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-6">
                              <Select
                                value={selectedOptionRole}
                                options={categorytype}
                                onChange={setSelectedOptionRole}
                                name="categorytype"></Select>
                              <div
                                id="val-username1-error"
                                className="invalid-feedback animated fadeInUp"
                                style={{ display: "block" }}></div>
                            </div>
                          </div> */}

                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="val-website">
                              Time Zone
                            </label>
                            <div className="col-lg-6">
                              <Select
                                value={selectedOptionTimeZone}
                                options={timezonetype}
                                onChange={(selectedOptionTimeZone) =>
                                  setSelectedOptionTimeZone(
                                    selectedOptionTimeZone
                                  )
                                }
                                name="timezonetype"></Select>
                            </div>
                          </div>
                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="val-currency">
                              Language
                            </label>
                            <div className="col-lg-6">
                              <Select
                                value={selectedOptionLang}
                                onChange={(selectedOptionLang) =>
                                  setSelectedOptionLang(selectedOptionLang)
                                }
                                options={langtype}
                                name="langtype"></Select>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="val-suggestions">
                              Add Photo<span className="text-danger">*</span>
                            </label>
                            <div className="profile-info col-lg-6">
                              <div className="profile-photo">
                                {file ? (
                                  <>
                                    {" "}
                                    <img
                                      // src={file && URL.createObjectURL(file)}
                                      src={file}
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

                        <div className="form-group mb-3 row">
                          <div className="col-lg-8 ms-auto">
                            <br />
                            <br />
                            <Button
                              type="submit"
                              value="submit"
                              className="btn me-2 btn-primary">
                              Update User
                            </Button>{" "}
                            or &nbsp;&nbsp;
                            <Link to="/users-list">
                              <Button className="btn btn-light">Cancel</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditUser;
