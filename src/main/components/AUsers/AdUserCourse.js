import React, { Fragment, useState, useEffect } from "react";
// import PageTitle from "../../layouts/PageTitle";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Tab,
  Tabs,
  Button,
  Nav,
} from "react-bootstrap";

const options_1 = [
  { value: "ist", label: "India Standard Time (IST)" },
  { value: "nst", label: "New Zealand Standard Time (NST)" },
  { value: "ast", label: "Alaska Standard Time (AST)" },
  { value: "gmt", label: "Greenwich Mean Time (GMT)" },
  { value: "ect", label: "European Central Time (ECT)" },
  { value: "arabic", label: "Egypt Standard Time	(Arabic)" },
];

const AdUserCourse = (props) => {
  const userId = props.match.params.id;
  const [activeTab, setActiveTab] = useState("insuser-course/:id");
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

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey={`insedit-user/${userId}`} title="Info"></Tab>
              <Tab eventKey={`insuser-course/${userId}`} title="Courses"></Tab>
              <Tab eventKey={`insuser-groups/${userId}`} title="Groups"></Tab>
              <Tab eventKey={`insuser-files/${userId}`} title="Files"></Tab>
            </Tabs>
            <Card.Header>
              <Card.Title>Courses</Card.Title>
            </Card.Header>
            <Card.Body></Card.Body>
          </Card>
        </Col>
      </Row>
      <div>
        <Button onClick={() => history.goBack()}>Cancel</Button>
      </div>
    </Fragment>
  );
};

export default AdUserCourse;
