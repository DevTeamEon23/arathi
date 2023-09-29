import React, { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner'
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Nav,
  Tab,
  Tabs,
} from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectUser } from 'src/store/user/userSlice'

const Info = () => {
  const [token, setToken] = useState() //auth token
  const [allCourseData, setAllCourseData] = useState([]) //set course data SuperAdmin
  const [courseName, setCourseName] = useState('') //course name
  const [showModal, setShowModal] = useState(false) //delete button modal
  const [showCloneModal, setShowCloneModal] = useState(false) //clone modal
  const [courseCloneId, setCourseCloneId] = useState() //course id save for clone
  const [courseId, setCourseId] = useState() //course id save for delete
  const [activeTab, setActiveTab] = useState('/add-courses')
  const [courses, setCourses] = useState([]) //admin instructor
  const roleType = useSelector(selectUser).role[0]
  let history = useHistory()

  useEffect(() => {
    let accessToken = window.localStorage.getItem('jwt_access_token')
    let ID = window.localStorage.getItem('id')
    setToken(accessToken)
    getAllCourses()
    fetchCourseData(accessToken, ID)
  }, [])

  const getAllCourses = async () => {
    const jwtToken = window.localStorage.getItem('jwt_access_token')
    const url = 'https://v1.eonlearning.tech/lms-service/courses'
    try {
      const response = await axios.get(url, {
        headers: {
          'Auth-Token': jwtToken,
        },
      })
      const courseData = response.data.data
      // const names = courseData.map((course) => course.coursename);
      // setCourseName(names);
      setAllCourseData(
        courseData === null ? courseData : courseData.courses_data
      )
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to fetch Courses !') // Handle the error
    }
  }

  const fetchCourseData = async (accessToken, ID) => {
    try {
      const queryParams = {
        user_id: ID,
      }
      const url = new URL(
        'https://v1.eonlearning.tech/lms-service/fetch_enrolled_courses_of_users'
      )
      url.search = new URLSearchParams(queryParams).toString()
      const response = await axios.get(url.toString(), {
        headers: {
          'Auth-Token': accessToken,
          'Content-Type': 'multipart/form-data',
        },
      })
      const list = response.data.data
      setCourses(
        list === null ? response.data.data : response.data.data.course_ids
      )
    } catch (error) {
      console.error('API Error:', error)
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

  const deleteOperation = (courseId) => {
    setShowModal(true)
    setCourseId(courseId)
  }

  const handleDeleteCourseMain = () => {
    const config = {
      headers: {
        'Auth-Token': token,
      },
    }
    const requestBody = {
      id: courseId,
    }
    axios
      .delete(`https://v1.eonlearning.tech/lms-service/delete_course`, {
        ...config,
        data: requestBody,
      })
      .then((response) => {
        setShowModal(false)
        getAllCourses()
        toast.success('Course deleted successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
      .catch((error) => {
        console.error(error)
        setShowModal(false)
        toast.error('Failed to delete Course!', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  }
  const handleDeleteCourse = () => {
    const config = {
      headers: {
        'Auth-Token': token,
      },
    }
    const requestBody = {
      id: courseId,
    }
    // axios
    //   .delete(`https://v1.eonlearning.tech/lms-service/delete_course`, {
    //     ...config,
    //     data: requestBody,
    //   })
    //   .then((response) => {
    //     setShowModal(false)
    //     getAllCourses()
    //     toast.success('Course deleted successfully!', {
    //       position: toast.POSITION.TOP_RIGHT,
    //     })
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //     setShowModal(false)
    //     toast.error('Failed to delete Course!', {
    //       position: toast.POSITION.TOP_RIGHT,
    //     })
    //   })
  }

  const handleClone = (id, coursename) => {
    setShowCloneModal(true)
    setCourseName(coursename)
    setCourseCloneId(id)
  }

  const handleCatClone = () => {
    const id = courseCloneId
    const authToken = token
    const url = `https://v1.eonlearning.tech/lms-service/clonecourse/${id}`
    axios
      .post(url, null, {
        headers: {
          'Auth-Token': authToken,
        },
      })
      .then((response) => {
        setShowCloneModal(false)
        getAllCourses()
        toast.success('Course Clone successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
      .catch((error) => {
        setShowCloneModal(false)
        console.error(error)
        toast.error(
          'Failed to Clone Course...! One course can clone one time only',
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        )
      })
  }

  const handleEdit = (id) => {
    history.push(`/edit-courses/${id}`)
  }

  return (
    <Fragment>
      <Tabs activeKey={activeTab} onSelect={handleTabChange}>
        <Tab eventKey='dashboard' title='Dashboard'></Tab>
        <Tab eventKey='add-courses' title='Add Course'></Tab>
      </Tabs>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Courses</Card.Title>
              <div>
                <Link to='/add-courses'>
                  <Button variant='primary'>Add Courses</Button>
                </Link>
              </div>
            </Card.Header>
            {roleType === 'Superadmin' && (
              <Card.Body>
                {allCourseData?.length <= 0 ? (
                  <div className='loader-container'>
                    <RotatingLines
                      strokeColor='grey'
                      strokeWidth='5'
                      animationDuration='0.75'
                      width='140'
                      visible={true}
                    />
                  </div>
                ) : allCourseData === null ? (
                  <>
                    <div>
                      <p className='text-center fs-20 fw-bold'>
                        No Course Found.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>
                            <strong>
                              <center>COURSE NAME</center>
                            </strong>
                          </th>
                          <th>
                            <strong>
                              <center>CATEGORY</center>
                            </strong>
                          </th>
                          <th>
                            <strong>
                              <center>LAST UPDATED ON</center>
                            </strong>
                          </th>
                          <th>
                            <strong>
                              <center>OPTION</center>
                            </strong>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {allCourseData.map((data) => {
                          // Input date and time string
                          const inputDateTime = data.updated_at //2
                          // Convert inputDateTime to a JavaScript Date object
                          const dateObj = new Date(inputDateTime)
                          // Get the date in dd-mm-yyyy format
                          const day1 = dateObj
                            .getDate()
                            .toString()
                            .padStart(2, '0')
                          const month1 = (dateObj.getMonth() + 1)
                            .toString()
                            .padStart(2, '0') // Months are zero-based
                          const year1 = dateObj.getFullYear().toString()
                          const formattedDate = `${day1}-${month1}-${year1}`

                          // Get the time in 12-hour format
                          let hours = dateObj.getHours()
                          const minutes = dateObj
                            .getMinutes()
                            .toString()
                            .padStart(2, '0')
                          const amPm = hours >= 12 ? 'PM' : 'AM'
                          hours = hours % 12 || 12
                          const formattedTime = `${hours}:${minutes} ${amPm}`

                          return (
                            <tr key={data.id}>
                              <td>
                                <center>
                                  <strong>{data.coursename}</strong>
                                </center>
                              </td>
                              <td>
                                <center>{data.category}</center>
                              </td>
                              <td>
                                <center>
                                  {formattedDate}&nbsp;&nbsp;{formattedTime}
                                </center>
                              </td>
                              <td>
                                <center>
                                  <div
                                    className='btn btn-primary shadow btn-xs sharp me-1'
                                    title='Clone'
                                  >
                                    <i
                                      className='fa-solid fa-plus'
                                      onClick={(e) =>
                                        handleClone(data.id, data.coursename)
                                      }
                                    ></i>
                                  </div>
                                  {/* <Link
                                  to="/course-reports"
                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                  title="Reports">
                                  <i class="fa-regular fa-clipboard"></i>
                                </Link> */}
                                  <div
                                    className='btn btn-primary shadow btn-xs sharp me-1'
                                    title='Edit'
                                    onClick={(e) => handleEdit(data.id)}
                                  >
                                    <i className='fas fa-pencil-alt'></i>
                                  </div>
                                  <div
                                    className='btn btn-danger shadow btn-xs sharp'
                                    title='Delete'
                                    onClick={() => deleteOperation(data.id)}
                                  >
                                    <i className='fa fa-trash'></i>
                                  </div>
                                </center>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </>
                )}
              </Card.Body>
            )}
            {roleType === 'Admin' || roleType === 'Instructor' ? (
              <Card.Body>
                {courses?.length <= 0 ? (
                  <div className='loader-container'>
                    <RotatingLines
                      strokeColor='grey'
                      strokeWidth='5'
                      animationDuration='0.75'
                      width='140'
                      visible={true}
                    />
                  </div>
                ) : courses === null ? (
                  <>
                    <div>
                      <p className='text-center fs-20 fw-bold'>
                        No Course Found.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>
                            <strong>
                              <center>COURSE NAME</center>
                            </strong>
                          </th>
                          <th>
                            <strong>
                              <center>CATEGORY</center>
                            </strong>
                          </th>
                          <th>
                            <strong>
                              <center>LAST UPDATED ON</center>
                            </strong>
                          </th>
                          <th>
                            <strong>
                              <center>OPTION</center>
                            </strong>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses?.map((data) => {
                          const dateTimeString = data.updated_at //1
                          const date = new Date(dateTimeString)
                          const day = date.getDate()
                          const month = date.getMonth() + 1
                          const year = date.getFullYear()
                          const formattedDate = `${
                            day < 10 ? '0' + day : day
                          }-${month < 10 ? '0' + month : month}-${year}`

                          //Time
                          let hours = date.getHours()
                          const minutes = date
                            .getMinutes()
                            .toString()
                            .padStart(2, '0')
                          const amPm = hours >= 12 ? 'PM' : 'AM'
                          hours = hours % 12 || 12
                          const formattedTime = `${hours}:${minutes} ${amPm}`

                          return (
                            <tr key={data.id}>
                              <td className='text-center'>{data.coursename}</td>
                              <td className='text-center'>{data.category}</td>
                              <td className='text-center'>
                                {formattedDate}&nbsp;&nbsp;{formattedTime}
                              </td>
                              <td>
                                {' '}
                                <center>
                                  <div
                                    className='btn btn-primary shadow btn-xs sharp me-1'
                                    title='Clone'
                                  >
                                    <i
                                      className='fa-solid fa-plus'
                                      onClick={(e) =>
                                        handleClone(data.id, data.coursename)
                                      }
                                    ></i>
                                  </div>

                                  <div
                                    className='btn btn-primary shadow btn-xs sharp me-1'
                                    title='Edit'
                                    onClick={(e) => handleEdit(data.id)}
                                  >
                                    <i className='fas fa-pencil-alt'></i>
                                  </div>
                                  <div
                                    className='btn btn-danger shadow btn-xs sharp'
                                    title='Delete'
                                    onClick={() => deleteOperation(data.id)}
                                  >
                                    <i className='fa fa-trash'></i>
                                  </div>
                                </center>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </>
                )}
              </Card.Body>
            ) : (
              ''
            )}
          </Card>
        </Col>
      </Row>
      <div>
        <Button onClick={() => history.goBack()}>Back</Button>
      </div>
      {/* Delete Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Are you sure you want to delete this Course?</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger light' onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant='btn btn-primary'
            onClick={
              roleType === 'Superadmin'
                ? handleDeleteCourseMain
                : handleDeleteCourse
            }
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Clone Modal */}
      <Modal show={showCloneModal} onHide={() => setShowCloneModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Clone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='fs-20 text-center'>
            {' '}
            Are you sure you want to clone the course{' '}
            <strong>{courseName}</strong> ?
          </p>
          <p className='text-danger text-center mt-2 fw-bold fs-14'>
            {' '}
            (one course can clone one time only)
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='danger light'
            onClick={() => setShowCloneModal(false)}
          >
            Close
          </Button>
          <Button variant='btn me-2 btn-primary' onClick={handleCatClone}>
            Clone
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default Info
