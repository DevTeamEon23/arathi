import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import * as Yup from "yup";

import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Button,
  Nav,
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const eventtype = [
  { value: "Onusercreate", label: "On user create" },
  { value: "Onusersignup", label: "On user signup" },
  { value: "Xhoursafterusersignup", label: "X hours after user signup" },
  {
    value: "Xhoursafterusersignupandtheuserhasnotmadeapurchase",
    label: "X hours after user signup and the user has not made a purchase",
  },
  { value: "Xhoursafterusercreation", label: "X hours after user creation" },
  {
    value: "Xhoursafterusercreationandtheuserhasnotsignedin",
    label: "X hours after user creation and the user has not signed in",
  },
  {
    value: "Xhoursafterusersignupandtheuserhasnotsignedin",
    label: "X hours after user signup and the user has not signed in",
  },
  {
    value: "Xhourssinceuserlastsignedin",
    label: "X hours since user last signed in",
  },
  {
    value: "Xhourssinceuserfirstsigninandtheuserhasnotcompletedanycourse",
    label:
      "X hours since user first sign in and the user has not completed any course",
  },
  {
    value: "Xhoursbeforeuserdeactivation",
    label: "X hours before user deactivation",
  },
  { value: "Oncourseassignment", label: "On course assignment" },
  { value: "Oncourseselfassignment", label: "On course self assignment" },
  {
    value: "Xhoursaftercourseacquisition",
    label: "X hours after course acquisition",
  },
  { value: "Xhoursbeforecoursestart", label: "X hours before course start" },
  { value: "Oncoursecompletion", label: "On course completion" },
  {
    value: "Xhoursaftercoursecompletion",
    label: "X hours after course completion",
  },
  { value: "Oncoursefailure", label: "On course failure" },
  { value: "Oncourseexpiration", label: "On course expiration" },
  {
    value: "Xhoursbeforecourseexpiration",
    label: "X hours before course expiration",
  },
  { value: "Oncertificateacquisition", label: "On certificate acquisition" },
  { value: "Oncertificateexpiration", label: "On certificate expiration" },
  {
    value: "Xhoursbeforecertificateexpiration",
    label: "X hours before certificate expiration",
  },
  { value: "Ongroupassignment", label: "On group assignment" },
  { value: "Onbranchassignment", label: "On branch assignment" },
  { value: "Onassignmentsubmission", label: "On assignment submission" },
  { value: "Onassignmentgrading", label: "On assignment grading" },
  { value: "OnILTsessioncreate", label: "On ILT session create" },
  { value: "OnILTsessionregistration", label: "On ILT session registration" },
  {
    value: "XhoursbeforeanILTsessionstarts",
    label: "X hours before an ILT session starts",
  },
  { value: "OnILTgrading", label: "On ILT grading" },
  { value: "Onuserpayment", label: "On user payment" },
  { value: "OnlevelXreached", label: "On level X reached" },
];

const recipienttype = [
  { value: "Relateduser", label: "Related user" },
  { value: "Accountowner", label: "Account owner" },
  { value: "SuperAdmins", label: "SuperAdmins" },
  { value: "Branchadmins", label: "Branch admins" },
  { value: "Courseinstructors", label: "Course instructors" },
  { value: "Courselearners", label: "Course learners" },
  { value: "Specificrecipients", label: "Specific recipients" },
];

const EditNotification = (props) => {
  const eventId = props.match.params.id;
  console.log({ eventId });
  const [notificationId, setNotificationId] = useState("");
  const [ename, setEname] = useState("");
  const [descp, setDescp] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [notData, setNotData] = useState(); //event/notification data by id
  const [selectEvent, setSelectEvent] = useState({}); //set event list
  const [selectRecipient, setSelectRecipient] = useState(null); //recipient
  const [token, setToken] = useState(); //auth token

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    if (eventId !== undefined) {
      setNotificationId(eventId);
      getEventById(eventId, token);
    }
  }, []);

  const getEventById = async (id, authToken) => {
    try {
      const response = await axios.get(
        "https://v1.eonlearning.tech/lms-service/events_by_onlyid",
        {
          headers: {
            "Auth-Token": authToken,
          },
          params: {
            id: eventId,
          },
        }
      );
      setNotData(response.data.data);
      if (response.data.status === "success") {
        console.log(response.data.data);
        const res = response.data.data;
        setEname(res.ename);
        setDescp(res.descp);
        setSelectEvent({
          value: res.eventtype,
          label: res.eventtype,
        });
        setSelectRecipient({
          value: res.recipienttype,
          label: res.recipienttype,
        });
        setIsActive(res.isActive);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users!"); // Handle the error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", notificationId);
    formData.append("ename", ename);
    formData.append("eventtype", selectEvent.value);
    formData.append("recipienttype", selectRecipient.value);
    formData.append("descp", descp);
    formData.append("isActive", isActive);
    formData.append("generate_token", true);

    const url = "https://v1.eonlearning.tech/lms-service/update_events";
    const authToken = window.localStorage.getItem("jwt_access_token");
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Auth-Token": authToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Notification updated successfully!!!");
        history.push(`/events`);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to update notification...");
      });
  };

  let history = useHistory();
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Edit Notification</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="ename">
                          Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="ename"
                            name="ename"
                            value={ename}
                            onChange={(e) => setEname(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="selectEvent">
                          Event
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <Select
                            id="selectEvent"
                            options={eventtype}
                            value={selectEvent}
                            onChange={(selectEvent) =>
                              setSelectEvent(selectEvent)
                            }></Select>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label className="col-lg-4 col-form-label">
                          Recipient
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <Select
                            value={selectRecipient}
                            options={recipienttype}
                            onChange={(selectRecipient) =>
                              setSelectRecipient(selectRecipient)
                            }></Select>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label className="col-lg-4 col-form-label">
                          Description <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <textarea
                            className="form-control"
                            rows="5"
                            value={descp}
                            onChange={(e) => setDescp(e.target.value)}
                            style={{ resize: "none" }}></textarea>
                        </div>
                      </div>
                      <div className="col-lg-04"></div>
                      <br />
                      <div className="form-group mb-3 row">
                        <div className="col-lg-8 ms-auto">
                          <label
                            className="form-check css-control-primary css-checkbox"
                            htmlFor="isActive">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="isActive"
                              name="isActive"
                              checked={isActive}
                              onChange={(e) => setIsActive(e.target.checked)}
                              required
                            />
                            &nbsp; Active
                          </label>
                        </div>
                      </div>
                      <br />
                    </div>
                    <div className="form-group mb-3 row">
                      <div className="col-lg-8 ms-auto">
                        <Button
                          type="submit"
                          className="btn me-2 btn-primary"
                          value="submit">
                          Update Notification
                        </Button>
                        &nbsp; or &nbsp;&nbsp;
                        <Link to="/events">
                          <Button className="btn me-2 btn-light">Cancel</Button>
                        </Link>
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

export default EditNotification;
