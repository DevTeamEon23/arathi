import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
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

const GroupCourses = (props) => {
  const grpId = props.match.params.id;
  console.log({ grpId });
  const [sendMessage, setSendMessage] = useState(false);
  const [activeTab, setActiveTab] = useState("group-courses/:id");
  const history = useHistory();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  useEffect(() => {
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1);
    setActiveTab(tab);
  }, [history.location.pathname]);

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

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey={`edit-groups/${grpId}`} title="Info"></Tab>
              <Tab eventKey={`groups-users/${grpId}`} title="Users"></Tab>
              <Tab eventKey={`group-courses/${grpId}`} title="Courses"></Tab>
              <Tab eventKey={`group-files/${grpId}`} title="Files"></Tab>
            </Tabs>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="width80">
                      <strong>COURSE</strong>
                    </th>
                    <th></th>
                    <th>
                      <strong>
                        <center>CATEGORY</center>
                      </strong>
                    </th>
                    <th>
                      <strong>OPTION</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Content and LMS</strong>
                    </td>
                    <td></td>
                    <td>
                      <center>Samples</center>
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="success"
                          className="light sharp i-false">
                          {svg1}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => setSendMessage(true)}>
                            <i class="bi bi-plus-circle">&nbsp;</i>Add
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Give your course a name</strong>
                    </td>
                    <td></td>
                    <td>
                      <center>Samples</center>
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="success"
                          className="light sharp i-false">
                          {svg1}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => setSendMessage(true)}>
                            <i class="bi bi-dash">&nbsp;</i>delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                  {/* send Modal */}
                  <Modal className="modal fade" show={sendMessage}>
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">
                          Send Message to Enroll this User
                        </h5>
                        <Button
                          variant=""
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          onClick={() => setSendMessage(false)}>
                          <span>×</span>
                        </Button>
                      </div>
                      <div className="modal-body">
                        <form
                          className="comment-form"
                          onSubmit={(e) => {
                            e.preventDefault();
                            setSendMessage(false);
                          }}>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label
                                  htmlFor="author"
                                  className="text-black font-w600">
                                  {" "}
                                  Name <span className="required">*</span>{" "}
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="Author"
                                  name="Author"
                                  placeholder="Author"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label
                                  htmlFor="email"
                                  className="text-black font-w600">
                                  {" "}
                                  Email <span className="required">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="Email"
                                  placeholder="Email"
                                  name="Email"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mb-3">
                                <label
                                  htmlFor="comment"
                                  className="text-black font-w600">
                                  Comment
                                </label>
                                <textarea
                                  rows={8}
                                  className="form-control"
                                  name="comment"
                                  placeholder="Comment"
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mb-3">
                                <input
                                  type="submit"
                                  value="Enroll User"
                                  className="submit btn btn-primary"
                                  name="submit"
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Modal>
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

export default GroupCourses;
