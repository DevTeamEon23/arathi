import React, { Fragment, useState, useEffect } from "react";
// import PageTitle from "../../layouts/PageTitle";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Table,
  Dropdown,
  Button,
  Tab,
  Tabs,
  Modal,
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

const AdmCourseusers = (props) => {
  const courseID = props.match.params.id;
  const [activeTab, setActiveTab] = useState("adm_course_users/:id");
  const [userIns, setuserIns] = useState([]);
  const [userInsTotal, setuserInsTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 10; // Number of items to display per page
  let history = useHistory();
  let token = window.localStorage.getItem("jwt_access_token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  useEffect(() => {
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1);
    setActiveTab(tab);
  }, [history.location.pathname]);

  const fetchUsers = async () => {
    let ID = window.localStorage.getItem("id");
    try {
      const queryParams = {
        course_id: courseID,
        admin_user_id: ID,
      };
      const url = new URL(
        "https://v1.eonlearning.tech/lms-service/fetch_users_course_enrolled_for_inst_learn"
      );
      url.search = new URLSearchParams(queryParams).toString();
      const response = await axios.get(url.toString(), {
        headers: {
          "Auth-Token": token,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("API Response:", response.data.data);
      const data = response.data.data;
      setuserIns(data === null ? data : data.course_ids);
      setuserInsTotal(data === null ? 0 : data.course_ids.length);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleEnroll = (e, user_id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("course_id", courseID);
    formData.append("generate_token", true);
    const url =
      "https://v1.eonlearning.tech/course_tab1/enroll_users_to_course";
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
        toast.success("Course Enroll successfully!!!");
        fetchUsers();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to enroll course...");
      });
  };

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
      .delete(
        `https://v1.eonlearning.tech/course_tab1/remove_users_from_course`,
        {
          ...config,
          data: requestBody,
        }
      )
      .then((response) => {
        toast.success("Unenroll successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        fetchUsers();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to Unenroll!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData =
    userIns === null ? null : userIns.slice(startIndex, endIndex);

  return (
    <Fragment>
      <Tabs activeKey={activeTab} onSelect={handleTabChange}>
        <Tab eventKey={`edit-courses/${courseID}`} title="Course"></Tab>
        <Tab eventKey={`adm_course_users/${courseID}`} title="Users"></Tab>
        <Tab eventKey={`adm_course_groups/${courseID}`} title="Groups"></Tab>
      </Tabs>

      <Row>
        <Col lg={12}>
          <Card>
            {" "}
            <Card.Header>
              <Card.Title>Enroll Course</Card.Title>
            </Card.Header>
            <Card.Body>
              {currentData?.length <= 0 ? (
                <div className="loader-container">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="140"
                    visible={true}
                  />
                </div>
              ) : currentData === null ? (
                <>
                  <div>
                    <p className="text-center fs-20 fw-bold">No User Found.</p>
                  </div>
                </>
              ) : (
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
                          <tr key={index}>
                            <td>
                              {item.full_name}
                              {/* {item.enrolled_coursename === null ? (
                                  ""
                                ) : (
                                  <span className="enrolled-label">
                                    Enrolled
                                  </span>
                                )} */}
                            </td>
                            <td>{item.role}</td>
                            <td>
                              <center>-</center>
                            </td>
                            <td>
                              <center>
                                <div
                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                  title="Enroll"
                                  onClick={(e) =>
                                    handleEnroll(e, item.user_id)
                                  }>
                                  <i className="fa-solid fa-plus"></i>
                                </div>

                                <div
                                  className="btn btn-danger shadow btn-xs sharp"
                                  title="Unenroll"
                                  onClick={(e) =>
                                    handleUnEnroll(
                                      e,
                                      item.user_course_enrollment_id
                                    )
                                  }>
                                  <i className="fa-solid fa-minus"></i>
                                </div>
                              </center>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </>
              )}
              <br />
              <div className="pagination-down">
                <div className="d-flex align-items-center  ">
                  <h4 className=" ">
                    Showing <span>1-10 </span>from <span>{userInsTotal} </span>
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
                      disabled={endIndex >= userIns.length}>
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

export default AdmCourseusers;
