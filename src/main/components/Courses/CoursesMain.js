import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "src/store/user/userSlice";

const CoursesMain = () => {
  const [token, setToken] = useState(); //auth token
  const [data, setData] = useState([]); //Course data superadmin
  const [courses, setCourses] = useState([]); //admin instructor
  const [totalCourseDataMain, setTotalCourseDataMain] = useState(0); //course list data
  const [totalCourseData, setTotalCourseData] = useState(0); //course list data
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 6; // Number of items to display per page
  const roleType = useSelector(selectUser).role[0];
  const backendBaseUrl = "https://beta.eonlearning.tech";

  useEffect(() => {
    let accessToken = window.localStorage.getItem("jwt_access_token");
    let ID = window.localStorage.getItem("id");
    setToken(accessToken);
    if (roleType === "Superadmin") {
      getAllCourses();
    } else if (roleType === "Learner") {
      fetchCourseDataLearner(accessToken, ID);
    } else {
      fetchCourseData(accessToken, ID);
    }
  }, []);

  const getAllCourses = async () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const url = "lms-service/courses";
    try {
      const response = await axios.get(url, {
        headers: {
          "Auth-Token": jwtToken,
        },
      });
      // const data = response.data.data;
      // setData(data === null ? data : data.courses_data);
      const data = response.data.data;
      const filteredData =
        data === null
          ? data
          : data.courses_data.filter((item) => item.isHide === 0);
      setData(filteredData);

      setTotalCourseDataMain(data === null ? 0 : filteredData.length);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch Courses !"); // Handle the error
    }
  };

  const fetchCourseData = async (accessToken, ID) => {
    try {
      const queryParams = {
        user_id: ID,
      };
      const url = new URL(
        "lms-service/fetch_enrolled_courses_of_users"
      );
      url.search = new URLSearchParams(queryParams).toString();
      const response = await axios.get(url.toString(), {
        headers: {
          "Auth-Token": accessToken,
          "Content-Type": "multipart/form-data",
        },
      });
      // const list = response.data.data;
      // setCourses(list === null ? list : list.course_ids);
      const list = response.data.data;
      const filteredData =
        list === null
          ? list
          : list.course_ids.filter((item) => item.isHide === 0);
      setCourses(filteredData);

      setTotalCourseData(list === null ? 0 : filteredData.length);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const fetchCourseDataLearner = async (accessToken, ID) => {
    try {
      const queryParams = {
        user_id: ID,
      };
      const url = new URL(
        "lms-service/fetch_enrolled_courses_of_learners"
      );
      url.search = new URLSearchParams(queryParams).toString();
      const response = await axios.get(url.toString(), {
        headers: {
          "Auth-Token": accessToken,
          "Content-Type": "multipart/form-data",
        },
      });
      // const list = response.data.data;
      // setCourses(list === null ? list : list.course_ids);

      const list = response.data.data;

      const filteredData =
        list === null
          ? list
          : list.course_ids.filter((item) => item.course_isHide === 0);
      setCourses(filteredData);
      console.log("filteredData", filteredData);
      setTotalCourseData(list === null ? 0 : filteredData.length);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const currentData = data.slice(startIndex, endIndex);
  let currentData;

  if (roleType === "Superadmin") {
    currentData = data === null ? null : data?.slice(startIndex, endIndex);
  } else {
    currentData =
      courses === null ? null : courses?.slice(startIndex, endIndex);
  }

  return (
    <>
      <div className="widget-heading d-flex justify-content-between align-items-center">
        <h3 className="m-0">Course Store</h3>
      </div>
      {roleType === "Superadmin" ? (
        <div className="row">
          {data?.length <= 0 ? (
            <div className="loader-container">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="130"
                visible={true}
              />
            </div>
          ) : data === null ? (
            <>
              <div>
                <p className="text-center fs-20 fw-bold">No Course Found.</p>
              </div>
            </>
          ) : (
            <>
              {currentData?.map((item, index) => {
                const img = `${backendBaseUrl}/${item.file}`;
                return (
                  <div className="col-xl-4 col-md-6" key={index}>
                    <div className="card all-crs-wid">
                      <div className="card-body">
                        <div className="courses-bx">
                          <div style={{ height: "10vw" }}>
                            <img
                              src={img}
                              style={{
                                objectFit: "cover",
                                width: "100%",
                                borderRadius: " 0.625rem",
                                height: "10vw",
                              }}
                              alt="course img"
                              id="file"
                              name="file"
                            />
                          </div>
                          <div className="dlab-info">
                            <div className="dlab-title d-flex justify-content-between">
                              <div
                                style={{
                                  height: "100px",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                }}>
                                <h4>
                                  <Link to={`/course-details-1/${item.id}`}>
                                    {item.coursename}
                                  </Link>
                                </h4>
                                <p className="m-0">
                                  Course Code: {item.coursecode}
                                </p>
                              </div>
                              <h4 className="text-primary">
                                <span>₹</span>
                                {item.price}
                              </h4>
                            </div>
                            <div
                              className="d-flex content"
                              style={{ alignItems: "center" }}>
                              {/* Your other content here */}
                              <Link
                                to={`/course-details-1/${item.id}`}
                                className="btn btn-primary btn-sm">
                                View all
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      ) : roleType === "Learner" ? (
        <div className="row">
          {courses?.length <= 0 ? (
            <div className="loader-container">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="130"
                visible={true}
              />
            </div>
          ) : courses === null ? (
            <>
              <div>
                <p className="text-center fs-20 fw-bold">No Course Found.</p>
              </div>
            </>
          ) : (
            <>
              {currentData?.map((item, index) => {
                const img = `${backendBaseUrl}/${item.file}`;
                return (
                  <div className="col-xl-4 col-md-6" key={index}>
                    <div className="card all-crs-wid">
                      <div className="card-body">
                        <div className="courses-bx">
                          <div style={{ height: "10vw" }}>
                            <img
                              src={img}
                              style={{
                                objectFit: "cover",
                                width: "100%",
                                borderRadius: " 0.625rem",
                                height: "10vw",
                              }}
                              alt="course img"
                              id="file"
                              name="file"
                            />
                          </div>
                          <div className="dlab-info">
                            <div className="dlab-title d-flex justify-content-between">
                              <div
                                style={{
                                  height: "100px",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                }}>
                                <h4>
                                  <Link
                                    to={`/course-details-1/${item.course_id}`}>
                                    {item.coursename}
                                  </Link>
                                </h4>
                                <p className="m-0">
                                  Course Code: {item.coursecode}
                                </p>
                              </div>
                              <h4 className="text-primary">
                                <span>₹</span>
                                {item.price}
                              </h4>
                            </div>
                            <div
                              className="d-flex content"
                              style={{ alignItems: "center" }}>
                              {/* Your other content here */}
                              <Link
                                to={`/course-details-1/${item.course_id}`}
                                className="btn btn-primary btn-sm">
                                View all
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      ) : (
        <div className="row">
          {courses?.length <= 0 ? (
            <div className="loader-container">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="130"
                visible={true}
              />
            </div>
          ) : courses === null ? (
            <>
              <div>
                <p className="text-center fs-20 fw-bold">No Course Found.</p>
              </div>
            </>
          ) : (
            <>
              {currentData?.map((item, index) => {
                const img = `${backendBaseUrl}/${item.file}`;
                return (
                  <div className="col-xl-4 col-md-6" key={index}>
                    <div className="card all-crs-wid">
                      <div className="card-body">
                        <div className="courses-bx">
                          <div style={{ height: "10vw" }}>
                            <img
                              src={img}
                              style={{
                                objectFit: "cover",
                                width: "100%",
                                borderRadius: " 0.625rem",
                                height: "10vw",
                              }}
                              alt="course img"
                              id="file"
                              name="file"
                            />
                          </div>
                          <div className="dlab-info">
                            <div className="dlab-title d-flex justify-content-between">
                              <div
                                style={{
                                  height: "100px",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                }}>
                                <h4>
                                  <Link
                                    to={`/course-details-1/${item.course_id}`}>
                                    {item.coursename}
                                  </Link>
                                </h4>
                                <p className="m-0">
                                  Course Code: {item.coursecode}
                                </p>
                              </div>
                              <h4 className="text-primary">
                                <span>₹</span>
                                {item.price}
                              </h4>
                            </div>
                            <div
                              className="d-flex content"
                              style={{ alignItems: "center" }}>
                              {/* Your other content here */}
                              <Link
                                to={`/course-details-1/${item.course_id}`}
                                className="btn btn-primary btn-sm">
                                View all
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
      <div className="pagination-down mb-3">
        <div className="d-flex align-items-center  ">
          <h4 className=" ">
            Showing <span>1-6 </span>from{" "}
            <span>
              {roleType === "Superadmin"
                ? totalCourseDataMain
                : totalCourseData}{" "}
            </span>
            data
          </h4>
          <div className="d-flex align-items-center ms-auto mb-3">
            <Button
              className="mr-2"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}>
              Previous
            </Button>
            &nbsp;&nbsp;
            <span className=" fs-18 fw-bold ">
              Page {currentPage} &nbsp;&nbsp;
            </span>
            {roleType === "Superadmin" ? (
              <Button
                className="ml-2"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={endIndex >= (data?.length || 0)}>
                Next
              </Button>
            ) : (
              <Button
                className="ml-2"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={endIndex >= (courses?.length || 0)}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default CoursesMain;
