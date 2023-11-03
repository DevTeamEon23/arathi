import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Table, Button, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

const AdmGroupsUsers = (props) => {
  const grpId = props.match.params.id;
  const [activeTab, setActiveTab] = useState("adm_groups-users/:id");
  const [allLearnerUsers, setAllLearnerUsers] = useState([]);
  const [allLearnerUsersTotal, setAllLearnerUsersTotal] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 10; // Number of items to display per page
  const history = useHistory();
  const ID = window.localStorage.getItem("id");
  const token = window.localStorage.getItem("jwt_access_token");

  useEffect(() => {
    getAllUsers();
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

  const getAllUsers = () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const config = {
      headers: {
        "Auth-Token": jwtToken,
      },
      params: {
        group_id: grpId,
        inst_user_id: ID,
      },
    };
    axios
      .get(
        "https://v1.eonlearning.tech/lms-service/fetch_users_of_group_enrolled_for_inst_learn",
        config
      )
      .then((response) => {
        console.log(response.data.data);
        const data = response.data.data;
        let userData = data === null ? data : data.group_ids;
        if (userData === null) {
          userData = null;
        }
        const userMap = new Map(); // Create a map to keep track of courses by their course_id

        // Iterate through the userData and keep only one entry with "Instructor" role
        if (userData !== null) {
          userData.forEach((group) => {
            const { user_id, user_group_enrollment_id } = group;

            if (!userMap.has(user_id)) {
              userMap.set(user_id, group);
            } else if (user_group_enrollment_id !== null) {
              userMap.set(user_id, group);
            }
          });
        }
        // Convert the map values back to an array
        let filteredGrpUsers = Array.from(userMap.values());
        if (filteredGrpUsers.length === 0) {
          filteredGrpUsers = null;
        }
        const filteredData = filteredGrpUsers.filter(
          (user) => user.user_id != ID
        );
        console.log(filteredGrpUsers, filteredData);

        setAllLearnerUsers(filteredData);
        setAllLearnerUsersTotal(filteredData == null ? 0 : filteredData.length);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to fetch users!");
      });
  };

  const handleEnroll = (e, user_id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("group_id", grpId);
    formData.append("generate_token", true);
    const url = "https://v1.eonlearning.tech/group_tab1/add_users_to_group";
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Auth-Token": token,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("User added successfully!!!");
        getAllUsers();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to add user...");
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
        `https://v1.eonlearning.tech/group_tab1/remove_users_from_group`,
        {
          ...config,
          data: requestBody,
        }
      )
      .then((response) => {
        toast.success("User removed successfully!!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        getAllUsers();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to remove user!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData =
    allLearnerUsers === null
      ? null
      : allLearnerUsers.slice(startIndex, endIndex);

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
              <Card.Title>Added Users</Card.Title>
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
                              {item.user_group_enrollment_id === null ? (
                                ""
                              ) : (
                                <span className="enrolled-label">
                                  Group Member
                                </span>
                              )}
                            </td>
                            <td>
                              <center>
                                {item.user_group_enrollment_id === null ? (
                                  <div
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                    title="Add to group"
                                    onClick={(e) =>
                                      handleEnroll(e, item.user_id)
                                    }>
                                    <i className="fa-solid fa-plus"></i>
                                  </div>
                                ) : (
                                  <div
                                    className="btn btn-danger shadow btn-xs sharp"
                                    title="Remove from group"
                                    onClick={(e) =>
                                      handleUnEnroll(
                                        e,
                                        item.user_group_enrollment_id
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
                </>
              )}
              <br />
              <div className="pagination-down">
                <div className="d-flex align-items-center  ">
                  <h4 className=" ">
                    Showing <span>1-10 </span>from{" "}
                    <span>{allLearnerUsersTotal} </span>
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
                      disabled={endIndex >= (allLearnerUsers?.length || 0)}>
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

export default AdmGroupsUsers;
