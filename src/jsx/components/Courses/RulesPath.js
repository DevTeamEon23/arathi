import React, { Fragment, useState } from "react";
import { Link, useHistory  } from "react-router-dom";
import Select from "react-select";
import { Formik } from "formik";
import * as Yup from "yup";
import TimePickerPicker from 'react-time-picker';
import profile from "../../../images/profile/profile.png";
import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Nav,
  Tab,
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

const RulesPath = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState();
  const [value, onChange] = useState(new Date());
  const [file, setFile] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
const chackbox = document.querySelectorAll(".bs_exam_topper input");
const motherChackBox = document.querySelector(".bs_exam_topper_all input");
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
}
function handleSelect(data) {
  setSelectedOptions(data);
}
const options = [
  { value: "sequence", label: "In a sequential order" },
  { value: "any", label: "In any order" },
];
const options_1 = [
  { value: "all", label: "All units are completed" },
  { value: "percentage", label: "A percentage of units is completed" },
];
const options_2 = [
  { value: "all_tests", label: "All tests & assignments" },
  { value: "test_only", label: "Tests only" },
  { value: "choose", label: "Units | choose " },
];
const optionList = [
  { value: "employee", label: "Employee Training (003)" },
  { value: "started", label: "Tests only" },
  { value: "choose", label: "Units | choose " },
];
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

let history = useHistory();
  return (
    <Fragment>
      <Nav >
				<Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/dashboard">Dashboard</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/edit-courses">Courses</Link>
        </Nav.Item>
      </Nav>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">SHOW UNITS</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form
                  className="form-valide"
                  action="#"
                  method="post"
                  onSubmit={(e) => e.preventDefault()}
                >
                    <div className="form-group mb-3 row">
                    <div className="col-lg-6">
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                        >
                        </Select>
                      </div>
                  </div>            
                  <div className="card-header">
                  </div>
                  <div className="card-header">
                    <h4 className="card-title">COURSE IS COMPLETED WHEN</h4>
                  </div>
                  <div className="form-group mb-3 row">
                    <div className="col-lg-6">
                      <br/>
                      <br/>
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                        >
                        </Select>
                      </div>
                  </div>
                  <div className="card-header">
                  </div>
                  <div className="card-header">
                    <h4 className="card-title">CALCULATE SCORE BY AVERAGE OF</h4>
                  </div>
                  <div className="form-group mb-3 row">
                    <div className="col-lg-6">
                      <br/>
                      <br/>
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                        >
                        </Select>
                      </div>
                  </div>
                  <div className="card-header">
                  </div>
                  <div className="card-header">
                    <h4 className="card-title">LEARNING PATH</h4>
                  </div>
                  <div className="form-group mb-3 row">
                    <div className="col-lg-6">
                      <br/>
                      <br/>
                    <Select
                      options={optionList}
                      placeholder="Select color"
                      value={selectedOptions}
                      onChange={handleSelect}
                      isSearchable={true}
                      isMulti
                    />
                      </div>
                  </div>
                  <div className="form-group mb-3 row">
                    <div className="col-lg-6 mt-5">
                  <Button
                        type="submit"
                        className="btn me-3 btn-primary"
                      >
                        Save
                      </Button>or &nbsp;&nbsp;
                      <Button onClick={() => history.goBack()} className="btn btn-light">Cancel</Button>
                      </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-11 mt-5">
                    </div>
                    <div className="col-lg-1 mt-5">
                    <h3><Link><i class="bi bi-save"></i></Link></h3>
                    </div></div>
              </form>
          </div>
          </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RulesPath;
