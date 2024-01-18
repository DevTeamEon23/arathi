import { useState, useEffect } from "react";
import React, { Fragment } from "react";
import { toast } from "react-toastify";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Tab,
  Tabs,
} from "react-bootstrap";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

const Users = () => {
  const [uid, setUId] = useState(); //user id save for delete
  const [token, setToken] = useState(); //auth token
  const [userAllData, setUserAllData] = useState([]); //user list data
  const [userDepartment, setUserDepartment] = useState(""); // Department
  const [showModal, setShowModal] = useState(false); //delete button modal
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalUserData, setTotalUserData] = useState(); //user list data count
  const itemsPerPage = 20; // Number of items to display per page
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    const Department = window.localStorage.getItem("dept");
    if (Department) {
      setUserDepartment(Department);
    }
    getAllUsers();
  }, []);

  //Instructor User List Api
  const getAllUsers = () => {
    const Department = window.localStorage.getItem("dept");
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const config = {
      headers: {
        "Auth-Token": jwtToken,
      },
    };
    axios
      .get(
        "lms-service/instructor_learner_data",
        config
      )
      .then((response) => {
        const allUsers = response.data.data.users_data;
        const instrutorUsers = allUsers.filter(
          (user) => user.role !== "Instructor"
        );
        const departmentList = instrutorUsers.filter(
          (user) => user.dept === Department
        );
        setUserAllData(departmentList);
        setTotalUserData(departmentList.length);
        console.log(response.data.data.length);
      })
      .catch((error) => {
        toast.error("Failed to fetch users!");
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
  const handleEdit = (id) => {
    history.push(`/insedit-user/${id}`);
  };

  const deleteUser = (userId) => {
    setShowModal(true);
    setUId(userId);
  };

  const handleDelete = () => {
    const config = {
      headers: {
        "Auth-Token": token,
      },
    };
    const requestBody = {
      id: uid,
    };
    axios
      .delete(`lms-service/delete_user`, {
        ...config,
        data: requestBody,
      })
      .then((response) => {
        setShowModal(false);
        getAllUsers();
        toast.success("User deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.error(error);
        setShowModal(false);
        toast.error("Failed to delete user!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let currentData = userAllData.slice(startIndex, endIndex);

  return (
    <>
      <Fragment>
        <Tabs activeKey={activeTab} onSelect={handleTabChange}>
          <Tab eventKey="dashboard" title="Dashboard"></Tab>
          <Tab eventKey="insadd-user" title="Add Users"></Tab>
        </Tabs>
        <Row>
          <Col lg={12}>
            <Card>
              <Card.Header>
                <Card.Title>All Users List</Card.Title>
                <div>
                  <Link to="/insadd-user">
                    <Button variant="primary">Add Users</Button>
                  </Link>
                  &nbsp;&nbsp;
                  <Link to="/import-user">
                    <Button variant="primary">Import Users</Button>
                  </Link>
                  &nbsp;&nbsp;
                  <Link to="/export-user">
                    <Button variant="primary">Export Users</Button>
                  </Link>
                </div>
              </Card.Header>
              <Card.Body>
                {userAllData.length === undefined ? (
                  <div className="loader-container">
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="130"
                      visible={true}
                    />
                  </div>
                ) : userAllData.length > 0 ? (
                  <Table responsive striped bordered>
                    <thead>
                      <tr>
                        <th>
                          <strong>
                            <center>EID</center>
                          </strong>
                        </th>
                        <th>
                          <strong>
                            <center>SID</center>
                          </strong>
                        </th>
                        <th>
                          <strong>
                            <center>USER</center>
                          </strong>
                        </th>
                        <th>
                          <strong>
                            <center>DEPARTMENT</center>
                          </strong>
                        </th>
                        <th>
                          <strong>
                            <center>EMAIL</center>
                          </strong>
                        </th>
                        <th>
                          <strong>
                            <center>ROLE&nbsp;</center>
                          </strong>
                        </th>
                        <th>
                          <strong>
                            <center>REGISTRATION</center>
                          </strong>
                        </th>
                        <th>
                          <strong>
                            <center>LAST LOGIN</center>
                          </strong>
                        </th>
                        <th>
                          <strong>
                            <center>OPTIONS</center>
                          </strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.map((item, index) => {
                        const dateTimeString = item.created_at; //1
                        const date = new Date(dateTimeString);
                        const day = date.getDate();
                        const month = date.getMonth() + 1; // Months are zero-based, so add 1
                        const year = date.getFullYear();
                        const formattedDate = `${day < 10 ? "0" + day : day}-${
                          month < 10 ? "0" + month : month
                        }-${year}`;

                        // Input date and time string
                        const inputDateTime = item.updated_at; //2
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
                        const formattedDate1 = `${day1}-${month1}-${year1}`;

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
                          <tr key={index}>
                            <td>
                              <center>{item.eid}</center>
                            </td>
                            <td>
                              <center>{item.sid}</center>
                            </td>
                            <td>
                              <center>{item.full_name}</center>
                            </td>
                            <td>
                              <center>{item.dept}</center>
                            </td>
                            <td>
                              <center>{item.email}</center>
                            </td>
                            <td>
                              <center>{item.role}</center>
                            </td>
                            <td>
                              <center>{formattedDate}</center>
                            </td>
                            <td>
                              <center>
                                {formattedDate1}&nbsp;&nbsp;{formattedTime}
                              </center>
                            </td>
                            <td>
                              <center>
                                {item.role === "Learner" && (
                                  <div
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                    title="Edit"
                                    onClick={(e) => handleEdit(item.id)}>
                                    <i className="fas fa-pencil-alt"></i>
                                  </div>
                                )}

                                <div
                                  className="btn btn-danger shadow btn-xs sharp"
                                  title="Delete"
                                  onClick={() => deleteUser(item.id)}>
                                  <i className="fa fa-trash"></i>
                                </div>
                              </center>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <>
                    {" "}
                    <div>
                      <p className="text-center fs-20 fw-bold">
                        No User Found.
                      </p>
                    </div>
                  </>
                )}
                <div className="pagination-down">
                  <div className="d-flex align-items-center  ">
                    <h4 className=" ">
                      Showing <span>1-20 </span>from{" "}
                      <span>{totalUserData}</span>&nbsp;data
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
                        disabled={endIndex >= userAllData.length}>
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Fragment>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Are you sure you want to delete User?</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger light" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="btn btn-primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Users;
