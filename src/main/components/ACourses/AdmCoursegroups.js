import React, { Fragment, useState, useEffect } from "react";
// import PageTitle from "../../layouts/PageTitle";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Tab,
  Tabs,
  Button,
  Modal,
} from "react-bootstrap";

const AdmCoursegroups = (props) => {
  const courseID = props.match.params.id;
  const [activeTab, setActiveTab] = useState("adm_course_groups/:id");
  const [UserInsGroups, setUserInsGroups] = useState();
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 10; // Number of items to display per page
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData =
    UserInsGroups === null ? null : UserInsGroups.slice(startIndex, endIndex);

  return (
    <Fragment>
      <Tabs activeKey={activeTab} onSelect={handleTabChange}>
        <Tab eventKey={`edit-courses/${courseID}`} title="Course"></Tab>
        <Tab eventKey={`adm_course_users/${courseID}`} title="Users"></Tab>
        <Tab eventKey={`adm_course_groups/${courseID}`} title="Groups"></Tab>
      </Tabs>

      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body></Card.Body>
          </Card>
        </Col>
      </Row>
      <div>
        <Button onClick={() => history.goBack()}>Back</Button>
      </div>
    </Fragment>
  );
};

export default AdmCoursegroups;
