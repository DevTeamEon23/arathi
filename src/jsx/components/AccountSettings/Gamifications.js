import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { ToggleSlider }  from "react-toggle-slider";
import { useToggleSlider } from "react-toggle-slider"
import Nouislider from "nouislider-react";
// import "nouislider/distribute/nouislider.css";

import NouiColorPicker from "../PluginsMenu/NouiSlider/NouiColor";

import Toggle from "../PluginsMenu/NouiSlider/Toggle";
import { Formik } from "formik";
import * as Yup from "yup";
import TimePickerPicker from 'react-time-picker';
import profile from "../../../images/profile/profile.png";
import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Nav,
  Button,
} from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Your username must consist of at least 3 characters ")
    .max(50, "Your username must consist of at least 3 characters ")
    .required("Please enter a username"),
  password: Yup.string()
    .min(5, "Your password must be at least 5 characters long")
    .max(50, "Your password must be at least 5 characters long")
    .required("Please provide a password"),
});

const Gamification = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, onChange] = useState(new Date());
  const [checked, setChecked] = useState(false)
  const [active, setActive] = useState(false);
  const chackbox = document.querySelectorAll(".bs_exam_topper input");
  const motherChackBox = document.querySelector(".bs_exam_topper_all input");
  const toggleCheckboxes = () => {
    setChecked(prevState => !prevState)
}
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };

  return (
    <Fragment>
      <Nav >
				<Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/basic-settings">Basic Settings</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/user-settings">Users</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/thoms-page">Themes</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/certificates">Certificates</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/gamification">Gamification</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/ecommerce">E-commerce</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/domains">Domain</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/subscriptions">Subscription</Link>
        </Nav.Item>
      </Nav>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
          <div className="card-header">
              <label className="card-title ms-auto">Gamification&nbsp;&nbsp;</label><ToggleSlider onToggle={state => setActive(state)}/>
              &nbsp;&nbsp;
              
                </div>
          <div className="card">
          <div className="card-header">
              <h4 className="card-title">POINTS<ToggleSlider onToggle={state => setActive(state)}/></h4>
              &nbsp;&nbsp;
              
                </div>
              <br/>
              <br/>
              <form
                  className="form-valide"
                  action="#"
                  method="post"
                  onSubmit={(e) => e.preventDefault()}
                >
                <div className="row">
                <div className="col-lg-1">
                </div>
                <div className="col-lg-8">
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input 
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun(toggleCheckboxes)}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Each login gives</label>&nbsp;&nbsp;
                  <input type="text" className="col-lg-1" placeholder="    25" ></input>&nbsp;
                  <input type="text" className="col-lg-1" placeholder=" Points" ></input>   
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Each unit completion gives</label>&nbsp;&nbsp;
                  <input type="text" className="col-lg-1" placeholder="    25" ></input>&nbsp;
                  <input type="text" className="col-lg-1" placeholder=" Points" ></input>   
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Each course completion gives</label>&nbsp;&nbsp;
                  <input type="text" className="col-lg-1" placeholder="   150" ></input>&nbsp;
                  <input type="text" className="col-lg-1" placeholder=" Points" ></input>   
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Each certificate gives</label>&nbsp;&nbsp;
                  <input type="text" className="col-lg-1" placeholder="   150" ></input>&nbsp;
                  <input type="text" className="col-lg-1" placeholder=" Points" ></input>   
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Each successful test completion gives</label>&nbsp;&nbsp;
                  <input type="text" className="col-lg-1" placeholder="    1" ></input>&nbsp;
                  <input type="text" className="col-lg-1" placeholder=" Points" ></input>   
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Each successful assignmnet completion gives</label>&nbsp;&nbsp;
                  <input type="text" className="col-lg-1" placeholder="    1" ></input>&nbsp;
                  <input type="text" className="col-lg-1" placeholder=" Points" ></input>   
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Each successful ILT completion gives</label>&nbsp;&nbsp;
                  <input type="text" className="col-lg-1" placeholder="    1" ></input>&nbsp;
                  <input type="text" className="col-lg-1" placeholder=" Points" ></input>   
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Each discussion topic or comment gives</label>&nbsp;&nbsp;
                  <input type="text" className="col-lg-1" placeholder="    25" ></input>&nbsp;
                  <input type="text" className="col-lg-1" placeholder=" Points" ></input>   
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Each upvote on discussion comments gives</label>&nbsp;&nbsp;
                  <input type="text" className="col-lg-1" placeholder="    10" ></input>&nbsp;
                  <input type="text" className="col-lg-1" placeholder=" Points" ></input>   
                </div>
              </div>
          <div className="card-header">
            </div>
              <div className="card-header">
              <h4 className="card-title">BADGES<ToggleSlider onToggle={state => setActive(state)}/></h4>
              &nbsp;&nbsp;
              </div>
              <br/>
              <br/>
                <div className="row">
                <div className="col-lg-1">
                </div>
                <div className="col-lg-8">
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  
                <br/>
                <br/>    
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Activity badges (4, 8, 16, 32, 64, 128, 256, 512 logins)</label>  
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Learning badges (1, 2, 4, 8, 16, 32, 64, 128 completed courses)</label> 
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Test badges (2, 4, 8, 16, 32, 64, 128, 256 passed tests)</label>  
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Assignment badges (1, 2, 4, 8, 16, 32, 64, 128 passed assignments)</label>  
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Perfectionism badges (1, 2, 4, 8, 16, 32, 64, 128 tests or assignments with score 90%+)</label>  
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Survey badges (1, 2, 4, 8, 16, 32, 64, 128 completed surveys)</label>   
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Communication badges (2, 4, 8, 16, 32, 64, 128, 256 topics or comments)</label> 
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Certification badges (1, 2, 4, 8, 16, 32, 64, 128 certificates)</label>  
                </div>
                  </div>
                </div>
                </div>
          <div className="card-header">
            </div>
          <div className="card-header">
              <h4 className="card-title">LEVELS<ToggleSlider onToggle={state => setActive(state)}/></h4>
              &nbsp;&nbsp;
                </div>
                <br/>
                <br/>                
                <div className="row">
                <div className="col-lg-1">
                </div>
                <div className="col-lg-8">
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun(toggleCheckboxes)}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Upgrade level every</label>&nbsp;&nbsp;
                  <input type="text" className="col-lg-1" placeholder="  3000" ></input>&nbsp;
                  <input type="text" className="col-lg-2" placeholder="   Points" ></input>   
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Upgrade level every</label>&nbsp;&nbsp;
                  <input type="text" className="col-lg-1" placeholder="     5" ></input>&nbsp;
                  <input type="text" className="col-lg-3" placeholder=" completed courses" ></input>   
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Upgrade level every</label>&nbsp;&nbsp;
                  <input type="text" className="col-lg-1" placeholder="    5" ></input>&nbsp;
                  <input type="text" className="col-lg-2" placeholder="    Badges" ></input>   
                </div>
                </div>
                <div className="card-header">
            </div>
          <div className="card-header">
              <h4 className="card-title">REWARDS<ToggleSlider onToggle={state => setActive(state)}/></h4>
              &nbsp;&nbsp;
                </div>
                <br/>
                <br/>                
                <div className="row">
                <div className="col-lg-1">
                </div>
                <div className="col-lg-10">
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  
                <br/>
                <br/>           
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun(toggleCheckboxes)}
                  />&nbsp;&nbsp;
                  <input type="text" className="col-lg-2" placeholder="" ></input>&nbsp;
                  <input type="text" className="col-lg-1" placeholder="%" ></input> 
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >discount for course purchases with more than </label>&nbsp;&nbsp;
                  <input type="text" className="col-lg-1" placeholder="  " ></input>&nbsp;
                  <input type="text" className="col-lg-2" placeholder="           Points" ></input>   
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <input type="text" className="col-lg-2" placeholder="" ></input>&nbsp;
                  <input type="text" className="col-lg-1" placeholder="%" ></input> 
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >discount for course purchases with more than </label>&nbsp;&nbsp;
                  <input type="text" className="col-lg-1" placeholder="     " ></input>&nbsp;
                  <input type="text" className="col-lg-2" placeholder="          Badges" ></input>   
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <input type="text" className="col-lg-2" placeholder="" ></input>&nbsp;
                  <input type="text" className="col-lg-1" placeholder="%" ></input> 
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >discount for course purchases with more than  </label>&nbsp;&nbsp;
                  <input type="text" className="col-lg-1" placeholder="    " ></input>&nbsp;
                  <input type="text" className="col-lg-2" placeholder="         Upwards" ></input>   
                </div>
                </div>
                <div className="card-header">
            </div>
          <div className="card-header">
              <h4 className="card-title">LEADERBOARD<ToggleSlider onToggle={state => setActive(state)}/></h4>
              &nbsp;&nbsp;
                </div>
                <br/>
                <br/>                
                <div className="row">
                <div className="col-lg-1">
                </div>
                <div className="col-lg-8">
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  
                <br/>
                <br/>           
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun(toggleCheckboxes)}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Show levels</label>   
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Show Badges</label>  
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Show Courses</label>  
                </div>
                <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox2"
                    required=""
                    onClick={() => chackboxFun()}
                  />&nbsp;&nbsp;
                  <label
                    className="form-check-label"
                    htmlFor="customCheckBox2"
                  >Show Certificates</label>  
                </div>
                </div>
                <div className="col-lg-12 mb-5">
                    <br/>
                    <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                    type="submit"
                    className="btn btn-primary col-lg-2"
                  >Save and select users  
                </Button>&nbsp;&nbsp; or &nbsp;&nbsp;
                <Button
                    type="submit"
                    className="btn me-2 btn-primary col-xl-2"
                  >
                  Cancel
                </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                    type="submit"
                    className="btn me-2 btn-primary col-lg-3"
                  >
                  Reset to default settings
                </Button> &nbsp;&nbsp;
                <Button
                    type="submit"
                    className="btn me-2 btn-primary col-xl-2"
                  >
                  Reset Statistics  
                </Button> &nbsp;&nbsp;
              </div>
                </div>
                </div>
                </div>
                </form>
                </div>
            </div>
        </div>
              </div>
    </Fragment>
  );
};

export default Gamification;
