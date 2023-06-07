import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdmRte from "./AdmRte";
import {
    DropdownButton,
    Dropdown,
    ButtonGroup,
    Button,
 } from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle";
import ScormReports from "../Reports/ScormReports";

class AdmScorm extends React.Component {
    handleEditorChange = (content, editor) => {
        console.log("Content was updated:", content);
      };

   render() {
      return (
         <div className="h-80">
            <div className="row">
               <div className="col-xl-12 col-xxl-12">
                  <div className="card">
                     <div className="card-header">
                        <h4 className="card-title">Add Scorm | xAPI | cmi5</h4>
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
                        <div className="col-lg-6 mb-3">
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
                     <div className="card-body">
                      <label><strong>Select an Document    Upload a Scorm, xAPI or cmi5 zip file.</strong></label>
                     </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="val-username"
                        >
                          Show as
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-2">
                    <DropdownButton
                        as={ButtonGroup}
                        id="dropdown-button-drop-up"
                        drop="down"
                        variant="primary"
                        title="Embedded"
                        >
                          <Dropdown.Item href="/content"><i class="bi bi-back"> &nbsp;</i>Multiple Choice</Dropdown.Item>
                          <Dropdown.Item href="/webcontent"><i class="bi bi-cloud"> &nbsp;</i>Fill gaps</Dropdown.Item>
                          <Dropdown.Item href="/video"><i class="bi bi-play-circle"> &nbsp;</i>Ordering</Dropdown.Item>
                          <Dropdown.Item href="#"><i class="bi bi-file-music"> &nbsp;</i>Drag and Drop</Dropdown.Item>
                          <Dropdown.Item href="#"><i class="bi bi-file-slides"> &nbsp;</i>Free Text</Dropdown.Item>
                        </DropdownButton>
                        </div>
                        </div>
                    <div className="col-lg-10 ms-auto">
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

                     <div className="form-group mb-3 row">
                        <div className="col-lg-10 ms-auto">
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
export default AdmScorm;


