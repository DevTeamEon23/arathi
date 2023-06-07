import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import pic1 from '../../../images/Users/Certificate.svg'

import {
    Dropdown,
    DropdownButton,
    ButtonGroup,
    Nav,
    Button,
    FormCheck,
  } from "react-bootstrap";

const UserCertificate = () => {
  return (
    <Fragment>
    <Nav >
      <Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
      <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/user-progress">Overview</Link>
      <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/user-course">Courses</Link>
      <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/user-certificates">Certificates</Link>
      <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/user-timeline">Timeline</Link>
      </Nav.Item>
    </Nav>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Certificates Earned </h4>
                </div>
        
      <div className="row mb-5">
                <div className="col-lg-3">
                </div>
                <div className="col-lg-7">
                    <img src={pic1} height={500} width={500}/>
                    <h4 className="mb-10">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You do not have any Certificate</h4>
                </div>
                </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default UserCertificate