import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Card, Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

const VirtualTraining = () => {
  const [virtualTID, setVirtualTID] = useState(); //id save for delete
  const [showModal, setShowModal] = useState(false); //delete button modal
  const [token, setToken] = useState(); //auth token
  const [allVirtualTData, setAllVirtualTData] = useState([]); //set all virtual training data
  let history = useHistory();

  useEffect(() => {
    let accessToken = window.localStorage.getItem("jwt_access_token");
    setToken(accessToken);
    getAllVirtualTrainings();
  }, []);

  const getAllVirtualTrainings = async () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const url = "https://v1.eonlearning.tech/lms-service/virtualtrainings";
    try {
      const response = await axios.get(url, {
        headers: {
          "Auth-Token": jwtToken,
        },
      });
      const data = response.data.data;
      console.log("getAllVirtualTrainings", response.data);
      setAllVirtualTData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch Virtual Training list !"); // Handle the error
    }
  };

  const deleteOperation = (Id) => {
    setShowModal(true);
    setVirtualTID(Id);
  };

  const handleVirtualTDelete = () => {
    console.log("modal delete", virtualTID);
    const config = {
      headers: {
        "Auth-Token": token,
      },
    };
    const requestBody = {
      id: virtualTID,
    };
    axios
      .delete(
        `https://v1.eonlearning.tech/lms-service/delete_virtualtraining`,
        {
          ...config,
          data: requestBody,
        }
      )
      .then((response) => {
        setShowModal(false);
        console.log(response.data.status);
        getAllVirtualTrainings();
        toast.success("Virtual Training deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.error(error);
        setShowModal(false);
        toast.error("Failed to delete Virtual Training!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleEdit = (id) => {
    history.push(`/edit-virtual-trainings/${id}`);
  };

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Virtual Training</Card.Title>
              <div>
                <Link to="/add-virtual-trainings">
                  <Button variant="primary">Add Virtual Training</Button>
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              {allVirtualTData.length <= 0 ? (
                <div className="loader-container">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="140"
                    visible={true}
                  />
                </div>
              ) : allVirtualTData === null ? (
                <>
                  <div>
                    <p className="text-center fs-20 fw-bold">
                      No Virtual Training Found.
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
                          <strong>JOIN</strong>
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
                      {allVirtualTData?.map((data) => {
                        return (
                          <tr key={data.id}>
                            <td className="text-center">{data.virtualname}</td>
                            <td className="text-center">{data.instname}</td>
                            {/* <Link to='#'>
                              <center>
                                <td>
                                  <i class='bi bi-play-circle-fill'></i>
                                </td>
                              </center>
                            </Link> */}
                            <td className="text-center">
                              <a
                                href={data.meetlink}
                                target="_blank"
                                rel="noopener noreferrer">
                                {data.meetlink}
                              </a>
                            </td>
                            <td className="text-center">
                              {data.date} {data.starttime}
                            </td>
                            <td className="text-center">{data.duration}</td>
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
          <Modal.Title>Delete Virtual Training</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>
            Are you sure you want to delete this Virtual Training ?
          </strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger light" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="btn btn-primary" onClick={handleVirtualTDelete}>
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

export default VirtualTraining;
