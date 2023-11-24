import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Table, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

const AdUserGroups = (props) => {
  const userId = props.match.params.id;
  const [activeTab, setActiveTab] = useState("insuser-groups/:id");
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 10; // Number of items to display per page
  const [groups, setGroups] = useState([]); //instructor data
  const [totalGrpIns, setTotalGrpIns] = useState(0); // count
  const history = useHistory();
  const jwtToken = window.localStorage.getItem("jwt_access_token");

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
    fetchGroupsAdminIns();
  }, []);

  const fetchGroupsAdminIns = async () => {
    let ID = window.localStorage.getItem("id");
    try {
      const queryParams = {
        user_id: userId,
        inst_user_id: ID,
      };
      const url = new URL(
        "https://beta.eonlearning.tech/lms-service/fetch_enrolled_groups_for_inst_learn"
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
      const groupMap = new Map();
      if (groupData !== null) {
        groupData.forEach((group) => {
          const { group_id, user_role } = group;

          if (!groupMap.has(group_id)) {
            groupMap.set(group_id, group);
          } else if (user_role === "Learner") {
            groupMap.set(group_id, group);
          }
        });
      }
      let filteredGroups = Array.from(groupMap.values());
      if (filteredGroups.length === 0) {
        filteredGroups = null;
      }
      setGroups(filteredGroups);
      setTotalGrpIns(filteredGroups === null ? 0 : filteredGroups.length);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleAddGrp = (e, group_id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("group_id", group_id);
    formData.append("user_id", userId);
    formData.append("generate_token", true);
    const url = "https://beta.eonlearning.tech/user-tab2/enroll_groups_to_user";
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Auth-Token": jwtToken,
        },
      })
      .then((response) => {
        toast.success("Added to group successfully!!!");
        fetchGroupsAdminIns();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to add...");
      });
  };

  const handleRemoveGrp = (e, id) => {
    e.preventDefault();
    const baseUrl =
      "https://beta.eonlearning.tech/lms-service/remove_groups_from_enrolled_user";
    const data_user_group_enrollment_id = id;

    const headers = {
      "Auth-Token": jwtToken,
    };
    const config = {
      headers: headers,
    };

    axios
      .delete(
        `${baseUrl}?data_user_group_enrollment_id=${data_user_group_enrollment_id}`,
        config
      )
      .then((response) => {
        toast.success("Removed from group successfully!!!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        fetchGroupsAdminIns();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to remove...", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData =
    groups === null ? null : groups.slice(startIndex, endIndex);

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey={`insedit-user/${userId}`} title="Info"></Tab>
              <Tab eventKey={`insuser-course/${userId}`} title="Courses"></Tab>
              <Tab eventKey={`insuser-groups/${userId}`} title="Groups"></Tab>
              <Tab eventKey={`insuser-files/${userId}`} title="Files"></Tab>
            </Tabs>
            <div className="card-header">
              <h4 className="card-title">Groups </h4>
            </div>
            <div className="card-body">
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
                        <th className="text-center">
                          <strong>OPTIONS</strong>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentData?.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {data.groupname}
                              {data.user_role === "Learner" ? (
                                <span className="enrolled-label">
                                  Group Member
                                </span>
                              ) : (
                                ""
                              )}
                              {data.user_group_enrollment_id === null && (
                                <span className="enrolled-label">Created</span>
                              )}
                            </td>
                            <td className="text-center">
                              {data.user_role === "Instructor" ? (
                                <div
                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                  title="Add to group"
                                  onClick={(e) =>
                                    handleAddGrp(e, data.group_id)
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
                                      data.user_group_enrollment_id
                                    )
                                  }>
                                  <i className="fa-solid fa-minus"></i>
                                </div>
                              )}
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
                    Showing <span>1-10 </span>from <span>{totalGrpIns} </span>
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
                      disabled={endIndex >= (groups?.length || 0)}>
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdUserGroups;
