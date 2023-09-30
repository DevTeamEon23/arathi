import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import TimePicker from "react-time-picker";

const AddConferences = () => {
  const [instname, setInstname] = useState(""); //Instructor Name
  const [confname, setConfname] = useState(""); //Conference Name
  const [date, setDate] = useState(""); //date
  const [meetlink, setMeetLink] = useState(""); //Meeting Link
  const [messg, setMessg] = useState(""); //Welcome Message
  const [selectedTime, setSelectedTime] = useState("11:00 AM");
  const [selectedDuration, setSelectedDuration] = useState([30]); //Durartion
  const history = useHistory();

  const handleTimeChange = (time) => {
    const [hours, minutes] = time.split(":");
    const ampm = hours >= 12 ? "PM" : "AM";
    const twelveHourTime = (hours % 12 || 12) + ":" + minutes + " " + ampm;
    setSelectedTime(twelveHourTime);
  };

  const handleSliderChange = (values) => {
    setSelectedDuration([Math.floor(values[0])]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("instname", instname);
    formData.append("confname", confname);
    formData.append("date", date);
    formData.append("starttime", selectedTime);
    formData.append("meetlink", meetlink);
    formData.append("messg", messg);
    formData.append("duration", selectedDuration);
    formData.append("generate_token", true);

    const url = "https://v1.eonlearning.tech/lms-service/addconferences";
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
        toast.success("Conference added successfully!!!");
        history.push(`/conference`);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to add conference...");
      });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Conference</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-10">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="instname">
                          Instructor Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="instname"
                            value={instname}
                            placeholder="Enter Instructor Name"
                            onChange={(e) => setInstname(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="confname">
                          Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="confname"
                            value={confname}
                            placeholder="Enter Conference Name for your reference"
                            onChange={(e) => setConfname(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="date">
                          Date
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="date"
                            className="form-control"
                            id="date"
                            min={today}
                            value={date}
                            placeholder="Enter the Date "
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="starttime">
                          Start Time
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <TimePicker
                            id="starttime"
                            onChange={handleTimeChange}
                            value={selectedTime.split(" ")[0]}
                            clearIcon={null} // Remove the clear button
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="meetlink">
                          Meeting Link
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="meetlink"
                            value={meetlink}
                            placeholder="Enter Meeting Link for Live Conference"
                            onChange={(e) => setMeetLink(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="messg">
                          Welcome Message <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <textarea
                            className="form-control"
                            rows="5"
                            id="messg"
                            maxLength={500}
                            placeholder="Enter a Welcome message for participants..."
                            style={{ resize: "none" }}
                            value={messg}
                            onChange={(e) =>
                              setMessg(e.target.value)
                            }></textarea>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="duration">
                          Duration
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <br />
                          <Nouislider
                            style={{ height: "4px" }}
                            start={[selectedDuration]}
                            step={10}
                            range={{
                              min: 30,
                              max: 100,
                            }}
                            onSlide={handleSliderChange}
                          />
                          <p> {selectedDuration[0]} minutes</p>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label className="col-lg-4 col-form-label"></label>
                        <div className="col-lg-6 fw-bold">
                          Make sure that the duration is below your plan limits*
                        </div>
                      </div>
                      <br />

                      <div className="form-group mb-5 row">
                        <div className="col-lg-8 ms-auto">
                          <br />
                          <Button
                            type="submit"
                            value="submit"
                            className="btn me-2 btn-primary">
                            Add
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

export default AddConferences;
