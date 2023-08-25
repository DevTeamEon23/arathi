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

const Info = () => {
  const [token, setToken] = useState(); //auth token
  const [allCourseData, setAllCourseData] = useState([]); //set course data
  const [courseName, setCourseName] = useState(""); //course name
  const [showModal, setShowModal] = useState(false); //delete button modal
  const [showCloneModal, setShowCloneModal] = useState(false); //clone modal
  const [courseCloneId, setCourseCloneId] = useState(); //course id save for clone
  const [courseId, setCourseId] = useState(); //course id save for delete
  const [activeTab, setActiveTab] = useState("/add-courses");
  let history = useHistory();

  useEffect(() => {
    let accessToken = window.localStorage.getItem("jwt_access_token");
    setToken(accessToken);
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const url = "https://v1.eonlearning.tech/lms-service/courses";
    try {
      const response = await axios.get(url, {
        headers: {
          "Auth-Token": jwtToken,
        },
      });
      const courseData = response.data.data;
      console.log("getAllCourses", response.data);
      // const names = courseData.map((course) => course.coursename);
      // setCourseName(names);
      setAllCourseData(courseData);
    } catch (error) {
      // Handle errors if any
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch Courses !"); // Handle the error
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
    setShowModal(true);
    console.log("inside delete course", courseId);
    setCourseId(courseId);
  };

  const handleCatDelete = () => {
    console.log("modal delete", courseId);
    const config = {
      headers: {
        "Auth-Token": token, // Attach the JWT token in the Authorization header
      },
    };
    const requestBody = {
      id: courseId,
    };
    console.log("config", config, requestBody);
    // Make the Axios DELETE request
    axios
      .delete(`https://v1.eonlearning.tech/lms-service/delete_course`, {
        ...config,
        data: requestBody,
      })
      .then((response) => {
        setShowModal(false);
        console.log(response.data.status);
        getAllCourses();
        toast.success("Course deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
        toast.error("Failed to delete Course!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleClone = (id, coursename) => {
    setShowCloneModal(true);
    console.log("inside course handle clone", id, coursename);
    setCourseName(coursename);
    setCourseCloneId(id);
  };

  const handleCatClone = () => {
    const id = courseCloneId;
    const authToken = token;
    const url = `http://127.0.0.1:8000/lms-service/clonecourse/${id}`;
    axios
      .post(url, null, {
        headers: {
          "Auth-Token": authToken,
        },
      })
      .then((response) => {
        setShowCloneModal(false);
        console.log(response.data.status);
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
    console.log("inside course handle edit page", id);
    history.push(`/edit-courses/${id}`);
  };

  return (
    <Fragment>
      {/* <Nav>
        <Nav.Item as="div" className="nav nav-tabs" id="nav-tab" role="tablist">
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventkey="Follow"
            type="button"
            to="/dashboard">
            Dashboard
          </Link>
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventkey="Follow"
            type="button"
            to="/add-courses">
            Add Course
          </Link>
        </Nav.Item>
      </Nav> */}
      <Tabs activeKey={activeTab} onSelect={handleTabChange}>
        <Tab eventKey="dashboard" title="Dashboard"></Tab>
        <Tab eventKey="add-courses" title="Add Course"></Tab>
      </Tabs>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Courses</Card.Title>
              <div>
                <Link to="/add-courses">
                  <Button variant="primary">Add Courses</Button>
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              {allCourseData.length === 0 ? (
                <div className="loader-container">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="140"
                    visible={true}
                  />
                </div>
              ) : allCourseData.length > 0 ? (
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
                              {/* <center>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="success"
                          className="light sharp i-false"
                        >
                          {svg1}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="/add-courses"><i class="bi bi-plus-circle">&nbsp;</i>Add</Dropdown.Item>
                          <Dropdown.Item href="/course_overview"><i class="bi bi-graph-up">  &nbsp;</i>Reports</Dropdown.Item>
                          <Dropdown.Item href="/edit-courses"><i class="bi bi-pencil-square">  &nbsp;</i>Edit</Dropdown.Item>
                          <Dropdown.Item href="#" onClick={()=>deleteOperation(data.id)}><i class="bi bi-x-circle">  &nbsp;</i>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      </center> */}
                              <center>
                                <div
                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                  title="Clone">
                                  <i
                                    class="fa-solid fa-plus"
                                    onClick={(e) =>
                                      handleClone(data.id, data.coursename)
                                    }></i>
                                </div>
                                <Link
                                  to="/course-reports"
                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                  title="Reports">
                                  <i class="fa-regular fa-clipboard"></i>
                                </Link>
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
              ) : (
                <>
                  <div>
                    <p className="text-center fs-20 fw-bold">
                      No Course Found.
                    </p>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div>
        <Button onClick={() => history.goBack()}>Back</Button>
      </div>
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
          <Button variant="btn btn-primary" onClick={handleCatDelete}>
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
          Are you sure you want to clone the course{" "}
          <strong>{courseName}</strong> ?
          <p className="text-danger text-center mt-2">
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

{
  /* <Link
to="/add-courses"
className="btn btn-primary shadow btn-xs sharp me-1">
<i class="fa-solid fa-plus"></i>
</Link> */
}
