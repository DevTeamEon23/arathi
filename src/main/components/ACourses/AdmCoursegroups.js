import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Table, Tab, Tabs, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

const AdmCoursegroups = (props) => {
  const courseID = props.match.params.id;
  const [activeTab, setActiveTab] = useState("adm_course_groups/:id");
  const [UserInsGroups, setUserInsGroups] = useState([]);
  const [UserInsGroupsTotal, setUserInsGroupsTotal] = useState([]); //total data count
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 10; // Number of items to display per page
  const jwtToken = window.localStorage.getItem("jwt_access_token");
  const history = useHistory();

  useEffect(() => {
    getAllCourseGroups();
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

  const getAllCourseGroups = async () => {
    try {
      const queryParams = {
        course_id: courseID,
      };
      const url = new URL(
        "https://beta.eonlearning.tech/lms-service/fetch_groups_course_enrolled_for_inst_learn"
      );
      url.search = new URLSearchParams(queryParams).toString();
      const response = await axios.get(url.toString(), {
        headers: {
          "Auth-Token": jwtToken,
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data.data;
      let groupData = data === null ? data : data.group_ids;
      if (groupData === null) {
        groupData = null;
      }
      const groupMap = new Map(); // Create a map to keep track of courses by their course_id

      // Iterate through the groupData and keep only one entry with "Instructor" role
      if (groupData !== null) {
        groupData.forEach((course) => {
          const { group_id, user_id } = course;

          if (!groupMap.has(group_id)) {
            groupMap.set(group_id, course);
          } else if (user_id === null) {
            groupMap.set(group_id, course);
          }
        });
      }
      // Convert the map values back to an array
      let filteredGroups = Array.from(groupMap.values());
      if (filteredGroups.length === 0) {
        filteredGroups = null;
      }
      setUserInsGroups(filteredGroups);
      setUserInsGroupsTotal(
        filteredGroups === null ? 0 : filteredGroups.length
      );
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleAddGrp = (e, group_id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("group_id", group_id);
    formData.append("course_id", courseID);
    formData.append("generate_token", true);
    const url =
      "https://beta.eonlearning.tech/course_tab2/enroll_group_to_course";
    const authToken = jwtToken;
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Auth-Token": authToken,
        },
      })
      .then((response) => {
        toast.success("Course Added to group successfully!!!");
        getAllCourseGroups();
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
        "Auth-Token": jwtToken,
      },
    };
    const requestBody = {
      id: id,
    };
    axios
      .delete(
        `https://beta.eonlearning.tech/course_tab2/remove_groups_from_course
      `,
        {
          ...config,
          data: requestBody,
        }
      )
      .then((response) => {
        toast.success("Course remove from group successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        getAllCourseGroups();
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
        toast.error("Failed to remove!!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData =
    UserInsGroups === null ? null : UserInsGroups.slice(startIndex, endIndex);

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey={`edit-courses/${courseID}`} title="Course"></Tab>
              <Tab
                eventKey={`adm_course_users/${courseID}`}
                title="Users"></Tab>
              <Tab
                eventKey={`adm_course_groups/${courseID}`}
                title="Groups"></Tab>
            </Tabs>
            <Card.Header>
              <Card.Title>Enrolled Group</Card.Title>
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
                    <p className="text-center fs-20 fw-bold">No Group Found.</p>
                  </div>
                </>
              ) : (
                <>
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
                            <td key={index}>
                              {item.groupname}
                              {item.course_group_enrollment_id !== null && (
                                <span className="enrolled-label">
                                  Added to Course
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
                                      handleAddGrp(e, item.group_id)
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
              <div className="pagination-down">
                <div className="d-flex align-items-center  ">
                  <h4 className=" ">
                    Showing <span>1-10 </span>from{" "}
                    <span>{UserInsGroupsTotal}</span>
                    &nbsp;data
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
                      disabled={endIndex >= (UserInsGroups?.length || 0)}>
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

export default AdmCoursegroups;
