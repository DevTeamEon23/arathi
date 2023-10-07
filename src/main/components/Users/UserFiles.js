import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Dropzone from "react-dropzone-uploader";
import { useDropzone } from "react-dropzone";
import "react-dropzone-uploader/dist/styles.css";
import { utils, writeFile } from "xlsx";
import * as XLSX from "xlsx";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import { MdPreview } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import { Button, Table, Tab, Tabs, Modal } from "react-bootstrap";
import axios from "axios";

const UserFiles = (props) => {
  const userId = props.match.params.id;
  const [activeTab, setActiveTab] = useState("user-files/:id");
  const [selectedFile, setSelectedFile] = useState(null); //excel file

  const [fileData, setFileData] = useState([]);

  const [showPreviewModal, setShowPreviewModal] = useState(false); //Preview modal
  const [showModal, setShowModal] = useState(false); //delete button modal
  const [token, setToken] = useState(); //auth token
  const [userID, setUserID] = useState("");
  const [active, setActive] = useState(false);
  const [deactive, setDeactive] = useState(true);
  const [allFillData, setAllFillData] = useState([]); //set fill data
  const dropzoneRef = useRef(null);
  const history = useHistory();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  useEffect(() => {
    let accessToken = window.localStorage.getItem("jwt_access_token");
    setToken(accessToken);
    getAllFiles();
  }, []);

  useEffect(() => {
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1);
    setActiveTab(tab);
  }, [history.location.pathname]);

  const getAllFiles = async () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const url = "https://v1.eonlearning.tech/lms-service/fetch_files";
    try {
      const response = await axios.get(url, {
        headers: {
          "Auth-Token": jwtToken,
        },
      });
      const courseData = response.data.data;
      console.log("getAllFiles", response.data);
      setAllFillData(courseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch Files !"); // Handle the error
    }
  };

  // const handleFileDrop = async (files, allFiles) => {
  //   if (files.length > 0) {
  //     setSelectedFile(files[0].file);

  //     const reader = new FileReader();
  //     reader.onload = async (event) => {
  //       const arrayBuffer = event.target.result;
  //       const data = new Uint8Array(arrayBuffer);
  //       const workbook = XLSX.read(data, { type: "array" });
  //       const sheetName = workbook.SheetNames[0];
  //       const sheet = workbook.Sheets[sheetName];
  //       const jsonData = XLSX.utils.sheet_to_json(sheet, {
  //         header: 1,
  //         raw: true,
  //       });
  //       setFileData(jsonData);
  //     };
  //     reader.readAsArrayBuffer(files[0].file);
  //   }
  // };

  const onDrop = (acceptedFiles) => {
    // Do something with the acceptedFiles, for example, save the first one to state
    setSelectedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "*/*", // Accept all file types
  });

  const handleChangeStatus = (files) => {
    // Do something with the meta data of the uploaded file
    setSelectedFile(files[0].file);
  };
  const styles = {
    dropzone: {
      minHeight: 200,
      maxHeight: 250,
      width: "100%",
      backgroundColor: "#f2f4fa",
      border: "4px dashed #DDDFE1",
      overflow: "hidden",
    },
    inputLabel: {
      color: "#7e7e7e",
      fontSize: "18px",
      fontWeight: "normal",
      backgroundColor: "#f2f4fa",
    },
  };

  const handleFileDrop = async (files, allFiles) => {
    if (files.length > 0) {
      setSelectedFile(files[0].file);

      // Your file processing logic here
      // For this example, we'll just log the file information
      console.log("Uploaded File:", files[0].file);
    }
  };
  const handleSubmit = async () => {
    try {
      const queryParams = {
        user_id: userId,
        active: active,
        deactive: deactive,
      };
      const url = new URL(
        "https://v1.eonlearning.tech/lms-service/upload_file"
      );
      url.search = new URLSearchParams(queryParams).toString();

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(url.toString(), formData, {
        headers: {
          "Auth-Token": token,
          "Content-Type": "multipart/form-data", // Make sure to set this for file uploads
        },
      });

      // Handle the response here
      console.log("API Response:", response.data);
    } catch (error) {
      // Handle errors here
      console.error("API Error:", error);
    }
  };

  const handleEdit = (id) => {
    console.log("inside handle edit", id);
    // history.push(`/edit-courses/${id}`);
  };

  const handleDelete = () => {};
  const handleDownload = () => {};
  const handlePreview = () => {
    setShowPreviewModal(true);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey={`edit-user/${userId}`} title="Info"></Tab>
              <Tab
                eventKey={`user-courses-info/${userId}`}
                title="Courses"></Tab>
              <Tab eventKey={`user-groups/${userId}`} title="Groups"></Tab>
              <Tab eventKey={`user-files/${userId}`} title="Files"></Tab>
            </Tabs>
            <div className="card-header">
              <h4 className="card-title">Files</h4>
            </div>
            <div className="card-body">
              {/* <Dropzone
                onSubmit={handleFileDrop}
                ref={dropzoneRef}
                inputContent="Choose files to upload or drag-and-drop here"
                styles={styles}></Dropzone> */}
              <Dropzone
                onSubmit={handleFileDrop}
                inputContent="Drag a file or click to browse"
                styles={styles}
                autoUpload={true}></Dropzone>
              ;
              <br />
              <button onClick={handleSubmit}>Submit</button>
            </div>
            {allFillData.length === 0 ? (
              <div className="loader-container">
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="140"
                  visible={true}
                />
              </div>
            ) : allFillData.length > 0 ? (
              <>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>
                        <strong>
                          <center>NAME</center>
                        </strong>
                      </th>
                      <th>
                        <strong>
                          <center>VISIBILITY</center>
                        </strong>
                      </th>
                      <th>
                        <strong>
                          <center>TYPE</center>
                        </strong>
                      </th>
                      <th>
                        <strong>
                          <center>SIZE</center>
                        </strong>
                      </th>
                      <th>
                        <strong>
                          <center>UPLOADED</center>
                        </strong>
                      </th>
                      <th>
                        <strong>
                          <center>OPTIONS</center>
                        </strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allFillData.map((data) => {
                      // Input date and time string
                      const inputDateTime = data.updated_at; //2
                      // Convert inputDateTime to a JavaScript Date object
                      const dateObj = new Date(inputDateTime);
                      // Get the date in dd-mm-yyyy format
                      const day1 = dateObj
                        .getDate()
                        .toString()
                        .padStart(2, "0");
                      const month1 = (dateObj.getMonth() + 1)
                        .toString()
                        .padStart(2, "0"); // Months are zero-based
                      const year1 = dateObj.getFullYear().toString();
                      const formattedDate = `${day1}-${month1}-${year1}`;

                      return (
                        <tr key={data.id}>
                          <td>
                            <center>{data.filename}</center>
                          </td>
                          <td>
                            <center>{data.active}</center>
                          </td>
                          <td>
                            <center>{data.file_type}</center>
                          </td>
                          <td>
                            <center>{data.file_size_mb}</center>
                          </td>
                          <td>
                            <center>-</center>
                          </td>
                          <td>
                            <center>
                              <div
                                className="btn btn-primary shadow btn-xs sharp me-1"
                                onClick={(e) => handlePreview(e, data.id)}>
                                <MdPreview
                                  className="fs-18 fs-bold"
                                  title="Preview"
                                />
                              </div>
                              <div
                                className="btn btn-primary shadow btn-xs sharp me-1"
                                style={{ cursor: "not-allowed" }}
                                onClick={(e) => handleDownload(e, data.id)}>
                                <FaDownload
                                  className="fs-14 fs-bold"
                                  title="Download"
                                />
                              </div>
                              <div
                                className="btn btn-primary shadow btn-xs sharp me-1"
                                style={{ cursor: "not-allowed" }}
                                title="Edit"
                                onClick={(e) => handleEdit(e, data.id)}>
                                <i className="fas fa-pencil-alt"></i>
                              </div>
                              <div
                                className="btn btn-danger shadow btn-xs sharp"
                                style={{ cursor: "not-allowed" }}
                                title="Delete"
                                onClick={(e) => handleDelete(e, data.id)}>
                                <i className="fa fa-trash"></i>
                              </div>
                            </center>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </>
            ) : (
              <>
                <div>
                  <p className="text-center fs-20 fw-bold">No File Found.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Preview Modal */}
      <Modal
        show={showPreviewModal}
        onHide={() => setShowPreviewModal(false)}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default UserFiles;
