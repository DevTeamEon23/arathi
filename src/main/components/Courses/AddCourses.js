import React, { Fragment, useState, useEffect, useRef } from 'react'
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
  const [file, setFile] = useState(null) //image
  const fileRef = useRef(null) //for image
  const [selectedOptionCertificate, setSelectedOptionCertificate] =
    useState(null) //Certificate
  const [selectedOptionLevel, setSelectedOptionLevel] = useState(null) // Level
  const [categories, setCategory] = useState(null)
  const [coursename, setCoursename] = useState('')
  const [coursecode, setCoursecode] = useState('')
  const [description, setDescription] = useState('') //Description
  const [isActive, setIsActive] = useState(false) //Active
  const [isHide, setIsHide] = useState(false) //Hide
  const [price, setPrice] = useState('')
  const [courselink, setCourselink] = useState('') //to save youtube link
  const [isValidLink, setIsValidLink] = useState(true)
  const fileInputRef = useRef(null)
  const [capacity, setCapacity] = useState('') //Capacity
  const [startdate, setStartdate] = useState('') //Course StartDate
  const [enddate, setEnddate] = useState('') //Course EndDate
  const [timelimit, setTimelimit] = useState(null) //in future should be remove
  const [selected, setSelected] = useState('')
  const [courses, setCourses] = useState([])
  const [token, setToken] = useState() //auth token
  const [getAllCategoriesData, setGetAllCategoriesData] = useState({}) //save all categories data
  const [selectCategoriesData, setSelectCategoriesData] = useState(null) //categories
  let history = useHistory()
  const [selectedVideo, setSelectedVideo] = useState(null) //to save video link

  useEffect(() => {
    let accessToken = window.localStorage.getItem('jwt_access_token')
    setToken(accessToken)
    getAllCategories()
    console.log(selectCategoriesData)
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

  // categories handle
  const handleSelectChange = (event) => {
    console.log('inside onchange')
    const selectedName = event.target.value
    console.log(selectedName)
    setSelectCategoriesData(selectedName)
  }

  //video file handle
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('video/')) {
      setSelectedVideo(file)
    } else {
      setSelectedVideo(null)
      alert('Please select a valid video file.')
    }
  }

  // Add course API
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('coursename', coursename)
    formData.append('file', file)
    formData.append('description', description)
    formData.append('coursecode', coursecode)
    formData.append('price', price)
    formData.append('courselink', !courselink === undefined ? courselink : null)
    formData.append('coursevideo', selectedVideo)
    formData.append('capacity', capacity)
    formData.append('startdate', startdate)
    formData.append('enddate', enddate)
    formData.append('timelimit', timelimit)
    formData.append('certificate', selectedOptionCertificate.value)
    formData.append('level', selectedOptionLevel.value)
    formData.append('category', selectCategoriesData.value)
    formData.append('isActive', isActive)
    formData.append('isHide', isHide)
    formData.append('generate_token', true)

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
    setCoursename('')
    setSelectedVideo(null)
    fileInputRef.current.value = ''
    setFile(null)
    fileRef.current.value = ''
    setSelectedOptionCertificate(null)
    setSelectedOptionLevel(null)
    setSelectCategoriesData(null)
    setDescription('')
    setIsActive(false)
    setIsHide(false)
    setCoursecode('')
    setPrice('')
    setCourselink('')
    setCapacity('')
    setStartdate('')
    setEnddate('')
  }

  // "Active" is checked
  const handleActiveChange = (e) => {
    setIsActive(e.target.checked)
    setIsHide(false)
  }

  // "Deactive" is checked
  const handleHideChange = (e) => {
    setIsHide(e.target.checked)
    setIsActive(false)
  }

  //image file handle
  const handleChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && isValidFileType(selectedFile)) {
      setFile(selectedFile)
    } else {
      setFile(null)
      toast.error('Please select a valid image file (jpeg, jpg, png).')
    }
  }

  const isValidFileType = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    return allowedTypes.includes(file.type)
  }

  // youtube link handle
  const handleInputChange = (event) => {
    const value = event.target.value
    setCourselink(value)
    validateYouTubeLink(value)
  }

  const validateYouTubeLink = (link) => {
    // Regular expression to check for valid YouTube links
    const youtubeRegex =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
    setIsValidLink(youtubeRegex.test(link))
  }

  // date validation
  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowFormatted = tomorrow.toISOString().split('T')[0]

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
            to='/courses-info'
          >
            Course
          </Link>
          {/* <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventkey="Follow"
            type="button"
            to="/course_users"
          >
            Users
          </Link>
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventkey="Follow"
            type="button"
            to="/course_groups"
          >
            Groups
          </Link> */}
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
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='coursename'
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
                            required
                          />
                        </div>
                      </div>
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='categories'
                        >
                          Category
                          <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-6'>
                          {/* <Select
                          defaultValue={category}
                          onChange={category}
                          options={category}
                          name='category'
                        ></Select> */}
                          <Select
                            // onChange={handleSelectChange}
                            value={selectCategoriesData}
                            id='categories'
                            name='categories'
                            options={getAllCategoriesData}
                            onChange={(selectCategoriesData) =>
                              setSelectCategoriesData(selectCategoriesData)
                            }
                            placeholder='Select a category'
                            required
                          ></Select>
                        </div>
                      </div>

                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='description'
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
                            maxLength={5000}
                            placeholder='Add a course description upto 5000 characters'
                            onChange={(e) => setDescription(e.target.value)}
                            required
                          ></textarea>
                        </div>
                      </div>

                      <div className='form-group mb-3 row'>
                        <div className='col-lg-3 ms-auto'>
                          <br />
                          <label
                            className='form-check css-control-primary css-checkbox'
                            htmlFor='isActive'
                          >
                            <input
                              type='checkbox'
                              className='form-check-input'
                              style={{ marginRight: '8px' }}
                              id='isActive'
                              name='isActive'
                              checked={isActive}
                              onChange={handleActiveChange}
                            />
                            Active
                          </label>
                        </div>
                        <div className='col-lg-5 ms-auto'>
                          <br />
                          <label
                            className='form-check css-control-primary css-checkbox'
                            htmlFor='isHide'
                          >
                            <input
                              type='checkbox'
                              className='form-check-input'
                              style={{ marginRight: '8px' }}
                              id='isHide'
                              name='isHide'
                              checked={isHide}
                              onChange={handleHideChange}
                            />
                            Hide from Course Catalog
                          </label>
                          <br />
                        </div>
                      </div>

                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='coursecode'
                        >
                          Course Code <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-6'>
                          <input
                            type='text'
                            className='form-control'
                            id='coursecode'
                            name='coursecode'
                            placeholder='E.g. PHYS339'
                            value={coursecode}
                            onChange={(e) => setCoursecode(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='price'
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
                            required
                          />
                        </div>
                      </div>
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='courselink'
                        >
                          Course Intro Video{' '}
                        </label>
                        <div className='input-group mb-3 col-lg-6 '>
                          <span className='input-group-text'>
                            Youtube Video Link
                          </span>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Paste YouTube link here...'
                            id='courselink'
                            name='courselink'
                            value={courselink}
                            onChange={handleInputChange}
                          />
                          {!isValidLink && (
                            <p style={{ color: 'red' }}>
                              Please enter a valid YouTube link.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className='form-group mb-3 row '>
                        <label
                          htmlFor='selectedVideo'
                          className='col-lg-4 col-form-label'
                        >
                          Upload Your Video
                          <span className='text-danger'>*</span>
                        </label>
                        <div className='input-group mb-3 col-lg-6 '>
                          <div>
                            <input
                              type='file'
                              accept='.mp4, .mkv'
                              id='selectedVideo'
                              onChange={handleFileChange}
                              ref={fileInputRef}
                              required
                            />
                            <br />
                            <br />
                            {selectedVideo && (
                              <video controls>
                                <source
                                  src={
                                    selectedVideo &&
                                    URL.createObjectURL(selectedVideo)
                                  }
                                  type={selectedVideo.type}
                                  alt='video'
                                />
                                Your browser does not support the video tag.
                              </video>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='capacity'
                        >
                          Capacity <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-6'>
                          <input
                            type='text'
                            className='form-control'
                            id='capacity'
                            name='capacity'
                            placeholder='e.g. Unlimited Student'
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='startdate'
                        >
                          Course Duration
                          <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-3 mb-3'>
                          <div className='example rangeDatePicker'>
                            <p className='mb-1'>Course Start Date</p>
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
                              value={startdate}
                              min={today}
                              onChange={(e) => setStartdate(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className='col-lg-3 mb-3'>
                          <div className='example rangeDatePicker'>
                            <p className='mb-1'>Course End Date</p>
                            <input
                              type='date'
                              className='form-control'
                              id='enddate'
                              name='enddate'
                              value={enddate}
                              min={tomorrowFormatted}
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
                          htmlFor='certificate'
                        >
                          Certificate
                          <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-6'>
                          <Select
                            value={selectedOptionCertificate}
                            options={certificate}
                            onChange={(selectedOptionCertificate) =>
                              setSelectedOptionCertificate(
                                selectedOptionCertificate
                              )
                            }
                            name='certificate'
                            id='certificate'
                            required
                          ></Select>
                        </div>
                      </div>
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='level'
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
                            id='level'
                            required
                          ></Select>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-4'>
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='file'
                        >
                          Add Photo<span className='text-danger'>*</span>
                        </label>
                        <div className='profile-info col-lg-6'>
                          <div className='profile-photo'>
                            {file ? (
                              <>
                                {' '}
                                <img
                                  src={file && URL.createObjectURL(file)}
                                  width='250'
                                  height='250'
                                  alt='file'
                                  objectFit='cover'
                                />{' '}
                                <br />
                                <br />
                              </>
                            ) : (
                              ''
                            )}

                            <input
                              type='file'
                              name='file'
                              id='file'
                              ref={fileRef}
                              accept='.jpeg, .png, .jpg'
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
                      <Button
                        type='submit'
                        className='btn me-2 btn-primary'
                        value='submit'
                      >
                        Add Course
                      </Button>{' '}
                      or &nbsp;&nbsp;
                      <Link to='/courses-info'>
                        <Button className='btn me-2 btn-light'>Cancel</Button>
                      </Link>
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
                        <Dropdown.Item>
                          <Link to='/content'>
                            <i class='bi bi-back'> &nbsp;</i>Content
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to='/webcontent'>
                            <i class='bi bi-cloud'> &nbsp;</i>Web Content
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to='/video'>
                            <i class='bi bi-play-circle'> &nbsp;</i>Video
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to='/audio'>
                            <i class='bi bi-file-music'> &nbsp;</i>Audio
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to='/presentation'>
                            <i class='bi bi-file-slides'> &nbsp;</i>Presentation
                            | Documents{' '}
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to='/scorm'>
                            <i class='bi bi-command'> &nbsp;</i>SCORM | xAPI |
                            cmi5
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to='/iframe'>
                            <i class='bi bi-code-slash'> &nbsp;</i>iFrame
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to='/test-question'>
                            <i class='bi bi-journal-check'> &nbsp;</i>Test
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to='/survey-question'>
                            <i class='bi bi-check2-square'> &nbsp;</i>Survey
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to='/assignment'>
                            <i class='bi bi-clipboard'> &nbsp;</i>Assignment
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to='/instructor-led'>
                            <i class='bi bi-calendar4-week'> &nbsp;</i>
                            Instructor-led training
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to='#'>
                            <i class='bi bi-tropical-storm'> &nbsp;</i>Section
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to='#'>
                            <i class='bi bi-vr'> &nbsp;</i>Clone from another
                            course
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to='#'>
                            <i class='bi bi-link'> &nbsp;</i>Link from another
                            course
                          </Link>
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
                        <Dropdown.Item>
                          <Link to='/message_users'>
                            <i class='bi bi-chat-right-text'> &nbsp;</i>Message
                            Users
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to='/ad_event'>
                            <i class='bi bi-calendar4-week'> &nbsp;</i>Add Event
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to='#'>
                            <i class='bi bi-cloud-snow-fill'> &nbsp;</i>Make
                            Course Public
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to='#'>
                            <i class='bi bi-lock'> &nbsp;</i>Lock Course Content
                          </Link>
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
                                          style={{ marginLeft: '4rem' }}
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
                                          style={{ marginLeft: '4rem' }}
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
                                          style={{ marginLeft: '4rem' }}
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
                                          style={{ marginLeft: '4rem' }}
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
                                          style={{ marginLeft: '4rem' }}
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
                                          style={{ marginLeft: '4rem' }}
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
                                          style={{ marginLeft: '4rem' }}
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
                                          style={{ marginLeft: '4rem' }}
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
                                          style={{ marginLeft: '4rem' }}
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
                                          style={{ marginLeft: '4rem' }}
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
