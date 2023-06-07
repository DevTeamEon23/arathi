import React, { Fragment, useState } from "react";
import { Link, useHistory  } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import TimePickerPicker from 'react-time-picker';
import profile from "../../../images/profile/profile.png";
import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";

const EditNotification = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, onChange] = useState(new Date());
  const [checked, setChecked] = React.useState(true);

  
let history = useHistory();
  return (
    <Fragment>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Edit Notification</h4>
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
                    <div className="col-xl-12">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
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
                            placeholder="Assigment"
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                      <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-website"
                        >
                          Event
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <select
                          defaultValue={"option"}
                          className="form-control"
                          placeholder="Select A Parent Category"
                          id="sel1"
                        >
                        <option>Assignment grading</option>
                          <option>Certification</option>
                          <option>Skills understanding</option>
                        </select>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                      <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-website"
                        >
                          Recipient
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <select
                          defaultValue={"option"}
                          className="form-control"
                          placeholder="Select A Parent Category"
                          id="sel1"
                        >
                        <option>Hitesh Ingale</option>
                          <option>Rushi Gupta</option>
                          <option>Aniruddha Durgule</option>
                        </select>
                        </div>
                      </div>

                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-suggestions"
                        >
                          Description <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <textarea
                            className="form-control"
                            id="val-suggestions"
                            name="val-suggestions"
                            rows="5"
                            placeholder="Short Description about you.."
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-04">

                          
                        </div><br />

                      <div className="form-group mb-3 row">
                    </div>
                      <label
                        className="form-check css-control-primary css-checkbox"
                        htmlFor="val-terms"
                      >
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                          defaultChecked={checked}
                          onChange={() => setChecked(!checked)}
                          value="true"
                        />
                        <span className="css-control-indicator">Active</span>
                      </label><br/>
                  <button
                    type="submit"
                    className="btn me-2 btn-primary"
                  >
                    Create Notification
                  </button>&nbsp; or &nbsp;&nbsp;

                  <Button onClick={() => history.goBack()}>Cancel</Button>
                </div>
              </div>
            </form>
          </div>
          </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditNotification;




