import React, { Fragment, useState, useEffect } from "react";
// import PageTitle from "../../layouts/PageTitle";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Tab,
  Tabs,
  Button,
  Nav,
} from "react-bootstrap";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

const options_1 = [
  { value: "ist", label: "India Standard Time (IST)" },
  { value: "nst", label: "New Zealand Standard Time (NST)" },
  { value: "ast", label: "Alaska Standard Time (AST)" },
  { value: "gmt", label: "Greenwich Mean Time (GMT)" },
  { value: "ect", label: "European Central Time (ECT)" },
  { value: "arabic", label: "Egypt Standard Time	(Arabic)" },
];

const AdUserCourse = (props) => {
  const userId = props.match.params.id;
  const [activeTab, setActiveTab] = useState("insuser-course/:id");
  const [totalCourseData, setTotalCourseData] = useState(0);
  const [coursesIns, setcoursesIns] = useState([]); //instructor
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 10; // Number of items to display per page
  const history = useHistory();

  useEffect(() => {
    fetchCoursesAdminIns();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  useEffect(() => {
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1);
    setActiveTab(tab);
  }, [history.location.pathname]);

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
      const data = response.data.data;
      setcoursesIns(data === null ? data : data.course_ids);
      setTotalCourseData(data === null ? 0 : data.course_ids.length);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleEnroll = () => {};

  const handleUnEnroll = () => {};

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData =
    coursesIns === null ? null : coursesIns.slice(startIndex, endIndex);

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey={`insedit-user/${userId}`} title="Info"></Tab>
              <Tab eventKey={`insuser-course/${userId}`} title="Courses"></Tab>
              <Tab eventKey={`insuser-groups/${userId}`} title="Groups"></Tab>
              <Tab eventKey={`insuser-files/${userId}`} title="Files"></Tab>
            </Tabs>
            <Card.Header>
              <Card.Title>Courses</Card.Title>
            </Card.Header>
            <Card.Body>
              {" "}
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
                    <tbody>
                      {currentData?.map((data, index) => {
                        const dateTimeString = data.enrolled_on;
                        const date = new Date(dateTimeString);
                        const day = date.getDate();
                        const month = date.getMonth() + 1;
                        const year = date.getFullYear();
                        const formattedDate = `${day < 10 ? "0" + day : day}-${
                          month < 10 ? "0" + month : month
                        }-${year}`;
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
                              <div
                                className="btn btn-primary shadow btn-xs sharp me-1"
                                title="Enroll"
                                onClick={(e) =>
                                  handleEnroll(e, data.course_id)
                                }>
                                <i className="fa-solid fa-plus"></i>
                              </div>

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
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </>
              )}
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
        <Button onClick={() => history.goBack()}>Cancel</Button>
      </div>
    </Fragment>
  );
};

export default AdUserCourse;
