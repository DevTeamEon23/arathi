import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { Button } from "react-bootstrap";
import TimePicker from "react-time-picker";

const AddVirtualTraining = () => {
  const [instname, setInstname] = useState("");
  const [virtualname, setVirtualName] = useState("");
  const [date, setDate] = useState("");
  const [meetlink, setMeetLink] = useState("");
  const [messg, setMessg] = useState(undefined);
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
    formData.append("virtualname", virtualname);
    formData.append("date", date);
    formData.append("starttime", selectedTime);
    formData.append("meetlink", meetlink);
    formData.append("messg", messg);
    formData.append("duration", selectedDuration);
    formData.append("generate_token", true);

    const url = "https://v1.eonlearning.tech/lms-service/addvirtualtrainings";
    const authToken = window.localStorage.getItem("jwt_access_token");
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Auth-Token": authToken,
        },
      })
      .then((response) => {
        toast.success("Virtual Training Added Successfully!!!");
        history.push(`/virtual-training`);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to add Virtual Training...");
      });
  };

  const today = new Date().toISOString().split("T")[0];
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Virtual Training</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {" "}
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
                            value={virtualname}
                            placeholder="Enter Virtual Training name for your reference"
                            onChange={(e) => setVirtualName(e.target.value)}
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
                            className="form-control input-daterange-timepicker"
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
                            placeholder="Enter Meeting Link for Live Virtual Training"
                            onChange={(e) => setMeetLink(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-group mb-3 row">
                        <label className="col-lg-4 col-form-label">
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
                          <Link to="/virtual-training">
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

export default AddVirtualTraining;
