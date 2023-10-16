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
  const [coursename, setCoursename] = useState(""); //course name
  const [description, setDescription] = useState(""); //Description
  const [videoUrl, setVideoUrl] = useState(""); //video
  const [courselink, setCourselink] = useState(""); //to save youtube link
  const [vdName, setVdName] = useState();
  const [content, setContentData] = useState();
  const [isActive, setIsActive] = useState(false);
  const [isDeactive, setIsDeactive] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    if (courseID !== undefined) {
      setId(courseID);
      getCourseById(courseID, token);
      getCourseContentById(courseID, token);
    }
  }, []);

  // Course details by ID
  const getCourseById = async (id, authToken) => {
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

      if (response.data.status === "success") {
        setCoursename(res.coursename);
        setDescription(res.description);
        setVideoUrl(res.coursevideo);
        setCourselink(res.courselink);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch course!"); // Handle the error
    }
  };

  // Course details by ID
  const getCourseContentById = async (id, authToken) => {
    console.log("inside get course by id", id, authToken);
    try {
      const response = await axios.get(
        "https://v1.eonlearning.tech/lms-service/course_contents_by_onlyid",
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
      console.log(
        "editcourse",
        response.data.data,
        response.data.data.courselink
      );
      setContentData(response.data.data);

      if (response.data.status === "success") {
        setVdName(res.video_unitname);
        setIsActive(res.active);
        setIsDeactive(res.deactive);
        // setSelectedVideo(res.video_file);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch course!"); // Handle the error
    }
  };

  const videoId = courselink && courselink.split("youtu.be/")[1];
  // const isYouTubeURL = courselink.includes("youtu.be/");

  return (
    <>
      <Row>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">{coursename}</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-xl-4 video-container">
                  {videoUrl && (
                    <video
                      controls
                      src={videoUrl}
                      type={videoUrl.type}
                      alt="video"
                      className="video-preview"
                      width="400"
                      height="200"></video>
                  )}
                  {!courselink === null && (
                    <iframe
                      title="YouTube Video"
                      width="400"
                      height="300"
                      className="video-preview"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      // src={`https://www.youtube.com/embed/${
                      //   courselink.split("youtu.be/")[1]
                      // }`}
                      frameBorder="0"
                      allowFullScreen></iframe>
                  )}
                </div>
                <div className="col-xl-8">
                  <p className="fs-20 fw-bold fc-black">Introduction</p>
                  <p>{description}</p>
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
                    <p>User content video</p>
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
