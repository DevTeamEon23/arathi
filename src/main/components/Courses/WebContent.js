import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import Rte from "./Rte";
import Select from "react-select";
import { Button } from "react-bootstrap";
// import PageTitle from "../../layouts/PageTitle";

const options = [
  { value: "Multiplechoice", label: "Multiple Choice" },
  { value: "fillthegap", label: "Fill the gap" },
  { value: "ordering", label: "Ordering" },
  { value: "draganddrop", label: "Drag and drop" },
  { value: "freetext", label: "Free text" },
  { value: "randomized", label: "Randomized" },
];

class WebContent extends React.Component {
  handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
  };
  state = {
    divcontainer: false,
  };
  render() {
    var Handlechange = (e) => {
      this.setState({ divcontainer: !this.state.divcontainer });
      this.setState({ Selectcontainer: !this.state.Selectcontainer });
      this.setState({ divcontainer: !this.state });
      this.setState({ labelcontainer: !this.state });
      this.setState({ inputcontainer: !this.state });
    };
    var HandleChange = (e) => {
      this.setState({ divcontainer: !this.state });
      this.setState({ Selectcontainer: !this.state });
      this.setState({ divcontainer: !this.state.divcontainer });
      this.setState({ labelcontainer: !this.state.labelcontainer });
      this.setState({ inputcontainer: !this.state.inputcontainer });
    };
    var handleChange = (e) => {
      this.setState({ divcontainer: !this.state });
      this.setState({ Selectcontainer: !this.state });
      this.setState({ labelcontainer: !this.state });
      this.setState({ inputcontainer: !this.state });
    };
    {
      const x = this.state.divcontainer;
      const y = this.state.Selectcontainer;
      const z = this.state.divcontainer;
      const e = this.state.labelcontainer;
      const f = this.state.inputcontainer;
      return (
        <div className="h-80">
          <div className="row">
            <div className="col-xl-12 col-xxl-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Add Web Content</h4>
                </div>
                <br />
                <br />
                <div className="row">
                  <div className="col-xl-8">
                    <div className="form-group mb-3 row">
                      <div className="col-lg-1"></div>
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
                <br />
                <div className="row">
                  <div className="col-xl-11">
                    <div className="form-group mb-3 row">
                      <label
                        className="col-lg-2 col-form-label"
                        htmlFor="val-username"
                      >
                        How To Complete It
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-lg-3">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={handleChange}>
                          <i class="bi bi-check2"></i>
                          {x ? "With a Checkbox" : "With a Checkbox"}{" "}
                        </Button>
                      </div>
                      <div className="col-lg-3">
                        &nbsp;&nbsp;&nbsp;
                        <Button onClick={Handlechange}>
                          <i class="bi bi-check-square"></i>
                          {x ? "With a Question" : "With a Question"}
                        </Button>
                      </div>
                      <div className="col-lg-3">
                        <Button onClick={HandleChange}>
                          <i class="bi bi-clock"></i>
                          {z
                            ? "After a Period of Time"
                            : "After a Period of Time"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                {y && (
                  <div className="col-lg-4">
                    <label>Select a question</label>
                    <Select
                      menuPortalTarget={document.body}
                      menuPosition={"fixed"}
                      options={options}
                    />
                    <br />
                    <br />
                  </div>
                )}
                {
                  (z,
                  e && (
                    <div className="col-lg-5">
                      <label
                        className="col-lg-4 col-form-label"
                        htmlFor="val-username"
                      >
                        Time Limit
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Unit Name"
                      />
                    </div>
                  ))
                }
                <br />
                {/* <div className="card-body">
                        <div className="summernote">
                        <Editor
                            initialValue="<p>This is the initial content of the editor</p>"
                            init={{
                            height: 70,
                            menubar: false,
                            plugins: [
                                "advlist autolink lists link image code charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount",
                              ],
                            toolbar:
                                "undo redo | formatselect | code |link | image | bold italic backcolor |  alignleft aligncenter alignright alignjustify | \n" +
                                "bullist numlist outdent indent | removeformat | help ",
                                content_style: 'body { color: #828282 }'
                            }}
                            onEditorChange={this.handleEditorChange}
                        />
                        </div>
                     </div> */}
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
                    <Button variant="outline-primary btn-square">Load</Button>
                  </div>
                  <div className="col-lg-10 ms-auto">
                    <label
                      className="col-lg-8 col-form-label"
                      htmlFor="val-username"
                    >
                      Use URL's from:- &nbsp;
                      <a href="https://www.youtube.com/feed/trending">
                        Youtube,
                      </a>
                      &nbsp;
                      <a href="https://vimeo.com/categories">Vimeo,</a>&nbsp;
                      <a href="https://wistia.com/learn">Wistia,</a>&nbsp;
                      <a href="https://en.wikipedia.org/wiki/Main_Page">
                        Wikipedia,
                      </a>
                      &nbsp;
                      <a href="https://www.slideshare.net/popular">
                        Slideshare,
                      </a>
                      &nbsp;
                      <a href="https://www.scribd.com/explore">Scribd,</a>&nbsp;
                      <a href="https://prezi.com/explore/">Prezi,</a>&nbsp;
                      <a href="https://www.flickr.com/explore">Flickr.</a>&nbsp;
                    </label>
                  </div>
                </div>
                <div className="card-body">
                  <div className="summernote absolute">
                    <Rte />
                  </div>
                </div>
                <div className="form-group mb-3 row">
                  <div className="col-lg-8 ms-auto">
                    <br />
                    <br />
                    <Button type="submit" className="btn me-2 btn-primary">
                      Save and View
                    </Button>{" "}
                    or &nbsp;&nbsp;
                    <Button type="submit" className="btn btn-light">
                      <Link to="/add-courses">Cancel</Link>
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
}
export default WebContent;
