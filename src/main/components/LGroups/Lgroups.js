import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

const Lgroups = () => {
  const [token, setToken] = useState(); //auth token
  const [groups, setGroups] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let accessToken = window.localStorage.getItem("jwt_access_token");
    let ID = window.localStorage.getItem("id");
    setToken(accessToken);
    fetchGroupData(accessToken, ID);
  }, []);

  const fetchGroupData = async (accessToken, ID) => {
    try {
      const queryParams = {
        user_id: ID,
      };
      const url = new URL(
        "https://v1.eonlearning.tech/lms-service/fetch_enrolled_groups_of_users"
      );
      url.search = new URLSearchParams(queryParams).toString();
      const response = await axios.get(url.toString(), {
        headers: {
          "Auth-Token": accessToken,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("API Response:", response.data.data);
      const data = response.data.data;
      setGroups(data === null ? data : data.group_ids);
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to fetch Groups !");
    }
  };

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Groups</Card.Title>
            </Card.Header>
            <Card.Body>
              {groups?.length <= 0 ? (
                <div className="loader-container">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="140"
                    visible={true}
                  />
                </div>
              ) : groups === null ? (
                <>
                  <div>
                    <p className="text-center fs-20 fw-bold">No Group Found.</p>
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
                          <strong>DESCRIPTION</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {groups?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-center">{item.groupname}</td>
                            <td className="text-center">{item.groupdesc}</td>
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

export default Lgroups;
