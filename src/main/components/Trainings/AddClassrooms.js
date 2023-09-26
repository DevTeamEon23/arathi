import React, { Fragment, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddClassrooms = () => {
  const [instname, setInstname] = useState('')
  const [classname, setClassname] = useState('')
  const [date, setDate] = useState('')
  const [starttime, setStarttime] = useState('')
  const [venue, setVenue] = useState('')
  const [messg, setMessg] = useState('')
  const [duration, setDuration] = useState('')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('instname', instname)
    formData.append('classname', classname)
    formData.append('date', date)
    formData.append('starttime', starttime)
    formData.append('venue', venue)
    formData.append('messg', messg)
    formData.append('duration', duration)
    formData.append('generate_token', true)

    const url = 'https://v1.eonlearning.tech/lms-service/addclassrooms'
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
        toast.success('Classroom Training Added Successfully!!!')
        history.push(`/classroom`)
      })
      .catch((error) => {
        console.error(error)
        toast.error('Failed !!! Unable to add classroom training...')
      })
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <Fragment>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Add Classroom Training</h4>
            </div>
            <div className='card-body'>
              <div className='form-validation'>
                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-xl-10'>
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='instname'
                        >
                          Instructor Name
                          <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-6'>
                          <input
                            type='text'
                            className='form-control'
                            id='instname'
                            value={instname}
                            placeholder='Enter Instructor Name'
                            onChange={(e) => setInstname(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='confname'
                        >
                          Name
                          <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-6'>
                          <input
                            type='text'
                            className='form-control'
                            id='confname'
                            value={classname}
                            placeholder='Enter Classroom training Name for your reference'
                            onChange={(e) => setClassname(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='date'
                        >
                          Date
                          <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-6'>
                          <input
                            type='date'
                            className='form-control input-daterange-timepicker'
                            id='date'
                            min={today}
                            value={date}
                            placeholder='Enter the Date '
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='starttime'
                        >
                          Start Time
                          <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-6'>
                          <input
                            type='time'
                            className='form-control '
                            id='starttime'
                            value={starttime}
                            placeholder='Enter the Conference Timing'
                            onChange={(e) => setStarttime(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='meetlink'
                        >
                          Venue
                          <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-6'>
                          <input
                            type='text'
                            className='form-control'
                            id='meetlink'
                            value={venue}
                            placeholder='Enter training venue details'
                            onChange={(e) => setVenue(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='messg'
                        >
                          Welcome Message <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-6'>
                          <textarea
                            className='form-control'
                            rows='5'
                            id='messg'
                            maxLength={500}
                            placeholder='Enter a Welcome message for participants...'
                            style={{ resize: 'none' }}
                            value={messg}
                            onChange={(e) => setMessg(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='duration'
                        >
                          Duration
                          <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-6'>
                          <input
                            type='text'
                            className='form-control'
                            id='duration'
                            value={duration}
                            placeholder='Enter the Duration in Hours eg:- 50 mins'
                            onChange={(e) => setDuration(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className='form-group mb-3 row'>
                        <label className='col-lg-4 col-form-label'></label>
                        <div className='col-lg-6 fw-bold'>
                          Make sure that the duration is below your plan limits*
                        </div>
                      </div>
                      <br />

                      <div className='form-group mb-5 row'>
                        <div className='col-lg-8 ms-auto'>
                          <br />
                          <Button
                            type='submit'
                            value='submit'
                            className='btn me-2 btn-primary'
                          >
                            Add
                          </Button>{' '}
                          or &nbsp;&nbsp;
                          <Link to='/classroom'>
                            <Button className='btn me-2 btn-light'>
                              Cancel
                            </Button>
                          </Link>
                        </div>
                      </div>
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

export default AddClassrooms
