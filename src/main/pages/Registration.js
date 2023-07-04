import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

// image
import logo from "@images/Asset.png";
import jwtService from "src/auth/authService/jwtService";

// Add sweet alert
import Swal from "sweetalert2";

function Register(props) {
  const [userName, setUserName] = useState("");
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [email, setEmail] = useState("");
  // const [role, setRole] = useState("Learner");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  function onSignUp(e) {
    e.preventDefault();
    if (userName.length < 3 ) {
      setNameErrorMsg('Full name must contain at least 3 characters');
      } else {
      setNameErrorMsg('');
      }
if (password.length < 5) {
		setError('Password must be at least 5 characters long');
	  } else {
		setError('');
	  }

    jwtService
      .createUser({
        fullname: userName,
        password,
        email,
        generate_token: true,
      })
      .then((response) => {
      });
  }

  const validateName=()=>{
    // Validate full name
    if (!/^[a-zA-Z\s]+$/.test(userName)) {
      console.log(userName.length);
      setNameErrorMsg('Please enter a valid full name');
    } else {
      setNameErrorMsg('');
      // Perform further actions or submit the form
    }
  }
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
                    {props.errorMessage && (
                      <div className="">{props.errorMessage}</div>
                    )}
                    {props.successMessage && (
                      <div className="">{props.successMessage}</div>
                    )}
                    <form onSubmit={onSignUp}>
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Full Name</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Full name"
                          value={userName}
                          onBlur={validateName}
                          onChange={(e) => setUserName(e.target.value)}
                          required
                        />
                      {nameErrorMsg && <span className="text-danger fs-14 m-2">{nameErrorMsg}</span>}
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
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Password</strong>
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                          required
                        />
						{error && <div className="text-danger fs-12">{error}</div>}
                      </div>
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

export default withRouter(Register);
