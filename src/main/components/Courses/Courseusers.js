import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Tab,
  Tabs,
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { RotatingLines } from "react-loader-spinner";

const Courseusers = (props) => {
  const courseID = props.match.params.id;
  console.log({ courseID });
  const [adminUsers, setAdminUsers] = useState([]);
  const [token, setToken] = useState(); //auth token
  const [activeTab, setActiveTab] = useState("course_users/:id");
  const [totalUserData, setTotalUserData] = useState(); //user list data
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [btnLoader, setBtnLoader] = useState(false); //Loader
  const itemsPerPage = 10; // Number of items to display per page
  const history = useHistory();

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    getAllUsers();
  }, []);

  // User List Api
  const getAllUsers = () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const config = {
      headers: {
        "Auth-Token": jwtToken,
      },
    };
    axios
      .get("http://127.0.0.1:8000/lms-service/fetch_enrollusers_course", config)
      .then((response) => {
        console.log(response.data.data);
        const allUsers = response.data.data.user_ids;
        // const adminUsers = allUsers.filter((user) => user.role === "Admin");
        setAdminUsers(allUsers);
        setTotalUserData(response.data.data.user_ids.length);
      })
      .catch((error) => {
        toast.error("Failed to fetch users!");
      });
  };

  const handleEnroll = (e, user_id) => {
    e.preventDefault();
    setBtnLoader(true);
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("course_id", courseID);
    formData.append("generate_token", true);
    const url = "http://127.0.0.1:8000/lms-service/enroll_course";
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
        setBtnLoader(false);
        toast.success("Course Enroll successfully!!!");
        getAllUsers();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to enroll course...");
        setBtnLoader(false);
      });
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

  const handleUnEnroll = (e, id) => {
    e.preventDefault();
    const config = {
      headers: {
        "Auth-Token": token,
      },
    };
    const requestBody = {
      id: id,
    };
    axios
      .delete(`https://v1.eonlearning.tech/lms-service/unenroll_user_course`, {
        ...config,
        data: requestBody,
      })
      .then((response) => {
        toast.success("Unenroll successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        getAllUsers();
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
        toast.error("Failed to Unenroll!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = adminUsers.slice(startIndex, endIndex);

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey={`edit-courses/${courseID}`} title="Course"></Tab>
              <Tab eventKey={`course_users/${courseID}`} title="Users"></Tab>
              <Tab eventKey={`course_groups/${courseID}`} title="Groups"></Tab>
            </Tabs>
            <Card.Header>
              <Card.Title>Enroll Course</Card.Title>
            </Card.Header>
            <Card.Body>
              {currentData.length === 0 ? (
                <div className="loader-container">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="140"
                    visible={true}
                  />
                </div>
              ) : currentData.length > 0 ? (
                <>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>
                          <strong>USER</strong>
                        </th>
                        <th>
                          <strong>ROLE</strong>
                        </th>
                        <th>
                          <center>
                            {" "}
                            <strong>COMPLETION DATE</strong>
                          </center>
                        </th>
                        <th>
                          <center>
                            {" "}
                            <strong>OPTION</strong>
                          </center>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData?.map((item, index) => {
                        return (
                          <tr>
                            <td>
                              {item.full_name}
                              {item.coursename === null ? (
                                ""
                              ) : (
                                <span className="enrolled-label">Enrolled</span>
                              )}
                            </td>
                            <td>{item.role}</td>
                            <td>
                              <center>-</center>
                            </td>
                            <td>
                              <center>
                                {item.coursename === null ? (
                                  <>
                                    {btnLoader ? (
                                      <CircularProgress
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          color: "#fff",
                                        }}
                                      />
                                    ) : (
                                      <div
                                        className="btn btn-primary shadow btn-xs sharp me-1"
                                        title="Enroll"
                                        onClick={(e) =>
                                          handleEnroll(e, item.user_id)
                                        }>
                                        <i class="fa-solid fa-plus"></i>
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <div
                                    className="btn btn-danger shadow btn-xs sharp"
                                    title="Unenroll"
                                    onClick={(e) =>
                                      handleUnEnroll(
                                        e,
                                        item.user_course_enrollment_id
                                      )
                                    }>
                                    <i class="fa-solid fa-minus"></i>
                                  </div>
                                )}
                              </center>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-center fs-20 fw-bold">No User Found.</p>
                  </div>
                </>
              )}
              <br />
              <div className="pagination-down">
                <div className="d-flex align-items-center  ">
                  <h4 className=" ">
                    Showing <span>1-10 </span>from <span>{totalUserData} </span>
                    data
                  </h4>
                  <div className="d-flex align-items-center ms-auto mt-2">
                    <Button
                      className="mr-2"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}>
                      Previous
                    </Button>
                    &nbsp;&nbsp;
                    <span className=" fs-18 fw-bold ">
                      Page {currentPage} &nbsp;&nbsp;
                    </span>
                    <Button
                      className="ml-2"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={endIndex >= adminUsers.length}>
                      Next
                    </Button>
                  </div>
                </div>
              </div>
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
