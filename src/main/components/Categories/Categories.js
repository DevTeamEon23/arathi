import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Dropdown,
  ProgressBar,
  Button,
} from "react-bootstrap";
import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner'
import { Link } from "react-router-dom";

const Categories = () => {
  const [data, setData] = useState([]);
  const [getAllCategoriesData,setGetAllCategoriesData] = useState([]);
  const [token, setToken] = useState() //auth token

  useEffect(() => {
    let accessToken = window.localStorage.getItem("jwt_access_token");
    setToken(accessToken);
    getAllCourses();
    console.log(getAllCategoriesData);
  }, []);

  const getAllCourses = async () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const url = "http://127.0.0.1:8000/lms-service/categories";
    try {
      const response = await axios.get(url, {
        headers: {
          "Auth-Token": jwtToken,
        },
      });

      // Handle the response data here
      console.log("getAllCourses", response.data);
      setGetAllCategoriesData(response.data.data);
    } catch (error) {
      // Handle errors if any
      console.error("Error fetching data:", error);
      toast.error('Failed to fetch Courses !') // Handle the error
    }
  };


  const fetchData = () => {
    fetch(`https://localhost:8000/categories`)
    //This function is used while fetching data from FASTAPI (HTTP/HTTPS) 3.110.124.80
      // .then((response) => response.json())
      // .then((actualData) => {
      //   console.log(actualData);
      //   setUsers(actualData.data);
      //   console.log(data);

      // This is used for fetching data from json-server port 4000 fastAPI 8000
      .then((res) => res.json())
      .then((data) => {
         console.log(data);
         setData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // useEffect( async () => {
  //   fetchData();
  // }, []);

  async function deleteOperation(id)
  {
    if (window.confirm('Are you sure?'))
    {
      let result=await fetch("https://localhost:8000/categories/"+id,{
        method:'DELETE'
      });
      result=await result.json();
      console.warn(result)
      fetchData();
    }
  }

  const chackbox = document.querySelectorAll(".bs_exam_topper input");
  const motherChackBox = document.querySelector(".bs_exam_topper_all input");
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };
  const svg1 = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect x="0" y="0" width="24" height="24"></rect>
        <circle fill="#000000" cx="5" cy="12" r="2"></circle>
        <circle fill="#000000" cx="12" cy="12" r="2"></circle>
        <circle fill="#000000" cx="19" cy="12" r="2"></circle>
      </g>
    </svg>
  );

  let history = useHistory();
  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Categories</Card.Title>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<Link to="/add-category">
							<Button variant="primary">Add Categories</Button>
							</Link>
							<Link to="/courses" >
                <h6>View Course Catalog&nbsp;&nbsp;<i class="bi bi-arrow-right-square-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                </h6>
							</Link>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th></th>
                    <th className="width80">
                      <strong>#</strong>
                    </th>
                    <th>
                      <center><strong>NAME</strong></center>
                    </th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>
                      <strong>OPTION</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {getAllCategoriesData?.map((item, index) => {
               return (
                  <tr key={index}>
                    <td></td>
                    <td>
                      <strong>{item.id}</strong>
                    </td>
                    <td><center>{item.name}</center></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className="d-flex">
                        <Link
                          to="/edit-category"
                          className="btn btn-primary shadow btn-xs sharp me-1"
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-danger shadow btn-xs sharp"
                          onClick={()=>deleteOperation(item.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
               );
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
  );
};

export default Categories;