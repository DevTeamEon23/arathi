import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
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
  Tab,
  Tabs,
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

const Coursegroups = (props) => {
  const courseID = props.match.params.id;
  console.log({ courseID });

  const [allGrps, setAllGrps] = useState([]);
  const [totalGrpData, setTotalGrpData] = useState(); //user list data
  const [activeTab, setActiveTab] = useState("course_groups/:id");
  const [token, setToken] = useState(); //auth token
  const [btnLoader, setBtnLoader] = useState(false); //Loader
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 10; // Number of items to display per page
  const history = useHistory();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = allGrps.slice(startIndex, endIndex);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  useEffect(() => {
    // When the component mounts, set the active tab based on the current route
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1); // Remove the leading slash
    setActiveTab(tab);
  }, [history.location.pathname]);

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    getAllGroups();
  }, []);

  // User List Api
  const getAllGroups = () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const config = {
      headers: {
        "Auth-Token": jwtToken,
      },
    };
    axios
      .get(
        "http://127.0.0.1:8000/lms-service/fetch_enrollcourses_group",
        config
      )
      .then((response) => {
        console.log(response.data.data);
        const grps = response.data.data.course_ids;
        setAllGrps(grps);
        // const adminUsers = allUsers.filter((user) => user.role === "Admin");
        setTotalGrpData(response.data.data.course_ids.length);
      })
      .catch((error) => {
        toast.error("Failed to fetch users!");
      });
  };

  const handleEnroll = (e, group_id) => {
    e.preventDefault();
    setBtnLoader(true);
    const formData = new FormData();
    formData.append("group_id", group_id);
    formData.append("course_id", courseID);
    formData.append("generate_token", true);
    const url = "http://127.0.0.1:8000/lms-service/enroll_course_group";
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
        getAllGroups();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to enroll course...");
        setBtnLoader(false);
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
        `http://127.0.0.1:8000/lms-service/unenroll_course_group
      `,
        {
          ...config,
          data: requestBody,
        }
      )
      .then((response) => {
        toast.success("Unenroll successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        getAllGroups();
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
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <strong>GROUP</strong>
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
                          <strong>{item.groupname}</strong>
                          {item.coursename === null ? (
                            ""
                          ) : (
                            <span className="enrolled-label">Group Member</span>
                          )}
                        </td>
                        <td>
                          <center>
                            {item.course_group_enrollment_id === null ? (
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
                                    title="Add to group"
                                    onClick={(e) =>
                                      handleEnroll(e, item.group_id)
                                    }>
                                    <i class="fa-solid fa-plus"></i>
                                  </div>
                                )}
                              </>
                            ) : (
                              <div
                                className="btn btn-danger shadow btn-xs sharp"
                                title="Remove from group"
                                onClick={(e) =>
                                  handleUnEnroll(
                                    e,
                                    item.course_group_enrollment_id
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
              <div className="pagination-down">
                <div className="d-flex align-items-center  ">
                  <h4 className=" ">
                    Showing <span>1-10 </span>from <span>{totalGrpData} </span>
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
                      disabled={endIndex >= allGrps.length}>
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

export default Coursegroups;
