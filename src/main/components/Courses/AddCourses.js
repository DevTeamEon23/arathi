import React, { Fragment, useState, useEffect,useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Select from 'react-select'
import * as Yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Button,
  Nav,
  Modal,
  Table,
  Image,
} from 'react-bootstrap'
import DateRangePicker from 'react-bootstrap-daterangepicker'

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Your username must consist of at least 3 characters ')
    .max(50, 'Your username must consist of at least 3 characters ')
    .required('Please enter a username'),
  password: Yup.string()
    .min(5, 'Your password must be at least 5 characters long')
    .max(50, 'Your password must be at least 5 characters long')
    .required('Please provide a password'),
})

const certificate = [
  { value: 'certificate1', label: 'Certificate 1' },
  { value: 'certificate2', label: 'Certificate 2' },
  { value: 'certificate3', label: 'Certificate 3' },
  { value: 'certificate4', label: 'Certificate 4' },
]
const level = [
  { value: 'level1', label: 'Level 1' },
  { value: 'level2', label: 'Level 2' },
  { value: 'level3', label: 'Level 3' },
  { value: 'level4', label: 'Level 4' },
]
const category = [
  { value: 'ParentCategory1', label: 'Parent Category 1' },
  { value: 'ParentCategory2', label: 'Parent Category 2' },
  { value: 'ParentCategory3', label: 'Parent Category 3' },
  { value: 'ParentCategory4', label: 'Parent Category 4' },
]
const AddCourses = () => {
  const [largeModal, setLargeModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [file, setFile] = useState(null)//image
  const fileRef = useRef(null);
  const [selectedOptionCertificate, setSelectedOptionCertificate] = useState(null);//Certificate 
  const [selectedOptionLevel, setSelectedOptionLevel] = useState(null); // Level
  const [selectedValue, setSelectedValue] = useState(null)
  const [categories, setCategory] = useState(null)
  const [coursename, setCoursename] = useState('')
  const [coursecode, setCoursecode] = useState()
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [isHide, setIsHide] = useState(false)
  const [price, setPrice] = useState('')
  const [courselink, setCourselink] = useState('')//to save youtube link
  const [isValidLink, setIsValidLink] = useState(true);
  const [coursevideo, setCoursevideo] = useState(null)//to save video link
  const fileInputRef = useRef(null);
  const [capacity, setCapacity] = useState('')
  const [startdate, setStartdate] = useState('')//Course StartDate
  const [enddate, setEnddate] = useState('')//Course EndDate
  const [timelimit, setTimelimit] = useState(null)//in future should be remove
  const [selected, setSelected] = useState('')
  const [data, setData] = useState([])
  const [courses, setCourses] = useState([])
  const [token, setToken] = useState() //auth token
  const [getAllCategoriesData, setGetAllCategoriesData] = useState({}) //save all categories data
  let history = useHistory()
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    let accessToken = window.localStorage.getItem('jwt_access_token')
    setToken(accessToken)
    getAllCategories()
    console.log(getAllCategoriesData)
  }, [])

  // All Categories List
  const getAllCategories = async () => {
    const jwtToken = window.localStorage.getItem('jwt_access_token')
    const url = 'http://127.0.0.1:8000/lms-service/categories'
    try {
      const response = await axios.get(url, {
        headers: {
          'Auth-Token': jwtToken,
        },
      })
      console.log('getAllCategories', response.data.data)

      const expectedOutput = response?.data?.data.map(({ name }) => ({
        value: name,
        label: name,
      }))
      setGetAllCategoriesData(expectedOutput)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to fetch Categories !') // Handle the error
    }
  }

  const handleSelectChange = (event) => {
    console.log('inside onchange')
    const selectedName = event.target.value
    // Do something with the selectedName
    console.log(selectedName)
  }

  //video file change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedVideo(file);
    } else {
      setSelectedVideo(null);
      alert("Please select a valid video file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('coursename',coursename)
    formData.append('file',file)
    formData.append('description',description)
    formData.append('coursecode',coursecode)
    formData.append('price',price)
    formData.append('courselink',courselink)
    formData.append('coursevideo',coursevideo === null?"null":coursevideo)
    formData.append('capacity',capacity)
    formData.append('startdate',startdate)
    formData.append('enddate',enddate)
    formData.append('timelimit',timelimit)
    formData.append('certificate',selectedOptionCertificate.value)
    formData.append('level',selectedOptionLevel.value)
    formData.append('category',"Web Development")
    formData.append('isActive',isActive)
    formData.append('isHide',isHide)
    formData.append('generate_token', true)

    console.log(formData,"<formData")
    const url = 'http://127.0.0.1:8000/lms-service/addcourses'
    const authToken = window.localStorage.getItem('jwt_access_token')
    axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Auth-Token': authToken,
        },
      })
      .then((response) => {
        console.log(response.data)
        toast.success('Course added successfully!!!')
        clearAllState()
      })
      .catch((error) => {
        console.error(error)
        toast.error('Failed !!! Unable to add course...')
      })
  }

  const clearAllState = () => {
    fileInputRef.current.value = "";
    setFile(null);
    fileRef.current.value = "";
    setSelectedOptionCertificate(null)
    setSelectedOptionLevel(null)
  }

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && isValidFileType(selectedFile)) {
      setFile(selectedFile);
    } else {
      setFile(null);
      toast.error("Please select a valid image file (jpeg, jpg, png).");
    }
  };

  const isValidFileType = (file) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  // function HandleChange(e) {
  //   console.log(e.target.files)
  //   setCoursevideo(URL.createObjectURL(e.target.files[0]))
  // }

  const Handlechange = (event) => {
    setSelected(event.target.value)
  }

  const HandleChange1=(e)=>{
    // const selectedFile = e.target.files[0];
    // setCoursevideo(selectedFile);
    // setCoursevideo(URL.createObjectURL(e.target.files[0]))
    const input = e.target;
    if (input.files && input.files[0]) {
      // The user has selected a video file
      const file = input.files[0];
      setCoursevideo(URL.createObjectURL(file));
      setCourselink(''); // Reset the link state to empty, in case it was previously set
    } else {
      // The user has provided a YouTube link or empty input
      setCoursevideo(''); // Reset the video state to empty, in case it was previously set
      setCourselink(input.value.trim());
    }
  }

  console.log(selectedVideo,"video",courselink,getAllCategoriesData);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setCourselink(value);
    validateYouTubeLink(value);
  };

  const validateYouTubeLink = (link) => {
    // Regular expression to check for valid YouTube links
    const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
    setIsValidLink(youtubeRegex.test(link));
  };

  const chackbox = document.querySelectorAll('.bs_exam_topper input')
  const motherChackBox = document.querySelector('.bs_exam_topper_all input')
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i]
      if (type === 'all') {
        if (motherChackBox.checked) {
          element.checked = true
        } else {
          element.checked = false
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false
          break
        } else {
          motherChackBox.checked = true
        }
      }
    }
  }

  return (
    <Fragment>
      <Nav>
        <Nav.Item as='div' className='nav nav-tabs' id='nav-tab' role='tablist'>
          <Link
            as='button'
            className='nav-link  nt-unseen'
            id='nav-following-tab'
            eventkey='Follow'
            type='button'
            to='/dashboard'
          >
            Dashboard
          </Link>
          <Link
            as='button'
            className='nav-link  nt-unseen'
            id='nav-following-tab'
            eventkey='Follow'
            type='button'
            to='/course_users'
          >
            Users
          </Link>
          <Link
            as='button'
            className='nav-link  nt-unseen'
            id='nav-following-tab'
            eventkey='Follow'
            type='button'
            to='/course_groups'
          >
            Groups
          </Link>
        </Nav.Item>
      </Nav>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Add Course Form </h4>
            </div>
            <div className='card-body'>
              <div className='form-validation'>
                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-xl-8'>
                    <div>
      <input
        type="file"
        accept=".mp4, .mkv"
        onChange={handleFileChange}
      />
      {selectedVideo && (
        <video controls>
          <source src={URL.createObjectURL(selectedVideo)} type={selectedVideo.type} />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='val-username'
                        >
                          Course Name
                          <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-6'>
                          <input
                            type='text'
                            className='form-control'
                            id='coursename'
                            name='coursename'
                            value={coursename}
                            placeholder='e.g. React-Redux'
                            onChange={(e) => setCoursename(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className='form-group mb-3 row'>
                      <label
                        className='col-lg-4 col-form-label'
                        htmlFor='val-website'
                      >
                        Category
                        <span className='text-danger'>*</span>
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <div className='col-lg-6'>
                        {/* <Select
                          defaultValue={category}
                          onChange={category}
                          options={category}
                          name='category'
                        ></Select> */}
                        <Select
                          onChange={handleSelectChange}
                          value={getAllCategoriesData}
                          name='categories'
                          options={getAllCategoriesData}
                          placeholder="Select a category"
                        >
                          {/* {getAllCategoriesData.map((categories) => {
                            return options={categories
                          })} */}
                        </Select>
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
                      

                        <div className='form-group mb-3 row'>
                          <label
                            className='col-lg-4 col-form-label'
                            htmlFor='val-suggestions'
                          >
                            Description <span className='text-danger'>*</span>
                          </label>
                          <div className='col-xl-6'>
                            <textarea
                              className='form-control'
                              id='description'
                              name='description'
                              value={description}
                              rows='5'
                              placeholder='Add a course description upto 5000 characters'
                              onChange={(e) => setDescription(e.target.value)}
                              required
                            ></textarea>
                          </div>
                        </div>

                        <div className='form-group mb-3 row'>
                          <div className='col-lg-4 ms-auto'>
                            <br />
                            <label
                              className='form-check css-control-primary css-checkbox'
                              htmlFor='val-terms'
                            >
                              <input
                                type='checkbox'
                                className='form-check-input'
                                id='isActive'
                                name='isActive'
                                value={isActive}
                                onChange={(e) => setIsActive(e.target.value)}
                              />
                              Active
                            </label>
                          </div>
                          <div className='col-lg-4 ms-auto'>
                            <br />
                            <label
                              className='form-check css-control-primary css-checkbox'
                              htmlFor='val-terms'
                            >
                              <input
                                type='checkbox'
                                className='form-check-input'
                                id='isHide'
                                name='isHide'
                                value={isHide}
                                onChange={(e) => setIsHide(e.target.value)}
                              />
                              Hide from Course Catalog
                            </label>
                            <br />
                          </div>
                        </div>

                        <div className='form-group mb-3 row'>
                          <label
                            className='col-lg-4 col-form-label'
                            htmlFor='val-email'
                          >
                            Course Code <span className='text-danger'>*</span>
                          </label>
                          <div className='col-lg-6'>
                            <input
                              type='text'
                              className='form-control'
                              id='coursecode'
                              name='coursecode'
                              placeholder='E.g. 1111'
                              value={coursecode}
                              onChange={(e) => setCoursecode(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className='form-group mb-3 row'>
                          <label
                            className='col-lg-4 col-form-label'
                            htmlFor='val-currency'
                          >
                            Price
                            <span className='text-danger'>*</span>
                          </label>
                          <div className='col-lg-6'>
                            <input
                              type='text'
                              className='form-control'
                              id='price'
                              name='price'
                              placeholder='₹21.60'
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className='form-group mb-3 row'>
                        <label className='col-lg-4 col-form-label'>Course Intro Video <span className='text-danger'>*</span></label>
                        <div className='input-group mb-3 col-lg-6 '>
                        <span className='input-group-text'>
                          Use Youtube Video Link
                        </span>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Paste YouTube link here...'
                          id='courselink'
                          name='courselink'
                          value={courselink}
                          // onChange={handleInputChange}
                          onChange={handleInputChange}
                          // onChange={(e) => setCourselink(e.target.value)}
                        />
                         {!isValidLink && <p style={{ color: "red" }}>Please enter a valid YouTube link.</p>}
                        </div>
                      </div>
                      <div className='form-group mb-3 row '>
                        <label htmlFor='formFileLg' className='col-lg-4 col-form-label'>
                          Use Your Video
                        </label>
                        <div className='input-group mb-3 col-lg-6 '>
                        <input
                          type='file'
                          name='file'
                          accept='.mp4, .mkv'
                          value={coursevideo}
                          onChange={HandleChange1}
                          ref={fileInputRef}
                        />
                        </div>
                      </div>
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='val-confirm-password'
                        >
                          Capacity <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-6'>
                          <input
                            type='text'
                            className='form-control'
                            id='capacity'
                            name='capacity'
                            placeholder='Unlimited'
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='val-currency'
                        >
                          Set Course Duration
                          <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-3 mb-3'>
                          <div className='example rangeDatePicker'>
                            <p className='mb-1'>Course StartDate</p>
                            {/* <DateRangePicker
                              startText="Start"
                              endText="End"
                              startPlaceholder="Start Date"
                              endPlaceholder="End Date"
                            />   */}

                            <input
                              type='date'
                              className='form-control'
                              id='startdate'
                              name='startdate'
                              placeholder='01/01/2023'
                              onChange={(e) => setStartdate(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className='col-lg-3 mb-3'>
                          <div className='example rangeDatePicker'>
                            <p className='mb-1'>Course EndDate</p>
                            <input
                              type='date'
                              className='form-control'
                              id='enddate'
                              name='enddate'
                              placeholder='31/06/2023'
                              onChange={(e) => setEnddate(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* <div className='row mb-0'>
                          <div className='col-lg-5'></div>
                          <div className='col-md-4'>
                            <strong>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OR
                            </strong>
                          </div>
                        </div> */}
                        {/* <div className='row mt-0'>
                          <div className='col-lg-5'>&nbsp;&nbsp;</div>
                          <div className='col-md-4 mb-5'>
                            <div className='example rangeDatePicker'>
                              <br />
                              <br />
                              Enter Total Days of Course
                              <input
                                type='text'
                                className='form-control'
                                id='timelimit'
                                name='timelimit'
                                placeholder='30 Days or 2 Months'
                                onChange={(e) => setTimelimit(e.target.value)}
                              />
                            </div>
                          </div>
                        </div> */}
                      </div>
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='val-website'
                        >
                          Certificate
                          <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-6'>
                          <Select
                            value={selectedOptionCertificate}
                            options={certificate}
                            onChange={(selectedOptionCertificate) =>
                              setSelectedOptionCertificate(selectedOptionCertificate)
                            }
                            
                            name='certificate'
                            required
                          ></Select>
                        </div>
                      </div>
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='val-website'
                        >
                          Level
                          <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-6'>
                          <Select
                            value={selectedOptionLevel}
                            options={level}
                            onChange={(selectedOptionLevel) =>
                              setSelectedOptionLevel(selectedOptionLevel)
                            }
                            name='level'
                            required
                          ></Select>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4">
                    <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-suggestions"
                        >
                          Add Photo<span className="text-danger">*</span>
                        </label>
                        <div className="profile-info col-lg-6">
                          <div className="profile-photo">
                            {file ? (
                              <>
                                {" "}
                                <img
                                  src={file && URL.createObjectURL(file)}
                                  width="250"
                                  height="250"
                                  alt="file"
                                />{" "}
                                <br />
                                <br />
                              </>
                            ) : (
                              ""
                            )}

                            <input
                              type="file"
                              name="file"
                              ref={fileRef}
                              accept=".jpeg, .png, .jpg"
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                        </div>

                    
                  </div>
                  <br />

                  <br />

                  <div className='form-group mb-3 row'>
                    <div className='col-lg-5 ms-auto'>
                      <Button type='submit' className='btn me-2 btn-primary' value="submit">
                        Save
                      </Button>{' '}
                      or &nbsp;&nbsp;
                      <Button
                        onClick={() => history.goBack()}
                        className='btn btn-light'
                      >
                        Cancel
                      </Button>
                    </div>
                    <div className='col-lg-5 ms-auto'>
                      <DropdownButton
                        as={ButtonGroup}
                        id='dropdown-button-drop-up'
                        drop='up'
                        variant='primary'
                        title='ADD'
                        className='me-1 mt-1'
                      >
                        <Dropdown.Item href='/content'>
                          <i class='bi bi-back'> &nbsp;</i>Content
                        </Dropdown.Item>
                        <Dropdown.Item href='/webcontent'>
                          <i class='bi bi-cloud'> &nbsp;</i>Web Content
                        </Dropdown.Item>
                        <Dropdown.Item href='/video'>
                          <i class='bi bi-play-circle'> &nbsp;</i>Video
                        </Dropdown.Item>
                        <Dropdown.Item href='/audio'>
                          <i class='bi bi-file-music'> &nbsp;</i>Audio
                        </Dropdown.Item>
                        <Dropdown.Item href='/presentation'>
                          <i class='bi bi-file-slides'> &nbsp;</i>Presentation |
                          Documents
                        </Dropdown.Item>
                        <Dropdown.Item href='/scorm'>
                          <i class='bi bi-command'> &nbsp;</i>SCORM | xAPI |
                          cmi5
                        </Dropdown.Item>
                        <Dropdown.Item href='/iframe'>
                          <i class='bi bi-code-slash'> &nbsp;</i>iFrame
                        </Dropdown.Item>
                        <Dropdown.Item href='/test-question'>
                          <i class='bi bi-journal-check'> &nbsp;</i>Test
                        </Dropdown.Item>
                        <Dropdown.Item href='/survey-question'>
                          <i class='bi bi-check2-square'> &nbsp;</i>Survey
                        </Dropdown.Item>
                        <Dropdown.Item href='/assignment'>
                          <i class='bi bi-clipboard'> &nbsp;</i>Assignment
                        </Dropdown.Item>
                        <Dropdown.Item href='/instructor-led'>
                          <i class='bi bi-calendar4-week'> &nbsp;</i>
                          Instructor-led training
                        </Dropdown.Item>
                        <Dropdown.Item href='#'>
                          <i class='bi bi-tropical-storm'> &nbsp;</i>Section
                        </Dropdown.Item>
                        <Dropdown.Item href='#'>
                          <i class='bi bi-vr'> &nbsp;</i>Clone from another
                          course
                        </Dropdown.Item>
                        <Dropdown.Item href='#'>
                          <i class='bi bi-link'> &nbsp;</i>Link from another
                          course
                        </Dropdown.Item>
                      </DropdownButton>
                      <button
                        type='submit'
                        className='btn btn-primary me-1 col-lg-5 ms-auto'
                      >
                        View as Learner
                      </button>
                      <DropdownButton
                        as={ButtonGroup}
                        id='dropdown-button-drop-up'
                        drop='up'
                        variant='primary'
                        title='...'
                        className='me-1 mt-1'
                      >
                        <Dropdown.Item href='message_users'>
                          <i class='bi bi-chat-right-text'> &nbsp;</i>Message
                          Users
                        </Dropdown.Item>
                        <Dropdown.Item href='ad_event'>
                          <i class='bi bi-calendar4-week'> &nbsp;</i>Add Event
                        </Dropdown.Item>
                        <Dropdown.Item href='#'>
                          <i class='bi bi-cloud-snow-fill'> &nbsp;</i>Make
                          Course Public
                        </Dropdown.Item>
                        <Dropdown.Item href='#'>
                          <i class='bi bi-lock'> &nbsp;</i>Lock Course Content
                        </Dropdown.Item>
                        <Dropdown.Item
                          variant='primary'
                          className='mb-2 me-2'
                          onClick={() => setLargeModal(true)}
                        >
                          <i class='bi bi-tablet'> &nbsp;</i>
                          Mobile App Compatibility
                        </Dropdown.Item>
                        <Modal
                          className='fade bd-example-modal-lg'
                          show={largeModal}
                          size='lg'
                        >
                          <Modal.Header>
                            <Modal.Title>Modal App Compatibility</Modal.Title>
                            <Button
                              variant=''
                              className='btn-close'
                              onClick={() => setLargeModal(false)}
                            ></Button>
                          </Modal.Header>
                          <Modal.Body>
                            <Table responsive>
                              <thead>
                                <tr>
                                  <th className='width80'>Unit Name</th>
                                  <th>Mobile App Compatible</th>
                                  <th>Offline Compatible</th>
                                  <th>Render as web page</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>How to create Instructor-led Training</td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                  </td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                  </td>
                                  <td>
                                    <div className='form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper'>
                                      <div className='col-xl-1'>
                                        <input
                                          type='checkbox'
                                          className='form-check-input'
                                          id='customCheckBox2'
                                          required=''
                                          onClick={() => chackboxFun()}
                                        />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>How to create Instructor-led Training</td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                  </td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                  </td>
                                  <td>
                                    <div className='form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper'>
                                      <div className='col-xl-1'>
                                        <input
                                          type='checkbox'
                                          className='form-check-input'
                                          id='customCheckBox2'
                                          required=''
                                          onClick={() => chackboxFun()}
                                        />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>How to create Instructor-led Training</td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                  </td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                  </td>
                                  <td>
                                    <div className='form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper'>
                                      <div className='col-xl-1'>
                                        <input
                                          type='checkbox'
                                          className='form-check-input'
                                          id='customCheckBox2'
                                          required=''
                                          onClick={() => chackboxFun()}
                                        />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>How to create Instructor-led Training</td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                  </td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                  </td>
                                  <td>
                                    <div className='form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper'>
                                      <div className='col-xl-1'>
                                        <input
                                          type='checkbox'
                                          className='form-check-input'
                                          id='customCheckBox2'
                                          required=''
                                          onClick={() => chackboxFun()}
                                        />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>How to create Instructor-led Training</td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                  </td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                  </td>
                                  <td>
                                    <div className='form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper'>
                                      <div className='col-xl-1'>
                                        <input
                                          type='checkbox'
                                          className='form-check-input'
                                          id='customCheckBox2'
                                          required=''
                                          onClick={() => chackboxFun()}
                                        />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>How to create Instructor-led Training</td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                  </td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                  </td>
                                  <td>
                                    <div className='form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper'>
                                      <div className='col-xl-1'>
                                        <input
                                          type='checkbox'
                                          className='form-check-input'
                                          id='customCheckBox2'
                                          required=''
                                          onClick={() => chackboxFun()}
                                        />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>How to create Instructor-led Training</td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                  </td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                  </td>
                                  <td>
                                    <div className='form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper'>
                                      <div className='col-xl-1'>
                                        <input
                                          type='checkbox'
                                          className='form-check-input'
                                          id='customCheckBox2'
                                          required=''
                                          onClick={() => chackboxFun()}
                                        />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>How to create Instructor-led Training</td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                  </td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                  </td>
                                  <td>
                                    <div className='form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper'>
                                      <div className='col-xl-1'>
                                        <input
                                          type='checkbox'
                                          className='form-check-input'
                                          id='customCheckBox2'
                                          required=''
                                          onClick={() => chackboxFun()}
                                        />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>How to create Instructor-led Training</td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                  </td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                  </td>
                                  <td>
                                    <div className='form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper'>
                                      <div className='col-xl-1'>
                                        <input
                                          type='checkbox'
                                          className='form-check-input'
                                          id='customCheckBox2'
                                          required=''
                                          onClick={() => chackboxFun()}
                                        />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>How to create Instructor-led Training</td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                  </td>
                                  <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔️
                                  </td>
                                  <td>
                                    <div className='form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper'>
                                      <div className='col-xl-1'>
                                        <input
                                          type='checkbox'
                                          className='form-check-input'
                                          id='customCheckBox2'
                                          required=''
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
                              variant='danger light'
                              onClick={() => setLargeModal(false)}
                            >
                              Close
                            </Button>
                            <Button
                              variant=''
                              type='button'
                              className='btn btn-primary'
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
  )
}

export default AddCourses
