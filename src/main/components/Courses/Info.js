import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Nav,
  Tab,
  Tabs,
} from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "src/store/user/userSlice";

const Info = () => {
  const [token, setToken] = useState(); //auth token
  const [allCourseData, setAllCourseData] = useState([]); //set course data SuperAdmin
  const [courseName, setCourseName] = useState(""); //course name
  const [showModal, setShowModal] = useState(false); //delete button modal
  const [showCloneModal, setShowCloneModal] = useState(false); //clone modal
  const [courseCloneId, setCourseCloneId] = useState(); //course id save for clone
  const [courseId, setCourseId] = useState(); //course id save for delete
  const [activeTab, setActiveTab] = useState("/add-courses");
  const [courses, setCourses] = useState([]); //admin instructor
  // const roleType = useSelector(selectUser).role[0];
  const user = useSelector(selectUser);
  const roleType = user && user.role && user.role[0];
  let history = useHistory();
  const accessToken = window.localStorage.getItem("jwt_access_token");
  const ID = window.localStorage.getItem("id");

  useEffect(() => {
    setToken(accessToken);
    if (roleType === "Superadmin") {
      getAllCourses();
    } else if (roleType === "Admin") {
      fetchCourseDataAdmin(accessToken, ID);
    } else {
      fetchCourseData(accessToken, ID);
    }
  }, []);

  //superadmin course fetch
  const getAllCourses = async () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const url = "lms-service/courses";
    try {
      const response = await axios.get(url, {
        headers: {
          "Auth-Token": jwtToken,
        },
      });
      const courseData = response.data.data;
      // const names = courseData.map((course) => course.coursename);
      // setCourseName(names);
      setAllCourseData(
        courseData === null ? courseData : courseData.courses_data
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch Courses !"); // Handle the error
    }
  };

  //admin course fetch
  const fetchCourseDataAdmin = async (accessToken, ID) => {
    try {
      const queryParams = {
        user_id: ID,
      };
      const url = new URL(
        "lms-service/fetch_enrolled_and_admin_inst_created_course_data_for_admin"
      );
      url.search = new URLSearchParams(queryParams).toString();
      const response = await axios.get(url.toString(), {
        headers: {
          "Auth-Token": accessToken,
          "Content-Type": "multipart/form-data",
        },
      });
      const list = response.data.data;
      setCourses(
        list === null ? response.data.data : response.data.data.course_ids
      );
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to fetch Courses !");
    }
  };

  //inst course fetch
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
      const list = response.data.data;
      setCourses(
        list === null ? response.data.data : response.data.data.course_ids
      );
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to fetch Courses !");
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

  const deleteOperation = (courseId) => {
    console.log(courseId);
    setShowModal(true);
    setCourseId(courseId);
  };

  const handleDeleteCourseMain = () => {
    const config = {
      headers: {
        "Auth-Token": token,
      },
    };
    const requestBody = {
      id: courseId,
    };
    axios
      .delete(`lms-service/delete_course`, {
        ...config,
        data: requestBody,
      })
      .then((response) => {
        setShowModal(false);
        getAllCourses();
        toast.success("Course deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.error(error);
        setShowModal(false);
        toast.error("Failed to delete Course!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  //delete for admin inst created
  const handleDeleteCourseMain2 = (Id) => {
    console.log(Id);
    const config = {
      headers: {
        "Auth-Token": token,
      },
    };
    const requestBody = {
      id: Id,
    };
    axios
      .delete(`lms-service/delete_course`, {
        ...config,
        data: requestBody,
      })
      .then((response) => {
        setShowModal(false);
        if (roleType === "Admin") {
          fetchCourseDataAdmin(accessToken, ID);
        } else {
          fetchCourseData(accessToken, ID);
        }
        toast.success("Course deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.error(error);
        setShowModal(false);
        toast.error("Failed to delete Course!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleDeleteCourse = async () => {
    const ID = window.localStorage.getItem("id");
    try {
      const queryParams = {
        data_user_course_enrollment_id: courseId,
      };
      const url = new URL(
        "lms-service/unenroll_courses_from_enrolled_user"
      );
      url.search = new URLSearchParams(queryParams).toString();
      await axios.delete(url.toString(), {
        headers: {
          "Auth-Token": token,
          "Content-Type": "multipart/form-data",
        },
      });
      setShowModal(false);
      fetchCourseData(token, ID);
      toast.success("Course deleted successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.error(error);
      setShowModal(false);
      toast.error("Failed to delete Course!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleClone = (id, coursename) => {
    setShowCloneModal(true);
    setCourseName(coursename);
    setCourseCloneId(id);
  };

  const handleCatClone = () => {
    const id = courseCloneId;
    const authToken = token;
    const url = `lms-service/clonecourse/${id}`;
    axios
      .post(url, null, {
        headers: {
          "Auth-Token": authToken,
        },
      })
      .then((response) => {
        setShowCloneModal(false);
        getAllCourses();
        toast.success("Course Clone successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        setShowCloneModal(false);
        console.error(error);
        toast.error(
          "Failed to Clone Course...! One course can clone one time only",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      });
  };

  const handleEdit = (id) => {
    history.push(`/edit-courses/${id}`);
  };

  return (
    <Fragment>
      <Tabs activeKey={activeTab} onSelect={handleTabChange}>
        <Tab eventKey="dashboard" title="Dashboard"></Tab>
        <Tab eventKey="add-courses" title="Add Course"></Tab>
      </Tabs>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Enrolled Courses</Card.Title>
              <div>
                <Link to="/add-courses">
                  <Button variant="primary">Add Courses</Button>
                </Link>
              </div>
            </Card.Header>
            {roleType === "Superadmin" && (
              <Card.Body>
                {allCourseData?.length <= 0 ? (
                  <div className="loader-container">
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="140"
                      visible={true}
                    />
                  </div>
                ) : allCourseData === null ? (
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
                            <strong>
                              <center>COURSE NAME</center>
                            </strong>
                          </th>
                          <th>
                            <strong>
                              <center>CATEGORY</center>
                            </strong>
                          </th>
                          <th>
                            <strong>
                              <center>LAST UPDATED ON</center>
                            </strong>
                          </th>
                          <th>
                            <strong>
                              <center>OPTION</center>
                            </strong>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {allCourseData.map((data) => {
                          // Input date and time string
                          const inputDateTime = data.updated_at; //2
                          // Convert inputDateTime to a JavaScript Date object
                          const dateObj = new Date(inputDateTime);
                          // Get the date in dd-mm-yyyy format
                          const day1 = dateObj
                            .getDate()
                            .toString()
                            .padStart(2, "0");
                          const month1 = (dateObj.getMonth() + 1)
                            .toString()
                            .padStart(2, "0"); // Months are zero-based
                          const year1 = dateObj.getFullYear().toString();
                          const formattedDate = `${day1}-${month1}-${year1}`;

                          // Get the time in 12-hour format
                          let hours = dateObj.getHours();
                          const minutes = dateObj
                            .getMinutes()
                            .toString()
                            .padStart(2, "0");
                          const amPm = hours >= 12 ? "PM" : "AM";
                          hours = hours % 12 || 12;
                          const formattedTime = `${hours}:${minutes} ${amPm}`;

                          return (
                            <tr key={data.id}>
                              <td>
                                <center>
                                  <strong>{data.coursename}</strong>
                                </center>
                              </td>
                              <td>
                                <center>{data.category}</center>
                              </td>
                              <td>
                                <center>
                                  {formattedDate}&nbsp;&nbsp;{formattedTime}
                                </center>
                              </td>
                              <td>
                                <center>
                                  <div
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                    title="Clone">
                                    <i
                                      className="fa-solid fa-plus"
                                      onClick={(e) =>
                                        handleClone(data.id, data.coursename)
                                      }></i>
                                  </div>
                                  {/* <Link
                                  to="/course-reports"
                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                  title="Reports">
                                  <i class="fa-regular fa-clipboard"></i>
                                </Link> */}
                                  <div
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                    title="Edit"
                                    onClick={(e) => handleEdit(data.id)}>
                                    <i className="fas fa-pencil-alt"></i>
                                  </div>
                                  <div
                                    className="btn btn-danger shadow btn-xs sharp"
                                    title="Delete"
                                    onClick={() => deleteOperation(data.id)}>
                                    <i className="fa fa-trash"></i>
                                  </div>
                                </center>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </>
                )}
              </Card.Body>
            )}
            {roleType === "Admin" || roleType === "Instructor" ? (
              <Card.Body>
                {courses?.length <= 0 ? (
                  <div className="loader-container">
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="140"
                      visible={true}
                    />
                  </div>
                ) : courses === null ? (
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
                            <strong>COURSE NAME</strong>
                          </th>
                          <th>
                            <strong>CATEGORY</strong>
                          </th>
                          <th>
                            <strong>LAST UPDATED ON</strong>
                          </th>
                          <th>
                            <strong>
                              <center>OPTIONS</center>
                            </strong>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses?.map((data) => {
                          const dateTimeString = data.updated_at; //1
                          const date = new Date(dateTimeString);
                          const day = date.getDate();
                          const month = date.getMonth() + 1;
                          const year = date.getFullYear();
                          const formattedDate = `${
                            day < 10 ? "0" + day : day
                          }-${month < 10 ? "0" + month : month}-${year}`;

                          //Time
                          let hours = date.getHours();
                          const minutes = date
                            .getMinutes()
                            .toString()
                            .padStart(2, "0");
                          const amPm = hours >= 12 ? "PM" : "AM";
                          hours = hours % 12 || 12;
                          const formattedTime = `${hours}:${minutes} ${amPm}`;

                          return (
                            <tr key={data.id}>
                              <td>
                                {data.coursename}
                                {roleType === "Instructor" &&
                                data.user_course_enrollment_id === null ? (
                                  <span className="enrolled-label">
                                    Created
                                  </span>
                                ) : (
                                  ""
                                )}

                                {roleType === "Admin" &&
                                data.user_course_enrollment_id === null &&
                                data.user_role === "Instructor" ? (
                                  <span className="enrolled-label">
                                    Instructor Created
                                  </span>
                                ) : data.user_course_enrollment_id === null &&
                                  data.user_role === "Admin" ? (
                                  <span className="enrolled-label">
                                    Admin Created
                                  </span>
                                ) : (
                                  ""
                                )}
                              </td>
                              <td>{data.category}</td>
                              <td>
                                {formattedDate}&nbsp;&nbsp;{formattedTime}
                              </td>
                              <td>
                                {" "}
                                <center>
                                  <div
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                    title="Clone">
                                    <i
                                      className="fa-solid fa-plus"
                                      onClick={(e) =>
                                        handleClone(data.id, data.coursename)
                                      }></i>
                                  </div>

                                  <div
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                    title="Edit"
                                    onClick={(e) => handleEdit(data.id)}>
                                    <i className="fas fa-pencil-alt"></i>
                                  </div>
                                  {data.data_user_course_enrollment_id ===
                                  null ? (
                                    <div
                                      className="btn btn-danger shadow btn-xs sharp"
                                      title="Delete"
                                      onClick={() =>
                                        handleDeleteCourseMain2(data.course_id)
                                      }>
                                      <i className="fa fa-trash"></i>
                                    </div>
                                  ) : (
                                    <div
                                      className="btn btn-danger shadow btn-xs sharp"
                                      title="Delete"
                                      onClick={() =>
                                        deleteOperation(
                                          data.data_user_course_enrollment_id
                                        )
                                      }>
                                      <i className="fa fa-trash"></i>
                                    </div>
                                  )}
                                </center>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </>
                )}
              </Card.Body>
            ) : (
              ""
            )}
          </Card>
        </Col>
      </Row>
      <div>
        <Button onClick={() => history.goBack()}>Back</Button>
      </div>
      <br />
      <br />
      {/* Delete Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Are you sure you want to delete this Course?</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger light" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="btn btn-primary"
            onClick={
              roleType === "Superadmin"
                ? handleDeleteCourseMain
                : handleDeleteCourse
            }>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Clone Modal */}
      <Modal show={showCloneModal} onHide={() => setShowCloneModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Clone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fs-20 text-center">
            {" "}
            Are you sure you want to clone the course{" "}
            <strong>{courseName}</strong> ?
          </p>
          <p className="text-danger text-center mt-2 fw-bold fs-14">
            {" "}
            (one course can clone one time only)
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger light"
            onClick={() => setShowCloneModal(false)}>
            Close
          </Button>
          <Button variant="btn me-2 btn-primary" onClick={handleCatClone}>
            Clone
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Info;
