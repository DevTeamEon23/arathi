import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectUser } from 'src/store/user/userSlice'

const CoursesMain = () => {
  const [token, setToken] = useState() //auth token
  const [data, setData] = useState([]) //Course data superadmin
  const [courses, setCourses] = useState([]) //admin instructor
  const [totalCourseData, setTotalCourseData] = useState(0) //course list data
  const [currentPage, setCurrentPage] = useState(1) // Current page number
  const itemsPerPage = 6 // Number of items to display per page
  const roleType = useSelector(selectUser).role[0]
  const backendBaseUrl = 'https://v1.eonlearning.tech'

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
      console.log('getAllCourses', response.data.data.length)
      setData(response.data.data)
      setTotalCourseData(response.data.data.length)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to fetch Courses !') // Handle the error
    }
  }

  const fetchCourseData = async (accessToken, ID) => {
    console.log(roleType)
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
      console.log(
        response.data.data,
        response.data.data.course_ids.length,
        'fetchCourseData'
      )
      setCourses(
        list === null ? response.data.data : response.data.data.course_ids
      )
      setTotalCourseData(response.data.data.course_ids.length)
    } catch (error) {
      console.error('API Error:', error)
    }
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  // const currentData = data.slice(startIndex, endIndex);
  let currentData

  if (roleType === 'Superadmin') {
    currentData = data.slice(startIndex, endIndex)
  } else {
    currentData = courses.slice(startIndex, endIndex)
  }

  return (
    <>
      <div className='widget-heading d-flex justify-content-between align-items-center'>
        <h3 className='m-0'>Course Store</h3>
      </div>
      {roleType === 'Superadmin' ? (
        <div className='row'>
          {data.length <= 0 ? (
            <div className='loader-container'>
              <RotatingLines
                strokeColor='grey'
                strokeWidth='5'
                animationDuration='0.75'
                width='130'
                visible={true}
              />
            </div>
          ) : (
            <>
              {currentData?.map((item, index) => {
                const img = `${backendBaseUrl}/${item.file}`
                return (
                  <div className='col-xl-4 col-md-6' key={index}>
                    <div className='card all-crs-wid'>
                      <div className='card-body'>
                        <div className='courses-bx'>
                          <div style={{ height: '10vw' }}>
                            <img
                              src={img}
                              style={{
                                objectFit: 'cover',
                                width: '100%',
                                borderRadius: ' 0.625rem',
                                height: '10vw',
                              }}
                              alt='course img'
                              id='file'
                              name='file'
                            />
                          </div>
                          <div className='dlab-info'>
                            <div className='dlab-title d-flex justify-content-between'>
                              <div>
                                <h4>
                                  <Link to={'./course-details-1'}>
                                    {item.coursename}
                                  </Link>
                                </h4>
                                <p className='m-0'>
                                  {item.coursecode}
                                  <svg
                                    className='ms-1'
                                    width='4'
                                    height='5'
                                    viewBox='0 0 4 5'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <circle
                                      cx='2'
                                      cy='2.5'
                                      r='2'
                                      fill='#DBDBDB'
                                    />
                                  </svg>
                                  <span>
                                    5.0
                                    <svg
                                      width='16'
                                      height='15'
                                      viewBox='0 0 16 15'
                                      fill='none'
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                      <path
                                        d='M8 0.5L9.79611 6.02786H15.6085L10.9062 9.44427L12.7023 14.9721L8 11.5557L3.29772 14.9721L5.09383 9.44427L0.391548 6.02786H6.20389L8 0.5Z'
                                        fill='#FEC64F'
                                      />
                                    </svg>
                                  </span>
                                </p>
                              </div>
                              <h4 className='text-primary'>
                                <span>₹</span>
                                {item.price}
                              </h4>
                            </div>
                            <div className='d-flex justify-content-between content align-items-center'>
                              <span>
                                <svg
                                  className='me-2'
                                  width='24'
                                  height='25'
                                  viewBox='0 0 24 25'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M21.2 18.6C20.5 18.5 19.8 18.4 19 18.4C16.5 18.4 14.1 19.1 12 20.5C9.90004 19.2 7.50005 18.4 5.00005 18.4C4.30005 18.4 3.50005 18.5 2.80005 18.6C2.30005 18.7 1.90005 19.2 2.00005 19.8C2.10005 20.4 2.60005 20.7 3.20005 20.6C3.80005 20.5 4.40005 20.4 5.00005 20.4C7.30005 20.4 9.50004 21.1 11.4 22.5C11.7 22.8 12.2 22.8 12.6 22.5C15 20.8 18 20.1 20.8 20.6C21.3 20.7 21.9 20.3 22 19.8C22.1 19.2 21.7 18.7 21.2 18.6ZM21.2 2.59999C20.5 2.49999 19.8 2.39999 19 2.39999C16.5 2.39999 14.1 3.09999 12 4.49999C9.90004 3.09999 7.50005 2.39999 5.00005 2.39999C4.30005 2.39999 3.50005 2.49999 2.80005 2.59999C2.40005 2.59999 2.00005 3.09999 2.00005 3.49999V15.5C2.00005 16.1 2.40005 16.5 3.00005 16.5C3.10005 16.5 3.10005 16.5 3.20005 16.5C3.80005 16.4 4.40005 16.3 5.00005 16.3C7.30005 16.3 9.50004 17 11.4 18.4C11.7 18.7 12.2 18.7 12.6 18.4C15 16.7 18 16 20.8 16.5C21.3 16.6 21.9 16.2 22 15.7C22 15.6 22 15.6 22 15.5V3.49999C22 3.09999 21.6 2.59999 21.2 2.59999Z'
                                    fill='#c7c7c7'
                                  />
                                </svg>
                                110+ Content
                              </span>
                              <Link
                                to={'./course-details-1'}
                                className='btn btn-primary btn-sm'
                              >
                                View all
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </div>
      ) : (
        <div className='row'>
          {courses.length <= 0 ? (
            <div className='loader-container'>
              <RotatingLines
                strokeColor='grey'
                strokeWidth='5'
                animationDuration='0.75'
                width='130'
                visible={true}
              />
            </div>
          ) : (
            <>
              {currentData?.map((item, index) => {
                const img = `${backendBaseUrl}/${item.file}`
                return (
                  <div className='col-xl-4 col-md-6' key={index}>
                    <div className='card all-crs-wid'>
                      <div className='card-body'>
                        <div className='courses-bx'>
                          <div style={{ height: '10vw' }}>
                            <img
                              src={img}
                              style={{
                                objectFit: 'cover',
                                width: '100%',
                                borderRadius: ' 0.625rem',
                                height: '10vw',
                              }}
                              alt='course img'
                              id='file'
                              name='file'
                            />
                          </div>
                          <div className='dlab-info'>
                            <div className='dlab-title d-flex justify-content-between'>
                              <div>
                                <h4>
                                  <Link to={'./course-details-1'}>
                                    {item.coursename}
                                  </Link>
                                </h4>
                                <p className='m-0'>
                                  {item.coursecode}
                                  <svg
                                    className='ms-1'
                                    width='4'
                                    height='5'
                                    viewBox='0 0 4 5'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <circle
                                      cx='2'
                                      cy='2.5'
                                      r='2'
                                      fill='#DBDBDB'
                                    />
                                  </svg>
                                  <span>
                                    5.0
                                    <svg
                                      width='16'
                                      height='15'
                                      viewBox='0 0 16 15'
                                      fill='none'
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                      <path
                                        d='M8 0.5L9.79611 6.02786H15.6085L10.9062 9.44427L12.7023 14.9721L8 11.5557L3.29772 14.9721L5.09383 9.44427L0.391548 6.02786H6.20389L8 0.5Z'
                                        fill='#FEC64F'
                                      />
                                    </svg>
                                  </span>
                                </p>
                              </div>
                              <h4 className='text-primary'>
                                <span>₹</span>
                                {item.price}
                              </h4>
                            </div>
                            <div className='d-flex justify-content-between content align-items-center'>
                              <span>
                                <svg
                                  className='me-2'
                                  width='24'
                                  height='25'
                                  viewBox='0 0 24 25'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M21.2 18.6C20.5 18.5 19.8 18.4 19 18.4C16.5 18.4 14.1 19.1 12 20.5C9.90004 19.2 7.50005 18.4 5.00005 18.4C4.30005 18.4 3.50005 18.5 2.80005 18.6C2.30005 18.7 1.90005 19.2 2.00005 19.8C2.10005 20.4 2.60005 20.7 3.20005 20.6C3.80005 20.5 4.40005 20.4 5.00005 20.4C7.30005 20.4 9.50004 21.1 11.4 22.5C11.7 22.8 12.2 22.8 12.6 22.5C15 20.8 18 20.1 20.8 20.6C21.3 20.7 21.9 20.3 22 19.8C22.1 19.2 21.7 18.7 21.2 18.6ZM21.2 2.59999C20.5 2.49999 19.8 2.39999 19 2.39999C16.5 2.39999 14.1 3.09999 12 4.49999C9.90004 3.09999 7.50005 2.39999 5.00005 2.39999C4.30005 2.39999 3.50005 2.49999 2.80005 2.59999C2.40005 2.59999 2.00005 3.09999 2.00005 3.49999V15.5C2.00005 16.1 2.40005 16.5 3.00005 16.5C3.10005 16.5 3.10005 16.5 3.20005 16.5C3.80005 16.4 4.40005 16.3 5.00005 16.3C7.30005 16.3 9.50004 17 11.4 18.4C11.7 18.7 12.2 18.7 12.6 18.4C15 16.7 18 16 20.8 16.5C21.3 16.6 21.9 16.2 22 15.7C22 15.6 22 15.6 22 15.5V3.49999C22 3.09999 21.6 2.59999 21.2 2.59999Z'
                                    fill='#c7c7c7'
                                  />
                                </svg>
                                110+ Content
                              </span>
                              <Link
                                to={'./course-details-1'}
                                className='btn btn-primary btn-sm'
                              >
                                View all
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </div>
      )}
      <div className='pagination-down'>
        <div className='d-flex align-items-center  '>
          <h4 className=' '>
            Showing <span>1-6 </span>from <span>{totalCourseData} </span>data
          </h4>
          <div className='d-flex align-items-center ms-auto mt-2'>
            <Button
              className='mr-2'
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            &nbsp;&nbsp;
            <span className=' fs-18 fw-bold '>
              Page {currentPage} &nbsp;&nbsp;
            </span>
            <Button
              className='ml-2'
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={endIndex >= data.length}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default CoursesMain
