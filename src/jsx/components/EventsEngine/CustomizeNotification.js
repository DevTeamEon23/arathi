import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Formik } from "formik";
import * as Yup from "yup";
import TimePickerPicker from 'react-time-picker';
import profile from "../../../images/profile/profile.png";
import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Nav,
  Tab,
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

const CustomizeNotification = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, onChange] = useState(new Date());
  const [file, setFile] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
const chackbox = document.querySelectorAll(".bs_exam_topper input");
const motherChackBox = document.querySelector(".bs_exam_topper_all input");
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
}

  return (
    <Fragment>
        <Nav >
	      <Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
          <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/events">Notification</Link>
          <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/pending-notification">Pending Notification</Link>
        </Nav.Item>
      </Nav>
      <div className="row mt-3 mb-5">
        <div className="card">
        <div className="card-header">
            <h4>FORGET USERNAME</h4>
        </div>
        <div className="row">
        <div className="col-xl-1">
            </div>
        <div className="col-xl-10">
        <br/>
        <br/>
            <textarea
            className="form-control"
            id="val-suggestions"
            name="val-suggestions"
            rows="5"
            placeholder=""
            ></textarea>
        </div>
        </div>
      <div className="card-header">
        </div>
        <div className="card-header">
            <h4>RESET PASSWORD</h4>
        </div>
        <div className="row">
        <div className="col-xl-1">
            </div>
        <div className="col-xl-10">
        <br/>
        <br/>
            <textarea
            className="form-control"
            id="val-suggestions"
            name="val-suggestions"
            rows="5"
            placeholder=""
            ></textarea>
        </div>
      </div>
      <div className="card-header">
        </div>
        <div className="card-header">
            <h4>CREATE PASSWORD</h4>
        </div>
        <div className="row">
        <div className="col-xl-1">
            </div>
        <div className="col-xl-10">
        <br/>
        <br/>
            <textarea
            className="form-control"
            id="val-suggestions"
            name="val-suggestions"
            rows="5"
            placeholder=""
            ></textarea>
        </div>
      </div>
      <div className="card-header">
        </div>
        <div className="card-header">
            <h4>ACCOUNT CONFIRMATION</h4>
        </div>
        <div className="row">
        <div className="col-xl-1">
            </div>
        <div className="col-xl-10">
        <br/>
        <br/>
            <textarea
            className="form-control"
            id="val-suggestions"
            name="val-suggestions"
            rows="5"
            placeholder=""
            ></textarea>
        </div>
      </div>
      <div className="card-header">
        </div>
        <div className="card-header">
            <h4>ACCOUNT ACTIVATION</h4>
        </div>
        <div className="row">
        <div className="col-xl-1">
            </div>
        <div className="col-xl-10">
        <br/>
        <br/>
            <textarea
            className="form-control"
            id="val-suggestions"
            name="val-suggestions"
            rows="5"
            placeholder=""
            ></textarea>
        </div>
      </div>
      <div className="card-header">
        </div>
        <div className="card-header">
            <h4>EXPORT REPORTS IN EXCEL</h4>
        </div>
        <div className="row">
        <div className="col-xl-1">
            </div>
        <div className="col-xl-10">
        <br/>
        <br/>
            <textarea
            className="form-control"
            id="val-suggestions"
            name="val-suggestions"
            rows="5"
            placeholder=""
            ></textarea>
        </div>
      </div>
      <div className="card-header">
        </div>
        <div className="card-header">
            <h4>IMPORT DATA</h4>
        </div>
        <div className="row">
        <div className="col-xl-1">
            </div>
        <div className="col-xl-10">
        <br/>
        <br/>
            <textarea
            className="form-control"
            id="val-suggestions"
            name="val-suggestions"
            rows="5"
            placeholder=""
            ></textarea>
      </div>
      </div>
      <div className="card-header">
        </div>
        <div className="card-header">
            <h4>REPLY TO DISCUSSION</h4>
        </div>
        <div className="row">
        <div className="col-xl-1">
            </div>
        <div className="col-xl-10">
        <br/>
        <br/>
            <textarea
            className="form-control"
            id="val-suggestions"
            name="val-suggestions"
            rows="5"
            placeholder=""
            ></textarea>
      </div>
      </div>
      <div className="form-group row mb-5">
                  <div className="col-lg-12">
                    <br/>
                    <br/>
                  <Button
                    type="submit"
                    className="btn btn-primary col-xl-3"
                  >Update notifications
                </Button>&nbsp;&nbsp; or &nbsp;&nbsp;
                <Link to="/events"><Button
                    type="submit"
                    className="btn me-2 btn-primary col-xl-2"
                  >
                  CANCEL 
                </Button></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                    type="submit"
                    className="btn me-2 btn-primary col-lg-2"
                  >
                  Restore defaults
                </Button> &nbsp;&nbsp;
                <Button
                    type="submit"
                    className="btn me-2 btn-primary col-xl-2"
                  >
                  Preview  
                </Button> &nbsp;&nbsp;
              </div>
            </div>
        </div>
      </div>

    </Fragment>
  );
}

export default CustomizeNotification;
