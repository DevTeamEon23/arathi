import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Table, Button, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

const Courseusers = (props) => {
  const courseID = props.match.params.id;
  const [adminUsers, setAdminUsers] = useState([]);
  const [token, setToken] = useState(); //auth token
  const [userAdmin, setuserAdmin] = useState([]);
  const [userAdminTotal, setuserAdminTotal] = useState(0);
  const [activeTab, setActiveTab] = useState("course_users/:id");
  const [totalUserData, setTotalUserData] = useState(0); //user list data
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 10; // Number of items to display per page
  const history = useHistory();
  const jwtToken = window.localStorage.getItem("jwt_access_token");
  const roleType = window.localStorage.getItem("role");

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(jwtToken);
    getAllUsers();
    if (roleType === "Admin") {
      fetchUsers();
    } else {
      getAllUsers();
    }
  }, []);

  // User List Api
  const getAllUsers = () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const config = {
      headers: {
        "Auth-Token": jwtToken,
      },
      params: {
        course_id: courseID,
      },
    };
    axios
      .get(
        "https://v1.eonlearning.tech/course_tab1/fetch_enroll_users_of_course",
        config
      )
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
          "Auth-Token": jwtToken,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("API Response:", response.data.data);
      const data = response.data.data;
      setuserAdmin(data === null ? data : data.course_ids);
      setuserAdminTotal(data === null ? 0 : data.course_ids.length);
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
        getAllUsers();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to enroll course...");
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
        getAllUsers();
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
  let currentData;

  console.log(adminUsers, userAdmin);
  if (roleType === "Superadmin") {
    currentData =
      adminUsers === null ? null : adminUsers.slice(startIndex, endIndex);
  } else {
    currentData =
      userAdmin === null ? null : userAdmin.slice(startIndex, endIndex);
  }

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            {/* <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey={`edit-courses/${courseID}`} title="Course"></Tab>
              <Tab eventKey={`course_users/${courseID}`} title="Users"></Tab>
              <Tab eventKey={`course_groups/${courseID}`} title="Groups"></Tab>
            </Tabs> */}
            {roleType === "Instructor" ? (
              <Tabs activeKey={activeTab} onSelect={handleTabChange}>
                <Tab eventKey={`edit-courses/${courseID}`} title="Course"></Tab>
                <Tab
                  eventKey={`adm_course_users/${courseID}`}
                  title="Users"></Tab>
                <Tab
                  eventKey={`course_groups/${courseID}`}
                  title="Groups"></Tab>
              </Tabs>
            ) : (
              <Tabs activeKey={activeTab} onSelect={handleTabChange}>
                <Tab eventKey={`edit-courses/${courseID}`} title="Course"></Tab>
                <Tab eventKey={`course_users/${courseID}`} title="Users"></Tab>
                <Tab
                  eventKey={`course_groups/${courseID}`}
                  title="Groups"></Tab>
              </Tabs>
            )}
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
                    {roleType === "Superadmin" ? (
                      <tbody>
                        {currentData?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                {item.full_name}
                                {item.enrolled_coursename === null ? (
                                  ""
                                ) : (
                                  <span className="enrolled-label">
                                    Enrolled
                                  </span>
                                )}
                              </td>
                              <td>{item.role}</td>
                              <td>
                                <center>-</center>
                              </td>
                              <td>
                                <center>
                                  {item.enrolled_coursename === null ? (
                                    <div
                                      className="btn btn-primary shadow btn-xs sharp me-1"
                                      title="Enroll"
                                      onClick={(e) =>
                                        handleEnroll(e, item.user_id)
                                      }>
                                      <i className="fa-solid fa-plus"></i>
                                    </div>
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
                                      <i className="fa-solid fa-minus"></i>
                                    </div>
                                  )}
                                </center>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    ) : (
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
                    )}
                  </Table>
                </>
              )}
              <br />
              <div className="pagination-down">
                <div className="d-flex align-items-center  ">
                  <h4 className=" ">
                    Showing <span>1-10 </span>from{" "}
                    <span>
                      {roleType === "Superadmin"
                        ? totalUserData
                        : userAdminTotal}{" "}
                    </span>
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
                    {roleType === "Superadmin" ? (
                      <Button
                        className="ml-2"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={endIndex >= adminUsers.length}>
                        Next
                      </Button>
                    ) : (
                      <Button
                        className="ml-2"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={endIndex >= userAdmin.length}>
                        Next
                      </Button>
                    )}
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
