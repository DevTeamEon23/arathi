import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { Button, Table, Tab, Tabs } from "react-bootstrap";

const UserGroups = (props) => {
  const userId = props.match.params.id;
  const [activeTab, setActiveTab] = useState("user-groups/:id");
  const [allGrps, setAllGrps] = useState([]);
  const [totalGrpData, setTotalGrpData] = useState(0);
  const [token, setToken] = useState(); //auth token
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 10; // Number of items to display per page
  const history = useHistory();

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

  // Group List Api
  const getAllGroups = () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const config = {
      headers: {
        "Auth-Token": jwtToken,
      },
      params: {
        user_id: userId,
      },
    };
    axios
      .get("https://v1.eonlearning.tech/user-tab2/fetch_groups_of_user", config)
      .then((response) => {
        const grps = response.data.data.user_ids;
        setAllGrps(grps);
        setTotalGrpData(response.data.data.user_ids.length);
      })
      .catch((error) => {
        toast.error("Failed to fetch groups!!!");
      });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = allGrps.slice(startIndex, endIndex);

  const handleAddGrp = (e, group_id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("group_id", group_id);
    formData.append("user_id", userId);
    formData.append("generate_token", true);
    const url = "https://v1.eonlearning.tech/user-tab2/enroll_groups_to_user";
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Auth-Token": token,
        },
      })
      .then((response) => {
        toast.success("Added to group successfully!!!");
        getAllGroups();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to add...");
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
      .delete(`https://v1.eonlearning.tech/user-tab2/remove_groups_from_user`, {
        ...config,
        data: requestBody,
      })
      .then((response) => {
        toast.success("Removed from group successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        getAllGroups();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to remove...", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey={`edit-user/${userId}`} title="Info"></Tab>
              <Tab
                eventKey={`user-courses-info/${userId}`}
                title="Courses"></Tab>
              <Tab eventKey={`user-groups/${userId}`} title="Groups"></Tab>
              <Tab eventKey={`user-files/${userId}`} title="Files"></Tab>
            </Tabs>
            <div className="card-header">
              <h4 className="card-title">Groups</h4>
            </div>
            <div className="card-body">
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
              ) : currentData.length > 0 ? (
                <>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="text-center">
                          <strong>GROUP</strong>
                        </th>
                        <th className="text-center">
                          <strong>OPTIONS</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allGrps.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-center">{data.groupname}</td>
                            <td className="text-center">
                              {data.user_group_enrollment_id === null ? (
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
              ) : (
                <>
                  <div>
                    <p className="text-center fs-20 fw-bold">No Group Found.</p>
                  </div>
                </>
              )}
              <br />
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
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserGroups;
