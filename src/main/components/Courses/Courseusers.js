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
  Modal,
  Tab,
  Tabs,
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const Courseusers = (props) => {
  const courseID = props.match.params.id;
  console.log({ courseID });
  const [adminUsers, setAdminUsers] = useState([]);
  const [token, setToken] = useState(); //auth token
  const [activeTab, setActiveTab] = useState("course_users/:id");
  const [enrolledUserId, setEnrolledUserId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    // getAllUsers(courseID, token)
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
        console.log(response.data.data.user_ids);
        const allUsers = response.data.data.user_ids;
        // const adminUsers = allUsers.filter((user) => user.role === "Admin");
        setAdminUsers(allUsers);
      })
      .catch((error) => {
        toast.error("Failed to fetch users!");
      });
  };

  // const getAllUsers = async (id, authToken) => {
  //   console.log('@@', id, authToken)
  //   try {
  //     const response = await axios.get(
  //       'http://127.0.0.1:8000/lms-service/enrollusers_course_by_onlyid',
  //       {
  //         headers: {
  //           'Auth-Token': authToken,
  //         },
  //         params: {
  //           course_id: courseID,
  //         },
  //       }
  //     )

  //     console.log('res', response.data.data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const handleEnroll = (e, user_id) => {
    e.preventDefault();
    console.log("inside handle enroll");
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("course_id", courseID);
    formData.append("generate_token", true);
    const url = "http://127.0.0.1:8000/lms-service/enroll_course";
    const authToken = token;
    console.log(user_id, courseID);
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
        setEnrolledUserId(user_id);
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

  const handleUnEnroll = (e) => {
    e.preventDefault();
    console.log("inside handle unenroll");
    const config = {
      headers: {
        "Auth-Token": token,
      },
    };
    const requestBody = {
      id: "",
    };
    axios
      .delete(`https://v1.eonlearning.tech/lms-service/unenroll_user_course`, {
        ...config,
        data: requestBody,
      })
      .then((response) => {
        // setShowModal(false)
        getAllUsers();
        toast.success("Unenroll successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
        toast.error("Failed to Unenroll!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

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
                  {adminUsers?.map((item, index) => {
                    return (
                      <tr>
                        <td>
                          {item.full_name}
                          {enrolledUserId === item.user_id && (
                            <span className="enrolled-label">Enrolled</span>
                          )}
                        </td>
                        <td>{item.role}</td>
                        <td>
                          <center>-</center>
                        </td>
                        <td>
                          <center>
                            {enrolledUserId === item.user_id ? (
                              <div
                                className="btn btn-danger shadow btn-xs sharp"
                                onClick={(e) =>
                                  handleUnEnroll(e, item.user_id)
                                }>
                                <i class="fa-solid fa-minus"></i>
                              </div>
                            ) : (
                              <div
                                className="btn btn-primary shadow btn-xs sharp me-1"
                                title="Enroll"
                                onClick={(e) => handleEnroll(e, item.user_id)}>
                                <i class="fa-solid fa-plus"></i>
                              </div>
                            )}
                          </center>
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
      <div>
        <Button onClick={() => history.goBack()}>Back</Button>
      </div>
    </Fragment>
  );
};

export default Courseusers;
