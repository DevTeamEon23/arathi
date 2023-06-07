import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  loadingToggleAction,
  loginAction,
} from "../../store/actions/AuthActions";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
// import login from '../pages/Login';
import loginbg from "../../images/bg-1.jpg";
import logo from "../../images/log.png";
import logofull from "../../images/Asset.png";

function Login(props) {
  console.log("props",props)
  const [email, setEmail] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  const responseGoogle = (response) => {
    // console.log(response);
  };
  
  const onLogin=(e)=> {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }
   if (password === "") {
      console.log("inside password",password)
      errorObj.password = "Password is Required";
      error = true;
    } 
    else
    //  axios.post("http://localhost:5000/login", {
    //   email: email,
    //   password: password,
    // });
    // history.push("/dashboard");
	  setErrors(errorObj);
    if (error) return;
    console.log("email",email,"password",password)
    dispatch(loadingToggleAction(true));
    dispatch(loginAction(email, password, props.history));
  }

  return (
    <div
      className="login-main-page"
      style={{
        backgroundImage: "url(" + loginbg + ")",
        backgroundSize: "cover",
      }}
    >
      <div className="login-wrapper">
        <div className="container h-100">
          <div className="row h-100 align-items-center justify-contain-center">
            <div className="col-xl-12 mt-3">
              <div className="card">
                <div className="card-body p-0">
                  <div className="row m-0">
                  <div className="col-xl-6 col-md-6 sign text-center">
											<div>
												<div className="text-center my-5">
													<Link to="/dashboard">
														<img width="300" height="50" src={logofull} alt="" />
													</Link>
												</div>
												{/* style={{backgroundColor: "blue"}} */}
												<img src={logo} className="education-img"></img>
											</div>	
										</div>
                    <div className="col-xl-6 col-md-6">
                      <div className="sign-in-your">
                        <h4 className="fs-20 font-w800 text-black">
                          Sign in your account
                        </h4>
                        <span>
                          Welcome back! Login with your credentials that you
                          entered
                          <br /> during registration
                        </span>
                        <div className="btn font-w800 d-block my-4;">
                          <div>
                            <GoogleLogin
                              clientId="101008384453-kvvtt6668hctnnofcc5q2cd7rnjma8cl.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                              buttonText="LOGIN WITH GOOGLE"
                              onSuccess={responseGoogle}
                              onFailure={responseGoogle}
                            />
                          </div>
                          <Link to={"#"} className="btn font-w800 d-block my-4">
                            <i className="fab fa-facebook-f me-2 facebook-log"></i>
                            Login with Facebook
                          </Link>
                        </div>
                        {props.errorMessage && (
                          <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                            {props.errorMessage}
                          </div>
                        )}
                        {props.successMessage && (
                          <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                            {props.successMessage}
                          </div>
                        )}
                        <form onSubmit={onLogin}>
                          <div className="mb-3">
                            <label className="mb-1">
                              <strong>Email</strong>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            {errors.email && (
                              <div className="text-danger fs-12">
                                {errors.email}
                              </div>
                            )}
                          </div>
                          <div className="mb-3">
                            <label className="mb-1">
                              <strong>Password</strong>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            
                            {errors.password && (
                              <div className="text-danger fs-12">
                                {errors.password}
                              </div>
                            )}
                          </div>
                          <div className="row d-flex justify-content-between mt-4 mb-2">
                            <div className="mb-3">
                              {/* <div className="form-check custom-checkbox ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="basic_checkbox_1"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="basic_checkbox_1"
                                >
                                  Remember my preference
                                </label>
                              </div> */}
                            </div>
                            <div className="mb-3">
                              <Link to="./page-register">Sign up</Link>
                            </div>
                            <div className="mb-3">
                              <Link to="./page-forgot-password">
                                Forgot Password
                              </Link>
                            </div>
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block"
                            >
                              Sign Me In
                            </button>
                          </div>
                        </form>
                      </div>
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
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);