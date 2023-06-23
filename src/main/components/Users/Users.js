import { useState, useEffect } from "react";
import React, { Fragment } from "react";
import { Row, Col, Card, Table, Button, Nav } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [id, setId] = useState("");
  const [eid, setEid] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("");
  const [adhr, setAdhr] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();
  const [file, setFile] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState([]);
  const [data, setData] = useState([]);

  const getUsers = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api", requestOptions);
    const data = await response.json();

    console.log(data);
  };

  //User List Api
  const getAllUsers = () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    console.log(jwtToken);
    // Create the Axios request configuration
    const config = {
      headers: {
        "Auth-Token": jwtToken, // Attach the JWT token in the Authorization header
      },
    };
    // Make the Axios GET request
    axios
      .get("http://127.0.0.1:8000/lms-service/users", config)
      .then((response) => {
        // Handle the successful response
        console.log(response, response.data, response.data.data); // Do something with the user details
        setData(response.data.data);
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
        console.error(error);
      });
  };

  // function selectUser(userId)
  // {
  //   let item=users[id-1];
  //   setEid(item.eid);
  //   setFirstname(item.firstname);
  //   setLastname(item.lastname);
  //   setEmail(item.email);
  //   setDept(item.dept);
  //   setAdhr(item.adhr);
  //   setBio(item.bio);
  //   setUsername(item.username);
  //   setPassword(item.password);
  //   setFile(item.file);
  //   setIsActive(item.isActive);
  //   setUserId(item.id)
  // }
  // function updateUser()
  // {
  //   let item={eid,firstname,lastname,email,dept,adhr,bio,username, password,file,isActive,userId}
  //   console.warn("data",data)
  //   fetch(`http://localhost:8000/users/${userId}`, {
  //     method: 'PUT',
  //   }).then((result) => {
  //     result.json().then((resp) => {
  //       console.warn(resp)
  //       getUsers()
  //     })
  //   })
  // }

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    console.log(token);
    getAllUsers();
  }, []);

  async function deleteOperation(id) {
    if (window.confirm("Are you sure?")) {
      let result = await fetch("http://localhost:8000/users/" + id, {
        method: "DELETE",
      });
      result = await result.json();
      console.warn(result);
      getAllUsers();
    }
  }

  return (
    <>
      <Fragment>
        <Nav>
          <Nav.Item
            as="div"
            className="nav nav-tabs"
            id="nav-tab"
            role="tablist"
          >
            <Link
              as="button"
              className="nav-link  nt-unseen"
              id="nav-following-tab"
              eventkey="Follow"
              type="button"
              to="/dashboard"
            >
              Dashboard
            </Link>
            <Link
              as="button"
              className="nav-link  nt-unseen"
              id="nav-following-tab"
              eventkey="Follow"
              type="button"
              to="/add-user"
            >
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
              <Table responsive striped bordered className="verticle-middle">
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
                        <center>USER TYPE</center>
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
                <tbody>{data.length ===0?<strong> No User Found !</strong>:<>
                  {data.map((item, index) => {
                    const dateTimeString = item.created_at;//1
                    const date = new Date(dateTimeString);
                    const day = date.getDate();
                    const month = date.getMonth() + 1; // Months are zero-based, so add 1
                    const year = date.getFullYear();
                    const formattedDate = `${day < 10 ? "0" + day : day}-${
                      month < 10 ? "0" + month : month
                    }-${year}`;

                    // Input date and time string
                    const inputDateTime = item.updated_at;//2
                    // Convert inputDateTime to a JavaScript Date object
                    const dateObj = new Date(inputDateTime);
                    // Get the date in dd-mm-yyyy format
                    const day1 = dateObj.getDate().toString().padStart(2, "0");
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
                    console.log(data.length)
                    return (
                      <tr key={index}>
                        <td>
                          <center>{item.id}</center>
                        </td>
                        <td>
                          <center>{item.username}</center>
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
                          <center>{item.categorytype}</center>
                        </td>
                        <td>
                          <center>{formattedDate}</center>
                        </td>
                        <td>
                          <center>
                            {formattedDate1}&nbsp;&nbsp;{formattedTime}
                          </center>
                        </td>
                        {/* {users.map((data) => {
               return (
                <tr key={data.id}>
                <td><center>{data.eid}</center></td>
                <td><center>{data.eid}</center></td>
                <td><center>{data.firstname}  {data.lastname}</center></td>
                <td><center>{data.dept}</center></td>
                <td><center>{data.email}</center></td>
                <td><center>{data.categorytype}</center></td>
                <td><center>2/2/2022</center></td>
                <td><center>3 hrs Ago</center></td> */}
                        <td>
                          <center>
                            {/* <Button onClick={(e)=>selectUser(item.id)}>Select</Button> */}
                            <Link
                              to="/edit-user"
                              className="btn btn-primary shadow btn-xs sharp me-1"
                            >
                              <i className="fas fa-pencil-alt"></i>
                            </Link>
                            <Link
                              href="#"
                              className="btn btn-danger shadow btn-xs sharp"
                              onClick={() => deleteOperation(item.id)}
                            >
                              <i className="fa fa-trash"></i>
                            </Link>
                          </center>
                        </td>
                      </tr>
                    );
                  })}
                  </>} </tbody>
              </Table>
              {/* <div>
                <form action="http://localhost:8000/users/${userId}" method='PUT' encType="multipart/form-data">
                <input type="text" id="eid" name="eid" value={eid} onChange={(e) => setEid(e.target.value)} />
                <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" value={dept} onChange={(e) => setDept(e.target.value)} />
                <input type="text" value={adhr} onChange={(e) => setAdhr(e.target.value)} />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
                <input type="file" value={file} onChange={(e) => setFile(e.target.value)} />
                <input type="text" value={isActive} onChange={(e) => setIsActive(e.target.value)} />
                <button onClick={updateUser} >Update</button>
                </form>
              </div> */}
            </Card>
          </Col>
        </Row>
      </Fragment>
    </>
  );
};
export default Users;
