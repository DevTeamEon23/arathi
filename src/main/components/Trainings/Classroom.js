import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Card, Table, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

const Classrooms = () => {
  const [classroomID, setClassroomID] = useState(); //id save for delete
  const [showModal, setShowModal] = useState(false); //delete button modal
  const [token, setToken] = useState(); //auth token
  const [classroomsData, setClassroomsData] = useState([]);
  let history = useHistory();

  useEffect(() => {
    let accessToken = window.localStorage.getItem("jwt_access_token");
    setToken(accessToken);
    getAllClassrooms();
  }, []);

  const getAllClassrooms = async () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const url = "https://v1.eonlearning.tech/lms-service/classrooms";
    try {
      const response = await axios.get(url, {
        headers: {
          "Auth-Token": jwtToken,
        },
      });
      const data = response.data.data;
      setClassroomsData(data === null ? data : data.classrooms_data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch Classroom Trainings list !");
    }
  };

  const deleteOperation = (Id) => {
    setShowModal(true);
    setClassroomID(Id);
  };

  const handleClassroomDelete = () => {
    const config = {
      headers: {
        "Auth-Token": token,
      },
    };
    const requestBody = {
      id: classroomID,
    };
    axios
      .delete(`https://v1.eonlearning.tech/lms-service/delete_classroom`, {
        ...config,
        data: requestBody,
      })
      .then((response) => {
        setShowModal(false);
        getAllClassrooms();
        toast.success("Classroom Training deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.error(error);
        setShowModal(false);
        toast.error("Failed to delete Classroom Training!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleEdit = (id) => {
    history.push(`/edit-classroom/${id}`);
  };

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Classroom Training</Card.Title>
              <div>
                <Link to="/add-classroom">
                  <Button variant="primary">Add Classroom Training</Button>
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              {classroomsData?.length <= 0 ? (
                <div className="loader-container">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="140"
                    visible={true}
                  />
                </div>
              ) : classroomsData === null ? (
                <>
                  <div>
                    <p className="text-center fs-20 fw-bold">
                      No Classroom Training Found.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="text-center">
                          <strong>NAME</strong>
                        </th>
                        <th className="text-center">
                          <strong>INSTRUCTOR</strong>
                        </th>
                        <th className="text-center">
                          <strong>VENUE</strong>
                        </th>

                        <th className="text-center">
                          <strong>DATE</strong>
                        </th>
                        <th className="text-center">
                          <strong>DURATION</strong>
                        </th>
                        <th className="text-center">
                          <strong>OPTION</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {classroomsData?.map((data) => {
                        return (
                          <tr key={data.id}>
                            <td className="text-center">{data.classname}</td>
                            <td className="text-center">{data.instname}</td>
                            <td className="text-center">{data.venue}</td>
                            <td className="text-center">
                              {data.date} {data.starttime}
                            </td>
                            <td className="text-center">
                              {data.duration} minutes
                            </td>
                            <td className="text-center">
                              <div
                                className="btn btn-primary shadow btn-xs sharp me-1"
                                title="Edit"
                                onClick={(e) => handleEdit(data.id)}>
                                <i className="fas fa-pencil-alt"></i>
                              </div>
                              <div
                                className="btn btn-danger shadow btn-xs sharp"
                                title="Delete"
                                onClick={() => deleteOperation(data.id)}>
                                <i className="fa fa-trash"></i>
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
      {/* Delete Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Classroom Training</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>
            Are you sure you want to delete this classroom training?
          </strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger light" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="btn btn-primary" onClick={handleClassroomDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <Button onClick={() => history.goBack()}>Back</Button>
      </div>
    </Fragment>
  );
};

export default Classrooms;
