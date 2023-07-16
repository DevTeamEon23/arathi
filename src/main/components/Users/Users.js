import { useState, useEffect } from 'react'
import React, { Fragment } from 'react'
import { toast } from 'react-toastify'
import { Row, Col, Card, Table, Button, Nav, Modal } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'
import EditUser from './EditUser'
import { useHistory } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'

const Users = () => {
  const [id, setId] = useState('')
  const [eid, setEid] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [dept, setDept] = useState('')
  const [adhr, setAdhr] = useState('')
  const [bio, setBio] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState()
  const [file, setFile] = useState([])
  const [isActive, setIsActive] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [uid, setUId] = useState() //user id save for delete
  const [token, setToken] = useState() //auth token
  const [userData, setUserData] = useState([]) //user list data
  const [showModal, setShowModal] = useState(false) //delete button modal
  const [editUserID, setEditUserID] = useState('')
  const [editUser, setEditUser] = useState(false)
  const history = useHistory()

  //User List Api
  const getAllUsers = () => {
    const jwtToken = window.localStorage.getItem('jwt_access_token')
    console.log(jwtToken)
    const config = {
      headers: {
        'Auth-Token': jwtToken, // Attach the JWT token in the Authorization header
      },
    }
    axios
      .get('https://v1.eonlearning.tech/lms-service/users', config)
      .then((response) => {
        console.log(response, response.data, response.data.data)
        setUserData(response.data.data)
      })
      .catch((error) => {
        console.log(error)
        toast.error('Failed to fetch users!') // Handle the error
      })
  }

  const handleEdit = (id) => {
    console.log('inside user handle edit page', id)
    // setEditUserID(id)
    // setEditUser(true)
    history.push(`/edit-user/${id}`)
  }

  // function selectUser(userId)
  // {
  //   let item=users[id-1];
  //   setEid(item.eid);
  //   setFirstname(item.firstname);
  //   setLastname(item.lastname);
  //   setEmail(item.email);
  //   setDept(item.dept);
  //   setAdhr(item.adhr);
  //   setBio(item.bio);
  //   setUsername(item.username);
  //   setPassword(item.password);
  //   setFile(item.file);
  //   setIsActive(item.isActive);
  //   setUserId(item.id)
  // }
  // function updateUser()
  // {
  //   let item={eid,firstname,lastname,email,dept,adhr,bio,username, password,file,isActive,userId}
  //   console.warn("data",data)
  //   fetch(`http://localhost:8000/users/${userId}`, {
  //     method: 'PUT',
  //   }).then((result) => {
  //     result.json().then((resp) => {
  //       console.warn(resp)
  //       getUsers()
  //     })
  //   })
  // }

  useEffect(() => {
    let token = window.localStorage.getItem('jwt_access_token')
    setToken(token)
    getAllUsers()
  }, [])

  const deleteUser = (userId) => {
    setShowModal(true)
    console.log('inside delete user', userId)
    setUId(userId)
  }

  const handleDelete = () => {
    console.log('modal delete', uid)
    const config = {
      headers: {
        'Auth-Token': token, // Attach the JWT token in the Authorization header
      },
    }
    const requestBody = {
      id: uid,
    }
    // Make the Axios DELETE request
    axios
      .delete(`https://v1.eonlearning.tech/lms-service/delete_user`, {
        ...config,
        data: requestBody,
      })
      .then((response) => {
        setShowModal(false)
        console.log(response.data.status)
        getAllUsers()
        toast.success('User deleted successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
      .catch((error) => {
        // Handle the error
        console.error(error)
        toast.error('Failed to delete user!', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  }

  return (
    <>
      <Fragment>
        <Nav>
          <Nav.Item
            as='div'
            className='nav nav-tabs'
            id='nav-tab'
            role='tablist'
          >
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
              to='/add-user'
            >
              Add Users
            </Link>
          </Nav.Item>
        </Nav>

        <Row>
          <Col lg={12}>
            <Card>
              <Card.Header>
                <Card.Title>All Users List</Card.Title>
                <div>
                  <Link to='/add-user'>
                    <Button variant='primary'>Add Users</Button>
                  </Link>
                  &nbsp;&nbsp;
                  <Link to='/import-user'>
                    <Button variant='primary'>Import Users</Button>
                  </Link>
                  &nbsp;&nbsp;
                  <Link to='/export-user'>
                    <Button variant='primary'>Export Users</Button>
                  </Link>
                </div>
              </Card.Header>
              <Table responsive striped bordered className='verticle-middle'>
                <thead>
                  <tr>
                    <th>
                      <strong>
                        <center>EID</center>
                      </strong>
                    </th>
                    <th>
                      <strong>
                        <center>SID</center>
                      </strong>
                    </th>
                    <th>
                      <strong>
                        <center>USER</center>
                      </strong>
                    </th>
                    <th>
                      <strong>
                        <center>DEPARTMENT</center>
                      </strong>
                    </th>
                    <th>
                      <strong>
                        <center>EMAIL</center>
                      </strong>
                    </th>
                    <th>
                      <strong>
                        <center>USER TYPE</center>
                      </strong>
                    </th>
                    <th>
                      <strong>
                        <center>REGISTRATION</center>
                      </strong>
                    </th>
                    <th>
                      <strong>
                        <center>LAST LOGIN</center>
                      </strong>
                    </th>
                    <th>
                      <strong>
                        <center>OPTIONS</center>
                      </strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userData === null && userData === [] && (
                    <RotatingLines
                      strokeColor='grey'
                      strokeWidth='5'
                      animationDuration='0.75'
                      width='96'
                      visible={true}
                    />
                  )}
                  {userData.length === 0 ? (
                    <tr>
                      <td
                        colSpan='13'
                        rowSpan='13'
                        className='text-center fs-16'
                      >
                        No File Found.
                      </td>
                    </tr>
                  ) : (
                    <>
                      {userData.map((item, index) => {
                        const dateTimeString = item.created_at //1
                        const date = new Date(dateTimeString)
                        const day = date.getDate()
                        const month = date.getMonth() + 1 // Months are zero-based, so add 1
                        const year = date.getFullYear()
                        const formattedDate = `${day < 10 ? '0' + day : day}-${
                          month < 10 ? '0' + month : month
                        }-${year}`

                        // Input date and time string
                        const inputDateTime = item.updated_at //2
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
                        const formattedDate1 = `${day1}-${month1}-${year1}`

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
                          <tr key={index}>
                            <td>
                              <center>{item.eid}</center>
                            </td>
                            <td>
                              <center>{item.sid}</center>
                            </td>
                            <td>
                              <center>{item.full_name}</center>
                            </td>
                            <td>
                              <center>{item.dept}</center>
                            </td>
                            <td>
                              <center>{item.email}</center>
                            </td>
                            <td>
                              <center>{item.role}</center>
                            </td>
                            <td>
                              <center>{formattedDate}</center>
                            </td>
                            <td>
                              <center>
                                {formattedDate1}&nbsp;&nbsp;{formattedTime}
                              </center>
                            </td>
                            <td>
                              <center>
                                {/* <Button onClick={(e)=>selectUser(item.id)}>Select</Button> */}
                                {/* <Link
                                  to="/edit-user"
                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                ></Link> */}
                                <div className='btn btn-primary shadow btn-xs sharp me-1'>
                                  <i
                                    className='fas fa-pencil-alt'
                                    onClick={(e) => handleEdit(item.id)}
                                  ></i>
                                </div>

                                <Link
                                  href='#'
                                  className='btn btn-danger shadow btn-xs sharp'
                                  onClick={() => deleteUser(item.id)}
                                >
                                  <i className='fa fa-trash'></i>
                                </Link>
                              </center>
                            </td>
                          </tr>
                        )
                      })}
                    </>
                  )}{' '}
                </tbody>
              </Table>
              {/* <div>
                <form action="http://localhost:8000/users/${userId}" method='PUT' encType="multipart/form-data">
                <input type="text" id="eid" name="eid" value={eid} onChange={(e) => setEid(e.target.value)} />
                <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" value={dept} onChange={(e) => setDept(e.target.value)} />
                <input type="text" value={adhr} onChange={(e) => setAdhr(e.target.value)} />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
                <input type="file" value={file} onChange={(e) => setFile(e.target.value)} />
                <input type="text" value={isActive} onChange={(e) => setIsActive(e.target.value)} />
                <button onClick={updateUser} >Update</button>
                </form>
              </div> */}
            </Card>
          </Col>
        </Row>
      </Fragment>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Are you sure you want to delete User?</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger light' onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant='btn btn-primary' onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* {editUser ? <EditUser userId={editUserID} /> : ''} */}
    </>
  )
}
export default Users
