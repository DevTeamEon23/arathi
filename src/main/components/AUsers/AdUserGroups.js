import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";

const AdUserGroups = (props) => {
  const userId = props.match.params.id;
  const [activeTab, setActiveTab] = useState("insuser-groups/:id");
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
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey={`insedit-user/${userId}`} title="Info"></Tab>
              <Tab eventKey={`insuser-course/${userId}`} title="Courses"></Tab>
              <Tab eventKey={`insuser-groups/${userId}`} title="Groups"></Tab>
              <Tab eventKey={`insuser-files/${userId}`} title="Files"></Tab>
            </Tabs>
            <div className="card-header">
              <h4 className="card-title">Groups </h4>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdUserGroups;
