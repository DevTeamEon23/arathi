import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// image
import logo from "@images/Asset.png";
// import Reset from "./Reset";
import axios from "axios";

function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');
  // const [otp, setOtp] = useState("");
  const history = useHistory();
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [otp, setOtp] = useState(new Array(4).fill("")); //for otp
  const [isShown, setIsShown] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  // const handleInputEmail = (e) => {
  //   console.log("inside handleInputEmail");
  //   setEmail(e.target.value);
  //   // axios.post("http://localhost:5000/verifymail",{
  //   //   email: email,
  //   // }).then(()=>console.log("api done"))
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    axios
      .post("http://localhost:8000/auth/send_mail", {
        email: [email],
      })
      .then((res) => {
        console.log(res);
        // if (res.data.emailExists === true) {
        //   console.log("user present");
        //   // document.getElementById('checkinputemail').innerHTML = 'User present'
        // } else console.log("user doesn't present");
        // // document.getElementById('checkinputemail').innerHTML = 'User not present'
        // alert('User not present')
        // if (res.data.emailExists === false) {
        //   alert("User not present");
        // }
        handleOtp(e)
      })
      .catch((res) => {
        console.log(res);
      });
      // handleOtp(e)
    }
    // setIsShown((current) => !current);
    // setDisableBtn(true);
    // dispatch(loadingToggleAction(true));
    // dispatch(loginAction(email, props.history));
    // history.push("/login"); //change navigation
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };
  
  const handleOtp=(e)=>{
    console.log("inside handleOtp");
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      setOtp(OTP);
      axios
        .post("http://localhost:5000/send_recovery_email", { 
          OTP,
          recipient_email: email,
        }).catch((err) => {
          console.log(err);
        });
    
  }}

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
      otp.length,
      otp.length - 1,
      otp.join("")
    );
    history.push("/page-reset-password"); //change route here redirect to reset page
    // if (otp.length===otp.length-1){
    // console.log("enter password")
    // }
    // alert("Entered OTP is " + otp.join(""))
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
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="hello@example.com"
                          // onBlur={validateEmail}
                          required
                        />
                         {emailError && <span className="text-danger fs-14 m-2">{emailError}</span>}
                        {/* {email && <div id="checkinputemail" className=''></div>} */}
                      </div>
                      <div className="text-center mt-2">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          disabled={disableBtn}
                          // style={{disableBtn ?<> cursor: 'not-allowed'</> : cursor: 'pointer'}}
                        >
                          SUBMIT
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


export default ForgotPassword
