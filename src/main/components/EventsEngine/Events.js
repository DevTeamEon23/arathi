import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Dropdown,
  ProgressBar,
  Button,
  Nav,
  Modal,
  Tab,
  Tabs,
} from "react-bootstrap";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [data, setData] = useState([]);
  const [eventId, setEventId] = useState(); //grp id save for delete
  const [token, setToken] = useState(); //auth token
  const [eventData, setEventData] = useState([]);
  const [showModal, setShowModal] = useState(false); //delete button modal
  const [activeTab, setActiveTab] = useState("events");
  const history = useHistory();

  useEffect(() => {
    let accessToken = window.localStorage.getItem("jwt_access_token");
    setToken(accessToken);
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const url = "lms-service/events";
    try {
      const response = await axios.get(url, {
        headers: {
          "Auth-Token": jwtToken,
        },
      });
      console.log("getAllEvents", response.data);
      setEventData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch Courses !"); // Handle the error
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  useEffect(() => {
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1);
    setActiveTab(tab);
  }, [history.location.pathname]);

  const handleEdit = (id) => {
    console.log("inside event handle edit page", id);
    history.push(`/edit-events/${id}`);
  };

  const deleteEvent = (eventId) => {
    setShowModal(true);
    setEventId(eventId);
  };

  const handleDelete = async () => {
    const config = {
      headers: {
        "Auth-Token": token,
      },
    };
    const requestBody = {
      id: eventId,
    };
    await axios
      .delete(`lms-service/delete_event`, {
        ...config,
        data: requestBody,
      })
      .then((response) => {
        setShowModal(false);
        getAllEvents();
        toast.success("Event deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete a event!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey="events" title="Notification"></Tab>
              <Tab
                eventKey="pending-notification"
                title="Pending Notification"></Tab>
            </Tabs>
            <Card.Header>
              <Card.Title>Notifications</Card.Title>
              <div>
                <Link to="/add-events">
                  <Button variant="primary">Add Notification</Button>
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              {eventData.length === 0 ? (
                <div className="loader-container">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="130"
                    visible={true}
                  />
                </div>
              ) : eventData.length > 0 ? (
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
                          <strong>Event</strong>
                        </center>
                      </th>
                      <th>
                        <center>
                          {" "}
                          <strong>Recipent</strong>
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
                    {eventData?.map((item, index) => {
                      return (
                        <tr key={index}>
                          {/* <td>
                          <center>{item.id}</center>
                        </td> */}
                          <td>
                            <center>{item.ename}</center>
                          </td>
                          <td>
                            <center>{item.eventtype}</center>
                          </td>
                          <td>
                            <center>{item.recipienttype}</center>
                          </td>
                          <td>
                            <center>
                              <div
                                className="btn btn-primary shadow btn-xs sharp me-1"
                                onClick={(e) => handleEdit(item.id)}>
                                <i className="fas fa-pencil-alt"></i>
                              </div>

                              <div
                                className="btn btn-danger shadow btn-xs sharp"
                                onClick={() => deleteEvent(item.id)}>
                                <i className="fa fa-trash"></i>
                              </div>
                            </center>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <>
                  {" "}
                  <div>
                    <p className="text-center fs-20 fw-bold">No Event Found.</p>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div>
        <Button onClick={() => history.goBack()}>Cancel</Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Are you sure you want to delete a Event?</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger light" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="btn btn-primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Events;
