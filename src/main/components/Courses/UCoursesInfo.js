import React, { Fragment, useState, useEffect } from "react";
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
  Tab,
  Tabs,
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const UCoursesInfo = (props) => {
  const userId = props.match.params.id;
  console.log({ userId });
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState("user-courses-info/:id");
  const [coursesAll, setCoursesAll] = useState([]);
  const [token, setToken] = useState(); //auth token
  const history = useHistory();

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    getAllCourses();
  }, []);

  // User List Api
  const getAllCourses = () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const config = {
      headers: {
        "Auth-Token": jwtToken,
      },
    };
    axios
      .get(
        "http://127.0.0.1:8000/user-tab1/fetch_enroll_courses_of_user",
        config
      )
      .then((response) => {
        console.log(response.data.data);
        const allUsers = response.data.data.course_ids;
        // const adminUsers = allUsers.filter((user) => user.role === "Admin");
        setCoursesAll(allUsers);
        // setTotalUserData(response.data.data.user_ids.length);
      })
      .catch((error) => {
        toast.error("Failed to fetch users!");
      });
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  useEffect(() => {
    // When the component mounts, set the active tab based on the current route
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1); // Remove the leading slash
    setActiveTab(tab);
  }, [history.location.pathname]);

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
              <Table responsive>
                <thead>
                  <tr>
                    <th className="width80">
                      <strong>COURSE</strong>
                    </th>
                    <th>
                      <strong>ROLE</strong>
                    </th>
                    <th>
                      <strong>ENROLLED ON</strong>
                    </th>
                    <th>
                      <strong>COMPLETION DATE</strong>
                    </th>
                    <th>
                      <strong>OPTION</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {coursesAll.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td>
                          <strong>{data.coursename}</strong>
                        </td>
                        <td>{data.role}</td>
                        <td>1/11/2022</td>
                        <td>-</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="success"
                              className="light sharp i-false">
                              {svg1}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#">
                                <strong>
                                  <i class="bi bi-dash"></i>
                                </strong>
                              </Dropdown.Item>
                              <Dropdown.Item href="#">
                                <strong>
                                  <i class="bi bi-arrow-repeat"></i>
                                </strong>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
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

export default UCoursesInfo;
