import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Table, Tab, Tabs, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

const AdmGroupCourses = (props) => {
  const grpId = props.match.params.id;
  const [activeTab, setActiveTab] = useState("groups-users/:id");
  const [allCourses, setAllCourses] = useState([]);
  const [allCoursesTotal, setAllCoursesTotal] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 10; // Number of items to display per page
  const history = useHistory();
  const ID = window.localStorage.getItem("id");
  const token = window.localStorage.getItem("jwt_access_token");

  useEffect(() => {
    getAllCourses();
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

  const getAllCourses = () => {
    const config = {
      headers: {
        "Auth-Token": token,
      },
      params: {
        group_id: grpId,
      },
    };
    axios
      .get(
        "https://v1.eonlearning.tech/lms-service/fetch_courses_group_enrolled_for_inst_learn",
        config
      )
      .then((response) => {
        const data = response.data.data;
        let groupData = data === null ? data : data.course_ids;
        if (groupData === null) {
          groupData = null;
        }
        const groupMap = new Map();
        if (groupData !== null) {
          groupData.forEach((course) => {
            const { course_id, user_id } = course;

            if (!groupMap.has(course_id)) {
              groupMap.set(course_id, course);
            } else if (user_id === null) {
              groupMap.set(course_id, course);
            }
          });
        }
        let filteredGroups = Array.from(groupMap.values());
        if (filteredGroups.length === 0) {
          filteredGroups = null;
        }
        setAllCourses(filteredGroups);
        setAllCoursesTotal(filteredGroups == null ? 0 : filteredGroups.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddGrp = (e, course_id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("group_id", grpId);
    formData.append("course_id", course_id);
    formData.append("generate_token", true);
    const url = "https://v1.eonlearning.tech/group_tab2/add_courses_to_group";
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
      .delete(
        `https://v1.eonlearning.tech/group_tab2/remove_courses_from_group`,
        {
          ...config,
          data: requestBody,
        }
      )
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData =
    allCourses === null ? null : allCourses.slice(startIndex, endIndex);

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey={`edit-groups/${grpId}`} title="Info"></Tab>
              <Tab eventKey={`adm_groups-users/${grpId}`} title="Users"></Tab>
              <Tab
                eventKey={`adm_group-courses/${grpId}`}
                title="Courses"></Tab>
              <Tab eventKey={`adm_group-files/${grpId}`} title="Files"></Tab>
            </Tabs>
            <Card.Header>
              <Card.Title>Added Courses</Card.Title>
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
                    <p className="text-center fs-20 fw-bold">
                      No Course Found.
                    </p>
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
                          <center>
                            {" "}
                            <strong>OPTIONS</strong>
                          </center>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {item.coursename}
                              {item.course_group_enrollment_id !== null && (
                                <span className="enrolled-label">
                                  Added to Group
                                </span>
                              )}
                            </td>
                            <td>
                              <center>
                                {item.course_group_enrollment_id !== null ? (
                                  <div
                                    className="btn btn-danger shadow btn-xs sharp"
                                    title="Remove from group"
                                    onClick={(e) =>
                                      handleRemoveGrp(
                                        e,
                                        item.course_group_enrollment_id
                                      )
                                    }>
                                    <i className="fa-solid fa-minus"></i>
                                  </div>
                                ) : (
                                  <div
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                    title="Add to group"
                                    onClick={(e) =>
                                      handleAddGrp(e, item.user_id)
                                    }>
                                    <i className="fa-solid fa-plus"></i>
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
              )}
              <br />
              <div className="pagination-down">
                <div className="d-flex align-items-center  ">
                  <h4 className=" ">
                    Showing <span>1-10 </span>from{" "}
                    <span>{allCoursesTotal} </span>
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
                      disabled={endIndex >= (allCourses?.length || 0)}>
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

export default AdmGroupCourses;
