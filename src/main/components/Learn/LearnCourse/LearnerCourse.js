import React, { Fragment, useState, useEffect } from "react";
// import PageTitle from "../../layouts/PageTitle";
import { Link, useHistory } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Select from "react-select";
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Dropdown,
  ProgressBar,
  Modal,
  Button,
  Nav,
} from "react-bootstrap";

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

  const fetchData = () => {
    fetch("https://localhost:8000/courses")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCourses(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // useEffect(async () => {
  //   fetchData();
  // }, []);

  // Catch Rating value
  const handleRating = ([rate] = 0) => {
    setRating([rate]);
  };

  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };
  const svg1 = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect x="0" y="0" width="24" height="24"></rect>
        <circle fill="#000000" cx="5" cy="12" r="2"></circle>
        <circle fill="#000000" cx="12" cy="12" r="2"></circle>
        <circle fill="#000000" cx="19" cy="12" r="2"></circle>
      </g>
    </svg>
  );
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
  let history = useHistory();
  return (
    <Fragment>
      <Nav>
        <Nav.Item as="div" className="nav nav-tabs" id="nav-tab" role="tablist">
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventKey="Follow"
            type="button"
            to="/learn-course"
          >
            Info
          </Link>
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventKey="Follow"
            type="button"
            to="/adm_courses"
          >
            Course Catalog
          </Link>
        </Nav.Item>
      </Nav>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Courses</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive className="verticle-middle">
                <thead>
                  <tr>
                    <th>
                      <strong>COURSE ID</strong>
                    </th>
                    <th>
                      <strong>COURSE</strong>
                    </th>
                    <th>
                      <strong>PROGRESS</strong>
                    </th>
                    <th>
                      <strong>SCORE</strong>
                    </th>
                    <th>
                      <strong>ENROLLED ON</strong>
                    </th>
                    <th>
                      <strong>DUE DATE</strong>
                    </th>
                    <th>
                      <strong>COMPLETION</strong>
                    </th>
                    <th>
                      <strong>DURATION</strong>
                    </th>
                    <th>
                      <strong>
                        <center>RATINGS</center>
                      </strong>
                    </th>
                    <th>
                      <strong>
                        <center>FEEDBACK</center>
                      </strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td>{data.id}</td>
                        <td>
                          <strong>{data.coursename}</strong>
                        </td>
                        <small>
                          <td className="progress-bar p-0 bg-primary">
                            <td
                              className="bg-light p-0"
                              style={{ width: "50%" }}
                            >
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;50%
                            </td>
                          </td>
                        </small>
                        <td>
                          <center>-</center>
                        </td>
                        <td>
                          <center>2/1/2023</center>
                        </td>
                        <td>
                          <center>30/1/2023</center>
                        </td>
                        <td>
                          <center>30-DEC-2023</center>
                        </td>
                        <td>
                          <center>1m 35s</center>
                        </td>
                        <td className="col-lg-4">
                          <Rating
                            onClick={handleRating}
                            initialValue={rating}
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setFeedbackModal(true)}
                          >
                            <span className="me-2"></span>Feedback
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
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
              onClick={() => setFeedbackModal(false)}
            ></Button>
          </div>
          <div className="modal-body">
            <form
              className="comment-form"
              onSubmit={(e) => {
                e.preventDefault();
                setFeedbackModal(false);
              }}
            >
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