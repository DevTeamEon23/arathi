import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Dropdown,
  ProgressBar,
  Button,
  Nav,
  Modal,
} from "react-bootstrap";

const Courseusers = () => {
  const [sendMessage, setSendMessage] = useState(false);
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
  });
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api", requestOptions);
    const data = await response.json();

    console.log(data);
  };
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(`https://localhost:8000/users`)
      //This function is used while fetching data from FASTAPI (HTTP/HTTPS) 3.110.124.80
      // .then((response) => response.json())
      // .then((actualData) => {
      //   console.log(actualData);
      //   setUsers(actualData.data);
      //   console.log(data);

      // This is used for fetching data from json-server port 4000 fastAPI 8000
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // useEffect( async () => {
  //   fetchData();
  // }, []);

  async function deleteOperation(id) {
    if (window.confirm("Are you sure?")) {
      let result = await fetch("https://localhost:8000/users/" + id, {
        method: "DELETE",
      });
      result = await result.json();
      console.warn(result);
      fetchData();
    }
  }
  const chackbox = document.querySelectorAll(".bs_exam_topper input");
  const motherChackBox = document.querySelector(".bs_exam_topper_all input");
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
            to="/edit-courses">
            Courses
          </Link>
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventKey="Follow"
            type="button"
            to="/course_users">
            Users
          </Link>
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventKey="Follow"
            type="button"
            to="/course_groups">
            Groups
          </Link>
        </Nav.Item>
      </Nav>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="width80">
                      <strong>USER@@@</strong>
                    </th>
                    <th></th>
                    <th>
                      <strong>COMPLETION DATE</strong>
                    </th>
                    <th>
                      <strong>OPTION</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, index) => {
                    return (
                      <tr>
                        <td>
                          <strong>
                            {item.firstname} {item.lastname}
                          </strong>
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                          <div className="d-flex">
                            <Link
                              href="#"
                              className="btn btn-primary shadow btn-xs sharp me-1">
                              <i class="fa-solid fa-plus"></i>
                            </Link>
                            <Link
                              href="#"
                              className="btn btn-danger shadow btn-xs sharp"
                              onClick={() => deleteOperation(item.id)}>
                              <i class="fa-solid fa-minus"></i>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {/* send Modal */}
                  <Modal className="modal fade" show={sendMessage}>
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">
                          Send Message to Enroll this User
                        </h5>
                        <Button
                          variant=""
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          onClick={() => setSendMessage(false)}>
                          <span>×</span>
                        </Button>
                      </div>
                      <div className="modal-body">
                        <form
                          className="comment-form"
                          onSubmit={(e) => {
                            e.preventDefault();
                            setSendMessage(false);
                          }}>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label
                                  htmlFor="author"
                                  className="text-black font-w600">
                                  {" "}
                                  Name <span className="required">*</span>{" "}
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="Author"
                                  name="Author"
                                  placeholder="Author"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label
                                  htmlFor="email"
                                  className="text-black font-w600">
                                  {" "}
                                  Email <span className="required">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="Email"
                                  placeholder="Email"
                                  name="Email"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mb-3">
                                <label
                                  htmlFor="comment"
                                  className="text-black font-w600">
                                  Comment
                                </label>
                                <textarea
                                  rows={8}
                                  className="form-control"
                                  name="comment"
                                  placeholder="Comment"
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mb-3">
                                <input
                                  type="submit"
                                  value="Enroll User"
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
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div>
        <Button onClick={() => history.goBack()}>Back</Button>
      </div>
    </Fragment>
  );
};

export default Courseusers;
