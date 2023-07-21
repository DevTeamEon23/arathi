import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";

import * as Yup from "yup";

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

const parentcategory = [
  { value: "ParentCategory1", label: "Parent Category 1" },
  { value: "ParentCategory2", label: "Parent Category 2" },
  { value: "ParentCategory3", label: "Parent Category 3" },
  { value: "ParentCategory4", label: "Parent Category 4" },
];
const AddCategory = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categories, setCategory] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
      const data = { id, name, parentcategory, price};

      fetch('https://localhost:8000/categories', {
        method: 'POST',
      })
      .then((data) => {
        console.log('new category added')
        alert("✔️ Category Added Successfully");
        setCategory(data);
      })
        .catch((err) => {
          console.log(err);
        });
      }

//   function handleChange(e) {
//     console.log(e.target.files);
//     setFile(URL.createObjectURL(e.target.files[0]));
// }
let history = useHistory();
  return (
    <Fragment>
      <Nav >
		<Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/dashboard">Dashboard</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/categories">Categories</Link>
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
              <form action="https://localhost:8000/categories" method="post" encType="multipart/form-data" >
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
                            id="name"
                            name="name"
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
                          htmlFor="val-currency"
                        >
                          Price
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="price"
                            name="price"
                            placeholder="₹21.60"
                            onChange={(e) => setPrice(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <br/>
                      
                      <br/>
 <div className="form-group mb-5 row">
                      <div className="col-lg-8 ms-auto">
                      <button
                        type="submit"
                        className="btn me-2 btn-primary"
                      >
                        Add Category
                      </button> or &nbsp;&nbsp;
                      <Button onClick={() => history.goBack()}>Cancel</Button>
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
