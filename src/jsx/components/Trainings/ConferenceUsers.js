import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import PageTitle from "../../layouts/PageTitle";
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Dropdown,
  ProgressBar,
  Button,
  Modal,
} from "react-bootstrap";

/// imge
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import avatar3 from "../../../images/avatar/3.jpg";
import { Link } from "react-router-dom";

const options = [
    { value: "certificate_1", label: "Select Course/Group" },
    { value: "certificate_2", label: "Certificate 2" },
    { value: "certificate_3", label: "Certificate 3" },
    { value: "certificate_4", label: "Certificate 4" },
  ];

const ConferenceUsers = () => {
  const [sendMessage, setSendMessage] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
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
      <PageTitle activeMenu="Groups" motherMenu="Dashboard" />
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Conference Training</Card.Title>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="col-lg-4">
            <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
            >
            </Select>
            </div>
              <div>
                <Link to="#">
                  <Button variant="primary" onClick={() => setSendMessage(true)}><i class="bi bi-envelope">&nbsp;</i>Notify Users</Button>
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="width80">
                      <strong>USER</strong>
                    </th>
                    <th>
                      <strong>Role</strong>
                    </th>
                    <th>
                      <strong>OPTION</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Hitesh</strong>
                    </td>
                    <td>Moderate</td>
                    <td>
                    <Link to="#"><td><i class="bi bi-plus-circle-fill"></i></td></Link>
                    <Link to="#"><td><i class="bi bi-dash-circle-fill"></i></td></Link></td>
                  </tr>
                                    {/* send Modal */}
								  <Modal className="modal fade" show={sendMessage}>
									<div className="modal-content">
									  <div className="modal-header">
										<h5 className="modal-title">Send Message</h5>
										<Button variant="" type="button" className="close" data-dismiss="modal" onClick={() => setSendMessage(false)}>
										  <span>×</span>
										</Button>
									  </div>
									  <div className="modal-body">
										<form className="comment-form" onSubmit={(e) => { e.preventDefault(); setSendMessage(false); }}>
										  <div className="row">
											<div className="col-lg-12">
											  <div className="form-group mb-3">
												<label htmlFor="comment" className="text-black font-w600">Comment</label>
												<textarea rows={8} className="form-control" name="comment" placeholder="Comment" defaultValue={""}/>
											  </div>
											</div>
											<div className="col-lg-12">
											  <div className="form-group mb-3">
												<input type="submit" value="Send Message" className="submit btn btn-primary" name="submit"/>
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
      <Link to="/edit-conference">
            <Button variant="primary"><i class="bi bi-arrow-return-left">&nbsp;</i>Back</Button>
        </Link>
      </div>
    </Fragment>
  );
};

export default ConferenceUsers;