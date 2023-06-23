import React, { useState,useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import { loadingToggleAction,loginAction,
// } from '../store/actions/AuthActions';
// image
import logo from "@images/Asset.png";
import axios from 'axios';

const Reset = () => {
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (password.length < 5) {
      console.log(password.length);
      setError('Password must be at least 5 characters long');
      } else {
      setError('');
      }
      const requestData = {
        email: email,
        password: password
      };
  
      // Make the POST request using Axios
      axios.post('http://localhost:8000/auth/change-user-password', requestData)
        .then(response => {
          console.log('Password changed successfully!');
          // Additional code for handling successful response
        })
        .catch(error => {
          console.error('Error changing password:', error);
          // Additional code for handling error
        });
    // history.push("/login");
  };

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
                              required
                            />
                            {error && <div className="text-danger fs-12">{error}</div>}
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