import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { loadingToggleAction,loginAction,
} from '../../store/actions/AuthActions';
// image
import logo from "../../images/Asset.png";

const Reset = (props) => {
  const [email, setEmail] = useState("");
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
    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }
    setErrors(errorObj);
    if (error) return;
    axios
      .post("http://localhost:5000/check-email", {
        email: email,
      })
      .then((res) => {
        if (res.data.emailExists === false) {
          alert("User not present");  
        }
        else if(res.data.emailExists === true){
        console.log("inside else if");
        resetPassword()
    //     setIsShown((current) => !current);
    //  setDisableBtn(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // setIsShown((current) => !current);
    // setDisableBtn(true);
  };

  const resetPassword = (e) => {
    let error = false;
    const errorObj = { ...errorsObj };
    if (password === '') {
        errorObj.password = 'Password is Required';
        error = true;
    }
    else
      axios.put("http://localhost:5000/resetPassword", { 
          email,
          password,
          confPassword,
        })
        .then((res) => {
          console.log("check res",res)
        })
    .catch((err) => {
      console.log(err);
    });
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
                        <label className="mb-1">
                          <strong>Enter Your Registered Email</strong>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) =>setEmail(e.target.value)}
                          className="form-control"
                          placeholder="hello@example.com"
                          pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                          required
                        />
                        {errors.email && (
                          <div className="text-danger fs-14 m-2">
                            {errors.email}
                          </div>
                        )}
                        {/* {email && <div id="checkinputemail" className=''></div>} */}
                      </div>
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

export default Reset;