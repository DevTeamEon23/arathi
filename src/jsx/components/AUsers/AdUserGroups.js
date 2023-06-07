import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import pic1 from '../../../images/Users/Groupsvg.svg'

import {
    Dropdown,
    DropdownButton,
    ButtonGroup,
    Nav,
    Button,
    FormCheck,
  } from "react-bootstrap";

const AdUserGroups = () => {
  return (
    <Fragment>
    <Nav >
      <Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
      <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/ad-edit-user">Info</Link>
      <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/ad-user-groups">Groups</Link>
      <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/ad-user-files">Files</Link>
      </Nav.Item>
    </Nav>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">All Groups </h4>
                </div>
        
      <div className="row mb-5">
                <div className="col-lg-3">
                </div>
                <div className="col-lg-7">
                    <img src={pic1} height={500} width={500}/>
                    <h4 className="mb-10">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You have not added in any Group</h4>
                </div>
                </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default AdUserGroups