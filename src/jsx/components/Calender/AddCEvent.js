import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import TimePickerPicker from 'react-time-picker';
import profile from "../../../images/profile/coursessss.jpg";
import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Your username must consist of at least 3 characters ")
    .max(50, "Your username must consist of at least 3 characters ")
    .required("Please enter a username"),
  password: Yup.string()
    .min(5, "Your password must be at least 5 characters long")
    .max(50, "Your password must be at least 5 characters long")
    .required("Please provide a password"),
});

const AddCEvent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, onChange] = useState(new Date());
  let history = useHistory();
  return (
    <Fragment>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Events</h4>
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
                            placeholder="Enter Event Name.."
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-currency"
                        >
                          Time Options
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-6 mb-3">
                          <div className="example rangeDatePicker">
                            <p className="mb-1">Date Range With Time</p>
                            {/* <DateRangePicker
                              startText="Start"
                              endText="End"
                              startPlaceholder="Start Date"
                              endPlaceholder="End Date"
                            />   */}

                            <DateRangePicker>
                                <input type="text" className="form-control input-daterange-timepicker" />
                            </DateRangePicker>
                            <br/>
                            <br/>Pick Your Time of Course
                            <TimePickerPicker className="form-control input-daterange-timepicker" onChange={onChange} value={value} />
                              </div>
                          </div>
                          <br/><br/>

                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-suggestions"
                        >
                          Description <span className="text-danger">*</span>
                        </label>&nbsp;&nbsp;&nbsp;
                        <div className="col-lg-7">
                          &nbsp;&nbsp;<textarea
                            className="form-control"
                            id="val-suggestions"
                            name="val-suggestions"
                            rows="4"
                            placeholder="Add a Text..."
                          ></textarea><br/><br/>
                          </div>
                          
                          
                        <div className="col-xl-6">
                          <button
                        type="submit"
                        className="btn me-2 btn-primary"
                      >
                        Add Event
                      </button>&nbsp; or &nbsp;&nbsp;
                      <Button onClick={() => history.goBack()}>Cancel</Button>
                        </div>
                        </div>

                        </div>
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

export default AddCEvent;
