import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Nouislider from "nouislider-react";
import TimePicker from "react-time-picker";
import { Button } from "react-bootstrap";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import { toast } from "react-toastify";
import { format, parse, isValid } from "date-fns";

const EditClassroom = (props) => {
  const classroomId = props.match.params.id;
  const [token, setToken] = useState(); //auth token
  const [classroomData, setClassroomData] = useState(); //data
  const [instname, setInstname] = useState(""); //Instructor Name
  const [classname, setClassname] = useState(""); //Class name Name
  const [date, setDate] = useState(""); //date
  const [venue, setVenue] = useState("");
  const [messg, setMessg] = useState(""); //Welcome Message
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState([30]); //Durartion
  const history = useHistory();

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    getClassroomsByID(token);
  }, []);

  // classroom details by ID
  const getClassroomsByID = async (authToken) => {
    try {
      const response = await axios.get(
        "https://v1.eonlearning.tech/lms-service/classrooms_by_onlyid",
        {
          headers: {
            "Auth-Token": authToken,
          },
          params: {
            id: classroomId,
          },
        }
      );
      setClassroomData(response.data.data);
      if (response.data.status === "success") {
        const res = response.data.data;
        const timeString = res.starttime; // Replace with your API response
        // const parsedTime = parse(timeString, "h:mm a", new Date()); // Parse the time string
        // const formattedTime = format(parsedTime, "h:mm a"); // Format the parsed time as HH:mm
        // Check if the startTimeString matches the "h:mm a" format
        const is12HourFormat = timeString.match(/^\d{1,2}:\d{2} [APap][Mm]$/);

        let formattedTime;

        if (is12HourFormat) {
          formattedTime = timeString;
        } else {
          const parsedTime = parse(
            timeString,
            "EEE MMM dd yyyy HH:m",
            new Date()
          );
          if (isValid(parsedTime)) {
            formattedTime = format(parsedTime, "h:mm a");
          } else {
            formattedTime = "Invalid Time";
          }
        }

        console.log(formattedTime);
        setInstname(res.instname);
        setClassname(res.classname);
        setVenue(res.venue);
        setMessg(res.messg);
        setSelectedDuration([res.duration]);
        setSelectedTime(formattedTime);
        setDate(res.date);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch classroom training details!"); // Handle the error
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const handleTimeChange = (time) => {
    const [hours, minutes] = time.split(":");
    const ampm = hours >= 12 ? "PM" : "AM";
    const twelveHourTime = (hours % 12 || 12) + ":" + minutes;
    const formattedTime = twelveHourTime + " " + ampm;
    setSelectedTime(formattedTime);
  };

  const handleSliderChange = (values) => {
    setSelectedDuration([Math.floor(values[0])]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", classroomId);
    formData.append("instname", instname);
    formData.append("classname", classname);
    formData.append("date", date);
    formData.append("starttime", selectedTime);
    formData.append("venue", venue);
    formData.append("messg", messg);
    formData.append("duration", selectedDuration);

    const url = "https://v1.eonlearning.tech/lms-service/update_classrooms";
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
        toast.success("Classroom training updated successfully!!!");
        history.push(`/classroom`);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to update classroom training...");
      });
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
                {classroomData === undefined ? (
                  <div className="loader-container">
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="100"
                      visible={true}
                    />
                  </div>
                ) : (
                  <>
                    <form onSubmit={handleUpdate}>
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
                              htmlFor="classname">
                              Name
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control"
                                id="classname"
                                value={classname}
                                placeholder="Enter Classroom training Name for your reference"
                                onChange={(e) => setClassname(e.target.value)}
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
                              {" "}
                              <input
                                type="date"
                                className="form-control "
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
                                value={selectedTime}
                                format="h:mm a"
                                clearIcon={null}
                              />
                            </div>
                          </div>
                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="meetlink">
                              Venue
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control"
                                id="meetlink"
                                value={venue}
                                placeholder="Enter training venue details"
                                onChange={(e) => setVenue(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="messg">
                              Welcome Message{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-6">
                              <textarea
                                className="form-control"
                                id="messg"
                                maxLength={500}
                                rows="5"
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
                              Make sure that the duration is below your plan
                              limits*
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
                                Update
                              </Button>{" "}
                              or &nbsp;&nbsp;
                              <Link to="/classroom">
                                <Button className="btn me-2 btn-light">
                                  Cancel
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditClassroom;
