import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import { loadingToggleAction,loginAction,
// } from '../store/actions/AuthActions';
// image
import logo from "@images/Asset.png";

const Reset = (props) => {
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  let errorsObj = { email: ''};
  const [errors, setErrors] = useState(errorsObj);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (password === '') {
        errorObj.password = 'Password is Required';
        error = true;
    }
    setErrors(errorObj);
    if (error) return;
    history.push("/login");
    // dispatch(loadingToggleAction(true));
    // dispatch(loginAction(email, props.history));
  };

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
                            
                            {errors.password && (
                              <div className="text-danger fs-12">
                                {errors.password}
                              </div>
                            )}
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
                            
                            {errors.password && (
                              <div className="text-danger fs-12">
                                {errors.password}
                              </div>
                            )}
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