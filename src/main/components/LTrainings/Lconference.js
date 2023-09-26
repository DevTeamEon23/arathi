import React, { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  Row,
  Col,
  Card,
  Table,
  Tabs,
  Tab,
  Button,
  Modal,
  Nav,
} from 'react-bootstrap'
import axios from 'axios'
import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner'

const Lconference = () => {
  const [activeTab, setActiveTab] = useState('/lconference')
  const [token, setToken] = useState() //auth token
  const [allConferenceData, setAllConferenceData] = useState([]) //set all conference data
  const history = useHistory()

  useEffect(() => {
    let accessToken = window.localStorage.getItem('jwt_access_token')
    setToken(accessToken)
    getAllConferences()
  }, [])

  const getAllConferences = async () => {
    const jwtToken = window.localStorage.getItem('jwt_access_token')
    const url = 'https://v1.eonlearning.tech/lms-service/conferences'
    try {
      const response = await axios.get(url, {
        headers: {
          'Auth-Token': jwtToken,
        },
      })
      const conferenceData = response.data.data
      console.log('getAllConferences', response.data)
      setAllConferenceData(conferenceData)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to fetch conferences list !') // Handle the error
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
            to='/lconference'
          >
            Conference
          </Link>
          <Link
            as='button'
            className='nav-link  nt-unseen'
            id='nav-following-tab'
            eventKey='Follow'
            type='button'
            to='/lvirtualtraining'
          >
            Virtual Training
          </Link>
          <Link
            as='button'
            className='nav-link  nt-unseen'
            id='nav-following-tab'
            eventKey='Follow'
            type='button'
            to='/lclassroom'
          >
            Classroom Training
          </Link>
        </Nav.Item>
      </Nav> */}
      <Tabs activeKey={activeTab} onSelect={handleTabChange}>
        <Tab eventKey='lconference' title='Conference'></Tab>
        <Tab eventKey='lvirtualtraining' title='Virtual Training'></Tab>
        <Tab eventKey='lclassroom' title='Classroom Training'></Tab>
      </Tabs>
      <Row mb={5}>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>CONFERENECES</Card.Title>
            </Card.Header>
            <Card.Body>
              {allConferenceData.length <= 0 ? (
                <div className='loader-container'>
                  <RotatingLines
                    strokeColor='grey'
                    strokeWidth='5'
                    animationDuration='0.75'
                    width='140'
                    visible={true}
                  />
                </div>
              ) : allConferenceData === null ? (
                <>
                  <div>
                    <p className='text-center fs-20 fw-bold'>
                      No Conference Found.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className='text-center'>
                          <strong>NAME</strong>
                        </th>
                        <th className='text-center'>
                          <strong>INSTRUCTOR</strong>
                        </th>
                        <th className='text-center'>
                          <strong>JOIN</strong>
                        </th>

                        <th className='text-center'>
                          <strong>DATE</strong>
                        </th>
                        <th className='text-center'>
                          <strong>DURATION</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allConferenceData?.map((data) => {
                        return (
                          <tr key={data.id}>
                            <td className='text-center'>{data.confname}</td>
                            <td className='text-center'>{data.instname}</td>
                            <td className='text-center'>
                              <a
                                href={data.meetlink}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                {data.meetlink}
                              </a>
                            </td>
                            <td className='text-center'>
                              {data.date} {data.starttime}
                            </td>
                            <td className='text-center'>{data.duration}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </>
              )}
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

export default Lconference
