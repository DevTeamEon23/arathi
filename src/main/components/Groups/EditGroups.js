import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Tab, Tabs } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { RotatingLines } from "react-loader-spinner";

const EditGroups = (props) => {
  const grpId = props.match.params.id;
  const [groupId, setGrpId] = useState("");
  const [token, setToken] = useState(); //auth token
  const [grpData, setGrpData] = useState(); //Group data by id
  const [userId, setUserId] = useState();
  const [groupname, setGroupname] = useState("");
  const [groupdesc, setGroupdesc] = useState("");
  const [groupkey, setGroupkey] = useState("");
  const [activeTab, setActiveTab] = useState("edit-groups/:id");
  const history = useHistory();
  const roleType = window.localStorage.getItem("role");

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    // getGrpById();
    if (grpId !== undefined) {
      setGrpId(grpId);
      getGrpById(grpId, token);
    }
  }, []);

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

  // Group details by ID
  const getGrpById = async (id, authToken) => {
    try {
      const response = await axios.get(
        "https://beta.eonlearning.tech/lms-service/groups_by_onlyid",
        {
          headers: {
            "Auth-Token": authToken,
          },
          params: {
            id: id,
          },
        }
      );
      setGrpData(response.data.data);
      if (response.data.status === "success") {
        console.log(response.data.data);
        const res = response.data.data;
        setGroupname(res.groupname);
        setGroupdesc(res.groupdesc);
        setGroupkey(res.groupkey);
        setUserId(res.user_id);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch group details!"); // Handle the error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", groupId);
    formData.append("user_id", userId);
    formData.append("groupname", groupname);
    formData.append("groupdesc", groupdesc);
    formData.append("groupkey", groupkey);
    formData.append("generate_token", true);
    const url = "https://beta.eonlearning.tech/lms-service/update_groups";
    const authToken = window.localStorage.getItem("jwt_access_token");

    console.log(groupId, groupname, groupdesc, groupkey);

    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Auth-Token": authToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Group added successfully!!!");
        history.push(`/groups`);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to add Group...");
      });
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            {roleType === "Instructor" ? (
              <Tabs activeKey={activeTab} onSelect={handleTabChange}>
                <Tab eventKey={`edit-groups/${grpId}`} title="Info"></Tab>
                <Tab eventKey={`adm_groups-users/${grpId}`} title="Users"></Tab>
                <Tab
                  eventKey={`adm_group-courses/${grpId}`}
                  title="Courses"></Tab>
                <Tab eventKey={`adm_group-files/${grpId}`} title="Files"></Tab>
              </Tabs>
            ) : (
              <Tabs activeKey={activeTab} onSelect={handleTabChange}>
                <Tab eventKey={`edit-groups/${grpId}`} title="Info"></Tab>
                <Tab eventKey={`groups-users/${grpId}`} title="Users"></Tab>
                <Tab eventKey={`group-courses/${grpId}`} title="Courses"></Tab>
                <Tab eventKey={`group-files/${grpId}`} title="Files"></Tab>
              </Tabs>
            )}
            <div className="card-header">
              <h4 className="card-title">Edit Groups</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                {grpData === undefined ? (
                  <div className="loader-container">
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="130"
                      visible={true}
                    />
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-xl-10">
                        <div className="form-group mb-3 row">
                          <label
                            className="col-lg-4 col-form-label"
                            htmlFor="groupname">
                            Name
                            <span className="text-danger">*</span>
                          </label>
                          <div className="col-lg-6">
                            <input
                              type="text"
                              className="form-control"
                              id="groupname"
                              name="groupname"
                              placeholder="E.g Startup Courses"
                              value={groupname}
                              onChange={(e) => setGroupname(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="form-group mb-3 row">
                          <label
                            className="col-lg-4 col-form-label"
                            htmlFor="groupdesc">
                            Description <span className="text-danger">*</span>
                          </label>
                          <div className="col-lg-6">
                            <textarea
                              className="form-control"
                              id="groupdesc"
                              name="groupdesc"
                              rows="5"
                              placeholder="Short Description about course.."
                              value={groupdesc}
                              onChange={(e) => setGroupdesc(e.target.value)}
                              style={{ resize: "none" }}></textarea>
                          </div>
                        </div>
                        <div className="col-lg-04"></div>
                        <br />

                        <div className="form-group mb-3 row"></div>
                        <div className="form-group mb-3 row">
                          <label
                            className="col-lg-4 col-form-label"
                            htmlFor="groupkey">
                            Group Key
                            <span className="text-danger">*</span>
                          </label>
                          <div className="col-lg-6">
                            <input
                              type="text"
                              className="form-control"
                              id="groupkey"
                              name="groupkey"
                              placeholder="Enter Group Key"
                              value={groupkey}
                              onChange={(e) => setGroupkey(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="form-group mb-3 row mt-5">
                          <div className="col-lg-8 ms-auto">
                            <Button
                              type="submit"
                              className="btn me-2 btn-primary">
                              Edit Group
                            </Button>
                            <Link to="/groups">
                              <Button className="btn me-2 btn-light">
                                Cancel
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditGroups;
