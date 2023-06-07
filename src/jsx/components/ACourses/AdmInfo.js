import React, { Fragment, useState, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import { Link, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Dropdown,
  ProgressBar,
  Button,
  Nav,
} from "react-bootstrap";

/// imge
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import avatar3 from "../../../images/avatar/3.jpg";

const AdmInfo = () => {
  const [courses, setCourses] = useState([]);
  const getUsers = async () => {
    const requestOptions = {
      method:"GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api", requestOptions);
    const data = await response.json();

    console.log(data);
  };
  const fetchData = () => {
     fetch('http://localhost:8000/courses')
        .then((res) => res.json())
        .then((data) => {
           console.log(data);
           setCourses(data);
        })
        .catch((err) => {
           console.log(err.message);
        });
  };

  useEffect( async () => {
    fetchData();
  }, []);

  async function deleteOperation(id)
  {
    if (window.confirm('Are you sure?'))
    {
      let result=await fetch("https://localhost:8000/courses/"+id,{
        method:'DELETE'
      });
      result=await result.json();
      console.warn(result)
      fetchData();
    }
  }
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
      });
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
                <Link to="/adm_add-courses">
                  <Button variant="primary">Add Courses</Button>
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <strong><center>COURSE ID</center></strong>
                    </th>
                    <th>
                      <strong><center>COURSE NAME</center></strong>
                    </th>
                    <th>
                      <strong><center>CATEGORY</center></strong>
                    </th>
                    <th>
                      <strong><center>LAST UPDATED ON</center></strong>
                    </th>
                    <th>
                      <strong><center>OPTION</center></strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {courses.map((data) => {
               return (
                  <tr key={data.id}>
                    <td><center>{data.id}</center></td>
                    <td>
                    <center><Link to={"/adm_edit-courses"}><strong>{data.coursename}</strong></Link></center>
                    </td>
                <td><center>Sample</center></td>
                <td><center>2/2/2022</center></td>
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
                          to="/adm_add-courses"
                          className="btn btn-primary shadow btn-xs sharp me-1"
                        >
                          <i class="fa-solid fa-plus"></i>
                        </Link>
                        <Link
                          to="/adm_course_overview"
                          className="btn btn-primary shadow btn-xs sharp me-1"
                        >
                          <i class="fa-regular fa-clipboard"></i>
                        </Link>
                        <Link
                          to="/adm_edit-courses"
                          className="btn btn-primary shadow btn-xs sharp me-1"
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-danger shadow btn-xs sharp"
                          onClick={()=>deleteOperation(data.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </Link>
                      </center>
                    </td>
                  </tr>
               );
                })}
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

export default AdmInfo;