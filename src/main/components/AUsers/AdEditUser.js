import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Tab, Tabs } from "react-bootstrap";
import { RotatingLines } from "react-loader-spinner";
import { RxCross2 } from "react-icons/rx";

const timezonetype = [
  { value: "ist", label: "India Standard Time (IST)" },
  { value: "nst", label: "New Zealand Standard Time (NST)" },
  { value: "ast", label: "Alaska Standard Time (AST)" },
  { value: "gmt", label: "Greenwich Mean Time (GMT)" },
  { value: "ect", label: "European Central Time (ECT)" },
  { value: "arabic", label: "Egypt Standard Time	(Arabic)" },
];
const langtype = [
  { value: "Hindi", label: "Hindi" },
  { value: "English", label: "English" },
  { value: "Marathi", label: "Marathi" },
];

const EditUser = (props) => {
  const userId = props.match.params.id;
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
  const [file, setFile] = useState(null); //for change image file
  const [imgCdnUrl, setImgCdnUrl] = useState(null); //image cdn file
  const [isActive, setIsActive] = useState(false);
  const [isDeactive, setIsDeactive] = useState(false);
  const [excludeFromEmail, setExcludeFromEmail] = useState(false); //Exclude from Email
  const [userData, setUserData] = useState(); //user list data
  const [userRole, setUserRole] = useState(); // edit form user role
  const [errorImg, setErrorImg] = useState(null);
  const [token, setToken] = useState(); //auth token
  const [aadharNoErrorMsg, setAadharNoErrorMsg] = useState(""); //show error Aadhar no
  const [selectedOptionTimeZone, setSelectedOptionTimeZone] = useState({}); // timezone
  const [selectedOptionLang, setSelectedOptionLang] = useState({}); // Language
  const [activeTab, setActiveTab] = useState("insedit-user/:id");
  const role = window.localStorage.getItem("role");
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
        setSelectedOptionLang({ value: res.langtype, label: res.langtype });
        setImgCdnUrl(res.cdn_file_link);
        setIsActive(res.active);
        setIsDeactive(res.deactive);
        setExcludeFromEmail(res.exclude_from_email);
        setUserRole(res.role);
        const selectedOption = timezonetype.find(
          (option) =>
            option.value.toLowerCase() === res.timezone.trim().toLowerCase()
        );
        setSelectedOptionTimeZone(selectedOption ? selectedOption : "");
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

  //Update User info API instructor
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file !== null) {
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
      formData.append("role", "Learner");
      formData.append("timezone", selectedOptionTimeZone.value);
      formData.append("langtype", selectedOptionLang.value);
      formData.append("active", isActive);
      formData.append("deactive", isDeactive === false ? 0 : 1);
      formData.append("exclude_from_email", excludeFromEmail === false ? 0 : 1);
      formData.append("file", file);
      formData.append("cdn_file_link", imgCdnUrl);
      console.log(file, "file");
      const url = "https://v1.eonlearning.tech/lms-service/update_users";
      axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Auth-Token": token,
          },
        })
        .then((response) => {
          console.log(response.data);
          toast.success("User updated successfully!!!");
          history.push(`/insusers-list`);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed !!! Unable to update user...");
        });
    } else {
      console.log("inside else");
      const id = userId;
      const newData = {
        eid: eid,
        full_name: userName,
        dept: dept,
        adhr: adhr,
        username: username,
        bio: bio,
        timezone: selectedOptionTimeZone.value,
        langtype: selectedOptionLang.value,
        active: isActive,
        deactive: isDeactive === false ? 0 : 1,
        exclude_from_email: excludeFromEmail === false ? 0 : 1,
      };

      const url = `https://v1.eonlearning.tech/lms-service/update_user/${id}`;
      axios
        .put(url, newData, {
          headers: {
            "Auth-Token": token,
          },
        })
        .then((response) => {
          toast.success("User updated successfully!!!");
          history.push(`/insusers-list`);
        })
        .catch((error) => {
          console.error("Error making PUT request:", error);
          toast.error("Failed !!! Unable to update user...");
        });
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  useEffect(() => {
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1);
    setActiveTab(tab);
  }, [history.location.pathname]);

  const handleImageChange = (e) => {
    // const file = e.target.files[0];
    // setFile(file);

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

  const handleImageDelete = () => {
    setFile(null); // Reset the selected file
    setImgCdnUrl(null);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            {userRole === "Learner" && role === "Instructor" ? (
              <Tabs activeKey={activeTab} onSelect={handleTabChange}>
                <Tab eventKey={`insedit-user/${userId}`} title="Info"></Tab>
                <Tab
                  eventKey={`insuser-course/${userId}`}
                  title="Courses"></Tab>
                <Tab eventKey={`insuser-groups/${userId}`} title="Groups"></Tab>
                <Tab eventKey={`insuser-files/${userId}`} title="Files"></Tab>
              </Tabs>
            ) : (
              <Tabs activeKey={activeTab} onSelect={handleTabChange}>
                <Tab eventKey={`insedit-user/${userId}`} title="Info"></Tab>
              </Tabs>
            )}
            <div className="card-header">
              <h4 className="card-title">Edit User Form (Learner)</h4>
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
                        <div className="col-xl-7">
                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="eid">
                              Employee ID <span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control"
                                id="eid"
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
                              htmlFor="username">
                              Full Name <span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control"
                                id="username"
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
                                disabled
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ cursor: "not-allowed" }}
                              />
                            </div>
                          </div>

                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="dept">
                              Department <span className="text-danger">*</span>
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
                              />
                            </div>
                          </div>

                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="adhr">
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
                                id="val-username"
                                value={username}
                                placeholder="Enter Username"
                                onChange={(e) => setUsername(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="bio">
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

                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="val-time">
                              Time Zone
                            </label>
                            <div className="col-lg-6">
                              <Select
                                id="val-time"
                                value={selectedOptionTimeZone}
                                options={timezonetype}
                                // onChange={(selectedOptionTimeZone) =>
                                //   setSelectedOptionTimeZone(
                                //     selectedOptionTimeZone
                                //   )
                                // }
                                onChange={(selectedOption) =>
                                  setSelectedOptionTimeZone(selectedOption)
                                }
                                name="timezonetype"></Select>
                            </div>
                          </div>
                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="val-lang">
                              Language
                            </label>
                            <div className="col-lg-6">
                              <Select
                                value={selectedOptionLang}
                                onChange={(selectedOptionLang) =>
                                  setSelectedOptionLang(selectedOptionLang)
                                }
                                options={langtype}
                                id="val-lang"></Select>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-5">
                          <div className="form-group mb-3 row">
                            <div>
                              <label className="col-lg-4 col-form-label">
                                Update Photo
                                <span className="text-danger">*</span>
                              </label>
                              <br />
                              <div className="mb-3">
                                {imgCdnUrl && (
                                  <>
                                    <img
                                      src={imgCdnUrl}
                                      alt="Preview"
                                      className="img-thumbnail"
                                      style={{
                                        width: "250px",
                                        height: "200px",
                                        objectFit: "cover",
                                      }}
                                    />
                                    <RxCross2
                                      className="fs-18 fs-bold"
                                      title="Delete"
                                      style={{
                                        marginBottom: "220px",
                                        marginLeft: "18px",
                                        color: "#c91111",
                                      }}
                                      onClick={handleImageDelete}
                                    />
                                  </>
                                )}
                                {file && (
                                  <>
                                    <img
                                      src={URL.createObjectURL(file)}
                                      alt="Preview"
                                      className="img-thumbnail"
                                      style={{
                                        width: "250px",
                                        height: "200px",
                                        objectFit: "cover",
                                      }}
                                    />
                                    <RxCross2
                                      className="fs-18 fs-bold"
                                      title="Delete"
                                      style={{
                                        marginBottom: "220px",
                                        marginLeft: "18px",
                                        color: "#c91111",
                                      }}
                                      onClick={handleImageDelete}
                                    />
                                  </>
                                )}
                              </div>

                              <label>
                                {imgCdnUrl === null && (
                                  <span style={{ fontWeight: "bold" }}>
                                    Choose the another new image
                                  </span>
                                )}
                                <input
                                  type="file"
                                  accept=".jpeg, .png, .jpg"
                                  onChange={handleImageChange}
                                  style={{ display: "none" }}
                                  className="form-control-file"
                                />
                              </label>
                              {errorImg && (
                                <div className="error-message text-danger fs-14">
                                  {errorImg}
                                </div>
                              )}
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
                            <Link to="/insusers-list">
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
