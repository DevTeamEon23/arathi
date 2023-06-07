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
  Nav,
} from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";

const AdUserTimeline = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, onChange] = useState(new Date());
  const [checked, setChecked] = React.useState(true);

  
let history = useHistory();
  return (
    <Fragment>
    <Nav >
      <Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
      <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/ad-user-progress">Overview</Link>
      <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/ad-user-course">Courses</Link>
      <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/ad-user-certificates">Certificates</Link>
      <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/ad-user-timeline">Timeline</Link>
      </Nav.Item>
    </Nav>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">EVENTS</h4>
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
                    <div className="col-lg-12">
                      <div className="form-group mb-3 row">
                        <div className="col-lg-10">
                        <Button className="me-2" variant="success">&nbsp;LOGIN&nbsp;&nbsp;</Button>
                        <label>&nbsp;&nbsp;You Signed in  <span className="text-danger">*</span> 2 hours ago   </label>
                      </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <div className="col-lg-10">
                        <Button className="me-2" variant="warning">&nbsp;&nbsp;&nbsp;&nbsp;ADD&nbsp;&nbsp;&nbsp;</Button>
                        <label>&nbsp;&nbsp;You were added to the course  <span className="text-danger">*</span> 2 hours ago   </label>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <div className="col-lg-10">
                        <Button className="me-2" variant="danger">CREATE</Button>
                        <label>&nbsp;&nbsp;You were added to the course<strong>Give your course a name via self enrollment</strong> <span className="text-danger">*</span> 2 hours ago   </label>
                        </div>
                      </div>

                      <div className="form-group mb-3 row">
                        <div className="col-lg-10">
                        <Button className="me-2" variant="success">&nbsp;LOGIN&nbsp;&nbsp;</Button>
                        <label>&nbsp;&nbsp;You Signed in  <span className="text-danger">*</span> 8 hours ago   </label>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <div className="col-lg-10">
                        <Button className="me-2" variant="success">&nbsp;LOGIN&nbsp;&nbsp;</Button>
                        <label>&nbsp;&nbsp;You Signed in  <span className="text-danger">*</span> 12 hours ago   </label>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <div className="col-lg-10">
                        <Button className="me-2" variant="warning">&nbsp;&nbsp;&nbsp;&nbsp;ADD&nbsp;&nbsp;&nbsp;</Button>
                        <label>&nbsp;&nbsp;You were added to the course  <span className="text-danger">*</span> 12 hours ago   </label>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <div className="col-lg-10">
                        <Button className="me-2" variant="danger">CREATE</Button>
                        <label>&nbsp;&nbsp;You created the course <strong>Give your course a name </strong>  <span className="text-danger">*</span> 12 hours ago   </label>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <div className="col-lg-10">
                        <Button className="me-2" variant="success">&nbsp;LOGIN&nbsp;&nbsp;</Button>
                        <label>&nbsp;&nbsp;You Signed in  <span className="text-danger">*</span> Yesterday   </label>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <div className="col-lg-10">
                        <Button className="me-2" variant="warning">&nbsp;&nbsp;&nbsp;&nbsp;ADD&nbsp;&nbsp;&nbsp;</Button>
                        <label>&nbsp;&nbsp;You were added to the course<span className="text-danger">*</span> Yesterday  </label>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <div className="col-lg-10">
                        <Button className="me-2" variant="danger">CREATE</Button>
                        <label>&nbsp;&nbsp;You Created the course  <strong>Give your course a name </strong> <span className="text-danger">*</span> Yesterday  </label>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <div className="col-lg-10">
                        <Button className="me-2" variant="success">&nbsp;LOGIN&nbsp;&nbsp;</Button>
                        <label>&nbsp;&nbsp;You Signed in  <span className="text-danger">*</span> 2/1/2023   </label>
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

export default AdUserTimeline;




