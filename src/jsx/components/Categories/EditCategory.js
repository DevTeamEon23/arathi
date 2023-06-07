import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import PageTitle from "../../layouts/PageTitle";
import { Formik } from "formik";
import * as Yup from "yup";
import TimePickerPicker from 'react-time-picker';
import profile from "../../../images/profile/coursessss.jpg";
import {
  Dropdown,
  DropdownButton,
  Button,
  Nav,
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
  { value: "parent_category_1", label: "Parent Category 1" },
  { value: "parent_category_2", label: "Parent Category 2" },
  { value: "parent_category_3", label: "Parent Category 3" },
  { value: "parent_category_4", label: "Parent Category 4" },
];
const EditCategory = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, onChange] = useState(new Date());
  const [file, setFile] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
}
let history = useHistory();
  return (
    <Fragment>
      <Nav >
		<Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/dashboard">Dashboard</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/add-category">Add Category</Link>
        </Nav.Item>
      </Nav>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Edit Category </h4>
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
                            placeholder="e.g. React-Redux"
                          />
                        </div>
                      </div>
                      
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-website"
                        >
                          Parent Category
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
                          htmlFor="val-currency"
                        >
                          Price
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-currency"
                            name="val-currency"
                            placeholder="$21.60"
                          />
                        </div>
                      </div>
                      <br/>
                      
                      <br/>

                      <button
                        type="submit"
                        className="btn me-2 btn-primary"
                      >
                        Update Category
                      </button> or &nbsp;&nbsp;
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

export default EditCategory;
