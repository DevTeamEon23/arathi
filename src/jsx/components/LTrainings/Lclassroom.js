import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  Nav,
} from "react-bootstrap";

/// imge
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import avatar3 from "../../../images/avatar/3.jpg";
import { Link } from "react-router-dom";



const Lclassroom = () => {
  const [sendMessage, setSendMessage] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const getClassrooms = async () => {
    const requestOptions = {
      method:"GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api", requestOptions);
    const data = await response.json();

    console.log(data);
  };
  const fetchData = () => {
     fetch('http://localhost:8000/classrooms')
        .then((res) => res.json())
        .then((data) => {
           console.log(data);
           setClassrooms(data); 
        })
        .catch((err) => {
           console.log(err.message);
        });
  };

  useEffect( async () => {
    fetchData();
  }, []);

  async function deleteOperation(id)
  {
    if (window.confirm('Are you sure?'))
    {
      let result=await fetch("http://localhost:8000/classrooms/"+id,{
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
            <Nav >
				<Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/lconference">Conference</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/lvirtualtraining">Virtual Training</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/lclassroom">Classroom Training</Link>
        </Nav.Item>
      </Nav>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Classroom Training</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="width80">
                      <strong><center>NAME</center></strong>
                    </th>
                    <th>
                      <strong><center>INSTRUCTOR</center></strong>
                    </th>
                    <th>
                      <strong><center>VENUE</center></strong>
                    </th>
                    <th>
                      <strong><center>USERS</center></strong>
                    </th>
                    <th>
                      <strong><center>JOINED</center></strong>
                    </th>
                    <th>
                      <strong><center>DATE</center></strong>
                    </th>
                    <th>
                      <strong><center>DURATION</center></strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {classrooms?.map((data) => {
               return (
                  <tr key={data.id}>
                    <td>
                      
                    <center><strong>{data.classname}</strong>
                      </center>
                    </td>
                    <td><center>{data.instname}</center></td>
                    <td><center>{data.venue}</center></td>
                    <td><center>5</center></td>
                    <td><center>-</center></td>
                    <td><center>{data.date} {data.starttime}</center></td>
                    <td><center>{data.duration}</center></td>
                  </tr>
               );
                })}
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
      <Button onClick={() => history.goBack()}>Back</Button>
      </div>
    </Fragment>
  );
};

export default Lclassroom;