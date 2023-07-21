import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col, Card, Table, Nav, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Categories = () => {
  const [getAllCategoriesData, setGetAllCategoriesData] = useState([]);
  const [token, setToken] = useState(); //auth token
  const [uid, setUId] = useState(); //user id save for delete
  const [showModal, setShowModal] = useState(false); //delete button modal

  useEffect(() => {
    let accessToken = window.localStorage.getItem("jwt_access_token");
    setToken(accessToken);
    getAllCategories();
    console.log(getAllCategoriesData);
  }, []);

  // All Categories List
  const getAllCategories = async () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const url = "http://127.0.0.1:8000/lms-service/categories";
    try {
      const response = await axios.get(url, {
        headers: {
          "Auth-Token": jwtToken,
        },
      });

      // Handle the response data here
      console.log("getAllCategories", response.data);
      setGetAllCategoriesData(response.data.data);
    } catch (error) {
      // Handle errors if any
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch Courses !"); // Handle the error
    }
  };

  const deleteOperation = (userId) => {
    setShowModal(true);
    console.log("inside delete user", userId);
    setUId(userId);
  };

  const handleCatDelete = () => {
    console.log("modal delete", uid);
    const config = {
      headers: {
        "Auth-Token": token, // Attach the JWT token in the Authorization header
      },
    };
    const requestBody = {
      id: uid,
    };
    console.log("config", config, requestBody);
    // Make the Axios DELETE request
    axios
      .delete(`http://127.0.0.1:8000/lms-service/delete_category`, {
        ...config,
        data: requestBody,
      })
      .then((response) => {
        setShowModal(false);
        console.log(response.data.status);
        getAllCategories();
        toast.success("Category deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
        toast.error("Failed to delete Category!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

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
      <Nav>
        <Nav.Item as="div" className="nav nav-tabs" id="nav-tab" role="tablist">
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventkey="Follow"
            type="button"
            to="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventkey="Follow"
            type="button"
            to="/add-category"
          >
            Add Category
          </Link>
        </Nav.Item>
      </Nav>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Categories</Card.Title>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/add-category">
                <Button variant="primary">Add Categories</Button>
              </Link>
              <Link to="/courses">
                <h6>
                  View Course Catalog&nbsp;&nbsp;
                  <i class="bi bi-arrow-right-square-fill"></i>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                </h6>
              </Link>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    {/* <th></th> */}
                    {/* <th className='width80'>
                      <strong>#</strong>
                    </th> */}
                    <th>
                      <center>
                        <strong>NAME</strong>
                      </center>
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
                        {/* <td></td> */}
                        {/* <td>
                          <strong>{item.id}</strong>
                        </td> */}
                        <td>
                          <center>{item.name}</center>
                        </td>
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
                            <div
                              className="btn btn-danger shadow btn-xs sharp"
                              onClick={() => deleteOperation(item.id)}
                            >
                              <i className="fa fa-trash"></i>
                            </div>
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
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Are you sure you want to delete this Category?</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger light" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="btn btn-primary" onClick={handleCatDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Categories;

// async function deleteOperation(id)
//   {
//     if (window.confirm('Are you sure?'))
//     {
//       let result=await fetch("https://localhost:8000/categories/"+id,{
//         method:'DELETE'
//       });
//       result=await result.json();
//       console.warn(result)
//       fetchData();
//     }
//   }
