import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import ModalVideo from "react-modal-video";
import { Tab, Nav, Button } from "react-bootstrap";
import "react-modal-video/css/modal-video.min.css";
import pic1 from "@images/courses/pic1.jpg";
import pic2 from "@images/courses/pic2.jpg";
import pic3 from "@images/courses/pic3.jpg";
import pic4 from "@images/courses/pic4.jpg";
import course1 from "@images/courses/course1.jpg";

import axios from "axios";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

const reviewsData = [
  { image: pic1, title: "Karen Hope", commentTime: "1 Month Ago" },
  { image: pic3, title: "Jordan Nico ", commentTime: "2 Month Ago" },
  { image: pic4, title: "Cahaya Hikari ", commentTime: "3 Month Ago" },
];

const learningData = [
  { title: "Basic Programming" },
  { title: "Create a Website" },
  { title: "Basic HTML & CSS" },
  { title: "Wireframe" },
  { title: "User Interface Design" },
  { title: "Create Responsive Website" },
];

const CourseDetail1 = (props) => {
  const courseID = props.match.params.id;
  const [token, setToken] = useState(); //auth token
  const [courseData, setCourseData] = useState();
  const [coursename, setCoursename] = useState(""); //course name
  const [description, setDescription] = useState(""); //Description
  const [videoUrl, setVideoUrl] = useState(null); //video
  const [courselink, setCourselink] = useState(""); //to save youtube link
  const [imgFile, setImgFile] = useState(null);
  const history = useHistory();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    if (courseID !== undefined) {
      getCourseById(courseID, token);
    }
  }, []);

  // Course details by ID
  const getCourseById = async (id, authToken) => {
    try {
      const response = await axios.get(
        "https://beta.eonlearning.tech/lms-service/courses_by_onlyid",
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
          res.coursevideo === "https://beta.eonlearning.tech/"
            ? null
            : res.coursevideo;
        setCoursename(res.coursename);
        setDescription(res.description);
        setVideoUrl(handleVideoURL);
        setCourselink(res.courselink);
        setImgFile(res.file);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch course!"); // Handle the error
    }
  };

  const openVideo = () => {
    if (courselink === null) {
      setOpen(false);
    } else {
      setOpen(true);
    }
    // if (courselink) {
    //   setOpen(true);
    // }
  };

  const videoId = courselink && courselink.split("youtu.be/")[1];

  function AboutTabContent({ title }) {
    return (
      <>
        <h4>{title}</h4>
        <p>{description}</p>
      </>
    );
  }

  return (
    <>
      {/* <ol className="breadcrumb">
        <li className="breadcrumb-item active">
          <Link className="d-flex align-self-center" to={"./courses"}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.99981 12C8.99905 11.8684 9.02428 11.7379 9.07404 11.6161C9.12381 11.4942 9.19713 11.3834 9.28981 11.29L13.2898 7.28999C13.4781 7.10168 13.7335 6.9959 13.9998 6.9959C14.2661 6.9959 14.5215 7.10168 14.7098 7.28999C14.8981 7.47829 15.0039 7.73369 15.0039 7.99999C15.0039 8.26629 14.8981 8.52168 14.7098 8.70999L11.4098 12L14.6998 15.29C14.8636 15.4813 14.9492 15.7274 14.9395 15.979C14.9298 16.2307 14.8255 16.4695 14.6474 16.6475C14.4693 16.8256 14.2305 16.93 13.9789 16.9397C13.7272 16.9494 13.4811 16.8638 13.2898 16.7L9.28981 12.7C9.10507 12.5137 9.00092 12.2623 8.99981 12Z"
                fill="#374557"
              />
            </svg>
            Back
          </Link>
        </li>
      </ol> */}
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-xl-6">
                  <div className="row">
                    <div className="col-12">
                      <h1 className="">{coursename}</h1>
                    </div>
                    <div className="col-12">
                      <p className="fs-18 fw-bold text-dark mt-2">
                        About This Course
                      </p>
                      <p>{description}</p>
                    </div>
                    <div className="col-12">
                      <div className="profile-personal-info mt-5">
                        <h4 className="text-primary mb-4">Information</h4>
                        <div className="row mb-2">
                          <div className="col-4">
                            <h5 className="f-w-500">Course Category:</h5>
                          </div>
                          <div className="col-8">
                            <span>{courseData ? courseData.category : ""}</span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-4">
                            <h5 className="f-w-500">Course code:</h5>
                          </div>
                          <div className="col-8">
                            <span>
                              {courseData ? courseData.coursecode : ""}
                            </span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-4">
                            <h5 className="f-w-500">Course Start's from:</h5>
                          </div>
                          <div className="col-8">
                            <span>
                              {courseData ? courseData.startdate : ""}
                            </span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-4">
                            <h5 className="f-w-500">Course End on:</h5>
                          </div>
                          <div className="col-8">
                            <span>{courseData ? courseData.enddate : ""}</span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-4">
                            <h5 className="f-w-500">Course Capacity:</h5>
                          </div>
                          <div className="col-8">
                            <span>
                              {" "}
                              {courseData ? courseData.capacity : ""}
                            </span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-4">
                            <h5 className="f-w-500">Course Price:</h5>
                          </div>
                          <div className="col-8">
                            <span className="fw-bold">
                              {" "}
                              ₹ {courseData ? courseData.price : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link
                        to={"./ecom-checkout"}
                        className="btn btn-primary w-25"
                        style={{ cursor: "not-allowed" }}>
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="">
                    {/* {videoUrl !== null && (
                        <div className="video-container mt-3">
                          <video
                            controls
                            src={videoUrl}
                            type={videoUrl.type}
                            alt="video"
                            className="video-preview"
                            style={{ height: "500px" }}></video>
                        </div>
                      )}
                      {!courselink === null && (
                        <div className="view-demo">
                          <img src={imgFile} alt="" />
                          <div className="play-button text-center">
                            <Link
                              to={"#"}
                              className="popup-youtube"
                              onClick={openVideo}>
                              <svg
                                width="72"
                                height="72"
                                viewBox="0 0 72 72"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"></svg>

                              <p className="text-white">View Demo</p>
                            </Link>
                          </div>
                        </div>
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
                        style={{ height: "600px" }}></video>
                    ) : (
                      <iframe
                        title="YouTube Video"
                        // width="475"
                        // height="300"
                        style={{ height: "600px" }}
                        className="video-preview"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        frameBorder="0"
                        allowFullScreen></iframe>
                    )}

                    {/* <div className="course-prise d-flex justify-content-between align-items-center flex-wrap">
                        <div className="d-flex align-items-center">
                          <h4 className="m-0">
                            ₹{courseData ? courseData.price : ""}
                            <small>
                              <del>$99.00</del>
                            </small>
                          </h4>
                          <label className="btn btn-outline-primary ms-3 mb-0 btn-sm">
                            Save 50%
                          </label>
                        </div>

                        <div className="form-check form-check-inline ps-0">
                          <label className="form-check-label wish-list">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              value=""
                              defaultChecked=""
                            />
                            <i className="fa-solid fa-heart"></i>
                            <span>Add to Wishlist</span>
                          </label>
                        </div>
                      </div> */}

                    {/* <div className="course-learn">
                        <h4>What will you learn:</h4>
                        <ul>
                          {learningData.map((item, index) => (
                            <li key={index}>{item.title}</li>
                          ))}
                        </ul>
                      </div> */}
                    {/* <div className="card-footer text-center border-0 pt-0 ">
                        <Link
                          to={"#"}
                          className="btn btn-outline-light btn-md w-50 me-2">
                          Add to Cart
                        </Link>
                        <Link
                          to={"./ecom-checkout"}
                          className="btn btn-primary btn-md w-50 ms-2"
                          style={{ cursor: "not-allowed" }}>
                          Buy Now
                        </Link>
                      </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Button className="mb-2" onClick={() => history.goBack()}>
          Back
        </Button>
      </div>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={videoId}
        onClose={() => setOpen(false)}
      />

      {/* videoId="RV9IeG_oidw" */}
      {/* <div className="pagination-down">
				<div className="d-flex align-items-center justify-content-between flex-wrap">
					<h4 className="sm-mb-0 mb-3"> <span> </span> <span> </span></h4>
					<ul>
						<li><Link to={"./courses"}><i className="fas fa-chevron-left"></i></Link></li>
						<li><Link to={"./courses"}>1</Link></li>
						<li><Link to={"./course-details-1"}className="active">2</Link></li>
						<li><Link to={"./course-details-2"}>3</Link></li>
						<li><Link to={"./course-details-2"}><i className="fas fa-chevron-right"></i></Link></li>
					</ul>
				</div>
			</div> */}
    </>
  );
};
// export { AboutTabContent };
export default CourseDetail1;
