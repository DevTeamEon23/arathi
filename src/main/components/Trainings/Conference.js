import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Card, Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

const Conferences = () => {
  // const [sendMessage, setSendMessage] = useState(false)
  const [conferencesID, setConferencesID] = useState(); //id save for delete
  const [showModal, setShowModal] = useState(false); //delete button modal
  const [token, setToken] = useState(); //auth token
  const [allConferenceData, setAllConferenceData] = useState([]); //set all conference data
  let history = useHistory();

  useEffect(() => {
    let accessToken = window.localStorage.getItem("jwt_access_token");
    setToken(accessToken);
    getAllConferences();
  }, []);

  const getAllConferences = async () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const url = "lms-service/conferences";
    try {
      const response = await axios.get(url, {
        headers: {
          "Auth-Token": jwtToken,
        },
      });
      const conferenceData = response.data.data;
      console.log("getAllConferences", response.data);
      setAllConferenceData(
        conferenceData === null
          ? conferenceData
          : conferenceData.conferences_data
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch conferences list !"); // Handle the error
    }
  };

  const deleteOperation = (Id) => {
    setShowModal(true);
    console.log("inside delete conference", Id);
    setConferencesID(Id);
  };

  const handleConferenceDelete = () => {
    console.log("modal delete", conferencesID);
    const config = {
      headers: {
        "Auth-Token": token,
      },
    };
    const requestBody = {
      id: conferencesID,
    };
    axios
      .delete(`lms-service/delete_conference`, {
        ...config,
        data: requestBody,
      })
      .then((response) => {
        setShowModal(false);
        console.log(response.data.status);
        getAllConferences();
        toast.success("Conference deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.error(error);
        setShowModal(false);
        toast.error("Failed to delete Conference!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleEdit = (id) => {
    history.push(`/edit-conference/${id}`);
  };

  return (
    <Fragment>
      <Row mb={5}>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>CONFERENECES</Card.Title>
              <div>
                <Link to="/add-conference">
                  <Button variant="primary">Add Conference</Button>
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              {allConferenceData?.length <= 0 ? (
                <div className="loader-container">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="140"
                    visible={true}
                  />
                </div>
              ) : allConferenceData === null ? (
                <>
                  <div>
                    <p className="text-center fs-20 fw-bold">
                      No Conference Found.
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
                      {allConferenceData?.map((data) => {
                        return (
                          <tr key={data.id}>
                            <td className="text-center">{data.confname}</td>
                            <td className="text-center">{data.instname}</td>
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
                            <td className="text-center">
                              {data.duration} minutes
                            </td>
                            <td className="text-center">
                              {/* <Link
                              to='/add-conference'
                              className='btn btn-primary shadow btn-xs sharp me-1'
                            >
                              <i class='fa-solid fa-plus'></i>
                            </Link>
                            <Link
                              className='btn btn-primary shadow btn-xs sharp me-1'
                              onClick={() => setSendMessage(true)}
                            >
                              <i class='bi bi-envelope-fill'></i>
                            </Link> */}
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
          <Modal.Title>Delete Conference</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Are you sure you want to delete this Conference ?</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger light" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="btn btn-primary" onClick={handleConferenceDelete}>
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

export default Conferences;

{
  /* send Modal */
}
//  <Modal className='modal fade' show={sendMessage}>
//  <div className='modal-content'>
//    <div className='modal-header'>
//      <h5 className='modal-title'>Send Message</h5>
//      <Button
//        variant=''
//        type='button'
//        className='close'
//        data-dismiss='modal'
//        onClick={() => setSendMessage(false)}
//      >
//        <span>×</span>
//      </Button>
//    </div>
//    <div className='modal-body'>
//      <form
//        className='comment-form'
//        onSubmit={(e) => {
//          e.preventDefault()
//          setSendMessage(false)
//        }}
//      >
//        <div className='row'>
//          <div className='col-lg-12'>
//            <div className='form-group mb-3'>
//              <label
//                htmlFor='comment'
//                className='text-black font-w600'
//              >
//                Comment
//              </label>
//              <textarea
//                rows={8}
//                className='form-control'
//                name='comment'
//                placeholder='Comment'
//                defaultValue={''}
//              />
//            </div>
//          </div>
//          <div className='col-lg-12'>
//            <div className='form-group mb-3'>
//              <input
//                type='submit'
//                value='Send Message'
//                className='submit btn btn-primary'
//                name='submit'
//              />
//            </div>
//          </div>
//        </div>
//      </form>
//    </div>
//  </div>
// </Modal>
