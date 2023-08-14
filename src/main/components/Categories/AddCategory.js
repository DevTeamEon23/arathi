import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { Button, Nav } from "react-bootstrap";
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

const parentcategory = [
  { value: "ParentCategory1", label: "Parent Category 1" },
  { value: "ParentCategory2", label: "Parent Category 2" },
  { value: "ParentCategory3", label: "Parent Category 3" },
  { value: "ParentCategory4", label: "Parent Category 4" },
];

const AddCategory = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("generate_token", true);
    const url = "https://v1.eonlearning.tech/lms-service/addcategories";
    const authToken = window.localStorage.getItem("jwt_access_token");
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Auth-Token": authToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Category added successfully!!!");
        clearAllState();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to add Category...");
      });
  };

  const clearAllState = () => {
    console.log("inside clear function");
    setName("");
    setPrice("");
  };

  return (
    <Fragment>
      <Nav>
        <Nav.Item as="div" className="nav nav-tabs" id="nav-tab" role="tablist">
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventKey="Follow"
            type="button"
            to="/dashboard">
            Dashboard
          </Link>
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventKey="Follow"
            type="button"
            to="/categories">
            Categories
          </Link>
        </Nav.Item>
      </Nav>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Category </h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username">
                          Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="e.g. React-Redux"
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-website"
                        >
                          Parent Category
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <Select
                          defaultValue={parentcategory}
                          onChange={parentcategory}
                          options={parentcategory}
                          name="parentcategory"
                        >
                        </Select>
                        </div>
                      </div> */}
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-currency">
                          Price
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="price"
                            name="price"
                            value={price}
                            placeholder="₹21.60"
                            onChange={(e) => setPrice(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <br />

                      <br />
                      <div className="form-group mb-5 row">
                        <div className="col-lg-8 ms-auto">
                          <Button
                            type="submit"
                            value="submit"
                            className="btn me-2 btn-primary">
                            Add Category
                          </Button>{" "}
                          or &nbsp;&nbsp;
                          <Link to="/categories">
                            <Button className="btn me-2 btn-light">
                              Cancel
                            </Button>
                          </Link>
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

export default AddCategory;
