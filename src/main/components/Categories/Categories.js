import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Tab,
  Tabs,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

const Categories = () => {
  const [getAllCategoriesData, setGetAllCategoriesData] = useState([]);
  const [token, setToken] = useState(); //auth token
  const [categoryId, setCategoryId] = useState(); //cat id save for delete
  const [showModal, setShowModal] = useState(false); //delete button modal
  const [activeTab, setActiveTab] = useState("dashboard");
  const history = useHistory();

  useEffect(() => {
    let accessToken = window.localStorage.getItem("jwt_access_token");
    setToken(accessToken);
    getAllCategories();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  useEffect(() => {
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1);
    setActiveTab(tab);
  }, [history.location.pathname]);

  // All Categories List
  const getAllCategories = async () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const url = "https://v1.eonlearning.tech/lms-service/categories";
    try {
      const response = await axios.get(url, {
        headers: {
          "Auth-Token": jwtToken,
        },
      });

      const data = response.data.data;
      setGetAllCategoriesData(data === null ? data : data.categories_data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch Categories !"); // Handle the error
    }
  };

  const deleteOperation = (catId) => {
    setShowModal(true);
    setCategoryId(catId);
  };

  const handleCatDelete = () => {
    const config = {
      headers: {
        "Auth-Token": token, // Attach the JWT token in the Authorization header
      },
    };
    const requestBody = {
      id: categoryId,
    };
    axios
      .delete(`https://v1.eonlearning.tech/lms-service/delete_category`, {
        ...config,
        data: requestBody,
      })
      .then((response) => {
        setShowModal(false);

        getAllCategories();
        toast.success("Category deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.error(error);
        setShowModal(false);
        toast.error("Failed to delete Category!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleEdit = (id) => {
    history.push(`/edit-category/${id}`);
  };

  return (
    <Fragment>
      <Tabs activeKey={activeTab} onSelect={handleTabChange}>
        <Tab eventKey="dashboard" title="Dashboard"></Tab>
        <Tab eventKey="add-category" title="Add Category"></Tab>
      </Tabs>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Categories</Card.Title>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/add-category">
                <Button variant="primary">Add Categories</Button>
              </Link>
            </Card.Header>
            <Card.Body>
              {getAllCategoriesData?.length <= 0 ? (
                <div className="loader-container">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="140"
                    visible={true}
                  />
                </div>
              ) : getAllCategoriesData === null ? (
                <div>
                  <p className="text-center fs-20 fw-bold">
                    No Category Found.
                  </p>
                </div>
              ) : (
                <>
                  <Table responsive>
                    <thead>
                      <tr>
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
                            <td>
                              <center>{item.name}</center>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                              <div className="d-flex">
                                <div
                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                  title="Edit"
                                  onClick={(e) => handleEdit(item.id)}>
                                  <i className="fas fa-pencil-alt"></i>
                                </div>
                                <div
                                  className="btn btn-danger shadow btn-xs sharp"
                                  title="Delete"
                                  onClick={() => deleteOperation(item.id)}>
                                  <i className="fa fa-trash"></i>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
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
