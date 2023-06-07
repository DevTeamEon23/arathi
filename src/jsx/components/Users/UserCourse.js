import React, { Fragment, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
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

const options_1 = [
  { value: "ist", label: "India Standard Time (IST)" },
  { value: "nst", label: "New Zealand Standard Time (NST)" },
  { value: "ast", label: "Alaska Standard Time (AST)" },
  { value: "gmt", label: "Greenwich Mean Time (GMT)" },
  { value: "ect", label: "European Central Time (ECT)" },
  { value: "arabic", label: "Egypt Standard Time	(Arabic)" },
];

const UserCourse = () => {
  const [selectedOption, setSelectedOption] = useState(null);
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
    <Nav >
      <Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
      <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/user-progress">Overview</Link>
      <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/user-course">Courses</Link>
      <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/user-certificates">Certificates</Link>
      <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/user-timeline">Timeline</Link>
      </Nav.Item>
    </Nav>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Courses</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table table-borderless >
                <thead>
                  <tr>
                    <th scope="col">
                      <strong>COURSE</strong>
                    </th>
                    <th>
                      <strong>PROGRESS</strong>
                    </th>
                    <th>
                      <strong>SCORE</strong>
                    </th>
                    <th>
                      <strong>ENROLLED ON</strong>
                    </th>
                    <th>
                      <strong>DUE DATE</strong>
                    </th>
                    <th>
                      <strong>COMPLETION DATE</strong>
                    </th>
                    <th>
                      <strong>TIME</strong>
                    </th>
                    <th>
                      <strong>TIMEZONE</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Employee Training</strong>
                    </td>
                    <small><td className="progress-bar p-0 bg-primary"><td
                      className="bg-light p-0"
                      style={{ width: "50%" }}
                    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;50%</td></td></small>
                    <td >-</td>
                    <td>2/1/2023</td>
                    <td>30/1/2023</td>
                    <td>-</td>
                    <td>1m 35s</td>
                    <td className="col-lg-4">
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options_1}
                        >
                        </Select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Give your course a name</strong>
                    </td>
                    <td scope="row">Not Started</td>
                    <td scope="row">-</td>
                    <td scope="row">2/1/2023</td>
                    <td>30/1/2023</td>
                    <td>-</td>
                    <td>1m 35s</td>
                    <td className="col-lg-4">
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options_1}
                        >
                        </Select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Give your course a name</strong>
                    </td>
                    <td scope="row">Not Started</td>
                    <td>-</td>
                    <td>2/1/2023</td>
                    <td>30/1/2023</td>
                    <td>-</td>
                    <td>1m 35s</td>
                    <td className="col-lg-4">
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options_1}
                        >
                        </Select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Give your course a name</strong>
                    </td>
                    <td>Not Started</td>
                    <td>-</td>
                    <td>2/1/2023</td>
                    <td>30/1/2023</td>
                    <td>-</td>
                    <td>1m 35s</td>
                    <td className="col-lg-4">
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options_1}
                        >
                        </Select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Employee Training</strong>
                    </td>
                    <td>Not Started</td>
                    <td>-</td>
                    <td>2/1/2023</td>
                    <td>30/1/2023</td>
                    <td>-</td>
                    <td>1m 35s</td>
                    <td className="col-lg-4">
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options_1}
                        >
                        </Select>
                    </td>
                  </tr>                  <tr>
                    <td>
                      <strong>Employee Training</strong>
                    </td>
                    <td>Not Started</td>
                    <td>-</td>
                    <td>2/1/2023</td>
                    <td>30/1/2023</td>
                    <td>-</td>
                    <td>1m 35s</td>
                    <td className="col-lg-4">
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options_1}
                        >
                        </Select>
                    </td>
                  </tr>                  <tr>
                    <td>
                      <strong>Employee Training</strong>
                    </td>
                    <td>Not Started</td>
                    <td>-</td>
                    <td>2/1/2023</td>
                    <td>30/1/2023</td>
                    <td>-</td>
                    <td>1m 35s</td>
                    <td className="col-lg-4">
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options_1}
                        >
                        </Select>
                    </td>
                  </tr>                  <tr>
                    <td>
                      <strong>Employee Training</strong>
                    </td>
                    <td>Not Started</td>
                    <td>-</td>
                    <td>2/1/2023</td>
                    <td>30/1/2023</td>
                    <td>-</td>
                    <td>1m 35s</td>
                    <td className="col-lg-4">
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options_1}
                        >
                        </Select>
                    </td>
                  </tr>                  <tr>
                    <td>
                      <strong>Employee Training</strong>
                    </td>
                    <td>Not Started</td>
                    <td>-</td>
                    <td>2/1/2023</td>
                    <td>30/1/2023</td>
                    <td>-</td>
                    <td>1m 35s</td>
                    <td className="col-lg-4">
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options_1}
                        >
                        </Select>
                    </td>
                  </tr>                  <tr>
                    <td>
                      <strong>Employee Training</strong>
                    </td>
                    <td>Not Started</td>
                    <td>-</td>
                    <td>2/1/2023</td>
                    <td>30/1/2023</td>
                    <td>-</td>
                    <td>1m 35s</td>
                    <td className="col-lg-4">
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options_1}
                        >
                        </Select>
                    </td>
                  </tr>
                </tbody>
              </Table>
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

export default UserCourse;