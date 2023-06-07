import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import PageTitle from "../../layouts/PageTitle";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import profile from "../../../images/profile/coursessss.jpg";
import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Button,
  Nav,
  Modal,
  Table,
  Image,
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

const certificate = [
  { value: "certificate1", label: "Certificate 1" },
  { value: "certificate2", label: "Certificate 2" },
  { value: "certificate3", label: "Certificate 3" },
  { value: "certificate4", label: "Certificate 4" },
];
const level = [
  { value: "level1", label: "Level 1" },
  { value: "level2", label: "Level 2" },
  { value: "level3", label: "Level 3" },
  { value: "level4", label: "Level 4" },
];
const category = [
  { value: "ParentCategory1", label: "Parent Category 1" },
  { value: "ParentCategory2", label: "Parent Category 2" },
  { value: "ParentCategory3", label: "Parent Category 3" },
  { value: "ParentCategory4", label: "Parent Category 4" },
];
const AddCourses = () => {
  const [id, setId] = useState('');
  const [largeModal, setLargeModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState([]);
  // const [selectedOption, setSelectedOption] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [categories, setCategory] = useState(null);
  const [coursename, setCoursename] = useState('');
  const [coursecode, setCoursecode] = useState();
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [price, setPrice] = useState('');
  const [courselink, setCourselink] = useState('');
  const [coursevideo, setCoursevideo] = useState([]);
  const [capacity, setCapacity] = useState('');
  const [startdate, setStartdate] = useState('');
  const [enddate, setEnddate] = useState('');
  const [timelimit, setTimelimit] = useState('');
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
      const data = {id, coursename, file, description, isActive,coursecode, price, courselink, coursevideo, capacity, startdate, enddate, timelimit};

      fetch('http://localhost:8000/courses', {
        method: 'POST',
      })
      .then((data) => {
        console.log('new course added')
        alert("✔️ Course Added Successfully");
        setCourses(data);
      })
        .catch((err) => {
          console.log(err);
        });
      }
      
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
}
function HandleChange(e) {
  console.log(e.target.files);
  setCoursevideo(URL.createObjectURL(e.target.files[0]));
}

const fetchCategory = () => {
  fetch(`http://localhost:8000/categories`)
        .then((res) => res.json())
        .then((data) => {
           console.log(data);
           setCategory(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    
useEffect(() => {
    fetchCategory();
}, []);
const [selected, setSelected] = useState("");

const Handlechange = (event) => {
  setSelected(event.target.value);
};
const chackbox = document.querySelectorAll(".bs_exam_topper input");
const motherChackBox = document.querySelector(".bs_exam_topper_all input");
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
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/dashboard">Dashboard</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/course_users">Users</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/course_groups">Groups</Link>
        </Nav.Item>
      </Nav>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Course Form </h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
              <form action="http://localhost:8000/courses" method="post" encType="multipart/form-data" >
                  <div className="row">
                    
                  <div className="col-xl-12">
                    <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          id
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="id"
                            name="id"
                            placeholder="e.g. 1"
                            onChange={(e) => setId(e.target.value)}
                          />
                        </div>
                      </div> 
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          Course Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="coursename"
                            name="coursename"
                            placeholder="e.g. React-Redux"
                            onChange={(e) => setCoursename(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-xl-12 col-form-label"
                          htmlFor="val-suggestions"
                        >
                          Add Photo<span className="text-danger">*</span>
                        </label>
                        <div className="profile-info">
                          <div className="profile-photo">
                          <input type="file" name="file" accept='.jpeg, .png, .jpg' onChange={handleChange}/>
                          <br/><br/> 
                          <img src={file} width="250" height="250" alt="file" objectFit="cover" />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-suggestions"
                        >
                          Description <span className="text-danger">*</span>
                        </label>
                        <div className="col-xl-12">
                          <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            rows="5"
                            placeholder="Brief Description about Course..."
                            onChange={(e) => setDescription(e.target.value)}
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                          <div className="col-lg-4 ms-auto">
                      <br/>
                      <br/>
                        <label
                          className="form-check css-control-primary css-checkbox"
                          htmlFor="val-terms"
                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="isActive"
                            name="isActive"
                            onChange={(e) => setIsActive(e.target.value)}
                          />Active
                          </label>
                        </div>
                          <div className="col-lg-8 ms-auto">
                      <br/>
                      <br/>
                        <label
                          className="form-check css-control-primary css-checkbox"
                          htmlFor="val-terms"
                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="isHide"
                            name="isHide"
                          />Hide from Course Catalog
                          </label>
                      <br/>
                      <br/>
                        </div>
                        </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-email"
                        >
                          Course Code <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="coursecode"
                            name="coursecode"
                            placeholder="Enter the Course Code"
                            onChange={(e) => setCoursecode(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-currency"
                        >
                          Price
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="price"
                            name="price"
                            placeholder="$21.60"
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                      </div>
                      <label>Course Intro Video</label>
                  <div className="input-group mb-3  input-success">
                  </div> 
                      <span className="input-group-text">
                        Use Your Intro Video Link
                      </span>
                      <input type="text" className="form-control" placeholder=" http://youtube.com" id="courselink" name="courselink" 
                      onChange={(e) => setCourselink(e.target.value)}/>
                  </div>
                  <div className="mb-5">
                    <label htmlFor="formFileLg" className="form-label">Use Your Intro Video</label>
                    <input className="form-control form-control-lg" id="coursevideo" type="file" name="coursevideo"
                            accept='.jpeg, .png, .jpg, .mp4, .mkv' onChange={HandleChange}/>
                              <input type="file" id="myFile" name="filename"/>
                  </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-confirm-password"
                        >
                          Capacity{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="capacity"
                            name="capacity"
                            placeholder="Unlimited"
                            onChange={(e) => setCapacity(e.target.value)}
                          />
                        </div>
                      </div>


                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-currency"
                        >
                          Set Course Duration
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-3 mb-3">
                          <div className="example rangeDatePicker">
                            <p className="mb-1">Course StartDate</p>
                            {/* <DateRangePicker
                              startText="Start"
                              endText="End"
                              startPlaceholder="Start Date"
                              endPlaceholder="End Date"
                            />   */}

                            <input
                            type="text"
                            className="form-control"
                            id="startdate"
                            name="startdate"
                            placeholder="1/1/2023"
                            onChange={(e) => setStartdate(e.target.value)}/>
                            </div>
                          </div>
                            <div className="col-lg-3 mb-3">
                              <div className="example rangeDatePicker">
                            <p className="mb-1">Course EndDate</p>
                            <input
                            type="text"
                            className="form-control"
                            id="enddate"
                            name="enddate"
                            placeholder="31/2/2023"
                            onChange={(e) => setEnddate(e.target.value)}/>
                            </div>
                          </div>
                          <div className="row mb-0">
                          <div className="col-lg-5">
                          </div>
                            <div className="col-md-4">
                            <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OR</strong>
                          </div>
                          </div>
                          <div className="row mt-0">
                          <div className="col-lg-5">&nbsp;&nbsp;</div>
                            <div className="col-md-4 mb-5">
                              <div className="example rangeDatePicker">
                            <br/>
                            <br/>Enter Total Days of Course
                            <input
                            type="text"
                            className="form-control"
                            id="timelimit"
                            name="timelimit"
                            placeholder="30 Days or 2 Months"
                            onChange={(e) => setTimelimit(e.target.value)}/>
                              </div>
                          </div>
                      </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-website"
                        >
                          Certificate
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <Select
                          defaultValue={certificate}
                          onChange={certificate}
                          options={certificate}
                          name="certificate"
                        >
                        </Select>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-website"
                        >
                          Level
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <Select
                          defaultValue={level}
                          onChange={level}
                          options={level}
                          name="level"
                        >
                        </Select>
                        </div>
                      </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-website"
                        >
                          Category
                          <span className="text-danger">*</span>
                        </label>&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="col-lg-6">
                        <Select
                          defaultValue={category}
                          onChange={category}
                          options={category}
                          name="category"
                        >
                        </Select>
                        {/* <Select
                          value={categories}
                          onChange={Handlechange}
                          name="categories"
                        >
                        {categories?.map((categories, index) => {
                      return (
                          <option key={categories.name} value={categories.name}>
                              {categories.id}
                          </option>
                          )})
                          }
                        </Select> */}
                        {/* <select
                          disabled={false}
                          value={category}
                          name="category"
                          onChange={(e) => setCategory(e.currentTarget.value)}
                        >
                          {!category ? (
                            <>Loading data...</>
                          ) : category.length === 0 ? (
                            <>No data found</>
                          ) : (
                            category?.map(({ label, value }) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            ))
                          )}
                        </select>; */}
                        </div>
                      </div>
                    </div>
                      <br/>
                      
                      <br/>

                      <div className="form-group mb-3 row">
                        <div className="col-lg-3 ">
                      <button
                        type="submit"
                        className="btn me-2 btn-primary"
                      >
                        Save
                      </button> or &nbsp;&nbsp;
                      <Button onClick={() => history.goBack()} className="btn btn-light">Cancel</Button></div>
                        <div className="col-lg-5 ms-auto">
                        <DropdownButton
                          as={ButtonGroup}
                          id="dropdown-button-drop-up"
                          drop="up"
                          variant="primary"
                          title="ADD"
                          className="me-1 mt-1"
                        >
                          <Dropdown.Item href="/content"><i class="bi bi-back"> &nbsp;</i>Content</Dropdown.Item>
                          <Dropdown.Item href="/webcontent"><i class="bi bi-cloud"> &nbsp;</i>Web Content</Dropdown.Item>
                          <Dropdown.Item href="/video"><i class="bi bi-play-circle"> &nbsp;</i>Video</Dropdown.Item>
                          <Dropdown.Item href="/audio"><i class="bi bi-file-music"> &nbsp;</i>Audio</Dropdown.Item>
                          <Dropdown.Item href="/presentation"><i class="bi bi-file-slides"> &nbsp;</i>Presentation | Documents</Dropdown.Item>
                          <Dropdown.Item href="/scorm"><i class="bi bi-command"> &nbsp;</i>SCORM | xAPI | cmi5</Dropdown.Item>
                          <Dropdown.Item href="/iframe"><i class="bi bi-code-slash"> &nbsp;</i>iFrame</Dropdown.Item>
                          <Dropdown.Item href="/test-question"><i class="bi bi-journal-check"> &nbsp;</i>Test</Dropdown.Item>
                          <Dropdown.Item href="/survey-question"><i class="bi bi-check2-square"> &nbsp;</i>Survey</Dropdown.Item>
                          <Dropdown.Item href="/assignment"><i class="bi bi-clipboard"> &nbsp;</i>Assignment</Dropdown.Item>
                          <Dropdown.Item href="/instructor-led"><i class="bi bi-calendar4-week"> &nbsp;</i>Instructor-led training</Dropdown.Item>
                          <Dropdown.Item href="#"><i class="bi bi-tropical-storm"> &nbsp;</i>Section</Dropdown.Item>
                          <Dropdown.Item href="#"><i class="bi bi-vr"> &nbsp;</i>Clone from another course</Dropdown.Item>
                          <Dropdown.Item href="#"><i class="bi bi-link"> &nbsp;</i>Link from another course</Dropdown.Item>
                        </DropdownButton>
                        <button type="submit" className="btn btn-primary me-1 col-lg-5 ms-auto">
                          View as Learner
                        </button>
                        <DropdownButton
                          as={ButtonGroup}
                          id="dropdown-button-drop-up"
                          drop="up"
                          variant="primary"
                          title="..."
                          className="me-1 mt-1"
                        >
                          <Dropdown.Item href="message_users"><i class="bi bi-chat-right-text"> &nbsp;</i>Message Users</Dropdown.Item>
                          <Dropdown.Item href="ad_event"><i class="bi bi-calendar4-week"> &nbsp;</i>Add Event</Dropdown.Item>
                          <Dropdown.Item href="#"><i class="bi bi-cloud-snow-fill"> &nbsp;</i>Make Course Public</Dropdown.Item>
                          <Dropdown.Item href="#"><i class="bi bi-lock"> &nbsp;</i>Lock Course Content</Dropdown.Item>
                          <Dropdown.Item 
                  variant="primary"
                  className="mb-2 me-2"
                  onClick={() => setLargeModal(true)}><i class="bi bi-tablet"> &nbsp;</i>
                  Mobile App Compatibility
                </Dropdown.Item>
                <Modal
                  className="fade bd-example-modal-lg"
                  show={largeModal}
                  size="lg"
                >
                  <Modal.Header>
                    <Modal.Title>Modal App Compatibility</Modal.Title>
                    <Button
                      variant=""
                      className="btn-close"
                      onClick={() => setLargeModal(false)}
                    >
                      
                    </Button>
                  </Modal.Header>
                  <Modal.Body>
                  <Table responsive>
                <thead>
                  <tr>
                    <th className="width80">
                      Unit Name
                    </th>
                    <th>
                      Mobile App Compatible
                    </th>
                    <th>
                      Offline Compatible
                    </th>
                    <th>
                      Render as web page
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      How to create Instructor-led Training
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
                    <td>
                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                    <div className="col-xl-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheckBox2"
                          required=""
                          onClick={() => chackboxFun()}
                        />
                      </div>
                      </div>
                    </td>
                    
                  </tr>
                  <tr>
                    <td>
                      How to create Instructor-led Training
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
                    <td>
                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                    <div className="col-xl-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheckBox2"
                          required=""
                          onClick={() => chackboxFun()}
                        />
                      </div>
                      </div>
                    </td>
                    
                  </tr>
                  <tr>
                    <td>
                      How to create Instructor-led Training
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
                    <td>
                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                    <div className="col-xl-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheckBox2"
                          required=""
                          onClick={() => chackboxFun()}
                        />
                      </div>
                      </div>
                    </td>
                    
                  </tr>
                  <tr>
                    <td>
                      How to create Instructor-led Training
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
                    <td>
                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                    <div className="col-xl-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheckBox2"
                          required=""
                          onClick={() => chackboxFun()}
                        />
                      </div>
                      </div>
                    </td>
                    
                  </tr>
                  <tr>
                    <td>
                      How to create Instructor-led Training
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
                    <td>
                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                    <div className="col-xl-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheckBox2"
                          required=""
                          onClick={() => chackboxFun()}
                        />
                      </div>
                      </div>
                    </td>
                    
                  </tr>
                  <tr>
                    <td>
                      How to create Instructor-led Training
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
                    <td>
                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                    <div className="col-xl-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheckBox2"
                          required=""
                          onClick={() => chackboxFun()}
                        />
                      </div>
                      </div>
                    </td>
                    
                  </tr>
                  <tr>
                    <td>
                      How to create Instructor-led Training
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
                    <td>
                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                    <div className="col-xl-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheckBox2"
                          required=""
                          onClick={() => chackboxFun()}
                        />
                      </div>
                      </div>
                    </td>
                    
                  </tr>
                  <tr>
                    <td>
                      How to create Instructor-led Training
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
                    <td>
                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                    <div className="col-xl-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheckBox2"
                          required=""
                          onClick={() => chackboxFun()}
                        />
                      </div>
                      </div>
                    </td>
                    
                  </tr>
                  <tr>
                    <td>
                      How to create Instructor-led Training
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
                    <td>
                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                    <div className="col-xl-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheckBox2"
                          required=""
                          onClick={() => chackboxFun()}
                        />
                      </div>
                      </div>
                    </td>
                    
                  </tr>
                  <tr>
                    <td>
                      How to create Instructor-led Training
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️</td>
                    <td>
                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                    <div className="col-xl-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheckBox2"
                          required=""
                          onClick={() => chackboxFun()}
                        />
                      </div>
                      </div>
                    </td>
                    
                  </tr>
                </tbody>
              </Table>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="danger light"
                      onClick={() => setLargeModal(false)}
                    >
                      Close
                    </Button>
                    <Button
                      variant=""
                      type="button"
                      className="btn btn-primary"
                    >
                      Save changes
                    </Button>
                  </Modal.Footer>
                </Modal>
                </DropdownButton>
                      </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddCourses;
