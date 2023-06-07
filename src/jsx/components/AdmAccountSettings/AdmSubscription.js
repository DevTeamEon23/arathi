import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import TimePickerPicker from 'react-time-picker';
import profile from "../../../images/profile/profile.png";
import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Nav,
  Button,
} from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import course1 from './../../../images/courses/course1.jpg';
import course2 from './../../../images/courses/course2.jpg';
import course3 from './../../../images/courses/course3.jpg';
import course4 from './../../../images/courses/course4.jpg';

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
  { value: "freeplan", label: "Free Plan" },
  { value: "standardplan", label: "Standard Plan" },
  { value: "plusplan", label: "Plus Plan" },
  { value: "premiumplan", label: "Premium Plan" },
];
const options_1 = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];
const options_2 = [
  { value: "day", label: "Daily" },
  { value: "month", label: "Monthly" },
  { value: "year", label: "Yearly" },
];
const cardInfoBlog = [
	{title:'Free',	subtitle: 'Up to 10 courses', subtitle_1: 'Unlimited email support',subtitle_2: 'Best for up to 5 users', price: '$0', enroll: 'Your active plan'},
	{title:'Standard', 	subtitle: 'Unlimited courses', subtitle_1: 'Unlimited email support',subtitle_2: 'Custom homepage',subtitle_3: 'Best for 6-40 users', price: '$99/M', enroll: 'Get Started'},
	{title:'Plus', 	subtitle: 'Unlimited courses', subtitle_1: 'Unlimited email support',subtitle_2: 'Single Sign-On support',subtitle_3: 'Custom homepage',subtitle_4: 'Custom domain + SSL',subtitle_5: '1 Branch',subtitle_6: 'Best for 20-100 users', price: '$199/M', enroll: 'Get Started'},
	{title:'Premium', subtitle: 'Unlimited courses', subtitle_1: 'Unlimited email support',subtitle_2: 'Single Sign-On support',subtitle_3: 'Custom homepage',subtitle_4: 'Custom domain + SSL',subtitle_5: '3 Branch',subtitle_6: 'Best for 50-500 users', price: '$299/M', enroll: 'Get Started'},
];

const AdmSubscriptions = () => {
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
          <div className="card">
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
                        <div>
                        <div className="col-lg-5">
                        </div>
                        <textarea
                          className="form-control"
                          id="val-suggestions"
                          name="val-suggestions"
                          rows="2"
                          placeholder=" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                 You are registered to the Free plan &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          .&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You currently use 1 out of 5 users (20%) and 9 out of 10 courses(90%)."
                        ></textarea>
                        </div>
                        <div className="form-group mb-3 row">
                        <label
              className="col-lg-2 mt-5 col-form-label"
              htmlFor="val-currency"
            >
              Plan type
            </label>
            <div className="col-xl-2 col-lg-1 mt-5 ">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            >
            </Select>
            </div>
            <label
              className="col-lg-2 mt-5 col-form-label"
              htmlFor="val-currency"
            >
              Include Talent Library
            </label>
            <div className="col-xl-2 col-lg-1 mt-5 ">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options_1}
            >
            </Select>
            </div>
            <label
              className="col-lg-2 mt-5 col-form-label"
              htmlFor="val-currency"
            >
              Billed
            </label>
            <div className="col-xl-2 mt-5 ">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options_2}
            >
            </Select>
          </div>
          </div>
          <div className="widget-heading d-flex justify-content-between align-items-center">
			</div>
			<div className="row">
				{cardInfoBlog.map((data, index)=>(
					<div className="col-xl-3 col-md-6" key={index}>
						<div className="card all-crs-wid">
							<div className="card-body">
								<div className="courses-bx">
									<div className="dlab-info">
										<div className="dlab-title m-flex justify-content-between">
											<div>
												<h4><center><Link to={"./courses"}>{data.title}</Link></center></h4>
                        <br/>
                        <br/>
												<p className="m-0"><i class="bi bi-check2"></i>{data.subtitle}
												</p>
												<p className="m-0"><i class="bi bi-check2"></i>{data.subtitle_1}
												</p>
												<p className="m-0"><i class="bi bi-check2"></i>{data.subtitle_2}
												</p>
												<p className="m-0"><i class="bi bi-check2"></i>{data.subtitle_3}
												</p>
												<p className="m-0"><i class="bi bi-check2"></i>{data.subtitle_4}
												</p>
												<p className="m-0"><i class="bi bi-check2"></i>{data.subtitle_5}
												</p>
												<p className="m-0"><i class="bi bi-check2"></i>{data.subtitle_6}
												</p>
											</div>	
										</div>
                    <div className="row mt-5">
											<center><h4 className="text-primary"><i class="bi bi-tags-fill"></i>{data.price}</h4></center>
                      </div>
                      <div className="d-flex justify-content-between content align-items-center">
                      <Link to={"./ecom-checkout"} className="btn btn-primary btn-sm">{data.enroll}</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
        <h4>Need Over 1000 users, unlimited branches, and all the features in our Premium plan? <Link to="/add-user"><i class="bi bi-lightning"></i>Request your custom plan here<i class="bi bi-hand-index-thumb-fill"></i></Link></h4>
        <div className="row">
                <div className="col-lg-4 ">
                </div>
            <div className="col-lg-6 mt-5 ">
            <Link to={"./ecom-checkout"}><Button
              type="submit"
              className="btn me-2 btn-primary col-lg-8"
            >
            Billing history and Other options
          </Button></Link>
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

export default AdmSubscriptions;
