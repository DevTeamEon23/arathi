import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
// image
import logo from "@images/Asset.png";
// import Reset from "./Reset";
import axios from "axios";
// import Reset from "./Reset";
import jwtService from "src/auth/authService/jwtService";
import Swal from "sweetalert2";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [OTPError, setOTPError] = useState("");
  const [otpReceived, setOtpReceived] = useState();
  const history = useHistory();
  // const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [otp, setOtp] = useState(new Array(4).fill("")); //for otp
  const [isShown, setIsShown] = useState(false); //OTP UI
  const [disabled, setDisabled] = useState(false); //btn disabled
  const [btnLoader, setBtnLoader] = useState(false); //Loader
  const [verifyBtnLoader, setVerifyBtnLoader] = useState(false); //Loader
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    setBtnLoader(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
      axios
        .post("http://localhost:8000/auth/send_mail", {
          email: [email],
        })
        .then((res) => {
          console.log(res, res.data.OTP, res.data.status);
          setOtpReceived(res.data.OTP);
          setIsShown(true);
          setBtnLoader(false);
          setDisabled(true);
        })
        .catch((error) => {
          console.log(error, error.response, error.response.status);
          setBtnLoader(false);
        });

      // jwtService
      //   .forgotPassword({ email: [email] })
      //   .then((res) => {
      //     console.log(res, "on forgotpwd page");
      //     // Handle the success response here
      //     Swal.fire({
      //       title: "Success!",
      //       text: "Password reset email sent",
      //       icon: "success",
      //       confirmButtonText: "OK",
      //     });
      //   })
      //   .catch((error) => {
      //     // Handle errors that occur during the password reset process
      //     console.error("Password reset failed:", error);
      //     Swal.fire({
      //       title: "Error!",
      //       text: "Password reset email could not be sent",
      //       icon: "error",
      //       confirmButtonText: "OK",
      //     });
      //   });
    }
  };

  // Function to start the resend OTP timer
  const startResendTimer = () => {
    setResendDisabled(true); // Disable the resend button initially
    setResendTimer(60); // Set the initial timer value in seconds

    // Update the timer every second
    const timerInterval = setInterval(() => {
      setResendTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Stop the timer after 60 seconds
    setTimeout(() => {
      clearInterval(timerInterval);
      setResendDisabled(false); // Enable the resend button after the timer expires
    }, 60000);
  };

  // Function to handle resend OTP
  const handleResendOTP = () => {
    startResendTimer(); // Start the resend OTP timer
    // Make the API call to resend the OTP
    axios
      .post("http://localhost:8000/auth/send_mail", {
        email: [email],
      })
      .then((res) => {
        console.log(res, res.data.OTP, res.data.status);
        setOtpReceived(res.data.OTP);
        setIsShown(true);
      })
      .catch((error) => {
        console.log(error, error.response, error.response.status);
        // toast.error("Invalid credentials!", {
        //   position: toast.POSITION.TOP_CENTER,
        //   className: "toast-message",
        // });
      });
  };

  const handleChange = (element, index) => {
    console.log("inside handleChange", index);
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setVerifyBtnLoader(true);
    console.log(
      "inside handleVerifyOtp",
      otp.length,
      otp.join(""),
      otpReceived
    );
    setOTPError("");
    if (otpReceived === otp.join("")) {
      console.log("inside if verify otp");
      localStorage.setItem("email", email);
      setVerifyBtnLoader(false);
      history.push("/page-reset-password");
    } else {
      console.log("inside error");
      setOTPError("Incorrect OTP! Please try again...");
    }
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
                      <Link to="/login">
                        <img src={logo} height="40" alt="" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 ">Forgot Password</h4>
                    <form onSubmit={onSubmit}>
                      <div className="form-group">
                        <label className="mb-1">
                          <strong>Enter Your Registered Email</strong>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="hello@example.com"
                          required
                        />
                        {emailError && (
                          <span className="text-danger fs-14 m-2">
                            {emailError}
                          </span>
                        )}
                        {/* {email && <div id="checkinputemail" className=''></div>} */}
                      </div>
                      <div className="text-center mt-2">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          disabled={disabled}>
                          {btnLoader ? (
                            <CircularProgress
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "#fff",
                              }}
                            />
                          ) : (
                            "SUBMIT"
                          )}
                        </button>
                      </div>
                    </form>
                    {/* New UI for OTP input */}
                    {isShown && (
                      <form onSubmit={handleVerifyOtp}>
                        <div className="text-center">
                          <div className="mt-3">
                            <strong>
                              {verifyBtnLoader ? (
                                <CircularProgress
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "#fff",
                                  }}
                                />
                              ) : (
                                "Verify your Identity"
                              )}
                            </strong>
                          </div>
                          <div className="fs-18">
                            <p>
                              We have sent a code to your email <b>{email}</b>
                            </p>
                          </div>

                          <div className="row">
                            <div className="col-12 text-center">
                              {otp.map((data, index) => {
                                return (
                                  <input
                                    className="otp-field col-2 w-10  p-2 m-2 text-center rounded"
                                    type="text"
                                    name="otp"
                                    maxLength="1"
                                    key={index}
                                    value={data}
                                    style={
                                      data
                                        ? {
                                            borderBottom: "3px solid #7dbf2a",
                                            fontSize: "24px",
                                          }
                                        : { borderBottom: "3px solid #EE3232" }
                                    }
                                    onChange={(e) =>
                                      handleChange(e.target, index)
                                    }
                                    onFocus={(e) => e.target.select()}
                                    required
                                  />
                                );
                              })}

                              <p className="fs-16">
                                OTP Entered - {otp.join("")}
                              </p>
                              <div className="align-items-center">
                                <button
                                  className="btn btn-link"
                                  onClick={handleResendOTP}
                                  disabled={resendDisabled}>
                                  Resend OTP
                                </button>
                                {resendDisabled && (
                                  <p className="">
                                    Resend OTP in {resendTimer} seconds
                                  </p>
                                )}
                              </div>
                              <div className="d-flex justify-content-around mb-2">
                                <button
                                  className="btn btn-secondary btn-block-half"
                                  onClick={(e) =>
                                    setOtp([...otp.map((v) => "")])
                                  }>
                                  Clear
                                </button>
                                <button
                                  className="btn btn-primary btn-block-half"
                                  type="submit">
                                  Verify OTP
                                </button>
                              </div>
                              {OTPError && (
                                <div className="text-danger fs-18">
                                  {OTPError}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </form>
                    )}

                    <div className=" mt-3">
                      <p className="">
                        Want To Create an Account?{" "}
                        <Link className="text-primary" to="/page-register">
                          Sign up
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

export default ForgotPassword;
