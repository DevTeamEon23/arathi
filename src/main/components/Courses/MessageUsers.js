import React, { Component } from "react";
import { Link } from "react-router-dom";
import Rte from "./Rte";
import {
   Button,
   Nav,
 } from "react-bootstrap";

class MessageUsers extends Component {
    

   render() {
      return (

         <div className="h-80">
            <div className="row">
            <Nav >
                <Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
                <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/message_users">Message Users</Link>
                <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/ad_event">Add Event</Link>
                <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="#">Make course public</Link>
                <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="#">lock Course Content</Link>
                <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/mobileapp_compt">Mobile App Compatibility</Link>
                </Nav.Item>
            </Nav>
               <div className="col-xl-12 col-xxl-12">
                  <div className="card">
                     <div className="card-header">
                        <h4 className="card-title">Send Message</h4>
                     </div>
                     <br/>
                     <br/>
                     <div className="row">
                    <div className="col-xl-8">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="val-username"
                        >
                          Recipient
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            name="val-username"
                            placeholder="Unit Name"
                          />
                        </div>
                        </div>
                        </div>
                     </div>
                        <div className="row">
                    <div className="col-xl-12">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          Subject
                          <span className="text-danger">*</span>
                          </label>
                          <div className="form-group mb-3 row">
                        <div className="col-lg-12">
                        <br/>
                        <br/>
                          <input
                          type="text"
                          className="form-control"
                          id="val-username"
                          name="val-username"
                          placeholder="Add a text"
                        />
                          <br/>
                          <br/>
                          
                          

                        
                     </div>

                        
                     </div>
                     <div className="card-body">
                        <div className="summernote">
                           <Rte />
                           <br/>
                           <h5 className="mb-4"><input type="file" name="file" className="custom-file-input" id="inputGroupFile"
                          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
								<i className="fa fa-paperclip" type="file"></i> Select attachment
							  </h5>
                        </div>
                     </div>
                     <div className="form-group mb-3 row">
                        <div className="col-lg-8 ms-auto">
                          <br/>
                          <br/>
                        <Button
                          type="submit"
                          className="btn me-2 btn-primary"
                        >
                          Save and View
                        </Button> or &nbsp;&nbsp;
                        <Button type="submit" className="btn btn-light">
                          <Link to="/add-courses" >Cancel</Link>
                        </Button>
                      </div>
                      </div>
                  </div>
               </div>
            </div> 
                                </div>
                     </div>
                     </div>
                     </div>
      );
   }
}

export default MessageUsers;
