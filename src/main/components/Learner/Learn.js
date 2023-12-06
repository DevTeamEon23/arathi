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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

//images
import level0 from "@images/svg/Level0.svg";
import Level0 from "@images/level0.png";
import level1 from "@images/svg/Level1.svg";
import level2 from "@images/svg/Level2.svg";
import level3 from "@images/svg/Level3.svg";
import level4 from "@images/svg/Level4.svg";
import certificate from "@images/svg/degree-certificate.svg";
import clock from "@images/svg/clock-1.svg";
import pic3 from "@images/courses/pic3.jpg";
import pic4 from "@images/courses/pic4.jpg";

import badge2 from "@images/svg/Activity.svg";
import ActivityGreen from "@images/svg/ActivityGreen.svg";
import ActivityGrassGreen from "@images/svg/ActivityGrassGreen.svg";
import ActivityPink from "@images/svg/ActivityPink.svg";
import ActivityPurple from "@images/svg/ActivityPurple.svg";
import ActivityOrange from "@images/svg/ActivityOrange.svg";
import ActivityYellow from "@images/svg/ActivityYellow.svg";
import ActivityBlue from "@images/svg/ActivityBlue.svg";
import ActivityRed from "@images/svg/ActivityRed.svg";

import badge1 from "@images/svg/Learner.svg";
import LearnerGreen from "@images/svg/LearnerGreen.svg";
import LearnerGrassGreen from "@images/svg/LearnerGrassGreen.svg";
import LearnerPink from "@images/svg/LearnerPink.svg";
import LearnerPurple from "@images/svg/LearnerPurple.svg";
import LearnerOrange from "@images/svg/LearnerOrange.svg";
import LearnerYellow from "@images/svg/LearnerYellow.svg";
import LearnerRed from "@images/svg/LearnerRed.svg";
import LearnerBlue from "@images/svg/LearnerBlue.svg";

import TestBlue from "@images/svg/TestBlue.svg";
import TestGreen from "@images/svg/TestGreen.svg";
import TestGrassGreen from "@images/svg/TestGrassGreen.svg";
import TestPink from "@images/svg/TestPink.svg";
import TestPurple from "@images/svg/TestPurple.svg";
import TestOrange from "@images/svg/TestOrange.svg";
import TestYellow from "@images/svg/TestYellow.svg";
import TestRed from "@images/svg/TestRed.svg";

import certificateBlue from "@images/svg/certificateBlue.svg";
import certificateGreen from "@images/svg/certificateGreen.svg";
import certificateGrassGreen from "@images/svg/certificateGrassGreen.svg";
import certificatePink from "@images/svg/certificatePink.svg";
import certificatePurple from "@images/svg/certificatePurple.svg";
import certificateYellow from "@images/svg/certificateYellow.svg";
import certificateOrange from "@images/svg/certificateOrange.svg";
import certificateRed from "@images/svg/certificateRed.svg";

import assignmentBlue from "@images/svg/assignmentBlue.svg";
import assignmentGrassGreen from "@images/svg/assignmentGrassGreen.svg";
import assignmentGreen from "@images/svg/assignmentGreen.svg";
import assignmentPurple from "@images/svg/assignmentPurple.svg";
import assignmentPink from "@images/svg/assignmentPink.svg";
import assignmentYellow from "@images/svg/assignmentYellow.svg";
import assignmentOrange from "@images/svg/assignmentOrange.svg";
import assignmentRed from "@images/svg/assignmentRed.svg";

const backendBaseUrl = "https://beta.eonlearning.tech";

const reviewsData = [
  { image: pic3, title: "Jordan Nico ", commentTime: "2 Month Ago" },
  { image: pic4, title: "Cahaya Hikari ", commentTime: "3 Month Ago" },
];

const ProfileActivityChart = loadable(() =>
  pMinDelay(import("../Dashboard/Dashboard/ProfileActivityChart"), 1000)
);

const Learn = ({ userRatings, activeIndex, handleSelect }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [largeModal, setLargeModal] = useState(false);
  const [showAboutPane, setShowAboutPane] = useState(false); // About(Points)
  const [showReviewPane, setShowReviewPane] = useState(false); // Review(Levels)
  const [userData, setUserData] = useState([]); //user list data
  const [selectedItem, setSelectedItem] = useState(null);
  const [badges, setBadges] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [userName, setUserName] = useState(""); //Full name
  const [registerDate, setRegisterDate] = useState("");
  const [profileImg, setProfileImg] = useState(""); //img file
  const [bio, setBio] = useState("");
  const [userPoints, setUserPoints] = useState(0);
  const [userLevels, setUserLevels] = useState(0);
  const [courseCount, setcourseCount] = useState();
  const [courseData, setcourseData] = useState([]);
  const [userRating, setuserRating] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const user_id = localStorage.getItem("id");
  const token = window.localStorage.getItem("jwt_access_token");
  const history = useHistory();

  useEffect(() => {
    getUsers();
    fetchLearnerData();
    getEnrolledCourses();
    fetchLearnerRating();
  }, []);

  const badgesData = [
    {
      name: "Activity Newbie",
      image: ActivityPink,
      logins: 4,
    },
    {
      name: "Activity Grower",
      image: ActivityPurple,
      logins: 8,
    },
    {
      name: "Activity Adventurer",
      image: ActivityBlue,
      logins: 16,
    },
    {
      name: "Activity Explorer",
      image: ActivityGrassGreen,
      logins: 32,
    },
    {
      name: "Activity Star",
      image: ActivityYellow,
      logins: 64,
    },
    {
      name: "Activity Superstar",
      image: ActivityOrange,
      logins: 128,
    },
    {
      name: "Activity Master",
      image: ActivityGreen,
      logins: 256,
    },
    {
      name: "Activity Grandmaster",
      image: ActivityRed,
      logins: 512,
    },
  ];

  const getCurrentBadgeIndex = () =>
    badgesData.findIndex((badge) => badge.name === badges);

  const getStarRatingBadges = () => {
    const currentIndex = getCurrentBadgeIndex();
    const startIndex = Math.max(0, currentIndex - 7); // Show up to 8 badges

    return badgesData.slice(startIndex, currentIndex + 1);
  };

  const BadgesContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  `;

  const BadgeContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 22px;
  `;

  const BadgeImage = styled.img`
    width: 100px;
    height: 100px;
  `;

  const Badge = ({ badge }) => (
    <BadgeContainer>
      <BadgeImage src={badge.image} alt="" title={badge.name} />
      <p className="fw-bold" style={{ margin: "16px" }}>
        {badge.logins} Logins
      </p>
    </BadgeContainer>
  );

  const fetchLearnerData = async () => {
    try {
      const queryParams = {
        user_id: user_id,
      };
      const url = new URL(
        "https://beta.eonlearning.tech/lms-service/learner_overview"
      );
      url.search = new URLSearchParams(queryParams).toString();
      const response = await axios.get(url.toString(), {
        headers: {
          "Auth-Token": token,
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

  const fetchLearnerRating = async () => {
    try {
      const queryParams = {
        user_id: user_id,
      };
      const url = new URL(
        "https://beta.eonlearning.tech/lms-service/learner_ratings"
      );
      url.search = new URLSearchParams(queryParams).toString();
      const response = await axios.get(url.toString(), {
        headers: {
          "Auth-Token": token,
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      setuserRating(data === null ? null : response.data.user_ratings);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const getEnrolledCourses = () => {
    const config = {
      headers: {
        "Auth-Token": token,
      },
      params: {
        user_id: user_id,
      },
    };
    axios
      .get(
        "https://beta.eonlearning.tech/lms-service/fetch_enroll_courses_of_user_by_id",
        config
      )
      .then((response) => {
        const data = response.data.data;
        setEnrolledCourses(data === null ? [] : data.enrolled_info);
      })
      .catch((error) => {
        console.error("Error fetching enrolled courses:", error);
      });
  };

  //User List Api
  const getUsers = () => {
    axios
      .get("https://beta.eonlearning.tech/auth/fetch_userpoints_by_userid")
      .then((response) => {
        let allUsers = response.data.data.user_ids;
        const learnerUsers = allUsers.filter((user) => user.role === "Learner");
        setUserData(learnerUsers);
      })
      .catch((error) => {});
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

  const handleBadges = (name, img, badge) => {
    setSelectedItem(name);
    setBadges(badge);
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

  let BadgeCount = 0;
  if (badges === "Activity Newbie") {
    BadgeCount = 1;
  } else if (badges === "Activity Grower") {
    BadgeCount = 2;
  } else if (badges === "Activity Adventurer") {
    BadgeCount = 3;
  } else if (badges === "Activity Explorer") {
    BadgeCount = 4;
  } else if (badges === "Activity Star") {
    BadgeCount = 5;
  } else if (badges === "Activity Superstar") {
    BadgeCount = 6;
  } else if (badges === "Activity Master") {
    BadgeCount = 7;
  } else if (badges === "Activity Grandmaster") {
    BadgeCount = 8;
  }

  const badgeDetails = {
    "Activity Newbie": "4 logins",
    "Activity Grower": "8 logins",
    "Activity Adventurer": "16 logins",
    "Activity Explorer": "32 logins",
    "Activity Star": "64 logins",
    "Activity Superstar": "128 logins",
    "Activity Master": "256 logins",
    "Activity Grandmaster": "512 logins",
    null: "No Badge",
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

              <div className="bio text-start my-4">
                <h4 className="mb-3">User Reviews</h4>
                <div>
                  <div>
                    {userRating ? (
                      <Slider {...sliderSettings}>
                        {userRating.map((item, index) => (
                          <div
                            key={index}
                            className={`carousel-item ${
                              index === activeIndex ? "active" : ""
                            }`}>
                            <div className="review-box card">
                              <div className="d-flex align-items-center">
                                <img src={item.file} alt="course img" />
                                <div className="ms-3">
                                  <h4 className="mb-0 fs-18 font-w500">
                                    {item.coursename}
                                  </h4>
                                  <p
                                    className="mb-0 font-w500"
                                    style={{ marginRight: "7rem" }}>
                                    Review by: {item.full_name}
                                  </p>
                                  <ul className="d-flex align-items-center rating my-1">
                                    {[...Array(5)].map((_, i) => (
                                      <li key={i}>
                                        <i
                                          className={`fas fa-star ${
                                            i < item.rating ? "star-orange" : ""
                                          } me-1`}></i>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <p className="d-flex align-items-center my-1">
                                {item.feedback}
                              </p>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    ) : (
                      <p className="mt-3 fw-Mid-bold">No Reviews</p>
                    )}
                  </div>
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
                  <h4 className="me-4">Enrolled Courses</h4>
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
                          stroke="#4CBC9A"
                          strokeWidth="3"
                        />
                      </svg>
                      Enrollment Date
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
                          stroke="#FF6A59"
                          strokeWidth="3"
                        />
                      </svg>
                      Completion Date
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <ProfileActivityChart courseData={enrolledCourses} />
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
                                              {item.user_level === 0 && (
                                                <img
                                                  src={Level0}
                                                  alt="Level 1"
                                                />
                                              )}
                                              {item.user_level === 1 && (
                                                <img
                                                  src={level1}
                                                  alt="Level 2"
                                                  width={50}
                                                />
                                              )}
                                              {item.user_level === 2 && (
                                                <img
                                                  src={level2}
                                                  alt="Level 3"
                                                  width={50}
                                                />
                                              )}
                                              {item.user_level === 3 && (
                                                <img
                                                  src={level3}
                                                  alt="Level 4"
                                                  width={50}
                                                />
                                              )}
                                              {item.user_level === 4 && (
                                                <img
                                                  src={level4}
                                                  alt="Level 4"
                                                  width={50}
                                                />
                                              )}
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
                                          let BadgeCount = null;
                                          if (
                                            item.badge_name ===
                                            "Activity Newbie"
                                          ) {
                                            BadgeCount = 1;
                                          } else if (
                                            item.badge_name ===
                                            "Activity Grower"
                                          ) {
                                            BadgeCount = 2;
                                          } else if (
                                            item.badge_name ===
                                            "Activity Adventurer"
                                          ) {
                                            BadgeCount = 3;
                                          } else if (
                                            item.badge_name ===
                                            "Activity Explorer"
                                          ) {
                                            BadgeCount = 4;
                                          } else if (
                                            item.badge_name === "Activity Star"
                                          ) {
                                            BadgeCount = 5;
                                          } else if (
                                            item.badge_name ===
                                            "Activity Superstar"
                                          ) {
                                            BadgeCount = 6;
                                          } else if (
                                            item.badge_name ===
                                            "Activity Master"
                                          ) {
                                            BadgeCount = 7;
                                          } else if (
                                            item.badge_name ===
                                            "Activity Grandmaster"
                                          ) {
                                            BadgeCount = 8;
                                          } else {
                                            BadgeCount = 0;
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
                                                <center> {BadgeCount}</center>
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
                                                        item.file,
                                                        item.badge_name
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
                                      <center>
                                        {badges !== null && (
                                          <span style={{ fontWeight: "bold" }}>
                                            Badge Count: {BadgeCount}
                                          </span>
                                        )}
                                      </center>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th
                                      style={{
                                        textAlign: "left",
                                        fontWeight: "bold",
                                        borderBottom: "none",
                                      }}
                                      colSpan="2">
                                      Activity
                                    </th>
                                  </tr>
                                  <tr>
                                    <BadgesContainer>
                                      {badges &&
                                        getStarRatingBadges().map(
                                          (badgeData) => (
                                            <Badge
                                              key={badgeData.name}
                                              badge={badgeData}
                                            />
                                          )
                                        )}
                                      {badges === null && (
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                          }}>
                                          <img
                                            src={badge2}
                                            alt=""
                                            width="100"
                                            height="100"
                                            title="No Badge"
                                          />
                                        </div>
                                      )}
                                    </BadgesContainer>
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

{
  /* <img
src={badge1}
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
<img
src={badge4}
alt=""
width="100"
height="100"
/> */
}

// "Activity Newbie": 4     >> pink
// "Activity Grower": 8     >>purple
// "Activity Adventurer": 16     >>blue
// "Activity Explorer": 32     >> grass green
// "Activity Star": 64     >> yellow
// "Activity Superstar": 128     >>orange
// "Activity Master": 256     >> green
// "Activity Grandmaster": 512     >> red
