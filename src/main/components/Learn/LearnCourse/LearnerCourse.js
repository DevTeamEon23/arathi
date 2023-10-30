import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
// import PageTitle from "../../layouts/PageTitle";
import { Link, useHistory } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Select from "react-select";
import {
  Row,
  Col,
  Card,
  Table,
  Modal,
  Button,
  ProgressBar,
  Tab,
  Tabs,
} from "react-bootstrap";
import { RotatingLines } from "react-loader-spinner";

/// imge
// import avatar1 from "../../../images/avatar/1.jpg";
// import avatar2 from "../../../images/avatar/2.jpg";
// import avatar3 from "../../../images/avatar/3.jpg";

const options_1 = [
  { value: "ist", label: "India Standard Time (IST)" },
  { value: "nst", label: "New Zealand Standard Time (NST)" },
  { value: "ast", label: "Alaska Standard Time (AST)" },
  { value: "gmt", label: "Greenwich Mean Time (GMT)" },
  { value: "ect", label: "European Central Time (ECT)" },
  { value: "arabic", label: "Egypt Standard Time	(Arabic)" },
];

const LearnerCourse = () => {
  const [courses, setCourses] = useState([]);
  const [rating, setRating] = useState(0);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const chackbox = document.querySelectorAll(".bs_exam_topper input");
  const motherChackBox = document.querySelector(".bs_exam_topper_all input");

  const [token, setToken] = useState(); //auth token
  const [activeTab, setActiveTab] = useState("learn-course");
  const [progress, setProgress] = useState(0);
  const history = useHistory();

  useEffect(() => {
    let accessToken = window.localStorage.getItem("jwt_access_token");
    let ID = window.localStorage.getItem("id");
    setToken(accessToken);
    fetchCourseData(accessToken, ID);
  }, []);

  useEffect(() => {
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1);
    setActiveTab(tab);
  }, [history.location.pathname]);

  const fetchCourseData = async (accessToken, ID) => {
    try {
      const queryParams = {
        user_id: ID,
      };
      const url = new URL(
        "https://v1.eonlearning.tech/lms-service/fetch_enrolled_courses_of_users"
      );
      url.search = new URLSearchParams(queryParams).toString();
      const response = await axios.get(url.toString(), {
        headers: {
          "Auth-Token": accessToken,
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data.data;
      setCourses(data === null ? data : data.course_ids);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  // Catch Rating value
  const handleRating = ([rate] = 0) => {
    setRating([rate]);
  };

  const styles = {
    starbutton: {
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      cursor: "pointer",
    },
    on: {
      color: "#000",
    },
    off: {
      color: "#ccc",
    },
  };

  return (
    <Fragment>
      <Tabs activeKey={activeTab} onSelect={handleTabChange}>
        <Tab eventKey="learn-course" title="Enrolled Courses"></Tab>
        <Tab eventKey="courses" title="Course Store"></Tab>
      </Tabs>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Enrolled Courses</Card.Title>
            </Card.Header>
            <Card.Body>
              {courses?.length <= 0 ? (
                <div className="loader-container">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="140"
                    visible={true}
                  />
                </div>
              ) : courses === null ? (
                <>
                  <div>
                    <p className="text-center fs-20 fw-bold">
                      No Course Found.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Table responsive className="verticle-middle">
                    <thead>
                      <tr>
                        <th className="text-center">
                          <strong>COURSE ID</strong>
                        </th>
                        <th className="text-center">
                          <strong>COURSE</strong>
                        </th>
                        <th className="text-center">
                          <strong>PROGRESS</strong>
                        </th>
                        <th className="text-center">
                          <strong>SCORE</strong>
                        </th>
                        <th className="text-center">
                          <strong>ENROLLED ON</strong>
                        </th>
                        <th className="text-center">
                          <strong>DUE DATE</strong>
                        </th>
                        <th className="text-center">
                          <strong>COMPLETION</strong>
                        </th>
                        <th className="text-center">
                          <strong>DURATION</strong>
                        </th>
                        {/* <th>
                          <strong>
                            <center>RATINGS</center>
                          </strong>
                        </th>
                        <th>
                          <strong>
                            <center>FEEDBACK</center>
                          </strong>
                        </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {courses?.map((data) => {
                        const dateTimeString = data.enddate; //1
                        const date = new Date(dateTimeString);
                        const day = date.getDate();
                        const month = date.getMonth() + 1;
                        const year = date.getFullYear();
                        const formattedDate = `${day < 10 ? "0" + day : day}-${
                          month < 10 ? "0" + month : month
                        }-${year}`;

                        const dateTimeString2 = data.enrolled_on; //2
                        const date2 = new Date(dateTimeString2);
                        const day2 = date2.getDate();
                        const month2 = date2.getMonth() + 1;
                        const year2 = date2.getFullYear();
                        const formattedDate2 = `${
                          day2 < 10 ? "0" + day2 : day2
                        }-${month2 < 10 ? "0" + month2 : month2}-${year2}`;
                        return (
                          <tr key={data.id}>
                            <td className="text-center">{data.course_id}</td>
                            <td className="text-center">
                              <Link to={`/learn-course-view/${data.course_id}`}>
                                {data.coursename}
                              </Link>
                            </td>
                            <td className="text-center">
                              <ProgressBar
                                style={{ height: "1.5rem" }}
                                animated
                                now={18}
                                label={"0%"}
                              />
                            </td>
                            <td className="text-center">0</td>
                            <td className="text-center">{formattedDate2}</td>
                            <td className="text-center">{formattedDate}</td>
                            <td className="text-center">-</td>
                            <td className="text-center">0</td>
                            {/* <td className="col-lg-4">
                              <Rating
                                onClick={handleRating}
                                initialValue={rating}
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-secondary"
                                onClick={() => setFeedbackModal(true)}>
                                <span className="me-2"></span>Feedback
                              </button>
                            </td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Give Feedback Modal */}
      <Modal className="modal fade" show={feedbackModal}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Send Feedback</h5>
            <Button
              variant=""
              type="button"
              className="btn-close"
              data-dismiss="modal"
              onClick={() => setFeedbackModal(false)}></Button>
          </div>
          <div className="modal-body">
            <form
              className="comment-form"
              onSubmit={(e) => {
                e.preventDefault();
                setFeedbackModal(false);
              }}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="author" className="text-black font-w600">
                      {" "}
                      Name <span className="required">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Author"
                      name="Author"
                      placeholder="Author"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="text-black font-w600">
                      {" "}
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Email"
                      placeholder="Email"
                      name="Email"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="comment" className="text-black font-w600">
                      Feedback
                    </label>
                    <textarea
                      rows={8}
                      className="form-control"
                      name="comment"
                      placeholder="Thanks for Giving your valuable feedback 💌😇"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <input
                      type="submit"
                      value="Submit"
                      className="submit btn btn-primary"
                      name="submit"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <div>
        <Button onClick={() => history.goBack()}>Cancel</Button>
      </div>
    </Fragment>
  );
};

export default LearnerCourse;
