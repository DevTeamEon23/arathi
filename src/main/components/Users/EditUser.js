import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import Select from "react-select";
import * as Yup from "yup";
import axios from "axios";

import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Nav,
  Button,
  FormCheck,
} from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";

// const loginSchema = Yup.object().shape({
//   username: Yup.string()
//     .min(3, "Your username must consist of at least 3 characters ")
//     .max(50, "Your username must consist of at least 3 characters ")
//     .required("Please enter a username"),
//   password: Yup.string()
//     .min(5, "Your password must be at least 5 characters long")
//     .max(50, "Your password must be at least 5 characters long")
//     .required("Please provide a password"),
// });


const categorytype = [
  { value: "superadmin", label: "SuperAdmin" },
  { value: "admin", label: "Admin - Type" },
  { value: "instructor", label: "Instructor - Type" },
  { value: "learner", label: "Learner - Type" },
];

const timezonetype = [
  { value: "ist", label: "India Standard Time (IST)" },
  { value: "nst", label: "New Zealand Standard Time (NST)" },
  { value: "ast", label: "Alaska Standard Time (AST)" },
  { value: "gmt", label: "Greenwich Mean Time (GMT)" },
  { value: "ect", label: "European Central Time (ECT)" },
  { value: "arabic", label: "Egypt Standard Time	(Arabic)" },
];
const langtype = [
  { value: "hindi", label: "Hindi" },
  { value: "english", label: "English" },
  { value: "marathi", label: "Marathi" },
];

const EditUser = () => {
  const [id, setId] = useState('');
  const [eid, setEid] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('');
  const [adhr, setAdhr] = useState('');
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState();
  // const [status, setStatus] = useState();
  const [file, setFile] = useState([]);
  // const [selectedOption, setSelectedOption] = useState(null);
  const [isActive, setIsActive] = useState(true);
  // const [isDeactive, setIsDeactive] = useState(false);
  // const [isExcludefromEmail, setIsExcludefromEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [isFilePicked, setIsFilePicked] = useState(false);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  // const [user_id, setUserId] = useState(null);

  // useEffect(() => {
  //   getUsers();
  // }, [])
  // function getUsers() {
  //   fetch("http://localhost:8000/users").then((result) => {
  //     result.json().then((resp) => {
  //       //console.warning(response)
  //       setUsers(resp)
  //       setFirstname(resp[0].firstname)
  //     })
  //   })
  // }

  function selectUser(id)
  {
    let item=users[id-1];
    setFirstname(item.firstname)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {id, eid, firstname, lastname, email, dept, adhr, file, bio, username, password, isActive};

    fetch('https://localhost:8000/users/{id}'+ data, {
      method: 'POST',
    })
    .then((data) => {
      console.log(data);
        })
    // .then((data) => {
    //   console.log('new user updated')
    //   alert("✔️ User Updated Successfully");
    //   setUsers(data);
    // })
    .catch((err) => {
       console.log(err.message);
    });
    }


  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
}

  return (
    <Fragment>
      <Nav >
        <Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
          <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/edit-user">Info</Link>
          <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/user-courses-info">Courses</Link>
          <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/user-groups">Groups</Link>
          <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/user-files">Files</Link>
        </Nav.Item>
      </Nav>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Edit User Form </h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form action="https://localhost:8000/users/${id}" method="PUT" encType="multipart/form-data">
                  <div className="row">
                    <div className="col-xl-6">
                    <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          Id
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="id"
                            name="id"
                            placeholder="e.g. John Doe"
                            onChange={(e) => setId(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-email"
                        >
                          Employee ID <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="eid"
                            name="eid"
                            placeholder="e.g. jd001"
                            onChange={(e) => setEid(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          First Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            name="firstname"
                            placeholder="e.g. John Doe"
                            onChange={(e) => setFirstname(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          Last Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="lastname"
                            name="lastname"
                            placeholder="e.g. John Doe"
                            onChange={(e) => setLastname(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-email"
                        >
                          Email Address <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="e.g. jdoe@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-email"
                        >
                          Department <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="dept"
                            name="dept"
                            placeholder="e.g. Information Technology"
                            onChange={(e) => setDept(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-email"
                        >
                          Aadhar Card No. <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="adhr"
                            name="adhr"
                            placeholder="e.g. 0123 3456 6789"
                            onChange={(e) => setAdhr(e.target.value)}
                          />
                        </div>
                      </div>
                      <label className="text-label">Username</label>
                        <div className="input-group">
                            <span className="input-group-text">
                              <i className="fa fa-user" />{" "}
                            </span>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter Username"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                          />
                          </div>
                          <label className="text-label">Password *</label>
                        <div className="input-group transparent-append mb-2">
                          
                            <span className="input-group-text">
                              {" "}
                              <i className="fa fa-lock" />{" "}
                            </span>
                          
                          <input
                            type={`${showPassword ? "text" : "password"}`}
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <div
                            className="input-group-text "
                            onClick={() => setShowPassword(!showPassword)}
                          >

                              {" "}
								  {showPassword === false ? (<i className="fa fa-eye-slash" />) : (<i className="fa fa-eye" />)}
                            
                          </div>
                          </div>
                      <div className="form-group mb-3 row">

                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-suggestions"
                        >
                          Bio <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-10">
                          <textarea
                            className="form-control"
                            id="bio"
                            name="bio"
                            rows="5"
                            placeholder="Short Description about user.."
                            onChange={(e) => setBio(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-04">
                        </div><br />
                      <div className="form-group mb-3 row">
                    </div>
                    </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="form-group mb-3 row">
                      <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-suggestions"
                        >
                          Add Photo<span className="text-danger">*</span>
                        </label>
                        <div className="profile-info">
                          <div className="profile-photo">
                          <input type="file" name="file" accept='.jpeg, .png, .jpg' onChange={handleChange}/>
                          <br/><br/> 
                          <img src={file} width="250" height="250" alt="file" />
                        </div>
                        </div>
                        </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          User Type
                          <span className="text-danger">*</span>
                        </label>
                      <div className="col-lg-12">
                      <Select
                          defaultValue={categorytype}
                          onChange={categorytype}
                          options={categorytype}
                          name="categorytype"
                        >
                      </Select>
                        <div
                          id="val-username1-error"
                          className="invalid-feedback animated fadeInUp"
                          style={{ display: "block" }}
                        >
                        </div>
                      </div>
                        <div
                          id="val-username1-error"
                          className="invalid-feedback animated fadeInUp"
                          style={{ display: "block" }}
                        />
                      </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-website"
                        >
                          Time Zone
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <Select
                          defaultValue={timezonetype}
                          onChange={timezonetype}
                          options={timezonetype}
                          name="timezonetype"
                        >
                        </Select>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-currency"
                        >
                          Language
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <Select
                          defaultValue={langtype}
                          onChange={langtype}
                          options={langtype}
                          name="langtype"
                        >
                        </Select>
                        </div>
                      </div>
                        <div className="form-group mb-3 row">
                          <div className="col-lg-2">
                      <br/>
                      <br/>
                        <label
                          className="form-check css-control-primary css-checkbox"
                          htmlFor="val-terms"
                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="isActive"
                            name="isActive"
                            onChange={(e) => setIsActive(e.target.value)}
                          />Active
                          </label>
                        </div>
                          <div className="col-lg-4">
                      <br/>
                      <br/>
                        <label
                          className="form-check css-control-primary css-checkbox"
                          htmlFor="val-terms"
                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="isDeactive"
                            name="isDeactive"
                          />Deactive
                          </label>
                        </div>
                          <div className="col-lg-8">
                      <br/>
                      <br/>
                            <label
                            className="form-check css-control-primary css-checkbox"
                            htmlFor="val-terms"
                          >
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="isExcludefromEmail"
                              name="isExcludefromEmail"
                            />Exclude from Email
                        </label>
                        </div>
                        </div>
                        <div className="form-group mb-3 row">
                        <div className="col-lg-8 ms-auto">
                          <br/>
                          <br/>
                        <Button
                          type="submit"
                          value="submit"
                          className="btn me-2 btn-primary"
                        >
                          Update User
                        </Button> or &nbsp;&nbsp;
                        <Link to="/users-list"><Button className="btn btn-light">
                          Cancel
                        </Button></Link>
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

export default EditUser;
