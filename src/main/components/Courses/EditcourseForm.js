import React, { Fragment, useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import { Button, Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { RxCross2 } from "react-icons/rx";
import { CircularProgress } from "@material-ui/core";

const certificate = [
  { value: "certificate1", label: "Certificate 1" },
  { value: "certificate2", label: "Certificate 2" },
  { value: "certificate3", label: "Certificate 3" },
  { value: "certificate4", label: "Certificate 4" },
];
const level = [
  { value: "level1", label: "Level 1" },
  { value: "level2", label: "Level 2" },
  { value: "level3", label: "Level 3" },
  { value: "level4", label: "Level 4" },
];

const EditcourseForm = (props) => {
  const courseID = props.match.params.id;
  const [courseData, setCourseData] = useState();
  const [id, setId] = useState("");
  const [token, setToken] = useState(); //auth token
  const [coursename, setCoursename] = useState("");
  const [selectedOptionCertificate, setSelectedOptionCertificate] = useState(
    {}
  ); //Certificate
  const [selectedOptionLevel, setSelectedOptionLevel] = useState({}); // Level
  const [coursecode, setCoursecode] = useState("");
  const [description, setDescription] = useState(""); //Description
  const [isActive, setIsActive] = useState(false); //Active
  const [isHide, setIsHide] = useState(false); //Hide
  const [price, setPrice] = useState("");
  const fileInputRef = useRef();
  const [capacity, setCapacity] = useState(""); //Capacity
  const [startdate, setStartdate] = useState(""); //Course StartDate
  const [enddate, setEnddate] = useState(""); //Course EndDate
  const [timelimit, setTimelimit] = useState(null); //in future should be remove
  const [getAllCategoriesData, setGetAllCategoriesData] = useState({}); //save all categories data
  const [selectCategoriesData, setSelectCategoriesData] = useState(null); //categories
  const [activeTab, setActiveTab] = useState("edit-courses/:id");
  const [btnSubmitLoader, setBtnSubmitLoader] = useState(false); //Loader
  const [file, setFile] = useState(""); //for change image file
  const [imageUrl, setImageUrl] = useState(""); //image cdn file
  const [courselink, setCourselink] = useState(null); //to save youtube link
  const [youTubeLink, setyouTubeLink] = useState(null); //for change youtube link
  const [videoUrl, setVideoUrl] = useState(null); //to save video link
  const [selectedVideo, setSelectedVideo] = useState(""); //for change video
  const [userId, setUserId] = useState();
  const [errorMessageCapacity, setErrorMessageCapacity] = useState("");
  const [submitError, setSubmitError] = useState(""); //show YT or video upload
  const [isValidLink, setIsValidLink] = useState(true);
  const [errorVideo, setErrorVideo] = useState(null);
  const history = useHistory();
  const roleType = window.localStorage.getItem("role");

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    if (courseID !== undefined) {
      setId(courseID);
      getCourseById(courseID, token);
    }
    getAllCategories();
  }, []);

  const handleSubmit1 = (e) => {
    console.log(courselink);
    e.preventDefault();
    setBtnSubmitLoader(true);

    const formData = new FormData();
    formData.append("id", id);
    formData.append("user_id", userId);
    formData.append("coursename", coursename);
    formData.append("description", description);
    formData.append("coursecode", coursecode);
    formData.append("price", price);
    formData.append("courselink", courselink);
    formData.append("coursevideo", selectedVideo);
    formData.append("capacity", capacity);
    formData.append("startdate", startdate);
    formData.append("enddate", enddate);
    formData.append("timelimit", timelimit);
    formData.append("certificate", selectedOptionCertificate);
    formData.append("level", selectedOptionLevel);
    formData.append("category", selectCategoriesData.value);
    formData.append("isActive", isActive);
    formData.append("isHide", isHide);
    formData.append("file", file);

    const url = "https://beta.eonlearning.tech/lms-service/update_courses";
    console.log(file, selectedVideo);
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Auth-Token": token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setBtnSubmitLoader(false);
        toast.success("Course updated successfully!!!");
        history.push(`/video/edit/${courseID}`);
      })
      .catch((error) => {
        console.error(error);
        setBtnSubmitLoader(false);
        toast.error("Failed !!! Unable to update course...");
      });
  };
  // edit form data submit
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    setBtnSubmitLoader(true);
    console.log("courselink", courselink, "youTubeLink", youTubeLink);
    if (
      courselink === null &&
      selectedVideo === "" &&
      videoUrl === null &&
      youTubeLink === null
    ) {
      console.log("no video or link", courselink, selectedVideo, videoUrl);
      setSubmitError("Please Upload video or provide a youtube link.");
      setBtnSubmitLoader(false);
    } else if (selectedVideo && youTubeLink) {
      console.log("both video and link");
      setSubmitError(
        "Please choose either a video or provide a youtube link, not both."
      );
      setBtnSubmitLoader(false);
    } else {
      setSubmitError("");
      setBtnSubmitLoader(true);

      if (file !== null && videoUrl) {
        console.log("if img change", file, videoUrl);
        const formData = new FormData();
        formData.append("id", id);
        formData.append("user_id", userId);
        formData.append("coursename", coursename);
        formData.append("description", description);
        formData.append("coursecode", coursecode);
        formData.append("price", price);
        formData.append(
          "courselink",
          courselink === null ? youTubeLink : courselink
        );
        formData.append("coursevideo", videoUrl ? "" : videoUrl);
        formData.append("capacity", capacity);
        formData.append("startdate", startdate);
        formData.append("enddate", enddate);
        formData.append("timelimit", timelimit);
        formData.append("certificate", selectedOptionCertificate.value);
        formData.append("level", selectedOptionLevel.value);
        formData.append("category", selectCategoriesData.value);
        formData.append("isActive", isActive);
        formData.append("isHide", isHide);
        formData.append("file", file);

        console.log("check", youTubeLink);
        const url =
          "https://beta.eonlearning.tech/lms-service/update_courses_new";
        axios
          .post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Auth-Token": token,
            },
          })
          .then((response) => {
            console.log(response.data);
            setBtnSubmitLoader(false);
            toast.success("Course updated successfully!!!");
            history.push(`/video/edit/${courseID}`);
          })
          .catch((error) => {
            console.error(error);
            setBtnSubmitLoader(false);
            toast.error("Failed !!! Unable to update course...");
          });
      } else if (selectedVideo !== null) {
        console.log("if only change video", file, selectedVideo);
        const formData = new FormData();
        formData.append("id", id);
        formData.append("user_id", userId);
        formData.append("coursename", coursename);
        formData.append("description", description);
        formData.append("coursecode", coursecode);
        formData.append("price", price);
        formData.append(
          "courselink",
          courselink === null ? youTubeLink : courselink
        );
        formData.append("coursevideo", selectedVideo);
        formData.append("capacity", capacity);
        formData.append("startdate", startdate);
        formData.append("enddate", enddate);
        formData.append("timelimit", timelimit);
        formData.append("certificate", selectedOptionCertificate.value);
        formData.append("level", selectedOptionLevel.value);
        formData.append("category", selectCategoriesData.value);
        formData.append("isActive", isActive);
        formData.append("isHide", isHide);
        formData.append("file", file);

        const url =
          "https://beta.eonlearning.tech/lms-service/update_courses_new";
        axios
          .post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Auth-Token": token,
            },
          })
          .then((response) => {
            console.log(response.data);
            setBtnSubmitLoader(false);
            toast.success("Course updated successfully!!!");
            history.push(`/video/edit/${courseID}`);
          })
          .catch((error) => {
            console.error(error);
            setBtnSubmitLoader(false);
            toast.error("Failed !!! Unable to update course...");
          });
      } else if (file !== null || selectedVideo !== null) {
        console.log("if only one change video and img change");
        const formData = new FormData();
        formData.append("id", id);
        formData.append("user_id", userId);
        formData.append("coursename", coursename);
        formData.append("description", description);
        formData.append("coursecode", coursecode);
        formData.append("price", price);
        formData.append(
          "courselink",
          courselink === null ? youTubeLink : courselink
        );
        formData.append(
          "coursevideo",
          videoUrl === null ? selectedVideo : videoUrl
        );
        formData.append("capacity", capacity);
        formData.append("startdate", startdate);
        formData.append("enddate", enddate);
        formData.append("timelimit", timelimit);
        formData.append("certificate", selectedOptionCertificate.value);
        formData.append("level", selectedOptionLevel.value);
        formData.append("category", selectCategoriesData.value);
        formData.append("isActive", isActive);
        formData.append("isHide", isHide);
        formData.append("file", file);

        const url =
          "https://beta.eonlearning.tech/lms-service/update_courses_new";
        console.log(file, selectedVideo);
        axios
          .post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Auth-Token": token,
            },
          })
          .then((response) => {
            console.log(response.data);
            setBtnSubmitLoader(false);
            toast.success("Course updated successfully!!!");
            history.push(`/video/edit/${courseID}`);
          })
          .catch((error) => {
            console.error(error);
            setBtnSubmitLoader(false);
            toast.error("Failed !!! Unable to update course...");
          });
      } else {
        console.log("inside else");
        const formData = new FormData();
        formData.append("id", id);
        formData.append("user_id", userId);
        formData.append("coursename", coursename);
        formData.append("description", description);
        formData.append("coursecode", coursecode);
        formData.append("price", price);
        formData.append("courselink", courselink);
        formData.append("coursevideo", videoUrl ? "" : videoUrl);
        formData.append("capacity", capacity);
        formData.append("startdate", startdate);
        formData.append("enddate", enddate);
        formData.append("timelimit", timelimit);
        formData.append("certificate", selectedOptionCertificate.value);
        formData.append("level", selectedOptionLevel.value);
        formData.append("category", selectCategoriesData.value);
        formData.append("isActive", isActive);
        formData.append("isHide", isHide);
        formData.append("file", file);

        console.log("check", youTubeLink);
        const url =
          "https://beta.eonlearning.tech/lms-service/update_courses_new";
        axios
          .post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Auth-Token": token,
            },
          })
          .then((response) => {
            console.log(response.data);
            setBtnSubmitLoader(false);
            toast.success("Course updated successfully!!!");
            history.push(`/video/edit/${courseID}`);
          })
          .catch((error) => {
            console.error(error);
            setBtnSubmitLoader(false);
            toast.error("Failed !!! Unable to update course...");
          });
      }
    }
  };

  const handleEditFormSubmitTry = async (event) => {
    event.preventDefault();
    setBtnSubmitLoader(true);
    if (selectedVideo && youTubeLink) {
      setSubmitError(
        "Please choose either a video or provide a youtube link, not both."
      );
      setBtnSubmitLoader(false);
    } else {
      setSubmitError("");
      setBtnSubmitLoader(false);

      try {
        setBtnSubmitLoader(true);
        const formData = new FormData();
        formData.append("id", id);
        formData.append("user_id", userId);
        formData.append("coursename", coursename);
        formData.append("description", description);
        formData.append("coursecode", coursecode);
        formData.append("price", price);
        formData.append("courselink", courselink || youTubeLink);
        formData.append(
          "coursevideo",
          selectedVideo === undefined ? "" : selectedVideo
        );
        formData.append("capacity", capacity);
        formData.append("startdate", startdate);
        formData.append("enddate", enddate);
        formData.append("timelimit", timelimit);
        formData.append("certificate", selectedOptionCertificate.value);
        formData.append("level", selectedOptionLevel.value);
        formData.append("category", selectCategoriesData.value);
        formData.append("isActive", isActive);
        formData.append("isHide", isHide);
        formData.append("file", file);

        console.log("at API call");
        const url =
          "https://beta.eonlearning.tech/lms-service/update_courses_new";
        const headers = {
          "Content-Type": "multipart/form-data",
          "Auth-Token": token,
        };

        const response = await axios.post(url, formData, { headers });

        console.log(response.data);
        setBtnSubmitLoader(false);
        toast.success("Course updated successfully!!!");
        history.push(`/video/edit/${courseID}`);
      } catch (error) {
        console.error(error);
        setBtnSubmitLoader(false);
        toast.error("Failed !!! Unable to update course...");
      }
    }
  };

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
      console.log("editcourse@@", typeof response.data.data.courselink);
      setCourseData(response.data.data);

      const dateObject = new Date(res.startdate);
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const day = String(dateObject.getDate()).padStart(2, "0");
      // Create the formatted date string in "yyyy-MM-dd" format
      const formattedStart = `${year}-${month}-${day}`;

      const dateObject2 = new Date(res.enddate);
      const year2 = dateObject2.getFullYear();
      const month2 = String(dateObject2.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const day2 = String(dateObject2.getDate()).padStart(2, "0");
      // Create the formatted date string in "yyyy-MM-dd" format
      const formattedEnd = `${year2}-${month2}-${day2}`;

      const link = res.courselink === null || "" ? null : res.courselink;
      console.log(link);
      if (response.data.status === "success") {
        setCoursename(res.coursename);
        setDescription(res.description);
        setIsActive(res.isActive);
        setIsHide(res.isHide);
        setPrice(res.price);
        setCapacity(res.capacity);
        setCoursecode(res.coursecode);
        setStartdate(formattedStart);
        setEnddate(formattedEnd);
        setTimelimit(res.timelimit);
        setImageUrl(res.file);
        setCourselink(link);
        setVideoUrl(
          res.coursevideo === "https://beta.eonlearning.tech/null" ||
            res.coursevideo === "https://beta.eonlearning.tech/"
            ? null
            : res.coursevideo
        );
        setUserId(res.user_id);
        // setSelectedVideo(res.coursevideo);
        const selectedOption1 = certificate.find(
          (option) =>
            option.value.toLowerCase() === res.certificate.trim().toLowerCase()
        );
        // setSelectedOptionCertificate({
        //   value: res.certificate,
        //   label: res.certificate,
        // });
        setSelectedOptionCertificate(selectedOption1 ? selectedOption1 : "");
        const selectedOption2 = level.find(
          (option) =>
            option.value.toLowerCase() === res.level.trim().toLowerCase()
        );
        // setSelectedOptionLevel({
        //   value: res.level,
        //   label: res.level,
        // });
        setSelectedOptionLevel(selectedOption2 ? selectedOption2 : "");
        setSelectCategoriesData({
          value: res.category,
          label: res.category,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch course!"); // Handle the error
    }
  };

  // All Categories List
  const getAllCategories = async () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const url = "https://beta.eonlearning.tech/lms-service/categories";
    try {
      const response = await axios.get(url, {
        headers: {
          "Auth-Token": jwtToken,
        },
      });
      const data = response.data.data;
      const expectedOutput = data.categories_data.map(({ name }) => ({
        value: name,
        label: name,
      }));
      setGetAllCategoriesData(data === null ? data : expectedOutput);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch Categories !"); // Handle the error
    }
  };

  // youtube link handle
  const handleInputChange = (event) => {
    const value = event.target.value;
    setyouTubeLink(value);
    validateYouTubeLink(value);
  };

  const validateYouTubeLink = (link) => {
    // Regular expression to check for valid YouTube links
    const youtubeRegex =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    setIsValidLink(youtubeRegex.test(link));
  };

  //video file handle
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const videoUrl = URL.createObjectURL(file);
  //     setVideoUrl(videoUrl);
  //     setSelectedVideo(file);
  //   }
  // };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const maxFileSize = 100 * 1024 * 1024; // 100MB in bytes
    if (file.size > maxFileSize) {
      setErrorVideo("File size exceeds the 100MB limit");
      setSelectedVideo(null);
    } else {
      const fileNameWithoutSpaces = file.name.replace(/\s+/g, ""); // Remove spaces from the file name
      const modifiedFile = new File([file], fileNameWithoutSpaces, {
        type: file.type,
      });

      setErrorVideo("");
      setSelectedVideo(modifiedFile);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleImageDelete = () => {
    setImageUrl(null);
    setFile(""); // Reset the selected file
  };

  const handleVideoDelete = () => {
    setVideoUrl("");
    setSelectedVideo(null); // Reset the selected file
  };

  const chackbox = document.querySelectorAll(".bs_exam_topper input");
  const motherChackBox = document.querySelector(".bs_exam_topper_all input");
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  useEffect(() => {
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1);
    setActiveTab(tab);
  }, [history.location.pathname]);

  const handleCapacityChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && value >= 1 && value <= 100)) {
      setCapacity(value);
      setErrorMessageCapacity("");
    } else {
      setErrorMessageCapacity("Capacity must be a number between 1 and 100.");
    }
  };

  const handleYTLinkDelete = (event) => {
    event.preventDefault();
    console.log("inside handleYTLinkDelete");
    setSelectedVideo("");
    setVideoUrl(null);
    setCourselink(null);
    setyouTubeLink(null);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            {roleType === "Instructor" ? (
              <Tabs activeKey={activeTab} onSelect={handleTabChange}>
                <Tab eventKey={`edit-courses/${courseID}`} title="Course"></Tab>
                <Tab
                  eventKey={`adm_course_users/${courseID}`}
                  title="Users"></Tab>
                <Tab
                  eventKey={`adm_course_groups/${courseID}`}
                  title="Groups"></Tab>
              </Tabs>
            ) : (
              <Tabs activeKey={activeTab} onSelect={handleTabChange}>
                <Tab eventKey={`edit-courses/${courseID}`} title="Course"></Tab>
                <Tab eventKey={`course_users/${courseID}`} title="Users"></Tab>
                <Tab
                  eventKey={`course_groups/${courseID}`}
                  title="Groups"></Tab>
              </Tabs>
            )}
            <div className="card-header">
              <h4 className="card-title">Edit Course</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                {courseData === undefined ? (
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
                    <form onSubmit={handleEditFormSubmitTry}>
                      <div className="row">
                        <div className="col-xl-7">
                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="coursename">
                              Course Name
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control"
                                id="coursename"
                                name="coursename"
                                value={coursename}
                                onChange={(e) => setCoursename(e.target.value)}
                                required
                              />
                            </div>
                          </div>

                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="categories">
                              Category
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-6">
                              <Select
                                value={selectCategoriesData}
                                id="categories"
                                name="categories"
                                options={getAllCategoriesData}
                                onChange={(selectCategoriesData) =>
                                  setSelectCategoriesData(selectCategoriesData)
                                }></Select>
                            </div>
                          </div>

                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="description">
                              Description <span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-6">
                              <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={description}
                                rows="5"
                                maxLength={5000}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ resize: "none" }}
                                required></textarea>
                            </div>
                          </div>

                          <div className="form-group mb-3 row">
                            <div className="col-lg-3 ms-auto">
                              <br />
                              <br />
                              <label
                                className="form-check css-control-primary css-checkbox"
                                htmlFor="isActive">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  style={{ marginRight: "8px" }}
                                  id="isActive"
                                  name="isActive"
                                  checked={isActive}
                                  onChange={(e) =>
                                    setIsActive(e.target.checked)
                                  }
                                />
                                <p className="fw-bold fs-16"> Active</p>
                              </label>
                            </div>
                            <div className="col-lg-5 ms-auto">
                              <br />
                              <br />
                              <label
                                className="form-check css-control-primary css-checkbox"
                                htmlFor="isHide">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  style={{ marginRight: "8px" }}
                                  id="isHide"
                                  name="isHide"
                                  checked={isHide}
                                  onChange={(e) => setIsHide(e.target.checked)}
                                />
                                <p className="fw-mid-bold fs-16">
                                  Hide from Course store
                                </p>
                              </label>
                              <br />
                            </div>
                          </div>

                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="coursecode">
                              Course Code <span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control"
                                id="coursecode"
                                name="coursecode"
                                value={coursecode}
                                onChange={(e) => setCoursecode(e.target.value)}
                                required
                              />
                            </div>
                          </div>

                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="val-currency">
                              Price
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control"
                                id="val-currency"
                                name="val-currency"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                              />
                            </div>
                          </div>

                          <div className="form-group mb-2 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="courselink">
                              Course Intro Video{" "}
                            </label>
                            <div className="input-group mb-2 col-lg-6 ">
                              {console.log("courselink")}
                              {courselink === null ? (
                                <>
                                  {/* <p className="mt-2 fw-bold">
                                    No link available
                                  </p> */}

                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Paste YouTube link here..."
                                    id="courselink"
                                    value={youTubeLink}
                                    onChange={handleInputChange}
                                    onBlur={() => setBtnSubmitLoader("")}
                                  />
                                </>
                              ) : (
                                <p className="mt-2 fw-bold">
                                  <p>
                                    {courselink === "null"
                                      ? "No link available"
                                      : courselink}
                                  </p>
                                </p>
                              )}
                            </div>

                            {!isValidLink && (
                              <p style={{ color: "red", marginLeft: "290px" }}>
                                Please enter a valid YouTube link.
                              </p>
                            )}
                          </div>

                          <div className="form-group mb-1 row">
                            <label className="col-lg-4 col-form-label"></label>
                            <div className="input-group mb-1 col-lg-6 ">
                              <span className="fs-18 fw-bold">OR</span>
                            </div>
                          </div>
                          <div className="form-group row ">
                            <label
                              htmlFor="selectedVideo"
                              className="col-lg-4 col-form-label"></label>
                            <div className="input-group  col-lg-6 ">
                              <div>
                                {videoUrl === null && (
                                  <input
                                    type="file"
                                    accept=".mp4, .mkv"
                                    id="selectedVideo"
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                  />
                                )}
                                <br />
                                {errorVideo && (
                                  <div className="error-message text-danger fs-14">
                                    {errorVideo}
                                  </div>
                                )}

                                {videoUrl && (
                                  <video controls className="video-player">
                                    <source
                                      src={videoUrl}
                                      type={videoUrl.type}
                                      alt="video"
                                    />
                                    Your browser does not support the video tag.
                                  </video>
                                )}
                                {selectedVideo && (
                                  <div>
                                    <video width="400" height="250" controls>
                                      <source
                                        src={URL.createObjectURL(selectedVideo)}
                                        type="video/mp4"
                                      />
                                      Your browser does not support the video
                                      tag.
                                    </video>
                                  </div>
                                )}
                                {console.log("video", videoUrl, selectedVideo)}
                                <br />
                                <button
                                  className="btn btn-danger p-1 mb-3"
                                  onClick={handleYTLinkDelete}>
                                  Remove Video/Youtube Link
                                </button>
                              </div>
                            </div>
                          </div>

                          {submitError && (
                            <p className="error-message text-danger text-center fs-16">
                              {submitError}
                            </p>
                          )}
                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="val-confirm-password">
                              Capacity <span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                className="form-control"
                                id="capacity"
                                min={1}
                                max={100}
                                placeholder="e.g. Number of Student"
                                value={capacity}
                                onChange={handleCapacityChange}
                                onBlur={() => setErrorMessageCapacity("")}
                                required
                              />
                              {errorMessageCapacity && (
                                <p className="text-danger">
                                  {errorMessageCapacity}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="startdate">
                              Course Duration
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-3 mb-3">
                              <div className="example rangeDatePicker">
                                <p className="mb-1">Course Start Date</p>
                                {/* <DateRangePicker
                              startText="Start"
                              endText="End"
                              startPlaceholder="Start Date"
                              endPlaceholder="End Date"
                            />   */}

                                <input
                                  type="date"
                                  className="form-control"
                                  id="startdate"
                                  name="startdate"
                                  value={startdate}
                                  onChange={(e) => setStartdate(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-lg-3 mb-3">
                              <div className="example rangeDatePicker">
                                <p className="mb-1">Course End Date</p>
                                <input
                                  type="date"
                                  className="form-control"
                                  id="enddate"
                                  name="enddate"
                                  value={enddate}
                                  onChange={(e) => setEnddate(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="certificate">
                              Certificate
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-6">
                              <Select
                                value={selectedOptionCertificate}
                                options={certificate}
                                onChange={(selectedOptionCertificate) =>
                                  setSelectedOptionCertificate(
                                    selectedOptionCertificate
                                  )
                                }
                                name="certificate"
                                id="certificate"
                                required></Select>
                            </div>
                          </div>
                          <div className="form-group mb-3 row">
                            <label
                              className="col-lg-4 col-form-label"
                              htmlFor="level">
                              Level
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-6">
                              <Select
                                value={selectedOptionLevel}
                                options={level}
                                onChange={(selectedOptionLevel) =>
                                  setSelectedOptionLevel(selectedOptionLevel)
                                }
                                name="level"
                                id="level"
                                required></Select>
                            </div>
                          </div>
                          <br />

                          <br />
                        </div>

                        <div className="col-xl-5">
                          <div className="form-group mb-3 row">
                            <label className="col-lg-4 col-form-label">
                              Update Course photo
                              <span className="text-danger">*</span>
                            </label>
                            <br />
                            <div className="">
                              <div>
                                {imageUrl && (
                                  <>
                                    <img
                                      src={imageUrl}
                                      alt="Preview"
                                      className="img-thumbnail"
                                      width="250"
                                      height="200"
                                    />
                                    <RxCross2
                                      className="fs-18 fs-bold"
                                      title="Delete"
                                      style={{
                                        marginBottom: "180px",
                                        marginLeft: "18px",
                                        color: "#c91111",
                                      }}
                                      onClick={handleImageDelete}
                                    />
                                  </>
                                )}
                                {file && (
                                  <>
                                    <img
                                      src={URL.createObjectURL(file)}
                                      alt="Preview"
                                      className="img-thumbnail"
                                    />
                                    <RxCross2
                                      className="fs-18 fs-bold"
                                      title="Delete"
                                      style={{
                                        marginBottom: "180px",
                                        marginLeft: "18px",
                                        color: "#c91111",
                                      }}
                                      onClick={handleImageDelete}
                                    />
                                  </>
                                )}
                                <br />
                                <label>
                                  {imageUrl === null && (
                                    <span style={{ fontWeight: "bold" }}>
                                      Choose the another new image
                                    </span>
                                  )}
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                    className="form-control-file"
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <div className="col-lg-10 ms-auto">
                          <Button
                            type="submit"
                            className="btn me-2 btn-primary "
                            value="submit">
                            {btnSubmitLoader ? (
                              <div className="w-25">
                                <CircularProgress
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    color: "#fff",
                                  }}
                                />
                              </div>
                            ) : (
                              "Update Course and Update Content"
                            )}
                          </Button>{" "}
                          or &nbsp;&nbsp;
                          <Link to="/courses-info">
                            <Button className="btn me-2 btn-light">
                              Cancel
                            </Button>
                          </Link>
                        </div>
                        {/* <div className="col-lg-5 ms-auto">
                          <DropdownButton
                            as={ButtonGroup}
                            id="dropdown-button-drop-up"
                            drop="up"
                            variant="primary"
                            title="ADD"
                            className="me-1 mt-1">
                            <Dropdown.Item>
                              <Link to="/video">
                                <div className="dropdown-item-content">
                                  <i className="bi bi-play-circle"> &nbsp;</i>
                                  Video
                                </div>{" "}
                              </Link>
                            </Dropdown.Item>

                            <Dropdown.Item>
                              <Link to="/presentation">
                                <div className="dropdown-item-content">
                                  <i className="bi bi-file-slides"> &nbsp;</i>
                                  Presentation | Documents{" "}
                                </div>{" "}
                              </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Link to="/scorm">
                                <div className="dropdown-item-content">
                                  <i className="bi bi-command"> &nbsp;</i>SCORM
                                  | xAPI | cmi5
                                </div>{" "}
                              </Link>
                            </Dropdown.Item>

                            <Dropdown.Item>
                              <Link to="/test-question">
                                <div className="dropdown-item-content">
                                  <i className="bi bi-journal-check"> &nbsp;</i>
                                  Test
                                </div>{" "}
                              </Link>
                            </Dropdown.Item>

                            <Dropdown.Item>
                              <Link to="/assignment">
                                <div className="dropdown-item-content">
                                  <i className="bi bi-clipboard"> &nbsp;</i>
                                  Assignment
                                </div>{" "}
                              </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Link to="/instructor-led">
                                <div className="dropdown-item-content">
                                  <i className="bi bi-calendar4-week">
                                    {" "}
                                    &nbsp;
                                  </i>
                                  Instructor-led training
                                </div>{" "}
                              </Link>
                            </Dropdown.Item>
                          </DropdownButton>
                          <button
                            type="submit"
                            className="btn btn-primary me-1 col-lg-5 ms-auto">
                            View as Learner
                          </button>
                          <DropdownButton
                            as={ButtonGroup}
                            id="dropdown-button-drop-up"
                            drop="up"
                            variant="primary"
                            title="..."
                            className="me-1 mt-1">
                            <Dropdown.Item>
                              <Link to="/message_users">
                                <div className="dropdown-item-content">
                                  <i className="bi bi-chat-right-text">
                                    {" "}
                                    &nbsp;
                                  </i>
                                  Message Users
                                </div>{" "}
                              </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Link to="/ad_event">
                                <div className="dropdown-item-content">
                                  <i className="bi bi-calendar4-week">
                                    {" "}
                                    &nbsp;
                                  </i>
                                  Add Event
                                </div>{" "}
                              </Link>
                            </Dropdown.Item>

                            <Dropdown.Item>
                              <Link to="#">
                                <div className="dropdown-item-content">
                                  <i className="bi bi-lock"> &nbsp;</i>Lock
                                  Course Content
                                </div>{" "}
                              </Link>
                            </Dropdown.Item>

                            <Modal
                              className="fade bd-example-modal-lg"
                              show={largeModal}
                              size="lg">
                              <Modal.Header>
                                <Modal.Title>
                                  Modal App Compatibility
                                </Modal.Title>
                                <Button
                                  variant=""
                                  className="btn-close"
                                  onClick={() => setLargeModal(false)}></Button>
                              </Modal.Header>
                              <Modal.Body>
                                <Table responsive>
                                  <thead>
                                    <tr>
                                      <th className="width80">Unit Name</th>
                                      <th>Mobile App Compatible</th>
                                      <th>Offline Compatible</th>
                                      <th>Render as web page</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        How to create Instructor-led Training
                                      </td>
                                      <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                      </td>
                                      <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                      </td>
                                      <td>
                                        <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                          <div className="col-xl-1">
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              style={{ marginLeft: "4rem" }}
                                              id="customCheckBox2"
                                              required=""
                                              onClick={() => chackboxFun()}
                                            />
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        How to create Instructor-led Training
                                      </td>
                                      <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                      </td>
                                      <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                      </td>
                                      <td>
                                        <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                          <div className="col-xl-1">
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              style={{ marginLeft: "4rem" }}
                                              id="customCheckBox2"
                                              required=""
                                              onClick={() => chackboxFun()}
                                            />
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        How to create Instructor-led Training
                                      </td>
                                      <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                      </td>
                                      <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                      </td>
                                      <td>
                                        <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                          <div className="col-xl-1">
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              style={{ marginLeft: "4rem" }}
                                              id="customCheckBox2"
                                              required=""
                                              onClick={() => chackboxFun()}
                                            />
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        How to create Instructor-led Training
                                      </td>
                                      <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                      </td>
                                      <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                      </td>
                                      <td>
                                        <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                          <div className="col-xl-1">
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              style={{ marginLeft: "4rem" }}
                                              id="customCheckBox2"
                                              required=""
                                              onClick={() => chackboxFun()}
                                            />
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        How to create Instructor-led Training
                                      </td>
                                      <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                      </td>
                                      <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                      </td>
                                      <td>
                                        <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                          <div className="col-xl-1">
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              style={{ marginLeft: "4rem" }}
                                              id="customCheckBox2"
                                              required=""
                                              onClick={() => chackboxFun()}
                                            />
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        How to create Instructor-led Training
                                      </td>
                                      <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                      </td>
                                      <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                      </td>
                                      <td>
                                        <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                          <div className="col-xl-1">
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              style={{ marginLeft: "4rem" }}
                                              id="customCheckBox2"
                                              required=""
                                              onClick={() => chackboxFun()}
                                            />
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        How to create Instructor-led Training
                                      </td>
                                      <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                      </td>
                                      <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                      </td>
                                      <td>
                                        <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                          <div className="col-xl-1">
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              style={{ marginLeft: "4rem" }}
                                              id="customCheckBox2"
                                              required=""
                                              onClick={() => chackboxFun()}
                                            />
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        How to create Instructor-led Training
                                      </td>
                                      <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                      </td>
                                      <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                      </td>
                                      <td>
                                        <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                          <div className="col-xl-1">
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              style={{ marginLeft: "4rem" }}
                                              id="customCheckBox2"
                                              required=""
                                              onClick={() => chackboxFun()}
                                            />
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        How to create Instructor-led Training
                                      </td>
                                      <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                      </td>
                                      <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                      </td>
                                      <td>
                                        <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                          <div className="col-xl-1">
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              style={{ marginLeft: "4rem" }}
                                              id="customCheckBox2"
                                              required=""
                                              onClick={() => chackboxFun()}
                                            />
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        How to create Instructor-led Training
                                      </td>
                                      <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                      </td>
                                      <td>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                      </td>
                                      <td>
                                        <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                          <div className="col-xl-1">
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              style={{ marginLeft: "4rem" }}
                                              id="customCheckBox2"
                                              required=""
                                              onClick={() => chackboxFun()}
                                            />
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="danger light"
                                  onClick={() => setLargeModal(false)}>
                                  Close
                                </Button>
                                <Button
                                  variant=""
                                  type="button"
                                  className="btn btn-primary">
                                  Save changes
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </DropdownButton>
                        </div> */}
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

export default EditcourseForm;

{
  /* <div className="form-group mb-3 row">
<label
  className="col-lg-4 col-form-label"
  htmlFor="val-currency"
>
  Time Options
  <span className="text-danger">*</span>
</label>
<div className="col-md-6 mb-3">
  <div className="example rangeDatePicker">
    <p className="mb-1">Date Range With Time</p>
    {/* <DateRangePicker
      startText="Start"
      endText="End"
      startPlaceholder="Start Date"
      endPlaceholder="End Date"
    />   */
}

// <DateRangePicker>
//     <input type="text" className="form-control input-daterange-timepicker" onChange={handleAddFormChange}/>
// </DateRangePicker>
//     <br/>
//     <br/>Pick Your Time of Course
//     <TimePickerPicker className="form-control input-daterange-timepicker" onChange={onChange} value={value} />
//       </div>
//   </div>
// </div> */}
