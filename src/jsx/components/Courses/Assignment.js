import React, { Component } from "react";
import Rte from "./Rte";
import { Link } from "react-router-dom";
import {
   Button,
 } from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle";

class Assignment extends Component {
   render() {
      return (
         <div className="h-80">
            <PageTitle activeMenu="Summernote" motherMenu="Form" />
            <div className="row">
               <div className="col-xl-12 col-xxl-12">
                  <div className="card">
                     <div className="card-header">
                        <h4 className="card-title">Add Assignment</h4>
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
                          Unit Name
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
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="val-username"
                        >
                          How To Complete It
                          <span className="text-danger">*</span>
                          </label>
                          <div className="col-lg-4">
                        <Button
                          type="submit"
                          className="btn btn-primary"
                        >
                          When instructor accepts the answer
                        </Button>
                        </div>
                          <div className="col-lg-4">
                      <Button
                          type="submit"
                          className="btn btn-primary"
                        >
                          When Uploading an answer
                        </Button>
                        </div>
                     </div>
                     <div className="card-body">
                        <div className="summernote">
                           <Rte />
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
      );
   }
}

export default Assignment;
