import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

const Lclassroom = () => {
  const [token, setToken] = useState(); //auth token
  const [classroomsData, setClassroomsData] = useState([]);
  const history = useHistory();

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
      toast.error("Failed to fetch Classroom Trainings list !"); // Handle the error
    }
  };

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Classroom Training</Card.Title>
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
    </Fragment>
  );
};

export default Lclassroom;
