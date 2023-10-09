import React, { Fragment, useState, useRef, useEffect } from "react";
import { Row, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

const LearnCourseView = (props) => {
  const courseID = props.match.params.id;
  const [id, setId] = useState();
  const [token, setToken] = useState(); //auth token
  const [courseData, setCourseData] = useState();
  const history = useHistory();

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    if (courseID !== undefined) {
      setId(courseID);
      getCourseById(courseID, token);
    }
  }, []);

  // Course details by ID
  const getCourseById = async (id, authToken) => {
    console.log("inside get course by id", id, authToken);
    try {
      const response = await axios.get(
        "https://v1.eonlearning.tech/lms-service/courses_by_onlyid",
        {
          headers: {
            "Auth-Token": authToken,
          },
          params: {
            id: courseID,
          },
        }
      );
      const res = response.data.data;
      setCourseData(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch course!"); // Handle the error
    }
  };

  return (
    <>
      <Row>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Course Name</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-xl-4 video-container">
                  <video controls className="video-preview">
                    <source src="video.mp4" type="video/mp4" />
                    <source src="video.webm" type="video/webm" />
                    <source src="video.ogv" type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="col-xl-8">
                  <p className="fs-20 fw-bold">Introduction</p>
                  <p>lorem...............</p>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12 content-label mt-3">
                  <p className="my-1">CONTENT</p>{" "}
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="col-xl-4 my-3">
                    <p>User content</p>
                    <p>User content</p>
                    <p>User content</p>
                    <p>User content</p>
                    <p>User content</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>

      <div>
        <Button onClick={() => history.goBack()}>Back</Button>
      </div>
    </>
  );
};

export default LearnCourseView;
