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
  { value: "default", label: "Modern(your active theme)" },
  { value: "", label: "" },
  { value: "", label: "" },
];
const options_1 = [
  { value: "header", label: "Header" },
  { value: "", label: "" },
  { value: "", label: "" },
  { value: "", label: "" },
];
const options_2 = [
  { value: "color1", label: "#FFFFFF" },
  { value: "", label: "" },
  { value: "", label: "" },
];

const AdmThoms = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, onChange] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <Fragment>
      <Nav >
				<Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/adm_basic-settings">Basic Settings</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/adm_user-settings">Users</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/adm_thoms-page">Themes</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/adm_certificates">Certificates</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/adm_gamification">Gamification</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/adm_ecommerce">E-commerce</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/adm_domains">Domain</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/adm_subscriptions">Subscription</Link>
        </Nav.Item>
      </Nav>
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group mb-3 row">
            <br/>
            <br/>
            <div className="card-header">
              <h4 className="card-title">Themes Settings </h4>
            </div>
              <div className="col-lg-1">
              </div>
            <label
              className="col-lg-2 mt-5 col-form-label"
              htmlFor="val-currency"
            >
              Themes
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
          <div className="col-lg-1">
              </div>
          <div className="col-lg-8">
          <Tab.Container defaultActiveKey='About'>
								<div className="course-details-tab style-2 mt-4">
									<nav>
										<Nav as='div' className="nav nav-tabs tab-auto" id="nav-tab">
											<Nav.Link as='button' className="nav-link" id="nav-about-tab" eventkey='About' type="button">Color</Nav.Link>
											<Nav.Link as='button' className="nav-link" id="nav-reviews-tab" eventkey='Review' type="button">Css</Nav.Link>
										</Nav>
									</nav>
									<Tab.Content className="tab-content" id="nav-tabContent">
										<Tab.Pane  id="nav-about" eventkey='About'>
                    <div className="form-group mb-3 row">

            <label
              className="col-lg-3 mt-5 col-form-label"
              htmlFor="val-currency"
            >
              Items
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-lg-9 mt-5 ">
                      <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options_1}
            >
            </Select>
                      </div>
                    </div>
                    <div className="form-group mb-3 row">
                      <label
                        className="col-lg-3 col-form-label"
                        htmlFor="val-currency"
                      >
                        Color
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-lg-9">
                      <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options_2}
            >
            </Select>
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
                  Save &nbsp;as &nbsp;new
                </Button> or &nbsp;&nbsp;
                <Button type="submit" className="btn btn-light">
                  Cancel
                </Button>
              </div>
            </div>
										</Tab.Pane>
										<Tab.Pane eventkey='Review'>
                      <br/>
                      <br/>
                    <div className="form-group mb-3 row">
                        <div className="col-xl-12">
                          <textarea
                            className="form-control"
                            id="val-suggestions"
                            name="val-suggestions"
                            rows="7"
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
                  Save &nbsp;as &nbsp;new
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
    </Fragment>
  );
};

export default AdmThoms;
