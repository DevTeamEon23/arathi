import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Button,
  Nav,
  Tab,
  Tabs,
} from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";

const AddGroups = () => {
  // const [id, setId] = useState("");
  const [groupname, setGroupname] = useState("");
  const [groupdesc, setGroupdesc] = useState("");
  const [groupkey, setGroupkey] = useState("");
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);
  const [activeTab, setActiveTab] = useState("dashboard");
  let history = useHistory();

  useEffect(() => {
    setGroupkey(small_id);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let ID = window.localStorage.getItem("id");
    const formData = new FormData();
    formData.append("user_id", ID);
    formData.append("groupname", groupname);
    formData.append("groupdesc", groupdesc);
    formData.append("groupkey", groupkey);
    formData.append("generate_token", true);
    const url = "https://v1.eonlearning.tech/lms-service/addgroups";
    const authToken = window.localStorage.getItem("jwt_access_token");

    console.log(groupname, groupdesc, groupkey);
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
        clearAllState();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to add Group...");
      });
  };

  const clearAllState = () => {
    setGroupname("");
    setGroupdesc("");
    setGroupkey("");
  };

  return (
    <Fragment>
      <Tabs activeKey={activeTab} onSelect={handleTabChange}>
        <Tab eventKey="dashboard" title="Dashboard"></Tab>
        <Tab eventKey="groups" title="Groups"></Tab>
      </Tabs>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Groups</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-10">
                      {/* <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username">
                          id
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            name="id"
                            placeholder="e.g. 1"
                            onChange={(e) => setId(e.target.value)}
                          />
                        </div>
                      </div> */}
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
                            required
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
                            placeholder="Short Description about Group.."
                            value={groupdesc}
                            onChange={(e) => setGroupdesc(e.target.value)}
                            style={{ resize: "none" }}
                            required></textarea>
                        </div>
                      </div>
                      <div className="col-lg-04"></div>

                      {/* <div className="form-group mb-3 row"></div> */}
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="groupkey">
                          Group Key
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          {/* <p>{small_id}</p> */}
                          <input
                            type="text"
                            className="form-control"
                            id="groupkey"
                            name="groupkey"
                            placeholder="Enter Group Key"
                            value={groupkey}
                            onChange={(e) => setGroupkey(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row mt-5">
                        <div className="col-lg-8 ms-auto">
                          <Button
                            type="submit"
                            className="btn me-2 btn-primary">
                            Add Group
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddGroups;
