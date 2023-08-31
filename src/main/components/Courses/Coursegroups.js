import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Dropdown,
  ProgressBar,
  Button,
  Nav,
  Modal,
  Tab,
  Tabs,
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner'

const Coursegroups = (props) => {
  const courseID = props.match.params.id
  console.log({ courseID })

  const [allGrps, setAllGrps] = useState([])
  const [activeTab, setActiveTab] = useState('course_groups/:id')
  const [token, setToken] = useState() //auth token
  const [btnLoader, setBtnLoader] = useState(false) //Loader
  const history = useHistory()

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    history.push(`/${tab}`)
  }

  useEffect(() => {
    // When the component mounts, set the active tab based on the current route
    const currentPath = history.location.pathname
    const tab = currentPath.substring(1) // Remove the leading slash
    setActiveTab(tab)
  }, [history.location.pathname])

  useEffect(() => {
    let token = window.localStorage.getItem('jwt_access_token')
    setToken(token)
    getAllGroups()
  }, [])

  // User List Api
  const getAllGroups = () => {
    const jwtToken = window.localStorage.getItem('jwt_access_token')
    const config = {
      headers: {
        'Auth-Token': jwtToken,
      },
    }
    axios
      .get(
        'http://127.0.0.1:8000/lms-service/fetch_enrollcourses_group',
        config
      )
      .then((response) => {
        console.log(response.data.data)
        const grps = response.data.data.course_ids
        setAllGrps(grps)
        // const adminUsers = allUsers.filter((user) => user.role === "Admin");
        // setTotalUserData(response.data.data.user_ids.length);
      })
      .catch((error) => {
        toast.error('Failed to fetch users!')
      })
  }

  const handleEnroll = (e, user_id) => {
    e.preventDefault()
    setBtnLoader(true)
    const formData = new FormData()
    formData.append('user_id', user_id)
    formData.append('group_id', courseID)
    formData.append('generate_token', true)
    const url = 'http://127.0.0.1:8000/lms-service/enroll_course_group'
    const authToken = token
    axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Auth-Token': authToken,
        },
      })
      .then((response) => {
        console.log(response.data)
        setBtnLoader(false)
        toast.success('Course Enroll successfully!!!')
        getAllGroups()
      })
      .catch((error) => {
        console.error(error)
        toast.error('Failed !!! Unable to enroll course...')
        setBtnLoader(false)
      })
  }

  const handleUnEnroll = (e, id) => {
    e.preventDefault()
    const config = {
      headers: {
        'Auth-Token': token,
      },
    }
    const requestBody = {
      id: 8,
    }
    axios
      .delete(
        `http://127.0.0.1:8000/lms-service/unenroll_course_group
      `,
        {
          ...config,
          data: requestBody,
        }
      )
      .then((response) => {
        toast.success('Unenroll successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        })
        getAllGroups()
      })
      .catch((error) => {
        // Handle the error
        console.error(error)
        toast.error('Failed to Unenroll!', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  }

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey={`edit-courses/${courseID}`} title='Course'></Tab>
              <Tab eventKey={`course_users/${courseID}`} title='Users'></Tab>
              <Tab eventKey={`course_groups/${courseID}`} title='Groups'></Tab>
            </Tabs>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <strong>GROUP</strong>
                    </th>
                    <th></th>
                    <th>
                      <strong>OPTION</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allGrps?.map((item, index) => {
                    return (
                      <tr>
                        <td>
                          <strong>{item.groupname}</strong>
                        </td>
                        <td></td>
                        <td>
                          <center>
                            {item.course_group_enrollment_id === null ? (
                              <>
                                {btnLoader ? (
                                  <CircularProgress
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      color: '#fff',
                                    }}
                                  />
                                ) : (
                                  <div
                                    className='btn btn-primary shadow btn-xs sharp me-1'
                                    title='Enroll'
                                    onClick={(e) =>
                                      handleEnroll(e, item.user_id)
                                    }
                                  >
                                    <i class='fa-solid fa-plus'></i>
                                  </div>
                                )}
                              </>
                            ) : (
                              <div
                                className='btn btn-danger shadow btn-xs sharp'
                                title='Unenroll'
                                onClick={(e) =>
                                  handleUnEnroll(
                                    e,
                                    item.course_group_enrollment_id
                                  )
                                }
                              >
                                <i class='fa-solid fa-minus'></i>
                              </div>
                            )}
                          </center>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div>
        <Button onClick={() => history.goBack()}>Back</Button>
      </div>
    </Fragment>
  )
}

export default Coursegroups
