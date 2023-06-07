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
  Table,
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
  { value: "ecommerce", label: "Select your e-commerce processor" },
  { value: "", label: "" },
  { value: "", label: "" },
];
const options_1 = [
  { value: "day", label: "Daily" },
  { value: "month", label: "Monthly" },
  { value: "year", label: "Yearly" },
];

const AdmEcommerce = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, onChange] = useState(new Date());
  const [checked, setChecked] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null);
  const chackbox = document.querySelectorAll(".bs_exam_topper input");
  const motherChackBox = document.querySelector(".bs_exam_topper_all input");
  const toggleCheckboxes = () => {
    setChecked(prevState => !prevState)
}
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
            <div className="card-header">
              <h4 className="card-title">E-COMMERCE PROCESSOR</h4>
            </div>
          <div className="form-group mb-3 row">

        <div className="col-lg-12">
            <div className="card-body">
              <div className="form-validation">
                <form
                  className="form-valide"
                  action="#"
                  method="post"
                  onSubmit={(e) => e.preventDefault()}
                >
                <div className="row">
                <div className="col-lg-1">
                </div>
            <div className="col-lg-6 mt-5 ">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            >
            </Select>
            </div>
                </div>
                    <div className="col-lg-12 ">                     
                      <div className="card-header">
                      </div>
                      <div className="card-header">
                        <h4 className="card-title">BEHAVIOR</h4>
                      </div>
                <div className="row">
                <h3>Subscription</h3>
                <div className="col-lg-8">
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input 
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun(toggleCheckboxes)}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Access to all paid courses at a charge of </label>&nbsp;&nbsp;
                  <input type="text" className="col-lg-1" placeholder="    $" ></input>&nbsp;
                  <input type="text" className="col-lg-1" placeholder="" ></input>&nbsp;&nbsp;
                  <label>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options_1}
                    >
                    </Select>
                  </label>
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input 
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun(toggleCheckboxes)}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Free for the first month</label>  
                </div>
                  </div>
                <div className="col-lg-12 ">                     
                      <div className="card-header">
                      </div>
                <div className="row">
                <h3>Discount</h3>
                <div className="col-lg-8">
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input 
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun(toggleCheckboxes)}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Access to all paid courses at a charge of </label>&nbsp;&nbsp;
                  <input type="text" className="col-lg-1" placeholder="    " ></input>&nbsp;
                  <input type="text" className="col-lg-1" placeholder="%" ></input>&nbsp;&nbsp;
                </div>
                  </div>
                  </div>
                  </div>
                  <div className="col-lg-12 ">                     
                      <div className="card-header">
                      </div>
                <div className="row">
                <h3>Invoices</h3>
                <div className="col-lg-8">
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input 
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun(toggleCheckboxes)}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Issue invoices </label>
                </div>
                  </div>
                  </div>
                  <div className="col-lg-12 ">                     
                      <div className="card-header">
                      </div>
                <div className="row">
                <h3>Coupons</h3>
                <div className="col-lg-12 ">  
                <br/>
                <Button className="col-lg-2">Add Coupon</Button>
                <br/>
                <div className="card-header">
                </div>
                <Table responsive striped bordered className="verticle-middle">
                <thead>
                  <tr>
                    <th className="width50 ">
                    </th>
                    <th>
                      <strong>CODE</strong>
                    </th>
                    <th>
                      <strong>FROM</strong>
                    </th>
                    <th>
                      <strong>TO</strong>
                    </th>
                    <th>
                      <strong>REDEMPTION</strong>
                    </th>
                    <th>
                      <strong>DISCOUNT</strong>
                    </th>
                    <th>
                      <strong>OPTIONS</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className="d-flex">
                        <Link
                          to="#"
                          className="btn btn-primary shadow btn-xs sharp me-1"
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-danger shadow btn-xs sharp"
                        >
                          <i className="fa fa-trash"></i>
                        </Link>
                      </div>
                      </td>
                </tbody>
              </Table>                    
                <div className="row">
              <div className="col-lg-12"> 
                <h3>Credits</h3>
                <div className="col-lg-8">
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input 
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun(toggleCheckboxes)}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Activate credits</label>
                </div>
                  </div>
                  </div>
                  </div>
                  <div className="col-lg-12 mb-5">
                    <br/>
                    <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                    type="submit"
                    className="btn btn-primary col-lg-3"
                  >Save and select users  
                </Button>&nbsp;&nbsp; or &nbsp;&nbsp;
                <Button
                    type="submit"
                    className="btn me-2 btn-primary col-xl-2"
                  >
                  Cancel
                </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                    type="submit"
                    className="btn me-2 btn-primary col-xl-3"
                  >
                  E-commerce Timeline  
                </Button> &nbsp;&nbsp;
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
        </div>
      </div>
    </Fragment>
  );
};

export default AdmEcommerce;
