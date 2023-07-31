import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import showPwdImg from "@images/eye.svg";
import hidePwdImg from "@images/eye-slash.svg";

// image
import logo from "@images/Asset.png";
import jwtService from "src/auth/authService/jwtService";

// Add sweet alert
import Swal from "sweetalert2";

const Register =() =>{
  const [userName, setUserName] = useState("");
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  // const [role, setRole] = useState("Learner");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  const onSignUp=(e)=> {
    e.preventDefault();
    if (userName.length < 3) {
      setNameErrorMsg("Full name must contain at least 3 characters");
    } else {
      setNameErrorMsg("");
    }
    if (password.length < 5) {
      setError("Password must be at least 5 characters long");
    } else {
      setError("");
    jwtService
      .createUser({
        fullname: userName,
        password,
        email,
        generate_token: true,
      })
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: "Registration Done Successfully",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Redirect to the login page
          window.location.href = "/login";
        });
      })
      .catch((error) => {
        console.error("Error during sign-in:", error); 
        Swal.fire({
          title: "Something went wrong!",
          text: "User Already Exists",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
    }
  }

      // Validate full name
  const validateName = () => {
    if (!/^[a-zA-Z\s]+$/.test(userName)) {
      setNameErrorMsg("Please enter a valid full name");
    } else {
      setNameErrorMsg("");
    }
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
                      <Link to="/login">
                        <img width="300" height="50" src={logo} alt="" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 ">Sign up your account</h4>
                    <form onSubmit={onSignUp}>
                      <div className="form-group mb-3">
                        <label className="mb-1" htmlFor="userName">
                          <strong>Full Name</strong>
                        </label>
                        <input
                          type="text"
                          id="userName"
                          className="form-control"
                          placeholder="Enter Full name"
                          value={userName}
                          onBlur={validateName}
                          onChange={(e) => setUserName(e.target.value)}
                          required
                        />
                        {nameErrorMsg && (
                          <span className="text-danger fs-14 m-2">
                            {nameErrorMsg}
                          </span>
                        )}
                      </div>
                      <div className="form-group mb-3">
                        <label className="mb-1" htmlFor="email">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="hello@example.com"
                          required
                        />
                      </div>
                      <div
                        className="form-group mb-3"
                        style={{ position: "relative" }}
                      >
                        <label className="mb-1" htmlFor="password">
                          <strong>Password</strong>
                        </label>
                        <input
                          type={isRevealPwd ? "text" : "password"}
                          id="password"
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
                      {error && (
                        <div className="text-danger fs-12">{error}</div>
                      )}
                      {/* <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Role</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={role}
                          disabled={true}
                          style={{ cursor: "not-allowed" }}
                          onChange={(e) => setRole(e.target.value)}
                        />
                      </div> */}
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
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
}

export default Register;
