import React, { useState } from "react";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { read, utils, writeFile } from "xlsx";
import { AboutTabContent } from "../Courses/CourseDetail1";
import { Dropdown, Button, Tab, Modal, Nav } from "react-bootstrap";
import DropDownBlog from "../Dashboard/DropDownBlog";

import DonutChart from "../Dashboard/Dashboard/DonutChart";
//import ProfileActivityChart from './Dashboard/ProfileActivityChart';

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

const reviewsData = [
  { image: pic3, title: "Jordan Nico ", commentTime: "2 Month Ago" },
  { image: pic4, title: "Cahaya Hikari ", commentTime: "3 Month Ago" },
];

const ProfileActivityChart = loadable(() =>
  pMinDelay(import("../Dashboard/Dashboard/ProfileActivityChart"), 1000)
);

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
                  <h4>100</h4>
                  <span>{title}</span>
                </div>
              </div>
              <Link to={"./courses"}>
                <i className="las la-angle-right text-primary"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CurrentCourse = ({ bg1, changeClass, title, percent, numb1, numb2 }) => {
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
                <span>Class</span>
                <h4 className="fs-18 mb-3">{title}</h4>
                <span>Total Courses</span>
                <h5 className="fs-18">
                  {numb1} / {numb2}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Learn = () => {
  const [movies, setMovies] = useState([]);
  const [largeModal, setLargeModal] = useState(false);
  const [dropSelect, setDropSelect] = useState("This Month");

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

  return (
    <>
      <div className="row">
        <div className="col-xl-4 col-xxl-5 col-lg-12">
          <div className="card instructors-box">
            <div className="card-header border-0">
              <DropDownBlog />
            </div>

            <div className="card-body text-center pb-3">
              <div className="instructors-media">
                <img src={pic2} alt="" />
                <div className="instructors-media-info mt-4">
                  <h4 className="mb-1">Nella Vita</h4>
                  <span className="fs-18">Member Since 2020</span>
                  <div className="d-flex justify-content-center my-3 mt-4">
                    <span
                      className="btn info-box text-start style-1"
                      onClick={() => setLargeModal(true)}
                    >
                      <span>Points</span>
                      <h4>2300</h4>
                    </span>
                    <div className="btn info-box text-start style-1">
                      <span>Certificate</span>
                      <h4>50</h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="achievements ">
                <h4 className="text-start mb-3">Achievements</h4>
                <div className="achievements-content flex-wrap">
                  <span>
                    <img src={cup} alt="" />
                  </span>
                  <span>
                    <img src={puzzle} alt="" />
                  </span>
                  <span>
                    <img src={planet} alt="" />
                  </span>
                  <span>
                    <img src={skill} alt="" />
                  </span>
                  <span>
                    <img src={readingtime} alt="" />
                  </span>
                </div>
              </div>
              <div className="bio text-start my-4">
                <h4 className="mb-3">Bio</h4>
                <div className="bio-content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-xxl-7 col-lg-12 ">
          <div className="row">
            <WidgetBlog changeImage={certificate} title="Completed" />
            <WidgetBlog changeImage={clock} title="Progress" />

            <div className="widget-heading d-flex justify-content-between align-items-center">
              <h3 className="m-0">Current Courses</h3>
              <Link to={"./courses"} className="btn btn-primary btn1">
                View all
              </Link>
              <Button className="btn btn-primary btn2" onClick={handleExport}>
                Export in Excel
              </Button>
            </div>
            {/* <div className="row">
							<div className="col-xl-4 ms-auto">
						<Button onClick={handleExport} className="btn btn-primary float-right">
							Export in Excel <i className="fa fa-download"></i>
						</Button>
						</div>
						</div>	 */}
            <CurrentCourse
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
            />

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
                        xmlns="http://www.w3.org/2000/svg"
                      >
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
                        xmlns="http://www.w3.org/2000/svg"
                      >
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
                        className="i-false dashboard-select  selectBtn btn-dark"
                      >
                        {dropSelect}{" "}
                        <i className="fa-solid fa-angle-down ms-2" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => setDropSelect("This Month")}
                        >
                          This Month
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setDropSelect("This Weekly")}
                        >
                          This Weekly
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setDropSelect("This Day")}
                        >
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
                size="lg"
              >
                <Modal.Header>
                  <Modal.Title>Leaderboard</Modal.Title>
                  <Button
                    variant=""
                    className="btn-close"
                    onClick={() => setLargeModal(false)}
                  ></Button>
                </Modal.Header>
                <Modal.Body>
                  <Tab.Container defaultActiveKey="About">
                    <div className="course-details-tab style-2 mb-2">
                      <nav>
                        <Nav
                          as="div"
                          className="nav nav-tabs tab-auto"
                          id="nav-tab"
                        >
                          <Nav.Link
                            as="button"
                            className="nav-link"
                            id="nav-about-tab"
                            key="About"
                            type="button"
                          >
                            Points
                          </Nav.Link>
                          <Nav.Link
                            as="button"
                            className="nav-link"
                            id="nav-reviews-tab"
                            key="Review"
                            type="button"
                          >
                            Levels
                          </Nav.Link>
                          <Nav.Link
                            as="button"
                            className="nav-link"
                            id="nav-discussion-tab"
                            key="Discussion"
                            type="button"
                          >
                            Badges
                          </Nav.Link>
                        </Nav>
                      </nav>
                      <Tab.Content className="tab-content" id="nav-tabContent">
                        <Tab.Pane id="nav-about" key="About">
                          <div className="about-content">
                            <h6>💎 Each login gives 25 points</h6>
                            <h6>💎 Each unit completion gives 25 points</h6>
                            <h6>💎 Each course completion gives 150 points</h6>
                            <h6>💎 Each certificate gives 150 points</h6>
                            <h6>
                              💎 Each successful test completion gives 1 point
                              &nbsp; <i class="bi bi-info-circle-fill"></i>
                            </h6>
                            <h6>
                              💎 Each successful assignment completion gives 1
                              point &nbsp;<i class="bi bi-info-circle-fill"></i>
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
                        </Tab.Pane>
                        <Tab.Pane key="Review">
                          <div className="reviews-content">
                            <br />
                            <h6>💎 Upgrade level every 3000 points</h6>
                            <h6>💎 Upgrade level every 5 completed courses</h6>
                            <h6>💎 Upgrade level every 5 badges</h6>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane id="nav-discussion" key="Discussion">
                          <div className="about-content">
                            <AboutTabContent title="About This Users Earned Badges" />
                            <AboutTabContent title="Users Course’s Objectives and activity" />
                          </div>
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
