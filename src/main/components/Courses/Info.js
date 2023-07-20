import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner'
import {
  Row,
  Col,
  Card,
  Table,
  Button
} from "react-bootstrap";
import axios from 'axios';

const Info = () => {
  const [courses, setCourses] = useState([]);
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
  });
  const [token, setToken] = useState() //auth token
  const [allCategoriesData,setAllCategoriesData] = useState([])

  useEffect(() => {
    let accessToken = window.localStorage.getItem("jwt_access_token");
    setToken(accessToken);
    getAllCourses();
    console.log(allCategoriesData);
  }, []);


  const getAllCourses = async () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const url = "http://127.0.0.1:8000/lms-service/courses";
    try {
      const response = await axios.get(url, {
        headers: {
          "Auth-Token": jwtToken,
        },
      });

      // Handle the response data here
      console.log("getAllCourses", response.data);
      setAllCategoriesData(response.data.data);
    } catch (error) {
      // Handle errors if any
      console.error("Error fetching data:", error);
      toast.error('Failed to fetch Courses !') // Handle the error
    }
  };

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

  // useEffect( async () => {
  //   fetchData();
  // }, []);

  async function deleteOperation(id) {
    if (window.confirm("Are you sure?")) {
      let result = await fetch("https://localhost:8000/courses/" + id, {
        method: "DELETE",
      });
      result = await result.json();
      console.warn(result);
      // fetchData();
    }
  }
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

  const svg1 = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect x="0" y="0" width="24" height="24"></rect>
        <circle fill="#000000" cx="5" cy="12" r="2"></circle>
        <circle fill="#000000" cx="12" cy="12" r="2"></circle>
        <circle fill="#000000" cx="19" cy="12" r="2"></circle>
      </g>
    </svg>
  );
  let history = useHistory();
  return (
    <Fragment>
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
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <strong>
                        <center>COURSE ID</center>
                      </strong>
                    </th>
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
                {allCategoriesData === [] || allCategoriesData === null? <div className="loader-container">
                    <RotatingLines
                      strokeColor='grey'
                      strokeWidth='5'
                      animationDuration='0.75'
                      width='96'
                      visible={true}
                    /></div>:<>
                  {allCategoriesData.map((data) => {
                    // Input date and time string
                    const inputDateTime = data.updated_at //2
                        // Convert inputDateTime to a JavaScript Date object
                        const dateObj = new Date(inputDateTime)
                        // Get the date in dd-mm-yyyy format
                        const day1 = dateObj
                          .getDate()
                          .toString()
                          .padStart(2, '0')
                        const month1 = (dateObj.getMonth() + 1)
                          .toString()
                          .padStart(2, '0') // Months are zero-based
                        const year1 = dateObj.getFullYear().toString()
                        const formattedDate = `${day1}-${month1}-${year1}`

                          // Get the time in 12-hour format
                          let hours = dateObj.getHours()
                        const minutes = dateObj
                          .getMinutes()
                          .toString()
                          .padStart(2, '0')
                        const amPm = hours >= 12 ? 'PM' : 'AM'
                        hours = hours % 12 || 12
                        const formattedTime = `${hours}:${minutes} ${amPm}`

                    return (
                      <tr key={data.id}>
                        <td>
                          <center>{data.id}</center>
                        </td>
                        <td>
                          <center>
                            <Link to={"/edit-courses"}>
                              <strong>{data.coursename}</strong>
                            </Link>
                          </center>
                        </td>
                        <td>
                          <center>Sample</center>
                        </td>
                        <td>
                          <center>{formattedDate}&nbsp;&nbsp;{formattedTime}</center>
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
                            <Link
                              to="/add-courses"
                              className="btn btn-primary shadow btn-xs sharp me-1"
                            >
                              <i class="fa-solid fa-plus"></i>
                            </Link>
                            <Link
                              to="/course_overview"
                              className="btn btn-primary shadow btn-xs sharp me-1"
                            >
                              <i class="fa-regular fa-clipboard"></i>
                            </Link>
                            <Link
                              to="/edit-courses"
                              className="btn btn-primary shadow btn-xs sharp me-1"
                            >
                              <i className="fas fa-pencil-alt"></i>
                            </Link>
                            <Link
                              href="#"
                              className="btn btn-danger shadow btn-xs sharp"
                              onClick={() => deleteOperation(data.id)}
                            >
                              <i className="fa fa-trash"></i>
                            </Link>
                          </center>
                        </td>
                      </tr>
                    );
                  })}</>}
                </tbody>
              </Table>
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

export default Info;
