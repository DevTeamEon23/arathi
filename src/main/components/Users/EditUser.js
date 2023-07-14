import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
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
  const [userName, setUserName] = useState(""); //Full name
    const [nameErrorMsg, setNameErrorMsg] = useState(""); //show error Name
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
   const [userData, setUserData] = useState([]); //user list data
    const [token, setToken] = useState(); //auth token
    const [aadharNoErrorMsg, setAadharNoErrorMsg] = useState(""); //show error Aadhar no


 //User List Api
  const getAllUsers = () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    console.log(jwtToken);
    const config = {
      headers: {
        "Auth-Token": jwtToken, // Attach the JWT token in the Authorization header
      },
    };
    axios
      .get("http://127.0.0.1:8000/lms-service/users", config)
      .then((response) => {
        console.log("inside edit user page",response, response.data, response.data.data);
        setUserData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to fetch users!"); // Handle the error
      });
  }; 

 useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    getAllUsers();
  }, []);

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
    // setFirstname(item.firstname)
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    }


  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
}

const validateName = () => {
    if (!/^[a-zA-Z\s]+$/.test(userName)) {
      setNameErrorMsg("Please enter a valid full name");
    } else {
      setNameErrorMsg("");
    }
    if (userName.length < 3) {
      setNameErrorMsg("Must contain at least 3 characters");
    } else {
      setNameErrorMsg("");
    }
  };

   const handleAadhaarNo = () => {
    const regexp =/^\d{12}$/;
    if (!regexp.test(adhr)) {
      setAadharNoErrorMsg("Please enter Valid Aadhar no.");
    } else {
      setAadharNoErrorMsg("");
    }
  };

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
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-6">
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
                            value={eid}
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
                          Full Name <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Full name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            onBlur={validateName}
                            required
                          />
                          {nameErrorMsg && (
                            <span className="text-danger fs-14 m-2">
                              {nameErrorMsg}
                            </span>
                          )}{" "}
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
                          value={email}
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
                          Department 
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="dept"
                            name="dept"
                            value={dept}
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
                          Aadhar Card No. 
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="adhr"
                            value={adhr}
                            placeholder="e.g. 0123 3456 6789"
                            onChange={(e) => setAdhr(e.target.value)}
                            onBlur={handleAadhaarNo}
                          />
                            {aadharNoErrorMsg && (
                            <span className="text-danger fs-14 m-2">
                              {aadharNoErrorMsg}
                            </span>
                          )}
                        </div>
                      </div>
                       <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          Username <span className="text-danger">*</span>
                        </label>
                        <div className="input-group col-lg-6">
                          <span className="input-group-text">
                            <i className="fa fa-user" />{" "}
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            placeholder="Enter Username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                        </div>
                      </div>
     <div className="form-group mb-3 row">
                        <label className="col-lg-4 col-form-label">
                          Password <span className="text-danger">*</span>
                        </label>
                        <div className="input-group col-lg-6">
                          <span className="input-group-text">
                            {" "}
                            <i className="fa fa-lock" />{" "}
                          </span>

                          <input
                            type={`${showPassword ? "text" : "password"}`}
                            className="form-control"
                            id="password"
                            value={password}
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <div
                            className="input-group-text "
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {" "}
                            {showPassword === false ? (
                              <i className="fa fa-eye-slash" />
                            ) : (
                              <i className="fa fa-eye" />
                            )}
                          </div>
                        </div>
                      </div>
                    
                

                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-suggestions"
                        >
                          Bio 
                        </label>
                        <div className="col-lg-8">
                          <textarea
                            className="form-control"
                            id="bio"
                            value={bio}
                            rows="5"
                            placeholder="Short Description about user..."
                            onChange={(e) => setBio(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      <br />

                      <div className="form-group mb-3 row">
                    </div>
                    <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          User Type
                          <span className="text-danger">*</span>
                        </label>
                      <div className="col-lg-6">
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
                      </div>
                     
                      <div className="form-group mb-3 row ">
                        <div className="form-group mb-3 row d-flex mt-3">
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
                        </div></div>
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


    
    // const data = {id, eid, firstname, lastname, email, dept, adhr, file, bio, username, password, isActive};

    // fetch('https://localhost:8000/users/{id}'+ data, {
    //   method: 'POST',
    // })
    // .then((data) => {
    //   console.log(data);
    //     })
    // // .then((data) => {
    // //   console.log('new user updated')
    // //   alert("✔️ User Updated Successfully");
    // //   setUsers(data);
    // // })
    // .catch((err) => {
    //    console.log(err.message);
    // });
