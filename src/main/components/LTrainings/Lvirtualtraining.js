import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

const Lvirtualtraining = () => {
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
    const url = "https://beta.eonlearning.tech/lms-service/virtualtrainings";
    try {
      const response = await axios.get(url, {
        headers: {
          "Auth-Token": jwtToken,
        },
      });
      const data = response.data.data;
      setAllVirtualTData(data === null ? data : data.virtualtrainings_data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch Virtual Training list !"); // Handle the error
    }
  };

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Virtual Training</Card.Title>
            </Card.Header>
            <Card.Body>
              {allVirtualTData?.length <= 0 ? (
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
                      </tr>
                    </thead>
                    <tbody>
                      {allVirtualTData?.map((data) => {
                        return (
                          <tr key={data.id}>
                            <td className="text-center">
                              <strong>{data.virtualname}</strong>
                            </td>
                            <td className="text-center">{data.instname}</td>
                            {/* <td><i class="bi bi-play-circle-fill"></i>{data.meetlink}</td> */}
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

export default Lvirtualtraining;
