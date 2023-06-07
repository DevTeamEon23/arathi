import React, { useState ,useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  loadingToggleAction,
  loginAction,
} from "../../store/actions/AuthActions";
// image
import logo from "../../images/Asset.png";
import Reset from "./Reset";
import axios from "axios";

function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  let errorsObj = { email: "" };
  const [errors, setErrors] = useState(errorsObj);
  // const [otp, setOtp] = useState("");
  const history = useHistory();
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [timerCount, setTimer] = React.useState(60);
  const [otp, setOtp] = useState(new Array(4).fill("")); //for otp
  const [isShown, setIsShown] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [disable, setDisable] = useState(true);
  const notifyTopRight = () => {
    toast.success("OTP has been send successfully on given Email-Id", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     setTimer((lastTimerCount) => {
  //       lastTimerCount <= 1 && clearInterval(interval);
  //       if (lastTimerCount <= 1) setDisable(false);
  //       if (lastTimerCount <= 0) return lastTimerCount;
  //       return lastTimerCount - 1;
  //     });
  //   }, 1000); //each count lasts for a second
  //   //cleanup the interval on complete
  //   return () => clearInterval(interval);
  // }, [disable])
  
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
        handleOtp()
        setIsShown((current) => !current);
     setDisableBtn(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setIsShown((current) => !current);
    setDisableBtn(true);
  };

  const handleOtp=(e)=>{
    console.log("inside handleOtp");
    if (email) {
      // if (disable) return;
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      setOTPinput(OTP);
      axios
        .post("http://localhost:5000/send_recovery_email", { 
          OTP,
          recipient_email: email,
        })
        .catch((err) => {
          console.log(err);
        });
  }
  setIsShown((current) => !current);
  setDisableBtn(true);
}

  function verfiyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      // setPage("reset");
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }

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
    console.log(
      "inside handleVerifyOtp",
      OTPinput,
      typeof OTPinput,
      otp.join(""),
      typeof otp.join(""),
      // OTPinput.join(""),
    );
    if(OTPinput===parseInt(otp.join(""))){
      console.log("OTP Matched")
      toast("Wow so easy!")
      toast.error("OTP Matched")
      history.push("/page-reset-password");
    }else{
      alert("Entered OTP is wrong.")
      toast.error("Check OTP")
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
                      <Link to="/dashboard">
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
                      <div className="text-center mt-2">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          disabled={disableBtn}
                          onClick={notifyTopRight}
                          // type="button"
                          className="btn btn-dark mb-2 me-2"
                          id="toastr-success-top-right"
                          // type="submit"
                          className="btn btn-primary btn-block"
                          // disabled={disableBtn}
                          // style={{disableBtn ?<> cursor: 'not-allowed'</> : cursor: 'pointer'}}
                        ><ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                      />
                          SUBMIT🚀
                        </button>
                      </div>
                    </form>
                    {/* New UI for OTP input */}
                    {isShown && (
                      <form onSubmit={handleVerifyOtp}>
                        <div className="text-center">
                          <div className="mt-3">
                            <strong>Verify your Identity</strong>
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
                              <div className="d-flex justify-content-around">
                                <button
                                  className="btn btn-secondary btn-block-half"
                                  onClick={(e) =>
                                    setOtp([...otp.map((v) => "")])
                                  }
                                >
                                  Clear
                                </button>
                                <button
                                  className="btn btn-primary btn-block-half"
                                  type="submit"
                                >
                                  Verify OTP
                                </button>
                              </div>
                           <div><p>Didn't recieve code?</p></div>   
                            </div>
                          </div>
                        </div>
                      </form>
                    )}

                    <div className=" mt-2">
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

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(ForgotPassword);