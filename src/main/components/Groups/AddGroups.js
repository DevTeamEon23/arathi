import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Button,
  Nav,
} from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Your username must consist of at least 3 characters ")
    .max(50, "Your username must consist of at least 3 characters ")
    .required("Please enter a username"),
  password: Yup.string()
    .min(5, "Your password must be at least 5 characters long")
    .max(50, "Your password must be at least 5 characters long")
    .required("Please provide a password"),
});

const AddGroups = () => {
  // const [id, setId] = useState("");
  const [groupname, setGroupname] = useState("");
  const [groupdesc, setGroupdesc] = useState("");
  const [groupkey, setGroupkey] = useState("");
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);
  let history = useHistory();

  useEffect(() => {
    setGroupkey(small_id);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("groupname", groupname);
    formData.append("groupdesc", groupdesc);
    formData.append("groupkey", groupkey);
    formData.append("generate_token", true);
    const url = "http://127.0.0.1:8000/lms-service/addgroups";
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
      <Nav>
        <Nav.Item as="div" className="nav nav-tabs" id="nav-tab" role="tablist">
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventkey="Follow"
            type="button"
            to="/dashboard">
            Dashboard
          </Link>
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventkey="Follow"
            type="button"
            to="/groups">
            Groups
          </Link>{" "}
        </Nav.Item>
      </Nav>
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
