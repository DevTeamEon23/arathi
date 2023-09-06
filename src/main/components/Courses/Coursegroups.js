import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Table, Button, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

const Coursegroups = (props) => {
  const courseID = props.match.params.id;

  const [allGrps, setAllGrps] = useState([]);
  const [totalGrpData, setTotalGrpData] = useState(); //user list data
  const [activeTab, setActiveTab] = useState("course_groups/:id");
  const [token, setToken] = useState(); //auth token
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
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1);
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
      params: {
        course_id: courseID,
      },
    };
    axios
      .get("http://127.0.0.1:8000/course_tab2/fetch_groups_of_course", config)
      .then((response) => {
        const grps = response.data.data.groups_ids;
        setAllGrps(grps);
        setTotalGrpData(response.data.data.groups_ids.length);
      })
      .catch((error) => {
        toast.error("Failed to fetch groups!!!");
      });
  };

  const handleAddGrp = (e, group_id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("group_id", group_id);
    formData.append("course_id", courseID);
    formData.append("generate_token", true);
    const url = "http://127.0.0.1:8000/course_tab2/enroll_group_to_course";
    const authToken = token;
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Auth-Token": authToken,
        },
      })
      .then((response) => {
        toast.success("Course Added to group successfully!!!");
        getAllGroups();
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
        `http://127.0.0.1:8000/course_tab2/remove_groups_from_course
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
        getAllGroups();
      })
      .catch((error) => {
        // Handle the error
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
              <Tab eventKey={`edit-courses/${courseID}`} title="Course"></Tab>
              <Tab eventKey={`course_users/${courseID}`} title="Users"></Tab>
              <Tab eventKey={`course_groups/${courseID}`} title="Groups"></Tab>
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
                              {item.enrolled_coursename === null ? (
                                ""
                              ) : (
                                <span className="enrolled-label">
                                  Group Member
                                </span>
                              )}
                            </td>
                            <td>
                              <center>
                                {item.course_group_enrollment_id === null ? (
                                  <div
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                    title="Add to group"
                                    onClick={(e) =>
                                      handleAddGrp(e, item.group_id)
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
                                        item.course_group_enrollment_id
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
                        <span>{totalGrpData} </span>
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

export default Coursegroups;
