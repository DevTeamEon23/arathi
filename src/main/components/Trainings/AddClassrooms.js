import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import { Dropdown, DropdownButton, ButtonGroup, Button } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";

const AddClassrooms = () => {
  const [id, setId] = useState("");
  const [instname, setInstname] = useState("");
  const [classname, setClassname] = useState("");
  const [date, setDate] = useState("");
  const [starttime, setStarttime] = useState("");
  const [venue, setVenue] = useState("");
  const [messg, setMessg] = useState("");
  const [duration, setDuration] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [value, onChange] = useState(new Date());
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      id,
      instname,
      classname,
      date,
      starttime,
      venue,
      messg,
      duration,
    };

    fetch("https://localhost:8000/classrooms", {
      method: "POST",
    })
      .then((data) => {
        console.log("new Classroom Training Shedule added");
        alert("✔️ Classroom Training Added Successfully");
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Classroom</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form>
                  <div className="row">
                    <div className="col-xl-10">
                      <div className="form-group mb-3 row">
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
                      </div>
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
                            id="instname"
                            name="instname"
                            placeholder="Enter Inst. Name"
                            onChange={(e) => setInstname(e.target.value)}
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
                            id="classname"
                            name="classname"
                            placeholder="Enter Classroom Name for your reference"
                            onChange={(e) => setClassname(e.target.value)}
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
                        <div className="col-lg-6">
                          {/* <DateRangePicker
                      initialSettings={{ startDate: '10/5/2022', endDate: '3/6/2022' }}
                    > */}
                          <input
                            type="text"
                            className="form-control input-daterange-timepicker"
                            id="date"
                            name="date"
                            placeholder=" Enter the Date "
                            onChange={(e) => setDate(e.target.value)}
                          />
                          {/* </DateRangePicker> */}
                          {/* <DateRangePicker
                      startText="Start"
                      endText="End"
                      startPlaceholder="Start Date"
                      endPlaceholder="End Date"
                    />  */}
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username">
                          Start Time
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control input-daterange-timepicker"
                            id="starttime"
                            name="starttime"
                            placeholder="Enter the Class Timing"
                            onChange={(e) => setStarttime(e.target.value)}
                          />
                        </div>
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
                            id="venue"
                            name="venue"
                            placeholder="Enter Offline Class Location"
                            onChange={(e) => setVenue(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-suggestions">
                          Wellcome Message{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <textarea
                            className="form-control"
                            rows="5"
                            id="messg"
                            name="messg"
                            placeholder="Enter a Wellcome message for participants..."
                            onChange={(e) =>
                              setMessg(e.target.value)
                            }></textarea>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username">
                          <br />
                          <br />
                          Duration
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <div id="basic-slider">
                            <br />
                            <br />
                            <input
                              type="text"
                              className="form-control"
                              id="duration"
                              name="duration"
                              placeholder="Enter the Duration in Hours eg:- 50 mins"
                              onChange={(e) => setDuration(e.target.value)}
                            />
                            {/* <Nouislider
                            accessibility
                            start={20}
                            step={10}
                            range={{
                              min: 0,
                              max: 100,
                            }}
                            // onUpdate={this.onUpdate(index)} */}
                            <div className="form-group mb-3 row">
                              {/* <div className="col-lg-4">
                          <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;15 mins</h4>
                          </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="col-lg-4">
                          <h4>30 mins</h4>
                          </div> */}
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

                      <div className="form-group mb-3 row"></div>
                      <button type="submit" className="btn me-2 btn-primary">
                        Save
                      </button>

                      <Link to="/classroom">
                        <Button className="btn btn-light">Cancel</Button>
                      </Link>
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

export default AddClassrooms;
