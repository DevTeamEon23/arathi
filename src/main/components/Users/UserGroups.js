import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import pic1 from "@images/Users/Groupsvg.svg";

import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Nav,
  Button,
  FormCheck,
  Tab,
  Tabs,
} from "react-bootstrap";

const UserGroups = (props) => {
  const userId = props.match.params.id;
  console.log({ userId });
  const [activeTab, setActiveTab] = useState("user-groups/:id");
  let history = useHistory();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  useEffect(() => {
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1); // Remove the leading slash
    setActiveTab(tab);
  }, [history.location.pathname]);

  return (
    <Fragment>
      {/* <Nav>
        <Nav.Item as='div' className='nav nav-tabs' id='nav-tab' role='tablist'>
          <Link
            as='button'
            className='nav-link  nt-unseen'
            id='nav-following-tab'
            eventKey='Follow'
            type='button'
            to='edit-user/:id'
          >
            Info
          </Link>
          <Link
            as='button'
            className='nav-link  nt-unseen'
            id='nav-following-tab'
            eventKey='Follow'
            type='button'
            to='/user-courses-info'
          >
            Courses
          </Link>
          <Link
            as='button'
            className='nav-link  nt-unseen'
            id='nav-following-tab'
            eventKey='Follow'
            type='button'
            to='/user-groups'
          >
            Groups
          </Link>
          <Link
            as='button'
            className='nav-link  nt-unseen'
            id='nav-following-tab'
            eventKey='Follow'
            type='button'
            to='/user-files'
          >
            Files
          </Link>
        </Nav.Item>
      </Nav> */}
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey={`edit-user/${userId}`} title="Info"></Tab>
              <Tab
                eventKey={`user-courses-info/${userId}`}
                title="Courses"></Tab>
              <Tab eventKey={`user-groups/${userId}`} title="Groups"></Tab>
              <Tab eventKey={`user-files/${userId}`} title="Files"></Tab>
            </Tabs>
            <div className="card-header">
              <h4 className="card-title">All Groups </h4>
            </div>

            <div className="row mb-5">
              <div className="col-lg-3"></div>
              <div className="col-lg-7">
                <img src={pic1} height={500} width={500} />
                <h4 className="mb-10">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You
                  have not added in any Group
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserGroups;
