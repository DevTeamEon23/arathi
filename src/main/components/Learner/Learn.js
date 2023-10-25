import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { read, utils, writeFile } from "xlsx";
import {
  Dropdown,
  Button,
  Tab,
  Modal,
  Nav,
  Table,
  Container,
} from "react-bootstrap";
import DropDownBlog from "../Dashboard/DropDownBlog";
import { SlBadge } from "react-icons/sl";
import { FiPlay } from "react-icons/fi";
import { FaMedal } from "react-icons/fa";
import { BiSolidBadgeCheck } from "react-icons/bi";
import DonutChart from "../Dashboard/Dashboard/DonutChart";
import dummy from "@images/profile/dummy.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

//images
import pic2 from "@images/courses/pic2.jpg";
import cup from "@images/svg/cup.svg";
import puzzle from "@images/svg/puzzle.svg";
import planet from "@images/svg/planet.svg";
import skill from "@images/svg/skill.svg";
import readingtime from "@images/svg/readingtime.svg";
import certificate from "@images/svg/degree-certificate.svg";
import clock from "@images/svg/clock-1.svg";
import pic3 from "@images/courses/pic3.jpg";
import pic4 from "@images/courses/pic4.jpg";
import badge1 from "@images/svg/LearningNewbie.svg";
import badge2 from "@images/svg/LearningGrower.svg";
import badge3 from "@images/svg/LearningAdventurer.svg";

const backendBaseUrl = "https://v1.eonlearning.tech";

const reviewsData = [
  { image: pic3, title: "Jordan Nico ", commentTime: "2 Month Ago" },
  { image: pic4, title: "Cahaya Hikari ", commentTime: "3 Month Ago" },
];

const ProfileActivityChart = loadable(() =>
  pMinDelay(import("../Dashboard/Dashboard/ProfileActivityChart"), 1000)
);

const Learn = () => {
  const [movies, setMovies] = useState([]);
  const [largeModal, setLargeModal] = useState(false);
  const [dropSelect, setDropSelect] = useState("This Month");
  const [showAboutPane, setShowAboutPane] = useState(false); // About(Points)
  const [showReviewPane, setShowReviewPane] = useState(false); // Review(Levels)
  const [userData, setUserData] = useState([]); //user list data
  const [token, setToken] = useState(); //auth token
  const [selectedItem, setSelectedItem] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [userName, setUserName] = useState(""); //Full name
  const [registerDate, setRegisterDate] = useState("");
  const [profileImg, setProfileImg] = useState(""); //img file
  const [bio, setBio] = useState("");
  const [userPoints, setUserPoints] = useState(0);
  const [userLevels, setUserLevels] = useState(0);
  const [courseCount, setcourseCount] = useState();
  const [courseData, setcourseData] = useState([]);
  const user_id = localStorage.getItem("id");
  const history = useHistory();

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    getUsers();
    fetchLearnerData(token);
  }, []);

  const fetchLearnerData = async (accessToken) => {
    try {
      const queryParams = {
        user_id: user_id,
      };
      const url = new URL(
        "https://v1.eonlearning.tech/lms-service/learner_overview"
      );
      url.search = new URLSearchParams(queryParams).toString();
      const response = await axios.get(url.toString(), {
        headers: {
          "Auth-Token": accessToken,
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data.data;
      const dateTimeString = data.user_infographics.created_at;
      const date = new Date(dateTimeString);
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are zero-based, so add 1
      const year = date.getFullYear();
      const formattedDate = `${day < 10 ? "0" + day : day}-${
        month < 10 ? "0" + month : month
      }-${year}`;

      console.log(data.course_names);
      setUserName(data.user_infographics.full_name);
      setRegisterDate(formattedDate);
      setProfileImg(data.user_infographics.file);
      setBio(data.user_infographics.bio);
      setUserPoints(data.user_infographics.points);
      setUserLevels(data.user_infographics.user_level);
      setcourseCount(data.user_infographics.total_course_count);
      setcourseData(data.course_names);
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to fetch data !");
    }
  };

  const handleExport = () => {
    const headings = [
      [
        "id",
        "FullName",
        "Email_Address",
        "Employee_id",
        "Department",
        "Aadhar_Card_No",
        "Username",
        "Password",
        "Bio",
        "Photo",
        "User_Type",
        "TimeZone",
        "Language",
      ],
    ];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, movies, { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "Export Report.xlsx");
  };

  //User List Api
  const getUsers = () => {
    axios
      .get("https://v1.eonlearning.tech/auth/fetch_userpoints_by_userid")
      .then((response) => {
        console.log(response.data.data);
        let allUsers = response.data.data.user_ids;
        const learnerUsers = allUsers.filter((user) => user.role === "Learner");
        setUserData(learnerUsers);
      })
      .catch((error) => {
        toast.error("Failed to fetch users!"); // Handle the error
      });
  };

  const WidgetBlog = ({ changeImage, title }) => {
    return (
      <>
        <div className="col-xl-6 col-lg-6 col-sm-6">
          <div className="card profile-widget">
            <div className="card-body">
              <div className="widget-courses align-items-center d-flex justify-content-between style-1 flex-wrap">
                <div className="d-flex">
                  <img src={changeImage} alt="" />
                  <div className="ms-4">
                    <h4>{title === "Course Completed" ? 0 : courseCount}</h4>
                    <span>{title}</span>
                  </div>
                </div>
                {/* <Link to={"./courses"}>
                  <i className="las la-angle-right text-primary"></i>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const handlePointsRule = () => {
    setShowAboutPane(true);
  };
  const handlePointsBackBtn = () => {
    setShowAboutPane(false);
  };
  const handleLevelsRule = () => {
    setShowReviewPane(true);
  };
  const handleLevelsBackBtn = () => {
    setShowReviewPane(false);
  };

  const handleBadgesBackBtn = () => {
    setSelectedItem(null);
  };

  const handleBadges = (name, img) => {
    console.log(name, img);
    setSelectedItem(name);
    setUserImg(img);
  };

  const CurrentCourse = ({
    bg1,
    changeClass,
    title,
    percent,
    numb1,
    numb2,
  }) => {
    return (
      <>
        <div className="col-xl-6 col-sm-5">
          <div className="card">
            <div className="card-body">
              <div className="students1">
                <div className="d-inline-block position-relative donut-chart-sale me-4">
                  <DonutChart
                    className="donut1"
                    value={percent}
                    backgroundColor={bg1}
                    backgroundColor2="rgba(245, 245, 245, 1)"
                  />
                  <small className={changeClass}>{percent}%</small>
                </div>

                <div className="">
                  <span>Course</span>
                  <h4 className="fs-18 mb-3">{title}</h4>
                  <span>Total Courses {courseCount}</span>
                  {/* <h5 className="fs-18">
                    {numb1} / {numb2}
                  </h5> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const getRandomPercentage = () => {
    return Math.floor(Math.random() * 101); // Generate a random percentage between 0 and 100
  };

  const getRandomNumber1 = () => {
    return Math.floor(Math.random() * 101); // Generate a random number for numb1
  };

  const getRandomNumber2 = () => {
    return Math.floor(Math.random() * 101); // Generate a random number for numb2
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-4 col-xxl-5 col-lg-12">
          <div className="card instructors-box">
            <div className="card-header border-0">{/* <DropDownBlog /> */}</div>

            <div className="card-body text-center pb-3">
              <div className="instructors-media">
                {profileImg === "File not available" ? (
                  <img src={dummy} alt="profile" />
                ) : (
                  <img src={profileImg} alt="profile" />
                )}
                <div className="instructors-media-info mt-4">
                  <h4 className="mb-1">{userName}</h4>
                  <span className="fs-18">Member Since {registerDate}</span>
                  <div className="d-flex justify-content-center my-3 mt-4">
                    <span
                      className="btn info-box text-start style-1"
                      onClick={() => setLargeModal(true)}>
                      <span>Points</span>
                      <h4>{userPoints}</h4>
                    </span>
                    <div className="btn info-box text-start style-1">
                      <span>Levels</span>
                      <h4>{userLevels}</h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bio text-start my-4">
                <h4 className="mb-3">Bio</h4>
                <div className="bio-content">
                  <p className="mb-0">{bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-xxl-7 col-lg-12 ">
          <div className="row">
            <WidgetBlog changeImage={certificate} title="Course Completed" />
            <WidgetBlog changeImage={clock} title="Course Progress" />

            <div className="widget-heading d-flex justify-content-between align-items-center">
              <h3 className="m-0">Current Courses</h3>
              <Link to={"./learn-course"} className="btn btn-primary btn1">
                View all
              </Link>
              {/* <Button className="btn btn-primary btn2" onClick={handleExport}>
                Export in Excel
              </Button> */}
            </div>
            {/* <div className="row">
							<div className="col-xl-4 ms-auto">
						<Button onClick={handleExport} className="btn btn-primary float-right">
							Export in Excel <i className="fa fa-download"></i>
						</Button>
						</div>
						</div>	 */}
            {/* <CurrentCourse
              changeclassName="text-secondary"
              bg1="rgba(76, 188, 154, 1)"
              title="UI Design Beginner"
              percent="80"
              numb1="90"
              numb2="110"
            />
            <CurrentCourse
              changeclassName="text-warning"
              bg1="rgba(254, 198, 79, 1)"
              title="UX Research"
              percent="62"
              numb1="50"
              numb2="80"
            /> */}

            {courseData.map((course, index) => (
              <CurrentCourse
                key={index}
                bg1={
                  index % 2 === 0
                    ? "rgba(76, 188, 154, 1)"
                    : "rgba(254, 198, 79, 1)"
                }
                changeClass={
                  index % 2 === 0 ? "text-secondary" : "text-warning"
                }
                percent="0"
                numb1={getRandomNumber1()}
                numb2={getRandomNumber2()}
                title={course}
              />
            ))}

            <div className="col-xl-12">
              <div className="card score-active style-1">
                <div className="card-header border-0 pb-2 flex-wrap">
                  <h4 className="me-4">Score Activity</h4>
                  <ul className="d-flex mb-2">
                    <li>
                      <svg
                        className="me-2"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect
                          x="1.5"
                          y="1.5"
                          width="9"
                          height="9"
                          rx="4.5"
                          fill="white"
                          stroke="#FEC64F"
                          strokeWidth="3"
                        />
                      </svg>
                      Last Month
                    </li>
                    <li>
                      <svg
                        className="me-2"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect
                          x="1.5"
                          y="1.5"
                          width="9"
                          height="9"
                          rx="4.5"
                          fill="white"
                          stroke="#4CBC9A"
                          strokeWidth="3"
                        />
                      </svg>
                      Last Month
                    </li>
                  </ul>
                  <div className="d-flex align-items-center">
                    <Dropdown className="select-dropdown me-2">
                      <Dropdown.Toggle
                        as="div"
                        className="i-false dashboard-select  selectBtn btn-dark">
                        {dropSelect}{" "}
                        <i className="fa-solid fa-angle-down ms-2" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => setDropSelect("This Month")}>
                          This Month
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setDropSelect("This Weekly")}>
                          This Weekly
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setDropSelect("This Day")}>
                          This Day
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <DropDownBlog />
                  </div>
                </div>
                <div className="card-body pb-1 custome-tooltip pt-0">
                  <ProfileActivityChart />
                </div>
              </div>
              <Modal
                className="fade bd-example-modal-lg"
                show={largeModal}
                size="lg">
                <Modal.Header>
                  <Modal.Title>Leaderboard</Modal.Title>
                  <Button
                    variant=""
                    className="btn-close"
                    onClick={() => setLargeModal(false)}></Button>
                </Modal.Header>
                <Modal.Body>
                  <Tab.Container defaultActiveKey="About">
                    <div className="course-details-tab style-2 mb-2">
                      <Nav
                        as="div"
                        className="nav nav-tabs tab-auto"
                        id="nav-tab">
                        <Nav.Link
                          as="button"
                          className="nav-link"
                          id="nav-about-tab"
                          eventKey="About"
                          type="button">
                          Points
                        </Nav.Link>
                        <Nav.Link
                          as="button"
                          className="nav-link"
                          id="nav-reviews-tab"
                          eventKey="Review"
                          type="button">
                          Levels
                        </Nav.Link>
                        <Nav.Link
                          as="button"
                          className="nav-link"
                          id="nav-discussion-tab"
                          eventKey="Discussion"
                          type="button">
                          Badges
                        </Nav.Link>
                      </Nav>

                      <Tab.Content className="tab-content" id="nav-tabContent">
                        <Tab.Pane id="nav-about" eventKey="About">
                          {showAboutPane === false ? (
                            <div>
                              {userData?.length === 0 ? (
                                <div className="loader-container">
                                  <RotatingLines
                                    strokeColor="grey"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="140"
                                    visible={true}
                                  />
                                </div>
                              ) : (
                                <Table responsive>
                                  <tbody>
                                    {userData
                                      ?.sort((a, b) => b.points - a.points)
                                      .slice(0, 3)
                                      .map((item, index) => {
                                        const img = item.file
                                          ? `${backendBaseUrl}/${item.file}`
                                          : "";
                                        let medalIcon = null;
                                        if (index === 0) {
                                          medalIcon = (
                                            <FaMedal
                                              style={{
                                                color: "gold",
                                                fontSize: "28px",
                                                fontWeight: "bold",
                                              }}
                                            />
                                          );
                                        } else if (index === 1) {
                                          medalIcon = (
                                            <FaMedal
                                              style={{
                                                color: "silver",
                                                fontSize: "28px",
                                                fontWeight: "bold",
                                              }}
                                            />
                                          );
                                        } else if (index === 2) {
                                          medalIcon = (
                                            <FaMedal
                                              style={{
                                                color: "#cd7f32", // bronze color
                                                fontSize: "28px",
                                                fontWeight: "bold",
                                              }}
                                            />
                                          );
                                        }
                                        return (
                                          <tr key={index}>
                                            <td>
                                              <center>{medalIcon}</center>
                                            </td>
                                            <td
                                              style={{
                                                width: "20%",
                                              }}>
                                              {" "}
                                              <center>
                                                {/* <img
                                                  src={img}
                                                  style={{
                                                    width: "70px",
                                                    height: "50px",
                                                    borderRadius: " 0.625rem",
                                                  }}
                                                  alt=" img"
                                                /> */}
                                                {item.file ? (
                                                  <img
                                                    src={img}
                                                    style={{
                                                      width: "70px",
                                                      height: "50px",
                                                      borderRadius: "0.625rem",
                                                    }}
                                                    alt="img"
                                                  />
                                                ) : (
                                                  <img
                                                    src={dummy}
                                                    style={{
                                                      width: "70px",
                                                      height: "50px",
                                                      borderRadius: "0.625rem",
                                                      border:
                                                        "2px solid darkgrey",
                                                    }}
                                                    alt="img"
                                                  />
                                                )}
                                              </center>
                                            </td>
                                            <td>
                                              <center>{item.full_name}</center>
                                            </td>
                                            <td>
                                              <center> {item.points}</center>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                  </tbody>
                                </Table>
                              )}
                            </div>
                          ) : (
                            <div className="about-content">
                              <h6>💎 Each login gives 25 points</h6>
                              <h6>💎 Each unit completion gives 25 points</h6>
                              <h6>
                                💎 Each course completion gives 150 points
                              </h6>
                              <h6>💎 Each certificate gives 150 points</h6>
                              <h6>
                                💎 Each successful test completion gives 1 point
                                &nbsp; <i class="bi bi-info-circle-fill"></i>
                              </h6>
                              <h6>
                                💎 Each successful assignment completion gives 1
                                point &nbsp;
                                <i class="bi bi-info-circle-fill"></i>
                              </h6>
                              <h6>
                                💎 Each successful ILT completion gives 1 point
                                &nbsp; <i class="bi bi-info-circle-fill"></i>
                              </h6>
                              <h6>
                                💎 Each discussion topic or comment gives 25
                                points
                              </h6>
                              <h6>
                                💎 Each upvote on discussion comments gives 10
                                points
                              </h6>
                            </div>
                          )}
                          {showAboutPane === false ? (
                            <Container className="d-flex justify-content-center align-items-center mt-1">
                              <Button onClick={handlePointsRule}>
                                How to collect points
                              </Button>
                            </Container>
                          ) : (
                            <Container className="d-flex justify-content-center align-items-center mt-3">
                              <Button onClick={handlePointsBackBtn}>
                                Back
                              </Button>
                            </Container>
                          )}
                        </Tab.Pane>
                        <Tab.Pane eventKey="Review">
                          {showReviewPane === false ? (
                            <div>
                              {userData?.length === 0 ? (
                                <div className="loader-container">
                                  <RotatingLines
                                    strokeColor="grey"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="140"
                                    visible={true}
                                  />
                                </div>
                              ) : (
                                <Table responsive>
                                  <tbody>
                                    {userData?.map((item, index) => {
                                      const img = item.file
                                        ? `${backendBaseUrl}/${item.file}`
                                        : "";
                                      let medalStyle = {
                                        fontSize: "28px",
                                        fontWeight: "bold",
                                      };

                                      switch (item.user_level) {
                                        case 0:
                                          medalStyle.color = "#8C94D7";
                                          break;
                                        case 1:
                                          medalStyle.color = "#cd7f32"; //(bronze)
                                          break;
                                        case 2:
                                          medalStyle.color = "silver";
                                          break;
                                        case 3:
                                          medalStyle.color = "gold";
                                          break;
                                        default:
                                          break;
                                      }

                                      let level = null;
                                      if (item.user_level === 0) {
                                        level = "Beginner";
                                      } else if (item.user_level === 1) {
                                        level = "Intermediate";
                                      } else if (item.user_level === 2) {
                                        level = "Advanced";
                                      } else if (item.user_level === 3) {
                                        level = "Proficient";
                                      }

                                      return (
                                        <tr key={index}>
                                          <td>
                                            <center>
                                              <SlBadge style={medalStyle} />
                                            </center>
                                          </td>
                                          <td style={{ width: "20%" }}>
                                            <center>
                                              {item.file ? (
                                                <img
                                                  src={img}
                                                  style={{
                                                    width: "70px",
                                                    height: "50px",
                                                    borderRadius: "0.625rem",
                                                  }}
                                                  alt="img"
                                                />
                                              ) : (
                                                <img
                                                  src={dummy}
                                                  style={{
                                                    width: "70px",
                                                    height: "50px",
                                                    borderRadius: "0.625rem",
                                                    border:
                                                      "2px solid darkgrey",
                                                  }}
                                                  alt="img"
                                                />
                                              )}
                                            </center>
                                          </td>
                                          <td>
                                            <center>{item.full_name}</center>
                                          </td>
                                          <td>
                                            <center>{level}</center>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </Table>
                              )}
                            </div>
                          ) : (
                            <div className="reviews-content">
                              <br />
                              <h6>💎 Upgrade level every 3000 points</h6>
                              <h6>
                                💎 Upgrade level every 5 completed courses
                              </h6>
                              <h6>💎 Upgrade level every 5 badges</h6>
                            </div>
                          )}

                          {showReviewPane === false ? (
                            <Container className="d-flex justify-content-center align-items-center mt-1">
                              <Button
                                className="d-flex justify-content-center align-items-center"
                                onClick={handleLevelsRule}>
                                How to level up
                              </Button>
                            </Container>
                          ) : (
                            <Container className="d-flex justify-content-center align-items-center mt-3">
                              <Button
                                className="d-flex justify-content-center align-items-center"
                                onClick={handleLevelsBackBtn}>
                                Back
                              </Button>
                            </Container>
                          )}
                        </Tab.Pane>
                        <Tab.Pane id="nav-discussion" eventKey="Discussion">
                          {selectedItem === null ? (
                            <>
                              {userData?.length === 0 ? (
                                <div className="loader-container">
                                  <RotatingLines
                                    strokeColor="grey"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="140"
                                    visible={true}
                                  />
                                </div>
                              ) : (
                                <>
                                  <Table responsive>
                                    <tbody>
                                      {userData
                                        ?.slice(0, 3)
                                        .map((item, index) => {
                                          const img = item.file
                                            ? `${backendBaseUrl}/${item.file}`
                                            : "";
                                          let medalIcon = null;
                                          if (index === 0) {
                                            medalIcon = (
                                              <BiSolidBadgeCheck
                                                style={{
                                                  color: "gold",
                                                  fontSize: "30px",
                                                  fontWeight: "bold",
                                                }}
                                              />
                                            );
                                          } else if (index === 1) {
                                            medalIcon = (
                                              <BiSolidBadgeCheck
                                                style={{
                                                  color: "silver",
                                                  fontSize: "30px",
                                                  fontWeight: "bold",
                                                }}
                                              />
                                            );
                                          } else if (index === 2) {
                                            medalIcon = (
                                              <BiSolidBadgeCheck
                                                style={{
                                                  color: "#cd7f32", // bronze color
                                                  fontSize: "30px",
                                                  fontWeight: "bold",
                                                }}
                                              />
                                            );
                                          }

                                          return (
                                            <tr key={index}>
                                              <td>
                                                <center>{medalIcon}</center>
                                              </td>
                                              <td
                                                style={{
                                                  width: "20%",
                                                }}>
                                                {" "}
                                                <center>
                                                  {item.file ? (
                                                    <img
                                                      src={img}
                                                      style={{
                                                        width: "70px",
                                                        height: "50px",
                                                        borderRadius:
                                                          " 0.625rem",
                                                      }}
                                                      alt="img"
                                                    />
                                                  ) : (
                                                    <img
                                                      src={dummy}
                                                      style={{
                                                        width: "70px",
                                                        height: "50px",
                                                        borderRadius:
                                                          "0.625rem",
                                                        border:
                                                          "2px solid darkgrey",
                                                      }}
                                                      alt="img"
                                                    />
                                                  )}
                                                </center>
                                              </td>
                                              <td>
                                                <center>
                                                  {item.full_name}
                                                </center>
                                              </td>
                                              <td>
                                                <center> 3</center>
                                              </td>
                                              <td>
                                                <center>
                                                  <FiPlay
                                                    style={{
                                                      fontSize: "22px",
                                                      fontWeight: "bold",
                                                    }}
                                                    onClick={() =>
                                                      handleBadges(
                                                        item.full_name,
                                                        item.file
                                                      )
                                                    }
                                                  />
                                                </center>
                                              </td>
                                            </tr>
                                          );
                                        })}
                                    </tbody>
                                  </Table>
                                </>
                              )}
                            </>
                          ) : (
                            <div className="about-content">
                              {" "}
                              {/* const img = `${backendBaseUrl}/${img}`; */}
                              <Table responsive>
                                <tbody>
                                  <tr>
                                    <td>
                                      <strong>{selectedItem}</strong>
                                    </td>
                                    <td>
                                      <center> 3</center>
                                    </td>
                                  </tr>
                                  <tr>
                                    {" "}
                                    <img
                                      src={badge1}
                                      alt=""
                                      width="100"
                                      height="100"
                                    />
                                    <img
                                      src={badge2}
                                      alt=""
                                      width="100"
                                      height="100"
                                    />
                                    <img
                                      src={badge3}
                                      alt=""
                                      width="100"
                                      height="100"
                                    />
                                  </tr>
                                </tbody>
                              </Table>
                              <Container className="d-flex justify-content-center align-items-center mt-3">
                                <Button
                                  className="d-flex justify-content-center align-items-center"
                                  onClick={handleBadgesBackBtn}>
                                  Back
                                </Button>
                              </Container>
                            </div>
                          )}
                        </Tab.Pane>
                      </Tab.Content>
                    </div>
                  </Tab.Container>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Learn;

// Beginner
// Intermediate
// Advanced
// Proficient
