import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginbg from "@images/bg-1.jpg";
import logo from "@images/log.png";
import logofull from "@images/Asset.png";
import jwtService from "src/auth/authService/jwtService";
import showPwdImg from "@images/eye.svg";
import hidePwdImg from "@images/eye-slash.svg";
import Swal from "sweetalert2";
import { CircularProgress } from "@material-ui/core";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false); //Loader

  //sign up code
  const onLogin = (e) => {
    e.preventDefault();
    setBtnLoader(true);
    jwtService
      .signInWithEmailAndPassword({ email, password })
      .then((res) => {
        console.log("role", res.role, res.user_id, res);
        localStorage.setItem("role", res.role);
        setBtnLoader(false);
        if (res) {
          Swal.fire({
            title: "Success!",
            text: "Login successful",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      })
      .catch(({ error }) => {
        setBtnLoader(false);
        Swal.fire({
          title: "Failed!",
          text: "Email or Password invaild.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div
      className="login-main-page"
      style={{
        backgroundImage: "url(" + loginbg + ")",
        backgroundSize: "cover",
      }}>
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
                          <div>
                            <img
                              width="300"
                              height="50"
                              src={logofull}
                              alt=""
                            />
                          </div>
                        </div>
                        <img
                          src={logo}
                          alt="Logo"
                          className="education-img"></img>
                      </div>
                    </div>
                    <div className="col-xl-6 col-md-6">
                      <div className="sign-in-your">
                        <h4 className="fs-20 font-w800 text-center">
                          Sign in your account
                        </h4>
                        <span>
                          Welcome back! <br />
                          Login with your data that you entered during
                          registration
                        </span>
                        {/* <div className="login-social">
                          <Link to={"#"} className="btn font-w800 d-block my-4">
                            <i className="fab fa-google me-2 text-primary"></i>
                            Login with Google
                          </Link>
                          <Link to={"#"} className="btn font-w800 d-block my-4">
                            <i className="fab fa-facebook-f me-2 facebook-log"></i>
                            Login with Facebook
                          </Link>
                        </div> */}
                        <form onSubmit={onLogin} className="mt-2">
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
                          </div>
                          <div
                            className="mb-3"
                            style={{ position: "relative" }}>
                            <label className="mb-1">
                              <strong>Password</strong>
                            </label>
                            <input
                              type={isRevealPwd ? "text" : "password"}
                              className="form-control"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            <img
                              src={isRevealPwd ? showPwdImg : hidePwdImg}
                              onClick={() =>
                                setIsRevealPwd((prevState) => !prevState)
                              }
                              alt="eyebtn"
                              className="password-toggle"
                            />
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block">
                              {btnLoader ? (
                                <CircularProgress
                                  style={{
                                    width: "18px",
                                    height: "18px",
                                    color: "#fff",
                                  }}
                                />
                              ) : (
                                "Sign Me In"
                              )}
                            </button>
                          </div>
                          <div className="text-primary mt-3">
                            <Link to="./page-register">Sign up</Link>
                          </div>
                          <div className="text-primary mb-2 mt-1">
                            <Link to="./page-forgot-password">
                              Forgot Password
                            </Link>
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
};

export default Login;
