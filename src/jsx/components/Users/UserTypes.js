import React, { Fragment } from "react";
import PageTitle from "../../layouts/PageTitle";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Badge,
  Dropdown,
  ProgressBar,
} from "react-bootstrap";

/// imge
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import avatar3 from "../../../images/avatar/3.jpg";
import avatar4 from "../../../images/avatar/4.jpg";
import { Link } from "react-router-dom";

const UserTypes = () => {
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

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>All User-Types</Card.Title>
              <div>
                <Link to="/add-user-type">
                  <Button variant="primary">Add User Types</Button>
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <strong>NAME</strong>
                    </th>
                    <th>
                      <strong>ADMINISTRATOR</strong>
                    </th>
                    <th>
                      <strong>INSTRUCTOR</strong>
                    </th>
                    <th>
                      <strong>LEARNER</strong>
                    </th>
                    <th>
                      <strong>Options</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                    <strong>SuperAdmin</strong>
                    </td>
                    <td>
                      <strong>✔️</strong>
                    </td>
                    <td>
                      <strong>✔️</strong>
                    </td>
                    <td>
                      <strong>✔️</strong>
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link
                          to="/edit-user-type"
                          className="btn btn-primary shadow btn-xs sharp me-1"
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-danger shadow btn-xs sharp"
                        >
                          <i className="fa fa-trash"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <strong>Admin</strong>
                    </td>
                    <td>
                      <strong>✔️</strong>
                    </td>
                    <td>
                      <strong>✔️</strong>
                    </td>
                    <td>
                      <strong>✔️</strong>
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link
                          href="#"
                          className="btn btn-primary shadow btn-xs sharp me-1"
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-danger shadow btn-xs sharp"
                        >
                          <i className="fa fa-trash"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <strong>Instructor</strong>
                    </td>
                    <td>
                      <strong></strong>
                    </td>
                    <td>
                      <strong>✔️</strong>
                    </td>
                    <td>
                      <strong>✔️</strong>
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link
                          href="#"
                          className="btn btn-primary shadow btn-xs sharp me-1"
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-danger shadow btn-xs sharp"
                        >
                          <i className="fa fa-trash"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <strong>Learners</strong>
                    </td>
                    <td>
                      <strong></strong>
                    </td>
                    <td>
                      <strong></strong>
                    </td>
                    <td>
                      <strong>✔️</strong>
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link
                          href="#"
                          className="btn btn-primary shadow btn-xs sharp me-1"
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-danger shadow btn-xs sharp"
                        >
                          <i className="fa fa-trash"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default UserTypes;