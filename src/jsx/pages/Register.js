import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import {
  confirmedSignupAction,
  signupAction,
} from "../../store/actions/AuthActions";
import { useHistory } from "react-router-dom";
// image
import logo from "../../images/Asset.png";
import Select from "react-select";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  let errorsObj = { email: "", password: ""};
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const emailValidate =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [role, setRole] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const Register = (e) => {
    e.preventDefault();
 console.log("role",role)
    let error = false;
    const errorObj = { ...errorsObj };
    if (email.match(emailValidate)) {
      console.log("right email");
    } else {
      console.log("wrong email");
      errorObj.email = "Email is Required Properly";
      error = true;
    }
    if (email === "" || password === "") {
      errorObj.password = "Email and Password is Required";
      error = true;
    }  else if (password !== confPassword ) {
      errorObj.password = "Password and confirm password should be same";
      error = true;
    }
    else if (role === role.length) {
      console.log("inside role",role);
      errorObj.role = "Role is Required";
      error = true;
    } else console.log("@@@@", password, confPassword);
    setErrors(errorObj);
    if (error) return;
    // await axios.post("http://localhost:5000/register", {
    //   name: name,
    //   email: email,
    //   password: password,
    //   confPassword: confPassword,
    //   role:role
    // });
    // history.push("/login");
    
    dispatch(confirmedSignupAction(true));
    dispatch(
      signupAction(username, email, password, confPassword, role, props.history)
    );
  };
// sign up via Redux H
  const options = [
    // { value: "superadmin", label: "SuperAdmin" },
    // { value: "admin", label: "Admin - Type" },
    { value: "learner", label: "Learner Role" },
    { value: "instructor", label: "Instructor Role" }
  ];

  const handleChange = (options) => {
    setRole(options.value);
  };

  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                  <div className="text-center mb-3">
											<Link to="/login" >
												<img src={logo} height="40" alt="" />
											</Link>
										</div>
                    <h4 className="text-center mb-4 ">Sign up your account</h4>
                    {props.errorMessage && (
                      <div className="">{props.errorMessage}</div>
                    )}
                    {props.successMessage && (
                      <div className="mb-2" style={{color:"green",fontWeight:"bold",fontSize:"1.5rem",textAlign:"center"}}>{props.successMessage}</div>
                    )}
                    <form onSubmit={Register}>
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Username</strong>
                        </label>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="form-control"
                          placeholder="username"
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="hello@example.com"
                          required
                        />
                      </div>
                      {errors.email && (
                        <div style={{ color: "red" }}>{errors.email}</div>
                      )}
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Password</strong>
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                          defaultValue="Password"
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Confirm Password</strong>
                        </label>
                        <input
                          type="password"
                          value={confPassword}
                          onChange={(e) => setConfPassword(e.target.value)}
                          className="form-control"
                          defaultValue="Password"
                          required
                        />
                      {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}

                      </div>
                      <div>
                        <label className="mb-1 ">
                          <strong>Choose Your Role type</strong>
                        </label>
                        <Select
                          className="form-Control"
                          styles={{ height: " 50px", lineHeight: "50px" }}
                          defaultValue={options}
                          onChange={handleChange}
                          options={options}
                          name="role"
                          required
                        ></Select>
                      </div>
                      <div className="text-center mt-4">
                        <button className="btn btn-primary btn-block">
                          Sign me up
                        </button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p className="">
                        Already have an account?{" "}
                        <Link className="text-primary" to="/login">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(Register);