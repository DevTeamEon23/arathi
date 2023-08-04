import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import Select from 'react-select'
import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Button,
  Nav,
} from 'react-bootstrap'
import axios from 'axios'
import { toast } from 'react-toastify'

const eventtype = [
  { value: 'Selectevent', label: 'Select event' },
  { value: 'Onusercreate', label: 'On user create' },
  { value: 'Onusersignup', label: 'On user signup' },
  { value: 'Xhoursafterusersignup', label: 'X hours after user signup' },
  {
    value: 'Xhoursafterusersignupandtheuserhasnotmadeapurchase',
    label: 'X hours after user signup and the user has not made a purchase',
  },
  { value: 'Xhoursafterusercreation', label: 'X hours after user creation' },
  {
    value: 'Xhoursafterusercreationandtheuserhasnotsignedin',
    label: 'X hours after user creation and the user has not signed in',
  },
  {
    value: 'Xhoursafterusersignupandtheuserhasnotsignedin',
    label: 'X hours after user signup and the user has not signed in',
  },
  {
    value: 'Xhourssinceuserlastsignedin',
    label: 'X hours since user last signed in',
  },
  {
    value: 'Xhourssinceuserfirstsigninandtheuserhasnotcompletedanycourse',
    label:
      'X hours since user first sign in and the user has not completed any course',
  },
  {
    value: 'Xhoursbeforeuserdeactivation',
    label: 'X hours before user deactivation',
  },
  { value: 'Oncourseassignment', label: 'On course assignment' },
  { value: 'Oncourseselfassignment', label: 'On course self assignment' },
  {
    value: 'Xhoursaftercourseacquisition',
    label: 'X hours after course acquisition',
  },
  { value: 'Xhoursbeforecoursestart', label: 'X hours before course start' },
  { value: 'Oncoursecompletion', label: 'On course completion' },
  {
    value: 'Xhoursaftercoursecompletion',
    label: 'X hours after course completion',
  },
  { value: 'Oncoursefailure', label: 'On course failure' },
  { value: 'Oncourseexpiration', label: 'On course expiration' },
  {
    value: 'Xhoursbeforecourseexpiration',
    label: 'X hours before course expiration',
  },
  { value: 'Oncertificateacquisition', label: 'On certificate acquisition' },
  { value: 'Oncertificateexpiration', label: 'On certificate expiration' },
  {
    value: 'Xhoursbeforecertificateexpiration',
    label: 'X hours before certificate expiration',
  },
  { value: 'Ongroupassignment', label: 'On group assignment' },
  { value: 'Onbranchassignment', label: 'On branch assignment' },
  { value: 'Onassignmentsubmission', label: 'On assignment submission' },
  { value: 'Onassignmentgrading', label: 'On assignment grading' },
  { value: 'OnILTsessioncreate', label: 'On ILT session create' },
  { value: 'OnILTsessionregistration', label: 'On ILT session registration' },
  {
    value: 'XhoursbeforeanILTsessionstarts',
    label: 'X hours before an ILT session starts',
  },
  { value: 'OnILTgrading', label: 'On ILT grading' },
  { value: 'Onuserpayment', label: 'On user payment' },
  { value: 'OnlevelXreached', label: 'On level X reached' },
]

const recipienttype = [
  { value: 'Selectrecipient', label: 'Select recipient' },
  { value: 'Relateduser', label: 'Related user' },
  { value: 'Accountowner', label: 'Account owner' },
  { value: 'SuperAdmins', label: 'SuperAdmins' },
  { value: 'Branchadmins', label: 'Branch admins' },
  { value: 'Courseinstructors', label: 'Course instructors' },
  { value: 'Courselearners', label: 'Course learners' },
  { value: 'Specificrecipients', label: 'Specific recipients' },
]

const AddNotification = () => {
  const [id, setId] = useState('')
  const [ename, setEname] = useState('')
  const [descp, setDescp] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [selectEvent, setSelectEvent] = useState(null) //set event list
  const [selectRecipient, setSelectRecipient] = useState(null) //recipient

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('ename', ename)
    formData.append('eventtype', selectEvent)
    formData.append('recipienttype', selectRecipient)
    formData.append('descp', descp)
    formData.append('isActive', isActive)
    formData.append('generate_token', true)

    console.log(ename, eventtype, recipienttype, descp)

    const url = 'http://127.0.0.1:8000/lms-service/addevents'
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
        toast.success('Notification added successfully!!!')
        clearAllState()
      })
      .catch((error) => {
        console.error(error)
        toast.error('Failed !!! Unable to add notification...')
      })
  }

  const clearAllState = () => {
    setEname('')
    setDescp('')
    setIsActive(false)
    setSelectEvent(null)
    setSelectRecipient(null)
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
            to='/events'
          >
            Events
          </Link>
        </Nav.Item>
      </Nav>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Add Notification</h4>
            </div>
            <div className='card-body'>
              <div className='form-validation'>
                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-xl-12'>
                      {/* <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username">
                          id
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            name="id"
                            placeholder="e.g. 1"
                            onChange={(e) => setId(e.target.value)}
                          />
                        </div>
                      </div> */}
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='ename'
                        >
                          Name
                          <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-6'>
                          <input
                            type='text'
                            className='form-control'
                            id='ename'
                            name='ename'
                            placeholder='e.g. John Doe'
                            value={ename}
                            onChange={(e) => setEname(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='eventtype'
                        >
                          Event
                          <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-6'>
                          <Select
                            id='eventtype'
                            value={selectEvent}
                            onChange={(selectEvent) =>
                              setSelectEvent(selectEvent)
                            }
                            options={eventtype}
                            name='eventtype'
                            required
                          ></Select>
                        </div>
                      </div>
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='val-website'
                        >
                          Recipient
                          <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-6'>
                          <Select
                            value={selectRecipient}
                            onChange={(selectRecipient) =>
                              setSelectRecipient(selectRecipient)
                            }
                            options={recipienttype}
                            name='recipienttype'
                            required
                          ></Select>
                        </div>
                      </div>
                      <div className='form-group mb-3 row'>
                        <label
                          className='col-lg-4 col-form-label'
                          htmlFor='val-suggestions'
                        >
                          Description <span className='text-danger'>*</span>
                        </label>
                        <div className='col-lg-6'>
                          <textarea
                            className='form-control'
                            id='descp'
                            name='descp'
                            rows='5'
                            placeholder='Short Description about user..'
                            value={descp}
                            onChange={(e) => setDescp(e.target.value)}
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className='col-lg-04'></div>
                      <br />
                      <div className='form-group mb-3 row'>
                        <div className='col-lg-8 ms-auto'>
                          <label
                            className='form-check css-control-primary css-checkbox'
                            htmlFor='isActive'
                          >
                            <input
                              type='checkbox'
                              className='form-check-input'
                              id='isActive'
                              name='isActive'
                              value={isActive}
                              onChange={(e) => setIsActive(e.target.value)}
                              required
                            />
                            Active
                          </label>
                        </div>
                      </div>
                      <br />
                    </div>
                    <div className='form-group mb-3 row'>
                      <div className='col-lg-8 ms-auto'>
                        <Button
                          type='submit'
                          className='btn me-2 btn-primary'
                          value='submit'
                        >
                          Create Notification
                        </Button>
                        &nbsp; or &nbsp;&nbsp;
                        <Link to='/events'>
                          <Button className='btn me-2 btn-light'>Cancel</Button>
                        </Link>
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

export default AddNotification
