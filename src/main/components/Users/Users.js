import { useState, useEffect } from "react";
import React, { Fragment } from "react";
import { toast } from "react-toastify";
import { Row, Col, Card, Table, Button, Nav, Modal } from "react-bootstrap";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

const Users = () => {
  const [uid, setUId] = useState(); //user id save for delete
  const [token, setToken] = useState(); //auth token
  const [userData, setUserData] = useState([]); //user list data
  const [showModal, setShowModal] = useState(false); //delete button modal
  const history = useHistory();
  const [selectedFilter, setSelectedFilter] = useState(""); // Initialize with an empty string or default filter value
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalUserData, setTotalUserData] = useState(); //user list data
  const itemsPerPage = 20; // Number of items to display per page

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    getAllUsers();
  }, []);

  //User List Api
  const getAllUsers = () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const config = {
      headers: {
        "Auth-Token": jwtToken, // Attach the JWT token in the Authorization header
      },
    };
    axios
      .get("https://v1.eonlearning.tech/lms-service/users", config)
      .then((response) => {
        console.log(response.data.data.length);
        setTotalUserData(response.data.data.length);
        setUserData(response.data.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch users!"); // Handle the error
      });
  };

  const handleEdit = (id) => {
    history.push(`/edit-user/${id}`);
  };

  const deleteUser = (userId) => {
    setShowModal(true);
    setUId(userId);
  };

  const handleDelete = () => {
    const config = {
      headers: {
        "Auth-Token": token, // Attach the JWT token in the Authorization header
      },
    };
    const requestBody = {
      id: uid,
    };
    axios
      .delete(`https://v1.eonlearning.tech/lms-service/delete_user`, {
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
        // Handle the error
        console.error(error);
        toast.error("Failed to delete user!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = userData.slice(startIndex, endIndex);

  return (
    <>
      <Fragment>
        <Nav>
          <Nav.Item
            as="div"
            className="nav nav-tabs"
            id="nav-tab"
            role="tablist">
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
              to="/add-user">
              Add Users
            </Link>
          </Nav.Item>
        </Nav>

        <Row>
          <Col lg={12}>
            <Card>
              <Card.Header>
                <Card.Title>All Users List</Card.Title>
                <div>
                  <Link to="/add-user">
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
                {userData.length === undefined ? (
                  <div className="loader-container">
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="130"
                      visible={true}
                    />
                  </div>
                ) : userData.length > 0 ? (
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
                            <center>
                              ROLE&nbsp;
                              <select
                                value={selectedFilter}
                                style={{
                                  width: "21px",
                                  borderRadius: "6px",
                                }}
                                onChange={(e) =>
                                  setSelectedFilter(e.target.value)
                                }>
                                <option value="">All</option>{" "}
                                <option value="Superadmin">SuperAdmin</option>
                                <option value="Admin">Admin</option>
                                <option value="Instructor">Instructor</option>
                                <option value="Learner">Learner</option>
                              </select>
                            </center>
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
                        if (selectedFilter && item.role !== selectedFilter) {
                          return null; // Skip rendering this row
                        }
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
                                <div
                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                  title="Edit"
                                  onClick={(e) => handleEdit(item.id)}>
                                  <i className="fas fa-pencil-alt"></i>
                                </div>

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
                      <span>{totalUserData} </span>data
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
                        disabled={endIndex >= userData.length}>
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
