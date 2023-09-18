import React, { Fragment, useState, useEffect } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { SRLWrapper } from "simple-react-lightbox";
//** Import Image */
import profile01 from "@images/profile/1.jpg";
// import profile02 from "../../../assets/profile/2.jpg";
// import profile03 from "../../../assets/profile/3.jpg";
// import profile04 from "../../../assets/profile/4.jpg";
import profile05 from "@images/profile/5.jpg";
import profile06 from "@images/profile/6.jpg";
import profile07 from "@images/profile/7.jpg";
import profile08 from "@images/profile/8.jpg";
import profile09 from "@images/profile/9.jpg";
import axios from "axios";

const AppProfile = () => {
  const [activeToggle, setActiveToggle] = useState("posts");
  const [sendMessage, setSendMessage] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [cameraModal, setCameraModal] = useState(false);
  const [linkModal, setLinkModal] = useState(false);
  const [replayModal, setReplayModal] = useState(false);
  const [token, setToken] = useState(); //auth token
  const [userEmail, setUserEmail] = useState(""); //email
  const [userName, setUserName] = useState(""); //name
  const [profileImg, setProfileImg] = useState(""); //img file
  const [userRole, setUserRole] = useState("");
  const [userLanguages, setUserLanguages] = useState("");
  const [apiRes, setApiRes] = useState("");
  const user_id = localStorage.getItem("id");

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    getUsersById(token);
  }, []);

  // User details by ID
  const getUsersById = async (authToken) => {
    try {
      const response = await axios.get(
        "https://v1.eonlearning.tech/lms-service/users_by_onlyid",
        {
          headers: {
            "Auth-Token": authToken,
          },
          params: {
            id: user_id,
          },
        }
      );
      if (response.data.status === "success") {
        const res = response.data.data;
        setApiRes(res);
        setUserName(res.full_name);
        setUserEmail(res.email);
        setUserRole(res.role);
        setProfileImg(res.cdn_file_link);
        setUserLanguages();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              {/* <div className="photo-content ">
                <div className="cover-photo rounded"></div>
              </div> */}
              <div className="profile-info">
                <div className="cover-photo rounded">
                  <img
                    src={profileImg}
                    className="img-fluid rounded-circle"
                    style={{
                      width: "180px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    alt="profile"
                  />
                </div>
                <div className="profile-details">
                  <div className="profile-name px-5 pt-2">
                    <h4 className="text-primary mb-0">{userName}</h4>
                    <p>{userRole}</p>
                  </div>
                  <div className="profile-email px-2 pt-2">
                    <h4 className="text-muted mb-0">{userEmail}</h4>
                    <p>Email</p>
                  </div>
                  <div className="profile-email px-5 pt-2">
                    <h4 className="text-muted mb-0">{apiRes.dept}</h4>
                    <p>Department</p>
                  </div>
                  <Dropdown className="dropdown ms-auto">
                    <Dropdown.Toggle
                      variant="primary"
                      className="btn btn-primary light sharp i-false"
                      data-toggle="dropdown"
                      aria-expanded="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        //    xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        version="1.1">
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd">
                          <rect x="0" y="0" width="24" height="24"></rect>
                          <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="19" cy="12" r="2"></circle>
                        </g>
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-user-circle text-primary me-2" />
                        Edit Profile
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="profile-tab">
                <div className="custom-tab-1">
                  {/* <ul className='nav nav-tabs'>
                    <li
                      className='nav-item'
                      onClick={() => setActiveToggle('posts')}
                    ></li>
                    <li
                      className='nav-item'
                      onClick={() => setActiveToggle('aboutMe')}
                    >
                      <Link
                        to='#about-me'
                        data-toggle='tab'
                        className={`nav-link ${
                          activeToggle === 'aboutMe' ? 'active show' : ''
                        }`}
                      >
                        About Me
                      </Link>
                    </li>
                  </ul> */}
                  <div className="tab-content">
                    {/* <div
                      id='my-posts'
                      className={`tab-pane fade ${
                        activeToggle === 'posts' ? 'active show' : ''
                      }`}
                    ></div> */}
                    <div id="about-me">
                      <div className="profile-about-me">
                        <div className="pt-4 border-bottom-1 pb-3">
                          <h4 className="text-primary">About Me</h4>
                          <p className="mb-2">{apiRes.bio}</p>
                        </div>
                      </div>

                      <div className="profile-lang  mb-5">
                        <h4 className="text-primary mb-2">Language</h4>

                        {apiRes.langtype}
                      </div>
                      <div className="profile-personal-info">
                        <h4 className="text-primary mb-4">
                          Personal Information
                        </h4>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h5 className="f-w-500">
                              Name<span className="pull-right">:</span>
                            </h5>
                          </div>
                          <div className="col-9">
                            <span>{userName}</span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h5 className="f-w-500">
                              Username<span className="pull-right">:</span>
                            </h5>
                          </div>
                          <div className="col-9">
                            <span>{apiRes.username}</span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h5 className="f-w-500">
                              {" "}
                              Aadhar Card No.
                              <span className="pull-right">:</span>
                            </h5>
                          </div>
                          <div className="col-9">
                            <span>{apiRes.adhr}</span>
                          </div>
                        </div>
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

export default AppProfile;
