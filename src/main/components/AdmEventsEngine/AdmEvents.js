import React, { Fragment, useState, useEffect } from "react";
// import PageTitle from "../../layouts/PageTitle";
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
} from "react-bootstrap";



const AdmEvents = () => {
  const chackbox = document.querySelectorAll(".bs_exam_topper input");
  const motherChackBox = document.querySelector(".bs_exam_topper_all input");
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
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
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(`https://localhost:8000/lmsevents`)
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

  useEffect( async () => {
    fetchData();
  }, []);

  async function deleteOperation(id)
  {
    if (window.confirm('Are you sure?'))
    {
      let result=await fetch("https://localhost:8000/lmsevents/"+id,{
        method:'DELETE'
      });
      result=await result.json();
      console.warn(result)
      fetchData();
    }
  }
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
          <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/adm_events">Notification</Link>
          <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/adm_pending-notification">Pending Notification</Link>
        </Nav.Item>
      </Nav>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Notifications</Card.Title>
              <div>
                <Link to="/adm_add-events">
                  <Button variant="primary">Add Notification</Button>
                </Link>&nbsp;&nbsp;
                <Link to="/adm_customize-system-notification">
                  <Button variant="primary">Customize system Notification</Button>
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="width80">
                      <strong>#</strong>
                    </th>
                    <th>
                      <strong>NAME</strong>
                    </th>
                    <th>
                      <strong>Event</strong>
                    </th>
                    <th>
                      <strong>Recipent</strong>
                    </th>
                    <th>
                      <strong>OPTION</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {data?.map((item, index) => {
               return (
                <tr key={index}>
                <td><center>{item.id}</center></td>
                    <td>{item.ename}</td>
                    <td>{item.eventtype}</td>
                    <td>{item.recipienttype}</td>
                    <td>
                        <center>
                        <Link
                          to="/edit-events"
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
                        </center>
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
      <Button onClick={() => history.goBack()}>Cancel</Button>
      </div>
    </Fragment>
  );
};

export default AdmEvents;