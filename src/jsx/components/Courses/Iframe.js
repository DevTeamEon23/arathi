import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import Rte from "./Rte";
import {
  DropdownButton,
  Dropdown,
  ButtonGroup,
  Button,
 } from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle";

class Iframe extends React.Component {
    handleEditorChange = (content, editor) => {
        console.log("Content was updated:", content);
      };

   render() {
      return (
         <div className="h-80">
            <PageTitle activeMenu="Summernote" motherMenu="Form" />
            <div className="row">
               <div className="col-xl-12 col-xxl-12">
                  <div className="card">
                     <div className="card-header">
                        <h4 className="card-title">Add iFrame</h4>
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
                            <br/>
                        <div className="col-lg-2">
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
                        <div className="col-lg-2">
                    <DropdownButton
                        as={ButtonGroup}
                        id="dropdown-button-drop-up"
                        drop="up"
                        variant="primary"
                        title="With a Question"
                        >
                          <Dropdown.Item href="/content"><i class="bi bi-back"> &nbsp;</i>Multiple Choice</Dropdown.Item>
                          <Dropdown.Item href="/webcontent"><i class="bi bi-cloud"> &nbsp;</i>Fill gaps</Dropdown.Item>
                          <Dropdown.Item href="/video"><i class="bi bi-play-circle"> &nbsp;</i>Ordering</Dropdown.Item>
                          <Dropdown.Item href="#"><i class="bi bi-file-music"> &nbsp;</i>Drag and Drop</Dropdown.Item>
                          <Dropdown.Item href="#"><i class="bi bi-file-slides"> &nbsp;</i>Free Text</Dropdown.Item>
                        </DropdownButton>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className="col-lg-3">
                        <Button
                          type="submit"
                          className="btn me-2 btn-primary"
                        >
                          After a period of Time
                        </Button>
                        </div>
                     </div>
                     <div className="card-body">
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
                     </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="val-username"
                        >
                          Web Address (URL)
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-4">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            name="val-username"
                            placeholder="Start writting or paste your URL"
                          />
                        </div>
                        <div className="col-md-6">
                        <Button variant="outline-primary btn-square">
                            Embed
                        </Button>
                        </div>
                        {/* <div className="col-lg-10 ms-auto">
                        <label
                          className="col-lg-8 col-form-label"
                          htmlFor="val-username"
                        >
                        Use URL's from:- &nbsp;
                        <a href="https://www.youtube.com/feed/trending">Youtube,</a>&nbsp;
                        <a href="https://vimeo.com/categories">Vimeo,</a>&nbsp;
                        <a href="https://wistia.com/learn">Wistia,</a>&nbsp;
                        <a href="https://en.wikipedia.org/wiki/Main_Page">Wikipedia,</a>&nbsp;
                        <a href="https://www.slideshare.net/popular">Slideshare,</a>&nbsp;
                        <a href="https://www.scribd.com/explore">Scribd,</a>&nbsp;
                        <a href="https://prezi.com/explore/">Prezi,</a>&nbsp;
                        <a href="https://www.flickr.com/explore">Flickr.</a>&nbsp;
                        </label>
                        </div> */}
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
}
export default Iframe;


