import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Nav,
  Modal,
  Tab,
  Tabs,
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

const GroupCourses = (props) => {
  const grpId = props.match.params.id;
  const [activeTab, setActiveTab] = useState("group-courses/:id");
  const [coursesAll, setCoursesAll] = useState([]);
  const [totalCourseData, setTotalCourseData] = useState(0);
  const [token, setToken] = useState(); //auth token
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 10; // Number of items to display per page
  const history = useHistory();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = coursesAll.slice(startIndex, endIndex);

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    getAllCourses();
  }, []);

  // Courses List Api
  const getAllCourses = () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const config = {
      headers: {
        "Auth-Token": jwtToken,
      },
      params: {
        group_id: grpId,
      },
    };
    axios
      .get("http://127.0.0.1:8000/group_tab2/fetch_courses_of_group", config)
      .then((response) => {
        const allUsers = response.data.data.courses_ids;
        setCoursesAll(allUsers);
        setTotalCourseData(response.data.data.courses_ids.length);
      })
      .catch((error) => {
        toast.error("Failed to fetch courses!");
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

  const handleAddGrp = (e, course_id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("group_id", grpId);
    formData.append("course_id", course_id);
    formData.append("generate_token", true);
    const url = "http://127.0.0.1:8000/group_tab2/add_courses_to_group";
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Auth-Token": token,
        },
      })
      .then((response) => {
        toast.success("Course Added to group successfully!!!");
        getAllCourses();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to add course...");
      });
  };

  const handleRemoveGrp = (e, id) => {
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
      .delete(`http://127.0.0.1:8000/group_tab2/remove_courses_from_group`, {
        ...config,
        data: requestBody,
      })
      .then((response) => {
        toast.success("Course remove from group successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        getAllCourses();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to remove!!!", {
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
              <Tab eventKey={`edit-groups/${grpId}`} title="Info"></Tab>
              <Tab eventKey={`groups-users/${grpId}`} title="Users"></Tab>
              <Tab eventKey={`group-courses/${grpId}`} title="Courses"></Tab>
              <Tab eventKey={`group-files/${grpId}`} title="Files"></Tab>
            </Tabs>
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
              ) : (
                <>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>
                          <strong>COURSE</strong>
                        </th>
                        <th>
                          <strong>CATEGORY</strong>
                        </th>
                        <th className="text-center">
                          <strong>OPTIONS</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {data.coursename}
                              {data.course_group_enrollment_id === null ? (
                                ""
                              ) : (
                                <span className="enrolled-label">
                                  Group Member
                                </span>
                              )}
                            </td>
                            <td>{data.category}</td>
                            <td>
                              <center>
                                {data.course_group_enrollment_id === null ? (
                                  <div
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                    title="Add to group"
                                    onClick={(e) =>
                                      handleAddGrp(e, data.course_id)
                                    }>
                                    <i className="fa-solid fa-plus"></i>
                                  </div>
                                ) : (
                                  <div
                                    className="btn btn-danger shadow btn-xs sharp"
                                    title="Remove from group"
                                    onClick={(e) =>
                                      handleRemoveGrp(
                                        e,
                                        data.course_group_enrollment_id
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
                  </Table>
                  <div className="pagination-down">
                    <div className="d-flex align-items-center  ">
                      <h4 className=" ">
                        Showing <span>1-10 </span>from{" "}
                        <span>{totalCourseData} </span>
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
                          disabled={endIndex >= coursesAll.length}>
                          Next
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
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

export default GroupCourses;
