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
const options = [
  { value: "classic", label: "Classic" },
  { value: "", label: "" },
  { value: "", label: "" },
];

const AdmCertificates = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, onChange] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState(null);
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
}
  return (
    <Fragment>
      <Nav >
				<Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/basic-settings">Basic Settings</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/user-settings">Users</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/thoms-page">Themes</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/certificates">Certificates</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/gamification">Gamification</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/ecommerce">E-commerce</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/domains">Domain</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/subscriptions">Subscription</Link>
        </Nav.Item>
      </Nav>
      <div className="row">
        <div className="card">
        <div className="col-lg-12">
          <div className="form-group mb-3 row">
            <br/>
            <br/>
            <div className="card-header">
              <h4 className="card-title">Certificate Settings </h4>
            </div>
              <div className="col-lg-1">
              </div>
            <label
              className="col-lg-2 mt-5 col-form-label"
              htmlFor="val-currency"
            >
              Certificate
              <span className="text-danger">*</span>
            </label>
            <div className="col-xl-6 col-lg-8 mt-5 ">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            >
            </Select>
            </div>
            </div>
          </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group mb-3 row">
          <div className="col-lg-12">
          <Tab.Container defaultActiveKey='About'>
								<div className="course-details-tab style-2 mt-4">
									<nav>
										<Nav as='div' className="nav nav-tabs tab-auto" id="nav-tab">
											<Nav.Link as='button' className="nav-link" id="nav-about-tab" eventKey='About' type="button">Background</Nav.Link>
											<Nav.Link as='button' className="nav-link" id="nav-reviews-tab" eventKey='Review' type="button">Template</Nav.Link>
										</Nav>
									</nav>
									<Tab.Content className="tab-content" id="nav-tabContent">
										<Tab.Pane className="col-lg-12" id="nav-about" eventKey='About'>
                    <br/><br/>
                    <input type="file" onChange={handleChange} />
                    <br/><br/>
                    <img src={file} width="150" height="100"/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src={file} width="150" height="100"/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src={file} width="150" height="100"/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src={file} width="150" height="100"/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <br/><br/>
                    <img src={file} width="150" height="100"/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src={file} width="150" height="100"/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src={file} width="150" height="100"/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src={file} width="150" height="100"/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="form-group mb-10 row">
                  <div className="col-lg-12">
                    <br/>
                    <br/>
                  <Button
                    type="submit"
                    className="btn btn-primary col-xl-2"
                  >Preview  
                </Button> &nbsp;&nbsp;
                <Button
                    type="submit"
                    className="btn me-2 btn-primary col-xl-2"
                  >
                  Update 
                </Button> &nbsp;&nbsp;
                <Button
                    type="submit"
                    className="btn me-2 btn-primary col-xl-2"
                  >
                  Save as new  
                </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                    type="submit"
                    className="btn me-2 btn-primary col-lg-2"
                  >
                  Reset to default template
                </Button> &nbsp;&nbsp;
                <Button
                    type="submit"
                    className="btn me-2 btn-primary col-xl-2"
                  >
                  Delete  
                </Button> &nbsp;&nbsp;
              </div>
            </div>
										</Tab.Pane>
										<Tab.Pane eventKey='Review'>
                      <br/>
                      <br/>
                    <div className="form-group mb-3 row">
                        <div className="col-xl-12">
                          <textarea
                            className="form-control"
                            id="val-suggestions"
                            name="val-suggestions"
                            rows="10"
                            placeholder=""
                          ></textarea>
                        </div>
                        </div>
                        <div className="form-group mb-10 row">
                  <div className="col-lg-12 ms-auto">
                    <br/>
                    <br/>
                  <Button
                    type="submit"
                    className="btn me-2 btn-primary col-xl-2"
                  >
                  Save  
                </Button> or &nbsp;&nbsp;
                <Button type="submit" className="btn btn-light">
                  Cancel
                </Button>
              </div>
            </div>
										</Tab.Pane>
									</Tab.Content>
								</div>
							</Tab.Container>	
        </div>
        </div>
        </div>
      </div>
      </div>
      </div>
    </Fragment>
  );
};

export default AdmCertificates;