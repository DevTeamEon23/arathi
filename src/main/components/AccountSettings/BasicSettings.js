import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import * as Yup from "yup";
import TimePickerPicker from 'react-time-picker';
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

const BasicSettings = () => {
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

const options = [
  { value: "hindi", label: "Hindi" },
  { value: "english", label: "English" },
  { value: "marathi", label: "Marathi" },
];
const options_1 = [
  { value: "ist", label: "India Standard Time (IST)" },
  { value: "nst", label: "New Zealand Standard Time (NST)" },
  { value: "ast", label: "Alaska Standard Time (AST)" },
  { value: "gmt", label: "Greenwich Mean Time (GMT)" },
  { value: "ect", label: "European Central Time (ECT)" },
  { value: "arabic", label: "Egypt Standard Time	(Arabic)" },
];
const options_2 = [
  { value: "conference", label: "Integrated video conference" },
  { value: "classroom", label: "Classroom" },
  { value: "virtual", label: "Virtual training" },
];
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
  return (
    <Fragment>
      <Nav >
				<Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/basic-settings">Basic Settings</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/user-settings">Users</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/thoms-page">Themes</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/certificates">Certificates</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/gamification">Gamification</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/ecommerce">E-commerce</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/domains">Domain</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/subscriptions">Subscription</Link>
        </Nav.Item>
      </Nav>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">IDENTITY</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form
                  className="form-valide"
                  action="#"
                  method="post"
                  onSubmit={(e) => e.preventDefault()}
                >
                    <div className="form-group mb-3 row">
                      <label
                        className="col-lg-4 col-form-label"
                        htmlFor="val-username"
                      >
                        Site Name
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          id="val-username"
                          name="val-username"
                          placeholder="XYZ.."
                        />
                      </div>
                    </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 mb-5 col-form-label"
                          htmlFor="val-email"
                        >
                          Description <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-email"
                            name="val-email"
                            placeholder="XYZ.."
                          />
                        </div>
                        </div>
                        <div className="profile-info">
                          <div className="profile-photo">
                            <input type="file" onChange={handleChange} />
                            <br/><br/>
                            <img src={file} width="200" height="150"/>
                            <div className="row">
                            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Select Logo)</label></div>
                          </div>
                          <div className="profile-photo">
                            <input type="file" onChange={handleChange} />
                            <br/><br/>
                            <img src={file} width="200" height="150"/>
                            <div className="row">
                            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Select Favicon)</label></div>
                          </div>
                        </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group mb-3 row">
                      <div className="card-header mb-5">
                        <h4 className="card-title">LOCALE </h4>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-currency"
                        >
                          Default Language
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
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
                          htmlFor="val-website"
                        >
                          Default Time Zone
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
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
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-currency"
                        >
                          Currency
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-currency"
                            name="val-currency"
                            placeholder="Rupee"
                          />
                        </div>
                        </div>
                      </div>
                        </div>
                      </div>
                      <div className="card-header">
                        <h4 className="card-title">ANNOUNCEMENT </h4>
                      </div>
                      <Tab.Container defaultActiveKey='About'>
								<div className="course-details-tab style-2 mt-4">
									<nav>
										<Nav as='div' className="nav nav-tabs tab-auto" id="nav-tab">
											<Nav.Link as='button' className="nav-link" id="nav-about-tab" eventkey='About' type="button">Internal</Nav.Link>
											<Nav.Link as='button' className="nav-link" id="nav-reviews-tab" eventkey='Review' type="button">External</Nav.Link>
										</Nav>
									</nav>
									<Tab.Content className="tab-content" id="nav-tabContent">
										<Tab.Pane  id="nav-about" eventkey='About'>
                      <br/>
                      <br/>
                      <div className="form-group mb-3 row">
                      <label
                          className="col-lg-2 col-form-label"
                          htmlFor="val-suggestions"
                        >
                          Announcement <span className="text-danger">*</span>
                        </label>
                        <div className="col-xl-8">
                          <textarea
                            className="form-control"
                            id="val-suggestions"
                            name="val-suggestions"
                            rows="5"
                            placeholder=""
                          ></textarea>
                        </div>
                        </div>
										</Tab.Pane>
										<Tab.Pane eventkey='Review'>
                      <br/>
                      <br/>
                    <div className="form-group mb-3 row">
                      <label
                          className="col-lg-2 col-form-label"
                          htmlFor="val-suggestions"
                        >
                          Announcement <span className="text-danger">*</span>
                        </label>
                        <div className="col-xl-8">
                          <textarea
                            className="form-control"
                            id="val-suggestions"
                            name="val-suggestions"
                            rows="5"
                            placeholder=""
                          ></textarea>
                        </div>
                        </div>
										</Tab.Pane>
									</Tab.Content>
								</div>
							
							</Tab.Container>	
                <div className="card-header">
                  <h4 className="card-title">SECURITY </h4>
                </div>
                <br/>
                <br/>
                <div className="row">
                <div className="col-lg-1">
                </div>
                <div className="col-lg-8">
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
                  >Enable API</label>
                  
                </div>
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
                  >Enable xAPI</label>
                  
                </div>
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
                  >Restrict registration to specific domains</label>
                  
                </div>
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
                  >Disallow multiple logins from the same user</label>
                  
                </div>
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
                  >Disallow access from the mobile APP</label>
                  
                </div>
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
                  >Intercom identity verification</label>
                  
                </div>
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
                  >Add system logo as watermark on uploaded videos</label>
                  
                </div>
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
                  >Use modern viewer for documents</label>
                  
                </div>                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
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
                  >Allow application to be loaded in a Frame</label>
                  
                </div>                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
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
                  >Lock system</label>
                  
                </div>                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
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
                  >Hide from search engines</label>
                  
                </div>                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
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
                  >Disable video transcoding service</label>
                  
                </div>
                </div>
                <div className="card-header">
                  <h4 className="card-title">COURSE SETTINGS </h4>
                </div>
                <div className="row">
                <div className="col-lg-1">
                </div>
                <div className="col-lg-8">
                <br/>
                <br/>
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
                  >External course catalog</label>
                  
                </div>
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
                  >Show branch courses in main course catalog</label>
                  
                </div>
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
                  >Show course summary upon entering a course</label>
                  
                </div>
                </div>
                </div>
                <div className="card-header">
                  <h4 className="card-title">CONFERENCES </h4>
                </div>
                <br/>
                <br/>
                <div className="form-group mb-3 row">
                <div className="col-lg-8">
                <br/>
                <br/>
                  <label
                    className="col-lg-4 col-form-label me-3"
                    htmlFor="val-currency"
                  >
                    Type
                    <span className="text-danger">*</span>
                  </label>
                  <div className="col-lg-6">
                  <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options_2}
                  >
                  </Select>
                  </div>
                </div>
                </div>
                <div className="card-header">
                  <h4 className="card-title">BAMBOOHR INTEGRATION </h4>
                </div>
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
                  >External BambooHR integration</label>
                  
                </div>
                <div className="card-header">
                  <h4 className="card-title">CUSTOM FIELDS </h4>
                </div>
                <label><i class="bi bi-book"> &nbsp;</i>Custom course fields</label>
                <label><i class="bi bi-people"> &nbsp;</i>Custom course fields</label><br/>
                <br/>
                      <div className="form-group mb-3 row">
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

export default BasicSettings;
