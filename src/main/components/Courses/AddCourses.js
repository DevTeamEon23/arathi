import React, { Fragment, useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Select from 'react-select'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Button, Tab, Tabs } from 'react-bootstrap'
import { RxCross2 } from 'react-icons/rx'
import { CircularProgress } from '@material-ui/core'

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

const AddCourses = () => {
  const [file, setFile] = useState(null) //image
  const fileRef = useRef(null) //for image
  const [errorImg, setErrorImg] = useState(null)
  const [errorVideo, setErrorVideo] = useState(null)
  const [selectedOptionCertificate, setSelectedOptionCertificate] = useState('') //Certificate
  const [selectedOptionLevel, setSelectedOptionLevel] = useState('') // Level
  const [coursename, setCoursename] = useState('')
  const [coursecode, setCoursecode] = useState('')
  const [description, setDescription] = useState('') //Description
  const [isActive, setIsActive] = useState(true) //Active
  const [isHide, setIsHide] = useState(false) //Hide
  const [price, setPrice] = useState(0)
  const [courselink, setCourselink] = useState('') //to save youtube link
  const [isValidLink, setIsValidLink] = useState(true)
  const fileInputRef = useRef(null)
  const [capacity, setCapacity] = useState('') //Capacity
  const [startdate, setStartdate] = useState('') //Course StartDate
  const [enddate, setEnddate] = useState('') //Course EndDate
  const [timelimit, setTimelimit] = useState(null) //in future should be remove
  const [token, setToken] = useState() //auth token
  const [getAllCategoriesData, setGetAllCategoriesData] = useState({}) //save all categories data
  const [selectCategoriesData, setSelectCategoriesData] = useState(null) //categories
  let history = useHistory()
  const [selectedVideo, setSelectedVideo] = useState(null) //to save video link
  const [activeTab, setActiveTab] = useState('/add-courses')
  const [btnSubmitLoader, setBtnSubmitLoader] = useState(false) //Loader
  const [submitError, setSubmitError] = useState('') //show YT or video upload
  const [errorMessageCapacity, setErrorMessageCapacity] = useState('')
  const [courseID, setCourseID] = useState('')

  useEffect(() => {
    let accessToken = window.localStorage.getItem('jwt_access_token')
    setToken(accessToken)
    getAllCategories()
    handleCourseID()
  }, [])

  const handleCourseID = () => {
    const jwtToken = window.localStorage.getItem('jwt_access_token')
    const config = {
      headers: {
        'Auth-Token': jwtToken,
      },
    }
    axios
      .get('https://v1.eonlearning.tech/lms-service/course_ids', config)
      .then((response) => {
        setCourseID(response.data.data.id_data[0].next_id)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // All Categories List
  const getAllCategories = async () => {
    const jwtToken = window.localStorage.getItem('jwt_access_token')
    const url = 'https://v1.eonlearning.tech/lms-service/categories'
    try {
      const response = await axios.get(url, {
        headers: {
          'Auth-Token': jwtToken,
        },
      })
      const data = response.data.data
      const expectedOutput = data.categories_data.map(({ name }) => ({
        value: name,
        label: name,
      }))
      setGetAllCategoriesData(data === null ? data : expectedOutput)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to fetch Categories !') // Handle the error
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    history.push(`/${tab}`)
  }

  useEffect(() => {
    const currentPath = history.location.pathname
    const tab = currentPath.substring(1)
    setActiveTab(tab)
  }, [history.location.pathname])

  //video file handle
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    const maxFileSize = 100 * 1024 * 1024 // 100MB in bytes
    if (file.size > maxFileSize) {
      setErrorVideo('File size exceeds the 100MB limit')
      setSelectedVideo(null)
    } else {
      const fileNameWithoutSpaces = file.name.replace(/\s+/g, '') // Remove spaces from the file name
      const modifiedFile = new File([file], fileNameWithoutSpaces, {
        type: file.type,
      })

      setErrorVideo('')
      setSelectedVideo(modifiedFile)
    }
  }

  // Add course API
  const handleSubmit = async (e) => {
    e.preventDefault()
    setBtnSubmitLoader(true)
    const ID = window.localStorage.getItem('id')
    if (selectedVideo && courselink) {
      setSubmitError(
        'Please choose either a video or provide a youtube link, not both.'
      )
      setBtnSubmitLoader(false)
    } else if (!selectedVideo && !courselink) {
      setSubmitError('Please Upload video or provide a youtube link.')
      setBtnSubmitLoader(false)
    } else {
      setSubmitError('')
      setBtnSubmitLoader(false)
    }

    if (file === null) {
      console.log('file log')
      alert('Please add valid Photo or Video')
      setBtnSubmitLoader(false)
    } else {
      const formData = new FormData()
      formData.append('id', courseID)
      formData.append('coursename', coursename)
      formData.append('file', file)
      formData.append('user_id', ID)
      formData.append('description', description)
      formData.append('coursecode', coursecode)
      formData.append('price', price)
      formData.append('courselink', courselink)
      formData.append(
        'coursevideo',
        selectedVideo === null ? '' : selectedVideo
      )
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

      console.log(
        selectedVideo,
        courselink,
        selectedOptionLevel.value,
        selectedOptionCertificate.value,
        selectCategoriesData
      )
      const url = 'https://v1.eonlearning.tech/lms-service/addcourses'
      await axios
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Auth-Token': token,
          },
        })
        .then((response) => {
          console.log(response.data.course_id)
          const course_id = response.data.course_id
          toast.success('Course added successfully!!!')
          clearAllState()
          setBtnSubmitLoader(false)
          history.push(`/video/${course_id}`)
        })
        .catch((error) => {
          console.error(error)
          setBtnSubmitLoader(false)
          toast.error('Failed !!! Unable to add course...')
        })
    }
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

  //image file handle
  const handleChange = (e) => {
    setErrorMessageCapacity('')
    const selectedFile = e.target.files[0]
    if (selectedFile && isValidFile(selectedFile)) {
      setFile(selectedFile)
      setErrorImg('')
    } else {
      setFile(null)
      setErrorImg(
        'Please select a valid image file (jpeg, jpg, png) that is no larger than 3MB.'
      )
    }
  }

  const isValidFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    const maxSize = 3 * 1024 * 1024 // 3MB in bytes
    return allowedTypes.includes(file.type) && file.size <= maxSize
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

  const handleImageDelete = () => {
    setSelectedVideo(null)
  }

  const handleCapacityChange = (e) => {
    const value = e.target.value
    if (value === '' || (/^\d+$/.test(value) && value >= 1 && value <= 100)) {
      setCapacity(value)
      setErrorMessageCapacity('')
    } else {
      setErrorMessageCapacity('Capacity must be a number between 1 and 100.')
    }
  }

  return (
    <Fragment>
      <Tabs activeKey={activeTab} onSelect={handleTabChange}>
        <Tab eventKey='dashboard' title='Dashboard'></Tab>
        <Tab eventKey='courses-info' title='Course'></Tab>
      </Tabs>
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
                    <div className='col-xl-7'>
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
                          <Select
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
                            style={{ resize: 'none' }}
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
                              onChange={(e) => setIsActive(e.target.checked)}
                            />
                            <p className='fw-bold fs-16'> Active</p>
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
                              onChange={(e) => setIsHide(e.target.checked)}
                            />
                            <p className='fw-mid-bold fs-16'>
                              {' '}
                              Hide from Course store
                            </p>
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
                          />
                        </div>
                      </div>
                      <div className='form-group mb-2 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='courselink'
                        >
                          Course Intro Video{' '}
                        </label>
                        <div className='input-group mb-2 col-lg-6 '>
                          <span className='input-group-text'>Youtube Link</span>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Paste YouTube link here...'
                            id='courselink'
                            name='courselink'
                            value={courselink}
                            onChange={handleInputChange}
                          />{' '}
                          {!isValidLink && (
                            <p style={{ color: 'red' }}>
                              Please enter a valid YouTube link.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className='form-group mb-1 row'>
                        <label className='col-lg-4 col-form-label'></label>
                        <div className='input-group mb-1 col-lg-6 '>
                          <span className='fs-16 fw-bold'>OR</span>
                        </div>
                      </div>

                      <div className='form-group row '>
                        <label
                          htmlFor='selectedVideo'
                          className='col-lg-4 col-form-label'
                        ></label>
                        <div className='input-group  col-lg-6 '>
                          <div>
                            <input
                              type='file'
                              accept='.mp4, .mkv'
                              id='selectedVideo'
                              onChange={handleFileChange}
                              ref={fileInputRef}
                            />
                            {selectedVideo && (
                              <RxCross2
                                className='fs-18 fs-bold'
                                title='Delete'
                                style={{
                                  marginLeft: '18px',
                                  color: '#c91111',
                                }}
                                onClick={handleImageDelete}
                              />
                            )}
                            <p className='mt-2'>(Upload Your Video)</p>
                            <br />
                            {errorVideo && (
                              <div className='error-message text-danger fs-14'>
                                {errorVideo}
                              </div>
                            )}

                            {selectedVideo && (
                              <video controls className='video-player'>
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
                      {submitError && (
                        <p className='error-message text-danger text-center fs-16'>
                          {submitError}
                        </p>
                      )}
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
                            min={1}
                            max={100}
                            placeholder='e.g. Number of Student'
                            value={capacity}
                            onChange={handleCapacityChange}
                            onBlur={() => setErrorMessageCapacity('')}
                            required
                          />
                          {errorMessageCapacity && (
                            <p className='text-danger'>
                              {errorMessageCapacity}
                            </p>
                          )}
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
                    <div className='col-xl-5'>
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='file'
                        >
                          Add Course photo<span className='text-danger'>*</span>
                        </label>
                        <div className='profile-info col-lg-7'>
                          <div className='profile-photo'>
                            {file ? (
                              <>
                                {' '}
                                <img
                                  src={file && URL.createObjectURL(file)}
                                  width='250'
                                  height='250'
                                  alt='file'
                                  objectfit='cover'
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
                            <br />
                            {errorImg && (
                              <div className='error-message text-danger fs-14'>
                                {errorImg}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />

                  <br />

                  <div className='col-lg-10 ms-auto'>
                    <Button
                      type='submit'
                      className='btn me-2 btn-primary'
                      value='submit'
                    >
                      {btnSubmitLoader ? (
                        <div className='w-25'>
                          <CircularProgress
                            style={{
                              width: '20px',
                              height: '20px',
                              color: '#fff',
                            }}
                          />
                        </div>
                      ) : (
                        'Save Course and Add Content'
                      )}
                    </Button>{' '}
                    or &nbsp;&nbsp;
                    <Link to='/courses-info'>
                      <Button className='btn me-2 btn-light'>Cancel</Button>
                    </Link>
                  </div>
                </form>
              </div>
              {/* <div className="col-lg-4 ">
                      <DropdownButton
                        as={ButtonGroup}
                        id="dropdown-button-drop-up"
                        drop="up"
                        variant="primary"
                        title="ADD"
                        className="me-1 mt-1">
                        <Dropdown.Item>
                          <Link to="/video">
                            <div className="dropdown-item-content">
                              <i className="bi bi-play-circle"> &nbsp;</i>Video
                            </div>
                          </Link>
                        </Dropdown.Item>

                        <Dropdown.Item>
                          <Link to="/presentation">
                            <div className="dropdown-item-content">
                              <i className="bi bi-file-slides"> &nbsp;</i>
                              Presentation | Documents{" "}
                            </div>
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to="/scorm">
                            <div className="dropdown-item-content">
                              <i className="bi bi-command"> &nbsp;</i>SCORM |
                              xAPI | cmi5
                            </div>{" "}
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to="/test-question">
                            <div className="dropdown-item-content">
                              <i className="bi bi-journal-check"> &nbsp;</i>Test
                            </div>{" "}
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to="/assignment">
                            <div className="dropdown-item-content">
                              <i className="bi bi-clipboard"> &nbsp;</i>
                              Assignment
                            </div>{" "}
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to="/instructor-led">
                            <div className="dropdown-item-content">
                              <i className="bi bi-calendar4-week"> &nbsp;</i>
                              Instructor-led training
                            </div>{" "}
                          </Link>
                        </Dropdown.Item>
                      </DropdownButton>
                      <button
                        type="submit"
                        className="btn btn-primary me-1 col-lg-5 ms-auto"
                        style={{ cursor: "not-allowed" }}>
                        View as Learner
                      </button>
                      <DropdownButton
                        as={ButtonGroup}
                        id="dropdown-button-drop-up"
                        drop="up"
                        variant="primary"
                        title="..."
                        className="me-1 mt-1"
                        style={{ cursor: "not-allowed" }}>
                        <Dropdown.Item>
                          <Link to="/message_users">
                            <div className="dropdown-item-content">
                              <i className="bi bi-chat-right-text"> &nbsp;</i>
                              Message Users
                            </div>{" "}
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to="/ad_event">
                            <div className="dropdown-item-content">
                              <i className="bi bi-calendar4-week"> &nbsp;</i>Add
                              Event
                            </div>{" "}
                          </Link>
                        </Dropdown.Item>

                        <Dropdown.Item>
                          <Link to="#">
                            <div className="dropdown-item-content">
                              <i className="bi bi-lock"> &nbsp;</i>Lock Course
                              Content
                            </div>{" "}
                          </Link>
                        </Dropdown.Item>

                        <Modal
                          className="fade bd-example-modal-lg"
                          show={largeModal}
                          size="lg">
                          <Modal.Header>
                            <Modal.Title>Modal App Compatibility</Modal.Title>
                            <Button
                              variant=""
                              className="btn-close"
                              onClick={() => setLargeModal(false)}></Button>
                          </Modal.Header>
                          <Modal.Body>
                            <Table responsive>
                              <thead>
                                <tr>
                                  <th className="width80">Unit Name</th>
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
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <div className="col-xl-1">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          style={{ marginLeft: "4rem" }}
                                          id="customCheckBox2"
                                          required=""
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
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <div className="col-xl-1">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          style={{ marginLeft: "4rem" }}
                                          id="customCheckBox2"
                                          required=""
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
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <div className="col-xl-1">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          style={{ marginLeft: "4rem" }}
                                          id="customCheckBox2"
                                          required=""
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
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <div className="col-xl-1">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          style={{ marginLeft: "4rem" }}
                                          id="customCheckBox2"
                                          required=""
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
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <div className="col-xl-1">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          style={{ marginLeft: "4rem" }}
                                          id="customCheckBox2"
                                          required=""
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
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <div className="col-xl-1">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          style={{ marginLeft: "4rem" }}
                                          id="customCheckBox2"
                                          required=""
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
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <div className="col-xl-1">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          style={{ marginLeft: "4rem" }}
                                          id="customCheckBox2"
                                          required=""
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
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <div className="col-xl-1">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          style={{ marginLeft: "4rem" }}
                                          id="customCheckBox2"
                                          required=""
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
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <div className="col-xl-1">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          style={{ marginLeft: "4rem" }}
                                          id="customCheckBox2"
                                          required=""
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
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                                      <div className="col-xl-1">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          style={{ marginLeft: "4rem" }}
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
                              onClick={() => setLargeModal(false)}>
                              Close
                            </Button>
                            <Button
                              variant=""
                              type="button"
                              className="btn btn-primary">
                              Save changes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </DropdownButton>
                    </div> */}

              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default AddCourses

{
  /* <div className='row mb-0'>
                          <div className='col-lg-5'></div>
                          <div className='col-md-4'>
                            <strong>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OR
                            </strong>
                          </div>
                        </div> */
}
{
  /* <div className='row mt-0'>
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
                        </div> */
}
