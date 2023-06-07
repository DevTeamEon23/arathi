import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
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

const options = [
    { value: "certificate_1", label: "Certificate 1" },
    { value: "certificate_2", label: "Certificate 2" },
    { value: "certificate_3", label: "Certificate 3" },
    { value: "certificate_4", label: "Certificate 4" },
  ];

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

const AdmAddSessions = () => {
    const [selectedOption, setSelectedOption] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [value, onChange] = useState(new Date());
  let history = useHistory();
  return (
    <Fragment>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Sessions</h4>
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
                          className="col-lg-2 col-form-label"
                          htmlFor="val-username"
                        >
                           Unit Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-4">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            name="val-username"
                            placeholder="E.g Meeting"
                          />
                        </div>
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="val-username"
                        >
                           Instructor
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-4">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            name="val-username"
                            placeholder="Name"
                          />
                        </div>
                      </div>
                      <br/>
                      <br/>
                      <div className="row">
                    <div className="col-xl-12">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="val-username"
                        >
                           Date
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-2">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            name="val-username"
                            placeholder="E.g Meeting"
                          />
                        </div>
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="val-username"
                        >
                           Start Time
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-2">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            name="val-username"
                            placeholder="Name"
                          />
                          <br/>
                          <br/>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="val-currency"
                        >
                          Capacity
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-3">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            name="val-username"
                            placeholder="Name"
                          />
                          <br/>
                          <br/>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="val-currency"
                        >
                          Type
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-3">
                        <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                  >
                  </Select>
                      </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-suggestions"
                        >
                          Description <span className="text-danger">*</span>
                        </label>&nbsp;&nbsp;&nbsp;
                        <div className="col-lg-10">
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
                        Save and Select user
                      </button>&nbsp; or &nbsp;&nbsp;
                      <Button onClick={() => history.goBack()}>Cancel</Button>
                        </div>
                        </div>

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

export default AdmAddSessions;