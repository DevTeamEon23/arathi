import React from "react";
import { Row, Col, Card, Button, Modal, Nav, Tab, Tabs } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import badge1 from "@images/svg/LearningNewbie.svg";
import badge2 from "@images/svg/LearningGrower.svg";
import badge3 from "@images/svg/LearningAdventurer.svg";
import badge4 from "@images/svg/LearningExplorer.svg";

import badge5 from "@images/svg/AssignmentNewbie.svg";
import badge6 from "@images/svg/AssignmentGrower.svg";
import badge7 from "@images/svg/AssignmentAdventurer.svg";
import badge8 from "@images/svg/AssignmentExplorer.svg";
import badge9 from "@images/svg/CertificationNewbie.svg";
import badge10 from "@images/svg/CertificationGrower.svg";
import badge11 from "@images/svg/CertificationAdventurer.svg";
import badge12 from "@images/svg/CertificationExplorer.svg";

const badges = [
  { name: "Badge", svgUrl: badge1 },
  { name: "Badge ", svgUrl: badge2 },
  { name: "Badge", svgUrl: badge3 },
  { name: "Badge ", svgUrl: badge4 },
  { name: "Badge", svgUrl: badge5 },
  { name: "Badge ", svgUrl: badge6 },
  { name: "Badge", svgUrl: badge7 },
  { name: "Badge ", svgUrl: badge8 },
  { name: "Badge", svgUrl: badge9 },
  { name: "Badge ", svgUrl: badge10 },
  { name: "Badge ", svgUrl: badge11 },
  { name: "Badge ", svgUrl: badge12 },
];

const Badges = () => {
  const history = useHistory();
  const rows = Math.ceil(badges.length / 4);
  const generateLabelRow = () => (
    <div className="row">
      <div className="col-md-12 text-center">
        <p>Labels for this row</p>
      </div>
    </div>
  );
  return (
    <>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Badges</Card.Title>
            </Card.Header>
            <Card.Body>
              <p>sadsafc</p>
              {Array.from({ length: rows * 2 - 1 }).map((_, rowIndex) =>
                rowIndex % 2 === 0 ? (
                  <div key={rowIndex} className="row">
                    {badges
                      .slice((rowIndex / 2) * 4, (rowIndex / 2 + 1) * 4)
                      .map((item, badgeIndex) => (
                        <div key={badgeIndex} className="col-md-3 text-center">
                          <img
                            src={item.svgUrl}
                            alt={item.name}
                            width="50"
                            height="50"
                          />
                          <p>{item.name}</p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <React.Fragment key={rowIndex}>
                    {generateLabelRow()}
                  </React.Fragment>
                )
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div>
        <Button onClick={() => history.goBack()}>Back</Button>
      </div>
    </>
  );
};

export default Badges;
