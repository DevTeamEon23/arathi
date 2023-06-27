import React, { useState,useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import { loadingToggleAction,loginAction,
// } from '../store/actions/AuthActions';
// image
import logo from "@images/Asset.png";
import jwtService from "src/auth/authService/jwtService";
import axios from 'axios';
import Swal from "sweetalert2";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState('');
  const [pwdError, setPwdError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
  if(password !== confPassword){
  setPwdError("Password and Confirm password should be same");
}else {
  setPwdError('');
  // const requestData = {
  //   email: email,
  //   password: password
  // };
  // // Make the POST request using Axios
  // axios.post('http://localhost:8000/auth/change-user-password', requestData)
  //   .then(response => {
  //     console.log('Password changed successfully!',response);
  //     if (response.data.status === "success") {
  //       Swal.fire({
  //         title: "Password changed successfully!!",
  //         text: "Please Login with new password...",
  //         icon: "success",
  //         confirmButtonText: "OK",
  //       }).then(() => {
  //         // Redirect to the login page
  //         window.location.href = "/login";
  //       });
  //     }
  //     localStorage.removeItem("email");
  //   })
  //   .catch((error) => {
  //     console.log(error,error.response);
  //     if (error.response && error.response.data && error.response.data.status === "failure") {
  //       Swal.fire({
  //         title: "Error changing password!",
  //         text: "Please try again later...",
  //         icon: "error",
  //         confirmButtonText: "OK",
  //       }).then(() => {
  //         // Redirect to the login page
  //         window.location.href = "/login";
  //       });
  //     }})

  jwtService
  .resetPassword({
    password,
    email
  })
  .then((response) => {
  });


  }
  };

  const validatePwd=()=>{
    if (password.length < 5) {
      console.log(password.length);
      setError('Password must be at least 5 characters long');
      } else {
      setError('');
      }
  }

  useEffect(() => {
  let email=window.localStorage.getItem("email");
  setEmail(email)
  console.log(email);
  }, [email])
  
  return (
    <div className="authincation h-100 p-meddle">
    <div className="container h-100">
      {" "}
      <div className="row justify-content-center h-100 align-items-center">
        <div className="col-md-6">
          <div className="authincation-content">
            <div className="row no-gutters">
              <div className="col-xl-12">
                <div className="auth-form">
                  <div className="text-center mb-3">
                    <Link to="/dashboard">
                      <img src={logo} alt="" />
                    </Link>
                  </div>
                  <h4 className="text-center mb-4 ">Reset Password</h4>
                  <form onSubmit={onSubmit}>
                    <div className="form-group">
                      <div className="mb-3">
                            <label className="mb-1">
                              <strong>New Password</strong>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              onBlur={validatePwd}
                              required
                            />
                            {error && <div className="text-danger fs-14">{error}</div>}
                          </div>

                          <div className="mb-3">
                            <label className="mb-1">
                              <strong>Confirm New Password</strong>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              value={confPassword}
                              onChange={(e) =>setConfPassword (e.target.value)}
                              required
                            />
                            {pwdError && <div className="text-danger fs-14">{pwdError}</div>} 
                          </div>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary btn-block" >
                        SUBMIT
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
  )
}

export default Reset