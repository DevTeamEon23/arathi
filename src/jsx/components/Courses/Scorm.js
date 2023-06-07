import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Rte from "./Rte";
import {
    DropdownButton,
    Dropdown,
    ButtonGroup,
    Button,
 } from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle";
import ScormReports from "../Reports/ScormReports";

const options = [
  { value: "embedded", label: "Embedded" },
  { value: "popup", label: "Pop-up" },
];


const Scorm = () => {
  const [file, setFile] = useState();
    
  const handleEditorChange = (content, editor) => {
        console.log("Content was updated:", content);
      };

function handleChange(e) {
  console.log(e.target.files);
  setFile(URL.createObjectURL(e.target.files[0]));
}

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
                    <div className="col-lg-1">
                      </div>
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
                      <div className="form-group mb-3 row">
                      <label
                          className="col-lg-10 col-form-label"
                          htmlFor="val-username"
                        >
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Select a file
                          <span className="text-danger">* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <input type="file" onChange={handleChange} />

                      <strong>( Upload a Scorm, xAPI or cmi5 zip file.)</strong>
                      </label>
                     </div>
                     </div>
                     <div className="row">
                    <div className="col-xl-8">
                      <div className="form-group mb-3 row">
                    <div className="col-lg-1">
                      </div>
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="val-username"
                        >
                          Show as
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-4">
                        <Select
                          options={options}
                        >
                        </Select>
                        </div>
                        </div>
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
                          />When failed retain the failed status upon retries
                          </label>
                          </div>

                     <div className="form-group mb-5 row">
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
export default Scorm;


