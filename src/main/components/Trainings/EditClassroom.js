import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Nouislider from "nouislider-react";
import TimePickerPicker from "react-time-picker";
import { Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const EditClassroom = (props) => {
  const classroomId = props.match.params.id;
  const [token, setToken] = useState(); //auth token
  const [conferenceData, setConferenceData] = useState(); //data
  const [instname, setInstname] = useState(""); //Instructor Name
  const [confname, setConfname] = useState(""); //Conference Name
  const [date, setDate] = useState(""); //date
  const [meetlink, setMeetLink] = useState(""); //Meeting Link
  const [messg, setMessg] = useState(""); //Welcome Message
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState([30]); //Durartion
  const history = useHistory();

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    getConferencesByID(token);
  }, []);

  // conference details by ID
  const getConferencesByID = async (authToken) => {
    try {
      const response = await axios.get(
        "https://v1.eonlearning.tech/lms-service/conferences_by_onlyid",
        {
          headers: {
            "Auth-Token": authToken,
          },
          params: {
            id: classroomId,
          },
        }
      );
      setConferenceData(response.data.data);
      if (response.data.status === "success") {
        const res = response.data.data;
        setInstname(res.instname);
        setConfname(res.confname);
        setMeetLink(res.meetlink);
        setMessg(res.messg);
        setSelectedDuration([res.duration]);
        setSelectedTime(res.starttime);
        setDate(res.date);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch conferences list!"); // Handle the error
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Edit Classroom Training</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form
                  className="form-valide"
                  action="#"
                  method="post"
                  onSubmit={handleUpdate}>
                  <div className="row">
                    <div className="col-xl-10">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username">
                          Instructor Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            name="val-username"
                            placeholder="Enter Inst. Name"
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username">
                          Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            name="val-username"
                            placeholder="Enter Conference Name"
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username">
                          Date
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6"></div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username">
                          Start Time
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6"></div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username">
                          Venue
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            name="val-username"
                            placeholder="Enter Offline Class Location"
                          />
                        </div>
                      </div>

                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-suggestions">
                          Welcome Message <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <textarea
                            className="form-control"
                            id="val-suggestions"
                            name="val-suggestions"
                            rows="5"
                            placeholder="Enter a Wellcome message for participants..."></textarea>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username">
                          Duration
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <div id="basic-slider">
                            <br />
                            <br />
                            <Nouislider
                              accessibility
                              start={20}
                              step={10}
                              range={{
                                min: 0,
                                max: 100,
                              }}
                              // onUpdate={this.onUpdate(index)}
                            />
                            <div className="form-group mb-3 row">
                              <div className="col-lg-4">
                                <h4>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;15
                                  mins
                                </h4>
                              </div>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <div className="col-lg-4">
                                <h4>30 mins</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-04">
                        <h4>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Make
                          sure that the duration is below your plan limits
                        </h4>
                      </div>
                      <br />

                      <div className="form-group mb-5 row">
                        <div className="col-lg-8 ms-auto">
                          <br />
                          <Button
                            type="submit"
                            value="submit"
                            className="btn me-2 btn-primary">
                            Update
                          </Button>{" "}
                          or &nbsp;&nbsp;
                          <Link to="/conference">
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

export default EditClassroom;
