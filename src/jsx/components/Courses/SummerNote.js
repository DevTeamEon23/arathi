import React, { Component } from "react";
import Rte from "./Rte";
import {
   Button,
 } from "react-bootstrap";
import PageTitle from "../../../layouts/PageTitle";

class Summernote extends Component {
   render() {
      return (
         <div className="h-80">
            <PageTitle activeMenu="Summernote" motherMenu="Form" />
            <div className="row">
               <div className="col-xl-12 col-xxl-12">
                  <div className="card">
                     <div className="card-header">
                        <h4 className="card-title">Add Content</h4>
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
                        <div className="row">
                    <div className="col-xl-8">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          How To Complete It
                          <span className="text-danger">*</span>
                          </label>
                          <div className="form-group mb-3 row">
                          <div className="col-lg-4 ms-auto">
                      <br/>
                      <br/>
                        <label
                          className="form-check css-control-primary css-checkbox"
                          htmlFor="val-terms"
                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                          />With Checkbox
                          </label>
                        </div>
                          <div className="col-lg-4 ms-auto">
                      <br/>
                      <br/>
                        <label
                          className="form-check css-control-primary css-checkbox"
                          htmlFor="val-terms"
                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                          />With a Question
                          </label>
                        </div>
                          <div className="col-lg-4 ms-auto">
                      <br/>
                      <br/>
                            <label
                            className="form-check css-control-primary css-checkbox"
                            htmlFor="val-terms"
                          >
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="val-terms"
                              name="val-terms"
                              value="1"
                            />After a Period of Time
                        </label>
                        </div>
                        </div>
                        </div>
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
                          Cancel
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

export default Summernote;
