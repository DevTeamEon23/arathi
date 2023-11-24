import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VideoEdit = (props) => {
  const courseId = props.match.params.id;
  const [id, setId] = useState();
  const [vdName, setVdName] = useState();
  const [token, setToken] = useState(); //auth token
  const [isActive, setIsActive] = useState(true);
  const [isDeactive, setIsDeactive] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [VideoUrl, setVideoUrl] = useState();
  const [content, setContentData] = useState();
  const [dataStatus, setdataStatus] = useState("");
  const [btnLoader, setBtnLoader] = useState(false); //Loader
  const history = useHistory();

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    if (courseId !== undefined) {
      getCourseContentById(courseId, token);
    }
  }, []);
  const handleActiveChange = (e) => {
    setIsActive(e.target.checked);
    setIsDeactive(false); // Uncheck "Deactive" when "Active" is checked
  };

  const handleDeactiveChange = (e) => {
    setIsDeactive(e.target.checked);
    setIsActive(false); // Uncheck "Active" when "Deactive" is checked
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedVideo(file);
    }
  };

  const handleVideoDelete = () => {
    setSelectedVideo(null);
    setVideoUrl(null);
  };

  // Course details by ID
  const getCourseContentById = async (id, authToken) => {
    console.log("inside get course by id", id, authToken);
    try {
      const response = await axios.get(
        "https://beta.eonlearning.tech/lms-service/course_contents_by_onlyid",
        {
          headers: {
            "Auth-Token": authToken,
          },
          params: {
            course_id: courseId,
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
      console.log(
        "response.data.data",
        response.data.data,
        response.data.data.status_code
      );
      setdataStatus(response.data.data.status_code);
      if (response.data.status === "success") {
        console.log(res.id, "res.id");
        setId(res.id);
        setVdName(res.video_unitname);
        setIsActive(res.active);
        setIsDeactive(res.deactive);
        setVideoUrl(res.video_file);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch course!"); // Handle the error
    }
  };

  //update API
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inside handleSubmit", dataStatus);
    let token = window.localStorage.getItem("jwt_access_token");
    if (selectedVideo !== null) {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("course_id", courseId);
      formData.append("video_unitname", vdName);
      formData.append("video_file", selectedVideo);
      formData.append("active", isActive);
      formData.append("deactive", isDeactive);
      formData.append("generate_token", true);

      const url =
        "https://beta.eonlearning.tech/lms-service/update_course_contents";
      axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Auth-Token": token,
          },
        })
        .then((response) => {
          console.log(response);
          toast.success("Content updated successfully!!!");
          history.push(`/courses-info`);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed !!! Unable to add content...");
        });
    } else {
      const course_id = courseId;
      const newData = {
        video_unitname: vdName,
        active: isActive,
        deactive: isDeactive,
      };
      console.log(vdName, isActive, isDeactive);
      const url = `https://beta.eonlearning.tech/lms-service/update_course_content/${course_id}`;
      axios
        .put(url, newData, {
          headers: {
            "Auth-Token": token,
          },
        })
        .then((response) => {
          toast.success("Content updated successfully!!!");
          history.push(`/courses-info`);
        })
        .catch((error) => {
          toast.error("Failed !!! Unable to update course...");
        });
    }
  };

  //Add API
  const handleSubmitAdd = (e) => {
    e.preventDefault();
    console.log("inside handleSubmitAdd", dataStatus);
    setBtnLoader(true);
    let token = window.localStorage.getItem("jwt_access_token");
    const formData = new FormData();
    formData.append("course_id", courseId);
    formData.append("video_unitname", vdName);
    formData.append("video_file", selectedVideo);
    formData.append("active", isActive);
    formData.append("deactive", isDeactive);
    formData.append("generate_token", true);
    const url = "https://beta.eonlearning.tech/lms-service/addcourse_content";
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Auth-Token": token,
        },
      })
      .then((response) => {
        setBtnLoader(false);
        toast.success("Content updated successfully!!!");
        history.push(`/courses-info`);
      })
      .catch((error) => {
        console.error(error);
        setBtnLoader(false);
        toast.error("Failed !!! Unable to update course...");
      });
  };

  return (
    <>
      {" "}
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Edit Video Content</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form
                  onSubmit={
                    dataStatus === 400
                      ? (e) => handleSubmitAdd(e)
                      : (e) => handleSubmit(e)
                  }>
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
                          Upload Video
                          <span className="text-danger">*</span>
                        </label>

                        {/* <input
                            type="file"
                            className="form-control"
                            id="vd"
                            required
                          /> */}
                        <div className="col-lg-6">
                          {VideoUrl ? (
                            <div>
                              <video width="400" height="250" controls>
                                <source src={VideoUrl} type="video/mp4" />
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
                          {selectedVideo && (
                            <div>
                              <video width="400" height="250" controls>
                                <source
                                  src={URL.createObjectURL(selectedVideo)}
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
                          )}
                          <br />
                          <label>
                            {VideoUrl === null && (
                              <span style={{ fontWeight: "bold" }}>
                                Choose the another new content
                              </span>
                            )}
                            <input
                              type="file"
                              accept="video/*"
                              onChange={handleVideoChange}
                              style={{ display: "none" }}
                              className="form-control-file"
                            />
                          </label>
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
                            Update Video
                          </Button>
                          <div>
                            <Link to="/courses-info">
                              <Button className="btn me-2 btn-light">
                                Cancel
                              </Button>
                            </Link>
                          </div>
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
      ;
    </>
  );
};

export default VideoEdit;
