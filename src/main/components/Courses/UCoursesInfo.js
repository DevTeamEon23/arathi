import React, { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
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
  Tab,
  Tabs,
} from 'react-bootstrap'

const UCoursesInfo = (props) => {
  const userId = props.match.params.id
  console.log({ userId })
  const [courses, setCourses] = useState([])
  const [activeTab, setActiveTab] = useState('user-courses-info/:id')
  let history = useHistory()

  useEffect(() => {
    fetch('https://localhost:4001/courses')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCourses(data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
  })
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

  const svg1 = (
    <svg width='20px' height='20px' viewBox='0 0 24 24' version='1.1'>
      <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <rect x='0' y='0' width='24' height='24'></rect>
        <circle fill='#000000' cx='5' cy='12' r='2'></circle>
        <circle fill='#000000' cx='12' cy='12' r='2'></circle>
        <circle fill='#000000' cx='19' cy='12' r='2'></circle>
      </g>
    </svg>
  )

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

  return (
    <Fragment>
      {/* <Nav>
        <Nav.Item as='div' className='nav nav-tabs' id='nav-tab' role='tablist'>
          <Link
            as='button'
            className='nav-link  nt-unseen'
            id='nav-following-tab'
            eventKey='Follow'
            type='button'
            to={`/edit-user/${userId}`}
          >
            Info
          </Link>
          <Link
            as='button'
            className='nav-link  nt-unseen'
            id='nav-following-tab'
            eventKey='Follow'
            type='button'
            to={`/user-courses-info/${userId}`}
          >
            Courses
          </Link>
          <Link
            as='button'
            className='nav-link  nt-unseen'
            id='nav-following-tab'
            eventKey='Follow'
            type='button'
            to='/user-groups'
          >
            Groups
          </Link>
          <Link
            as='button'
            className='nav-link  nt-unseen'
            id='nav-following-tab'
            eventKey='Follow'
            type='button'
            to='/user-files'
          >
            Files
          </Link>
        </Nav.Item>
      </Nav> */}
      <Row>
        <Col lg={12}>
          <Card>
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey={`edit-user/${userId}`} title='Info'></Tab>
              <Tab
                eventKey={`user-courses-info/${userId}`}
                title='Courses'
              ></Tab>
              <Tab eventKey={`user-groups/${userId}`} title='Groups'></Tab>
              <Tab eventKey={`user-files/${userId}`} title='Files'></Tab>
            </Tabs>
            <Card.Header>
              <Card.Title>Courses@@@</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th className='width80'>
                      <strong>COURSE</strong>
                    </th>
                    <th>
                      <strong>ROLE</strong>
                    </th>
                    <th>
                      <strong>ENROLLED ON</strong>
                    </th>
                    <th>
                      <strong>COMPLETION DATE</strong>
                    </th>
                    <th>
                      <strong>OPTION</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td>
                          <strong>{data.coursename}</strong>
                        </td>
                        <td>INSTRUCTOR</td>
                        <td>1/11/2022</td>
                        <td>_</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant='success'
                              className='light sharp i-false'
                            >
                              {svg1}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href='#'>
                                <strong>
                                  <i class='bi bi-dash'></i>
                                </strong>
                              </Dropdown.Item>
                              <Dropdown.Item href='#'>
                                <strong>
                                  <i class='bi bi-arrow-repeat'></i>
                                </strong>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
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

export default UCoursesInfo
