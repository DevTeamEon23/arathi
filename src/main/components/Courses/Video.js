import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { toast } from "react-toastify";

const Video = (props) => {
  const courseId = props.match.params.id;
  const [vdName, setVdName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isDeactive, setIsDeactive] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [cancelError, setCancelError] = useState("");
  const [btnLoader, setBtnLoader] = useState(false); //Loader
  const history = useHistory();

  const handleActiveChange = (e) => {
    setIsActive(e.target.checked);
    setIsDeactive(false); // Uncheck "Deactive" when "Active" is checked
  };

  const handleDeactiveChange = (e) => {
    setIsDeactive(e.target.checked);
    setIsActive(false); // Uncheck "Active" when "Deactive" is checked
  };

  const handleVideoChange = (e) => {
    setCancelError("");
    const file = e.target.files[0];
    if (file) {
      setSelectedVideo(file);
    }
  };

  const handleVideoDelete = () => {
    setSelectedVideo(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCancelError("");
    setBtnLoader(true);
    let token = window.localStorage.getItem("jwt_access_token");
    const formData = new FormData();
    formData.append("course_id", courseId);
    formData.append("video_unitname", vdName);
    formData.append("video_file", selectedVideo);
    formData.append("active", isActive);
    formData.append("deactive", isDeactive);
    formData.append("generate_token", true);
    const url = "https://v1.eonlearning.tech/lms-service/addcourse_content";
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Auth-Token": token,
        },
      })
      .then((response) => {
        setBtnLoader(false);
        toast.success("Content added successfully!!!");
        history.push(`/courses-info`);
      })
      .catch((error) => {
        console.error(error);
        setBtnLoader(false);
        toast.error("Failed !!! Unable to add content...");
      });
  };

  const handleCancel = () => {
    setBtnLoader(false);
    if (selectedVideo === null && vdName === undefined) {
      setCancelError("Please add Video Content...");
    } else {
      setCancelError("");
      history.push("/courses-info");
    }
  };

  return (
    <>
      {" "}
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Video Content</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-10">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="groupname">
                          Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="groupname"
                            placeholder="Enter name for a video"
                            value={vdName}
                            onChange={(e) => setVdName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group mb-3 row">
                        <label className="col-lg-4 col-form-label" htmlFor="vd">
                          Select Video
                          <span className="text-danger">*</span>
                        </label>

                        {/* <input
                            type="file"
                            className="form-control"
                            id="vd"
                            required
                          /> */}
                        <div className="col-lg-6">
                          {selectedVideo ? (
                            <div>
                              <video width="400" height="250" controls>
                                <source
                                  src={
                                    selectedVideo &&
                                    URL.createObjectURL(selectedVideo)
                                  }
                                  type="video/mp4"
                                />
                                Your browser does not support the video tag.
                              </video>
                              <button
                                className="btn btn-danger p-1 mb-3"
                                style={{ marginLeft: "10px" }}
                                onClick={handleVideoDelete}>
                                Remove
                              </button>
                            </div>
                          ) : (
                            <input
                              type="file"
                              accept="video/*"
                              className="form-control"
                              onChange={handleVideoChange}
                              required
                            />
                          )}
                        </div>
                      </div>

                      <div className="form-group mb-3 row ">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="vd"></label>
                        <div className="col-lg-2 d-flex mt-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="isActive"
                            name="isActive"
                            checked={isActive}
                            onChange={handleActiveChange}
                          />
                          <label
                            className="form-check css-control-primary css-checkbox mt-1"
                            htmlFor="isActive">
                            Active
                          </label>
                        </div>
                        <div className="col-lg-2 d-flex mt-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="isDeactive"
                            name="isDeactive"
                            checked={isDeactive}
                            onChange={handleDeactiveChange}
                          />
                          <label
                            className="form-check css-control-primary css-checkbox mt-1"
                            htmlFor="isDeactive">
                            Deactive
                          </label>
                        </div>
                      </div>
                      <div className="form-group mb-3 row mt-5">
                        <div className="col-lg-8 ms-auto d-flex">
                          <Button
                            type="submit"
                            className="btn me-2 btn-primary">
                            {btnLoader ? (
                              <CircularProgress
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  color: "#fff",
                                }}
                              />
                            ) : (
                              "Add Video"
                            )}
                          </Button>
                          <div onClick={handleCancel}>
                            <Button className="btn me-2 btn-light">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3 row  col-lg-10">
                        {cancelError && (
                          <p className="error-message text-danger text-center fs-16">
                            {cancelError}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Video;
