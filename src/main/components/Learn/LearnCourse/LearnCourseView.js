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
  const [videoUrl, setVideoUrl] = useState(null); //video
  const [courselink, setCourselink] = useState(""); //to save youtube link
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [vdName, setVdName] = useState();
  const [content, setContentData] = useState();
  const [isActive, setIsActive] = useState(false);
  const [isDeactive, setIsDeactive] = useState(false);
  const [videoContentUrl, setVideoContentUrl] = useState();
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isVideoComplete, setIsVideoComplete] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const history = useHistory();
  const videoRef = useRef(null);

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
        "lms-service/courses_by_onlyid",
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
        const handleVideoURL =
          res.coursevideo === ""
            ? null
            : res.coursevideo;
        console.log(handleVideoURL);
        setCoursename(res.coursename);
        setDescription(res.description);
        setVideoUrl(handleVideoURL);
        setCourselink(res.courselink);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch course!"); // Handle the error
    }
  };

  // Course details by ID
  const getCourseContentById = async (id, authToken) => {
    try {
      const response = await axios.get(
        "lms-service/course_contents_by_onlyid",
        {
          headers: {
            "Auth-Token": authToken,
          },
          params: {
            course_id: courseID,
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
        setVideoContentUrl(res.video_file);
        const duration = parseFloat(res.video_duration);

        if (!isNaN(duration) && duration > 0) {
          setVideoDuration(duration);
        } else {
          console.error("Invalid or missing video duration");
        }
      } else {
        console.error("Failed to fetch course content");
      }
    } catch (error) {
      console.error("Error fetching course content:", error);
    }
  };
  const handlePlay = () => {
    setIsVideoPlaying(true);
  };

  const handlePause = () => {
    setIsVideoPlaying(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
  
      // Update progress when the video is playing or paused
      const calculatedProgress = (currentTime / duration) * 100;
      setVideoProgress(calculatedProgress);
    }
  };

  const handleVideoComplete = () => {
    setIsVideoComplete(true);
  
    // Update progress when the video is complete
    const calculatedProgress = !isNaN(videoDuration) && videoDuration > 0
      ? 100
      : 0;
  
    setVideoProgress(calculatedProgress);
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
                  {/* {videoUrl && (
                    <video
                      controls
                      src={videoUrl}
                      type={videoUrl.type}
                      alt='video'
                      className='video-preview'
                      width='475'
                      height='200'
                    ></video>
                  )}
                  {!courselink === null && (
                    <iframe
                      title='YouTube Video'
                      width='400'
                      height='300'
                      className='video-preview'
                      src={`https://www.youtube.com/embed/${videoId}`}
                      src={`https://www.youtube.com/embed/${
                        courselink.split("youtu.be/")[1]
                      }`}
                      frameBorder='0'
                      allowFullScreen
                    ></iframe>
                  )} */}
                  {videoUrl !== null ? (
                    <video
                      controls
                      src={videoUrl}
                      type={
                        videoUrl.endsWith(".mp4")
                          ? "video/mp4"
                          : "video/x-matroska"
                      }
                      alt="video"
                      className="video-preview"
                      width="475"
                      height="200"></video>
                  ) : (
                    <iframe
                      title="YouTube Video"
                      width="475"
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
                  {videoContentUrl && (
                      <p>
                        Name : <b>{vdName}</b>
                      </p>
                    )}
                    <div className="col-xl-12 ">
                  {videoContentUrl && (
                      <>
                        <video
                          ref={videoRef}
                          controls
                          src={videoContentUrl}
                          alt="video"
                          width="800"
                          onTimeUpdate={handleTimeUpdate}
                          onPlay={handlePlay}
                          onPause={handlePause}
                          onEnded={handleVideoComplete}
                        ></video>
                        <p>
                          {`Progress: ${videoProgress.toFixed(2)}% - ${
                            isVideoPlaying ? "Playing" : "Paused"
                          }`}
                        </p>
                      </>
                    )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>

      <div>
        <Button onClick={(e) => history.goBack(e)}>Back</Button>
      </div>
      <br />
      <br />
      </>
  );
};

export default LearnCourseView;
