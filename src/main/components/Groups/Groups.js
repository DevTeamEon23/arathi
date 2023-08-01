import React, { Fragment, useState, useEffect } from "react";
import Select from "react-select";
import { Link, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Dropdown,
  ProgressBar,
  Nav,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

const options = [
  { value: "mass", label: "Mass Action" },
  { value: "all", label: "Add a course to all groups" },
  { value: "removeall", label: "Remove a course from all groups" },
];

const Groups = () => {
  const [token, setToken] = useState(); //auth token
  const [selectedOption, setSelectedOption] = useState(null);
  const [grpData, setGrpData] = useState([]);

  useEffect(() => {
    let accessToken = window.localStorage.getItem("jwt_access_token");
    setToken(accessToken);
    getAllGroups();
  }, []);

  const getAllGroups = async () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const url = "http://127.0.0.1:8000/lms-service/groups";
    try {
      const response = await axios.get(url, {
        headers: {
          "Auth-Token": jwtToken,
        },
      });
      console.log("getAllGroups", response.data);
      setGrpData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch Courses !"); // Handle the error
    }
  };

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

  let history = useHistory();
  return (
    <Fragment>
      <Nav>
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
            to="/add-groups">
            Add Groups
          </Link>
        </Nav.Item>
      </Nav>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>
                <div>
                  <Link to="/add-groups">
                    <Button variant="primary">Add Groups</Button>
                  </Link>
                </div>
              </Card.Title>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                className="col-lg-5"></Select>
            </Card.Header>
            <Card.Body>
              {grpData.length === 0 ? (
                <div className="loader-container">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="130"
                    visible={true}
                  />
                </div>
              ) : grpData.length > 0 ? (
                <Table responsive>
                  <thead>
                    <tr>
                      <th className="width110"></th>
                      <th>
                        <strong>NAME</strong>
                      </th>
                      <th>
                        <strong>DESCRIPTION</strong>
                      </th>
                      <th>
                        <strong>OPTION</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {grpData?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td></td>
                          <td>{item.groupname}</td>
                          <td>{item.groupdesc}</td>
                          <td>
                            <div className="d-flex">
                              <Link
                                to="/edit-groups"
                                className="btn btn-primary shadow btn-xs sharp me-2 ml-2">
                                <i className="fas fa-pencil-alt"></i>
                              </Link>
                              <Link
                                href="#"
                                className="btn btn-danger shadow btn-xs sharp"
                                // onClick={() => deleteOperation(item.id)}
                              >
                                <i className="fa fa-trash"></i>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <>
                  {" "}
                  <tr>
                    <td colSpan="13" rowSpan="13" className="text-center fs-16">
                      No Group Found.
                    </td>
                  </tr>
                </>
              )}
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

export default Groups;
