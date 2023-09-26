import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Dropdown,
  ProgressBar,
  Button,
  Modal,
} from 'react-bootstrap'

import { Link } from 'react-router-dom'

const Classrooms = () => {
  const [sendMessage, setSendMessage] = useState(false)
  const [classrooms, setClassrooms] = useState([])
  let history = useHistory()

  const getClassrooms = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch('/api', requestOptions)
    const data = await response.json()

    console.log(data)
  }
  const fetchData = () => {
    fetch('https://localhost:8000/classrooms')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setClassrooms(data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  // useEffect( async () => {
  //   fetchData();
  // }, []);

  async function deleteOperation(id) {
    if (window.confirm('Are you sure?')) {
      let result = await fetch('https://localhost:8000/classrooms/' + id, {
        method: 'DELETE',
      })
      result = await result.json()
      console.warn(result)
      fetchData()
    }
  }
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

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Classroom Training</Card.Title>
              <div>
                <Link to='/add-classroom'>
                  <Button variant='primary'>Add Classroom Training</Button>
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <center>
                        <strong>NAME</strong>
                      </center>
                    </th>
                    <th>
                      <center>
                        <strong>INSTRUCTOR</strong>
                      </center>
                    </th>
                    <th>
                      <center>
                        <strong>VENUE</strong>
                      </center>
                    </th>
                    <th>
                      <center>
                        <strong>USERS</strong>
                      </center>
                    </th>
                    <th>
                      <center>
                        <strong>JOINED</strong>
                      </center>
                    </th>
                    <th>
                      <center>
                        <strong>DATE</strong>
                      </center>
                    </th>
                    <th>
                      <center>
                        <strong>DURATION</strong>
                      </center>
                    </th>
                    <th>
                      <center>
                        <strong>OPTION</strong>
                      </center>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {classrooms?.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td>
                          <center>
                            <strong>{data.classname}</strong>
                          </center>
                        </td>
                        <td>
                          <center>{data.instname}</center>
                        </td>
                        <td>
                          <center>{data.venue}</center>
                        </td>
                        <td>
                          <center>5</center>
                        </td>
                        <td>
                          <center>-</center>
                        </td>
                        <td>
                          <center>
                            {data.date} {data.starttime}
                          </center>
                        </td>
                        <td>
                          <center>{data.duration}</center>
                        </td>
                        <td>
                          <center>
                            <Link
                              to='/add-classroom'
                              className='btn btn-primary shadow btn-xs sharp me-1'
                            >
                              <i class='fa-solid fa-plus'></i>
                            </Link>
                            <Link
                              className='btn btn-primary shadow btn-xs sharp me-1'
                              onClick={() => setSendMessage(true)}
                            >
                              <i class='bi bi-envelope-fill'></i>
                            </Link>
                            <Link
                              to='/edit-classroom'
                              className='btn btn-primary shadow btn-xs sharp me-1'
                            >
                              <i className='fas fa-pencil-alt'></i>
                            </Link>
                            <Link
                              href='#'
                              className='btn btn-danger shadow btn-xs sharp'
                              onClick={() => deleteOperation(data.id)}
                            >
                              <i className='fa fa-trash'></i>
                            </Link>
                          </center>
                        </td>
                      </tr>
                    )
                  })}
                  {/* send Modal */}
                  <Modal className='modal fade' show={sendMessage}>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <h5 className='modal-title'>Send Message</h5>
                        <Button
                          variant=''
                          type='button'
                          className='close'
                          data-dismiss='modal'
                          onClick={() => setSendMessage(false)}
                        >
                          <span>×</span>
                        </Button>
                      </div>
                      <div className='modal-body'>
                        <form
                          className='comment-form'
                          onSubmit={(e) => {
                            e.preventDefault()
                            setSendMessage(false)
                          }}
                        >
                          <div className='row'>
                            <div className='col-lg-12'>
                              <div className='form-group mb-3'>
                                <label
                                  htmlFor='comment'
                                  className='text-black font-w600'
                                >
                                  Comment
                                </label>
                                <textarea
                                  rows={8}
                                  className='form-control'
                                  name='comment'
                                  placeholder='Comment'
                                  defaultValue={''}
                                />
                              </div>
                            </div>
                            <div className='col-lg-12'>
                              <div className='form-group mb-3'>
                                <input
                                  type='submit'
                                  value='Send Message'
                                  className='submit btn btn-primary'
                                  name='submit'
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Modal>
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

export default Classrooms
