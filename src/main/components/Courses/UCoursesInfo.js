import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Table, Button, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

const UCoursesInfo = (props) => {
  const userId = props.match.params.id;
  const [activeTab, setActiveTab] = useState("user-courses-info/:id");
  const [role, setRole] = useState("Admin");
  const [coursesAll, setCoursesAll] = useState([]); //superadmin
  const [coursesAdmin, setcoursesAdmin] = useState([]); //admin instructor
  const [totalCourseData, setTotalCourseData] = useState(0);
  const [token, setToken] = useState(); //auth token
  const [currentPage, setCurrentPage] = useState(1); // Current page number

  const itemsPerPage = 10; // Number of items to display per page
  const history = useHistory();

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    let ID = window.localStorage.getItem("id");
    const roleType = window.localStorage.getItem("role");
    setRole(roleType);
    if (roleType === "Admin") {
      fetchCoursesAdminIns();
    } else {
      getAllCourses();
    }
    setToken(token);
  }, []);

  // Courses List Api super admin
  const getAllCourses = () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const config = {
      headers: {
        "Auth-Token": jwtToken,
      },
      params: {
        user_id: userId,
      },
    };
    axios
      .get(
        "https://v1.eonlearning.tech/user-tab1/fetch_enroll_courses_of_user",
        config
      )
      .then((response) => {
        const data = response.data.data;
        setCoursesAll(data === null ? data : data.course_ids);
        setTotalCourseData(data === null ? 0 : data.course_ids.length);
      })
      .catch((error) => {
        toast.error("Failed to fetch users!");
      });
  };

  // Courses List Api for admin
  const fetchCoursesAdminIns = async () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    let ID = window.localStorage.getItem("id");
    try {
      const queryParams = {
        user_id: userId,
        admin_user_id: ID,
      };
      const url = new URL(
        "https://v1.eonlearning.tech/lms-service/fetch_enrolled_courses_for_inst_learn"
      );
      url.search = new URLSearchParams(queryParams).toString();
      const response = await axios.get(url.toString(), {
        headers: {
          "Auth-Token": jwtToken,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("API Response:", response.data.data);
      const data = response.data.data;
      setcoursesAdmin(data === null ? data : data.course_ids);
      setTotalCourseData(data === null ? 0 : data.course_ids.length);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleEnroll = (e, course_id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("course_id", course_id);
    formData.append("generate_token", true);
    const url = "https://v1.eonlearning.tech/user-tab1/enroll_courses_to_user";
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Auth-Token": token,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Course Enroll successfully!!!");
        if (role === "Admin") {
          fetchCoursesAdminIns();
        } else {
          getAllCourses();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to enroll course...");
      });
  };

  const handleUnEnroll = (e, id) => {
    e.preventDefault();
    const config = {
      headers: {
        "Auth-Token": token,
      },
    };
    const requestBody = {
      id: id,
    };
    axios
      .delete(
        `https://v1.eonlearning.tech/user-tab1/unenroll_courses_from_user`,
        {
          ...config,
          data: requestBody,
        }
      )
      .then((response) => {
        toast.success("Course unenroll successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        if (role === "Admin") {
          fetchCoursesAdminIns();
        } else {
          getAllCourses();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to Unenroll!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleUnEnrollAdmin = (e, id) => {
    e.preventDefault();
    const config = {
      headers: {
        "Auth-Token": token,
      },
    };
    const requestBody = {
      data_user_course_enrollment_id: id,
    };
    axios
      .delete(
        `https://v1.eonlearning.tech/lms-service/unenroll_courses_from_enrolled_user`,
        {
          ...config,
          data: requestBody,
        }
      )
      .then((response) => {
        toast.success("Course unenroll successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        if (role === "Admin") {
          fetchCoursesAdminIns();
        } else {
          getAllCourses();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to Unenroll!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let currentData;

  if (role === "Superadmin") {
    currentData =
      coursesAll === null ? null : coursesAll.slice(startIndex, endIndex);
  } else {
    currentData =
      coursesAdmin === null ? null : coursesAdmin.slice(startIndex, endIndex);
  }

  const filteredDataAdmin = currentData.filter(
    (data) => data.user_role === "Admin"
  );

  const courseRoles = {};

  filteredDataAdmin.forEach((course) => {
    if (!courseRoles[course.course_id]) {
      courseRoles[course.course_id] = [];
    }
    courseRoles[course.course_id].push(course.user_role);
  });

  console.log(courseRoles);
  const hasBothRoles = (courseId) => {
    const roles = courseRoles[courseId];
    return roles.includes("Admin") && roles.includes("Instructor");
  };

  const filteredData = coursesAdmin.filter((item) => {
    return (
      coursesAdmin.filter(
        (innerItem) =>
          innerItem.coursename === item.coursename &&
          innerItem.user_role === "Admin"
      ).length > 0 &&
      coursesAdmin.filter(
        (innerItem) =>
          innerItem.coursename === item.coursename &&
          innerItem.user_role === "Instructor"
      ).length > 0
    );
  });

  const courseRoleCount = {};

  for (const data of currentData) {
    const courseName = data.coursename;
    const userRole = data.user_role;

    if (!courseRoleCount[courseName]) {
      courseRoleCount[courseName] = {
        Admin: 0,
        Instructor: 0,
      };
    }

    if (userRole === "Admin") {
      courseRoleCount[courseName].Admin++;
    } else if (userRole === "Instructor") {
      courseRoleCount[courseName].Instructor++;
    }
  }

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey={`edit-user/${userId}`} title="Info"></Tab>
              <Tab
                eventKey={`user-courses-info/${userId}`}
                title="Courses"></Tab>
              <Tab eventKey={`user-groups/${userId}`} title="Groups"></Tab>
              <Tab eventKey={`user-files/${userId}`} title="Files"></Tab>
            </Tabs>
            <Card.Header>
              <Card.Title>Courses</Card.Title>
            </Card.Header>
            <Card.Body>
              {currentData?.length <= 0 ? (
                <div className="loader-container">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="140"
                    visible={true}
                  />
                </div>
              ) : currentData === null ? (
                <>
                  <div>
                    <p className="text-center fs-20 fw-bold">
                      No Course Found.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>
                          <strong>COURSE</strong>
                        </th>
                        <th>
                          <center>
                            <strong>ROLE</strong>
                          </center>
                        </th>
                        <th>
                          <center>
                            {" "}
                            <strong>ENROLLED ON</strong>
                          </center>
                        </th>
                        <th>
                          <center>
                            <strong>COMPLETION DATE</strong>
                          </center>
                        </th>
                        <th>
                          <center>
                            {" "}
                            <strong>OPTIONS</strong>
                          </center>
                        </th>
                      </tr>
                    </thead>
                    {role === "Superadmin" ? (
                      <tbody>
                        {currentData.map((data, index) => {
                          const dateTimeString = data.enrolled_on;
                          const date = new Date(dateTimeString);
                          const day = date.getDate();
                          const month = date.getMonth() + 1;
                          const year = date.getFullYear();
                          const formattedDate = `${
                            day < 10 ? "0" + day : day
                          }-${month < 10 ? "0" + month : month}-${year}`;
                          return (
                            <tr key={index}>
                              <td>{data.coursename}</td>
                              <td className="text-center">
                                {data.user_course_enrollment_id === null ? (
                                  "-"
                                ) : (
                                  <>{data.user_role}</>
                                )}
                              </td>
                              <td className="text-center">
                                {data.enrolled_on === null ? (
                                  "-"
                                ) : (
                                  <>{formattedDate}</>
                                )}
                              </td>
                              <td className="text-center">-</td>
                              <td className="text-center">
                                {data.user_course_enrollment_id === null ? (
                                  <div
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                    title="Enroll"
                                    onClick={(e) =>
                                      handleEnroll(e, data.course_id)
                                    }>
                                    <i className="fa-solid fa-plus"></i>
                                  </div>
                                ) : (
                                  <div
                                    className="btn btn-danger shadow btn-xs sharp"
                                    title="Unenroll"
                                    onClick={(e) =>
                                      handleUnEnroll(
                                        e,
                                        data.user_course_enrollment_id
                                      )
                                    }>
                                    <i className="fa-solid fa-minus"></i>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    ) : (
                      <tbody>
                        {currentData.map((data, index) => {
                          const dateTimeString = data.enrolled_on;
                          const date = new Date(dateTimeString);
                          const day = date.getDate();
                          const month = date.getMonth() + 1;
                          const year = date.getFullYear();
                          const formattedDate = `${
                            day < 10 ? "0" + day : day
                          }-${month < 10 ? "0" + month : month}-${year}`;
                          if (data.user_role === "Admin") {
                            return (
                              <tr key={index}>
                                <td>{data.coursename}</td>
                                <td className="text-center">
                                  {data.user_course_enrollment_id === null ? (
                                    "Created"
                                  ) : (
                                    <>{data.user_role}</>
                                  )}
                                </td>
                                <td className="text-center">
                                  {data.enrolled_on === null ? (
                                    "Not Enrolled"
                                  ) : (
                                    <>{formattedDate}</>
                                  )}
                                </td>
                                <td className="text-center">-</td>
                                <td className="text-center">
                                  {/* {data.user_role === "Admin" &&
                                  data.data_user_course_enrollment_id ===
                                    null && ( */}
                                  <div
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                    title="Enroll"
                                    onClick={(e) =>
                                      handleEnroll(e, data.course_id)
                                    }>
                                    <i className="fa-solid fa-plus"></i>
                                  </div>
                                  {/* )} */}

                                  <div
                                    className="btn btn-danger shadow btn-xs sharp"
                                    title="Unenroll"
                                    onClick={(e) =>
                                      handleUnEnrollAdmin(
                                        e,
                                        data.data_user_course_enrollment_id
                                      )
                                    }>
                                    <i className="fa-solid fa-minus"></i>
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                          return null; // This course is not "Admin," so we return null.
                        })}
                      </tbody>
                    )}
                  </Table>
                </>
              )}
              <br />
              <div className="pagination-down">
                <div className="d-flex align-items-center  ">
                  <h4 className=" ">
                    Showing <span>1-10 </span>from{" "}
                    <span>{totalCourseData} </span>
                    data
                  </h4>
                  <div className="d-flex align-items-center ms-auto mt-2">
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
                    <Button
                      className="ml-2"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={endIndex >= (currentData?.length || 0)}>
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div>
        <Button onClick={() => history.goBack()}>Back</Button>
      </div>
    </Fragment>
  );
};

export default UCoursesInfo;
