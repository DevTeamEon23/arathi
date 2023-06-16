import React, { Fragment, useState } from "react";
import {Link} from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  SplitButton,
} from "react-bootstrap";


const AdAddUserType = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, onChange] = useState(new Date());
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
        }
      }
    }
  };

  
  return (
    <Fragment>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Users Types & Permissions </h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form
                  className="form-valide"
                  action="#"
                  method="post"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-xl-8 col-form-label"
                          htmlFor="val-username"
                        >
                          Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            name="val-username"
                            placeholder="Enter a Full Name"
                          />
                        </div>
                      </div>
                      </div>

                      <div className="form-group mb-3 row">
                      <label
                          className="col-xl-3.5 col-form-label"
                          htmlFor="val-username"
                        >
                          User Type Default Role
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <select
                      defaultValue={"option"}
                      className="form-control"
                      id="sel1"
                    >
                    <option>Select User Type..</option>
                      <option>Administrator</option>
                      <option>Instructor</option>
                      <option>Learner</option>
                    </select>
                          <div
                            id="val-username1-error"
                            className="invalid-feedback animated fadeInUp"
                            style={{ display: "block" }}
                          >
                          </div>
                          </div>

                          <div
                            id="val-username1-error"
                            className="invalid-feedback animated fadeInUp"
                            style={{ display: "block" }}
                          />
                        </div>
                      </div>
                      </form>
                      <div className="row">
                    <div className="col-xl-12">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-xl-2 col-form-label"
                          htmlFor="val-username"
                        >
                          Permissions
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-xl-12">
                  <Row>
                    <Col lg={12}>
                      <Card>
                        <Card.Body>
                          <Table responsive>
                              <thead>
                                <tr>
                                  <th className="width50 ">
                                      <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper_all">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="checkAll"
                                        required=""
                                        onClick={() => chackboxFun("all")}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="checkAll"
                                      >ADMINISTRATOR</label>
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >USERS</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >COURSES</label>
                                      
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >GROUPS</label>
                                      
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >CATEGORIES</label>
                                      
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >EVENTS ENGINE</label>
                                      
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >IMPORT - EXPORT</label>
                                      
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >USER TYPES</label>
                                      
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >ACCOUNTS & SETTINGS</label>
                                      
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >REPORTS</label>
                                      
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >FILES</label>
                                      
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                </tr>
                            </tbody>
                        </Table>
                        </Card.Body>
                      </Card>
                      </Col>
                    </Row>
                    <Row>
                    <Col lg={12}>
                      <Card>
                        <Card.Body>
                          <Table responsive>
                              <thead>
                                <tr>
                                  <th className="width50 ">
                                      <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper_all">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="checkAll"
                                        required=""
                                        onClick={() => chackboxFun("all")}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="checkAll"
                                      >INSTRUCTOR</label>
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >COURSES</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >GROUPS</label>
                                      
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >REPORTS</label>
                                      
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >CONFERENCE</label>
                                      
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >DISCUSSIONS</label>
                                      
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >CALENDAR</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                </tr>
                            </tbody>
                        </Table>
                        </Card.Body>
                      </Card>
                      </Col>
                    </Row>
                  <Row>
                    <Col lg={12}>
                      <Card>
                        <Card.Body>
                          <Table responsive>
                              <thead>
                                <tr>
                                  <th className="width50 ">
                                      <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper_all">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="checkAll"
                                        required=""
                                        onClick={() => chackboxFun("all")}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="checkAll"
                                      >LEARNER</label>
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >COURSE</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >COURSE CATALOG</label>
                                      
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >CONFERENCES</label>
                                      
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >DISCUSSIONS</label>
                                      
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >CALENDAR</label>
                                      
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >PROGRESS</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >GAMIFICATION</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  </tr>
                            </tbody>
                        </Table>
                        </Card.Body>
                      </Card>
                      </Col>
                    </Row>
                    <Row>
                    <Col lg={12}>
                      <Card>
                        <Card.Body>
                          <Table responsive>
                              <thead>
                                <tr>
                                  <th className="width50 ">
                                      <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper_all">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="checkAll"
                                        required=""
                                        onClick={() => chackboxFun("all")}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="checkAll"
                                      >GENERAL</label>
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >MESSAGES</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >PROFILE</label>
                                      
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >HELP</label>
                                      
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <tr>
                                  <td>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >TIMELINE</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Create</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Update</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Read</label>
                                    </div>
                                  </td>
                                  <td>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customCheckBox2"
                                        required=""
                                        onClick={() => chackboxFun()}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customCheckBox2"
                                      >Delete</label>
                                    </div>
                                  </td>
                                  </tr>
                                  <div>
                                  <br/>
                                  <br/>
                                  <Button type="submit" className="btn btn-primary float-right" >
                                    Grant
                                  </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <Link to="/user-types"><Button className="btn btn-light">
                                    Cancel
                                  </Button></Link>
                                  </div>
                                </tr>
                            </tbody>
                        </Table>
                        </Card.Body>
                      </Card>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
            </div>
            </div>
            </div>
    </Fragment>
  );
};

export default AdAddUserType;
