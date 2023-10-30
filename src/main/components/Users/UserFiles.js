import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Dropzone from "react-dropzone-uploader";
import { useDropzone } from "react-dropzone";
import "react-dropzone-uploader/dist/styles.css";
import * as XLSX from "xlsx";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import { MdPreview } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import { Button, Table, Tab, Tabs, Modal } from "react-bootstrap";
import axios from "axios";
import Select from "react-select";
// import { ExcelFile, ExcelSheet } from "react-data-export";

const options = [
  { value: true, label: "True" },
  { value: false, label: "False" },
];

const UserFiles = (props) => {
  const userId = props.match.params.id;
  const [fileId, setFileId] = useState("");
  const [activeTab, setActiveTab] = useState("user-files/:id");
  const [selectedFile, setSelectedFile] = useState(null); //excel file
  const [showPreviewModal, setShowPreviewModal] = useState(false); //Preview modal
  const [showModal, setShowModal] = useState(false); //delete modal
  const [showEditModal, setShowEditModal] = useState(false); //Preview modal
  const [token, setToken] = useState(); //auth token
  const [activeFile, setActiveFile] = useState(true);
  const [allFillData, setAllFillData] = useState([]); //set fill data
  const [isActive, setIsActive] = useState({}); //for edit
  const dropzoneRef = useRef(null);
  const [fileError, setFileError] = useState("");
  const [fileName, setFileName] = useState();
  const [fileType, setFileType] = useState(null);
  const [fileUrl, setFileUrl] = useState();
  const history = useHistory();
  const accessToken = window.localStorage.getItem("jwt_access_token");
  const userID = localStorage.getItem("id");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  useEffect(() => {
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1);
    setActiveTab(tab);
  }, [history.location.pathname]);

  useEffect(() => {
    setToken(accessToken);
    getAllFiles();
  }, []);

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

  const styles = {
    dropzone: {
      minHeight: 170,
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

  const handleFileDrop = async (files, acceptedFiles) => {
    if (files.length > 0) {
      setSelectedFile(files[0].file);
    }
  };

  // File upload
  const handleSubmit = async () => {
    if (selectedFile) {
      setFileError("");
      const formData = new FormData();
      formData.append("file", selectedFile);
      const active = activeFile;
      const authToken = accessToken;
      const uploadUrl = `https://v1.eonlearning.tech/lms-service/upload_file/?user_id=${userID}&active=${active}`;

      try {
        const response = await axios.post(uploadUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Auth-Token": authToken, // Add the Auth-Token header
          },
        });
        toast.success("File Uploaded successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setSelectedFile(null);
        getAllFiles();
      } catch (error) {
        console.error("Error uploading file:", error);
        setSelectedFile(null);
        toast.error("An error occurred. Please try again later.", {
          position: toast.POSITION.TOP_CENTER,
        });
        getAllFiles();
      }
    } else {
      setFileError("Please Select file OR Submit the selected file.");
    }
  };

  const handleEdit = async (e, file_id) => {
    console.log("inside handle edit", file_id);
    setShowEditModal(true);
    try {
      const url = new URL(
        `https://v1.eonlearning.tech/lms-service/fetch_files_byId/${file_id}`
      );
      const response = await axios.get(url.toString(), {
        headers: {
          "Auth-Token": accessToken,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.data.active);
      const active = response.data.data.active;
      // setActiveFile(active === 1 ? "true" : "false");
      setIsActive({ value: active, label: active === 1 ? "True" : "False" });
      setFileUrl(response.data.data.file_data);
      setFileId(file_id);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch file data!"); // Handle the error
    }
  };

  const handleEditFile = async () => {
    const formData = new FormData();
    formData.append("active", isActive.value);
    formData.append("file", selectedFile === null ? "" : selectedFile);
    const headers = {
      "Auth-Token": accessToken,
    };
    try {
      const response = await axios.put(
        `https://v1.eonlearning.tech/lms-service/update_file_new/${fileId}/?user_id=${userID}`,
        formData,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setShowEditModal(false);
      getAllFiles();
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleDownload = async (e, files_name) => {
    console.log(files_name);
    try {
      const url = new URL(
        `https://v1.eonlearning.tech/lms-service/file_download/${files_name}`
      );
      const response = await axios.get(url.toString(), {
        headers: {
          "Auth-Token": accessToken,
          "Content-Type": "multipart/form-data",
        },
        responseType: "arraybuffer",
      });
      console.log(response);
      if (response.data.error) {
        toast.error("Failed to download file!");
      } else {
        // Extract the content type from the response
        const contentType = response.headers["content-type"];

        // Create a Blob object from the response data
        const blob = new Blob([response.data], { type: contentType });

        // Create a temporary URL for the Blob
        const blobUrl = window.URL.createObjectURL(blob);

        // Create a hidden anchor element for downloading
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = files_name; // Use the provided file name
        downloadLink.style.display = "none";

        // Append the anchor to the document
        document.body.appendChild(downloadLink);

        // Simulate a click event to trigger the download
        downloadLink.click();

        // Clean up
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(downloadLink);
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to download file!");
    }
  };

  const handlePreview = (e, id, name, fileFormat, file) => {
    console.log("inside handle preview", id, name, fileFormat, file);
    setShowPreviewModal(true);
    setFileName(name);
    setFileType(fileFormat);
    setFileUrl(file);
  };

  const deleteFile = (e, id) => {
    setShowModal(true);
    setFileId(id);
  };
  const handleDelete = () => {
    const config = {
      headers: {
        "Auth-Token": token,
      },
    };
    const requestBody = {
      id: fileId,
    };
    axios
      .delete(`https://v1.eonlearning.tech/lms-service/remove_file_byid`, {
        ...config,
        data: requestBody,
      })
      .then((response) => {
        setShowModal(false);
        getAllFiles();
        setFileId("");
        toast.success("File deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.error(error);
        setShowModal(false);
        toast.error("Failed to delete file!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const convertFileSize = (fileSizeString) => {
    const numericValue = parseFloat(fileSizeString);
    const fileSizeKB = numericValue / 1024;
    const fileSizeMB = fileSizeKB / 1024;
    return {
      KB: fileSizeKB.toFixed(2),
      MB: fileSizeMB.toFixed(2),
    };
  };

  const handleSelectChange = (selectedOption) => {
    setIsActive(selectedOption);
  };

  const renderExcel = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", fileUrl, true);
    xhr.responseType = "arraybuffer";

    xhr.onload = (e) => {
      const arrayBuffer = e.target.response;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      // Assuming you want to display the first sheet
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const html = XLSX.utils.sheet_to_html(sheet);

      // Use dangerouslySetInnerHTML to render the HTML in React
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    };

    xhr.send();
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
              <Dropzone
                onSubmit={handleFileDrop}
                ref={dropzoneRef}
                inputContent="Choose files to upload or drag-and-drop here"
                styles={styles}></Dropzone>

              <br />
              <div className="text-center">
                <Button onClick={handleSubmit}>Upload File</Button>
              </div>

              {selectedFile === null && (
                <div className="text-danger fs-16 mt-1">{fileError}</div>
              )}
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
                      const inputDateTime = data.updated_at;
                      const dateObj = new Date(inputDateTime);
                      const day1 = dateObj
                        .getDate()
                        .toString()
                        .padStart(2, "0");
                      const month1 = (dateObj.getMonth() + 1)
                        .toString()
                        .padStart(2, "0");
                      const year1 = dateObj.getFullYear().toString();
                      const formattedDate = `${day1}-${month1}-${year1}`;

                      return (
                        <tr key={data.id}>
                          <td>
                            <center>{data.filename}</center>
                          </td>
                          <td>
                            <center>
                              {data.active === 1 ? "True" : "False"}
                            </center>
                          </td>
                          <td>
                            <center>{data.file_type}</center>
                          </td>
                          <td>
                            <center>
                              {convertFileSize(data.file_size_formatted).MB >= 1
                                ? `${
                                    convertFileSize(data.file_size_formatted).MB
                                  } MB`
                                : `${
                                    convertFileSize(data.file_size_formatted).KB
                                  } KB`}
                            </center>
                          </td>
                          <td>
                            <center>-</center>
                          </td>
                          <td>
                            <center>
                              <div
                                className="btn btn-primary shadow btn-xs sharp me-1"
                                onClick={(e) =>
                                  handlePreview(
                                    e,
                                    data.id,
                                    data.filename,
                                    data.file_type,
                                    data.file_data
                                  )
                                }>
                                <MdPreview
                                  className="fs-18 fs-bold"
                                  title="Preview"
                                />
                              </div>
                              <div
                                className="btn btn-primary shadow btn-xs sharp me-1"
                                onClick={(e) =>
                                  handleDownload(e, data.filename)
                                }>
                                <FaDownload
                                  className="fs-14 fs-bold"
                                  title="Download"
                                />
                              </div>
                              {data.user_id == userID && (
                                <>
                                  <div
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                    title="Edit"
                                    onClick={(e) => handleEdit(e, data.id)}>
                                    <i className="fas fa-pencil-alt"></i>
                                  </div>

                                  <div
                                    className="btn btn-danger shadow btn-xs sharp"
                                    title="Delete"
                                    onClick={(e) => deleteFile(e, data.id)}>
                                    <i className="fa fa-trash"></i>
                                  </div>
                                </>
                              )}
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
        size="xl"
        show={showPreviewModal}
        onHide={() => setShowPreviewModal(false)}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fs-16">
            File Name :<b>{fileName} </b>
          </p>
          <div>
            {/* <ExcelFile element={<button>Download Data</button>}>
              <ExcelSheet data={fileUrl} name="Sheet 1">
              </ExcelSheet>
            </ExcelFile> */}
            {fileType === "txt" ? (
              <pre>{fileUrl}</pre>
            ) : fileType === "jpg" ? (
              <img
                src={fileUrl}
                alt="img"
                title="jpg"
                style={{ width: "100%", height: "500px" }}
              />
            ) : fileType === "png" ? (
              <img
                src={fileUrl}
                alt="img"
                title="jpg"
                style={{ width: "100%", height: "500px" }}
              />
            ) : fileType === "pdf" ? (
              <iframe
                src={fileUrl}
                title="PDF"
                style={{ width: "100%", height: "500px" }}
              />
            ) : fileType === "mp4" ? (
              <>
                <video controls src={fileUrl} style={{ width: "100%" }} />
              </>
            ) : fileType === "mp3" ? (
              <audio controls src={fileUrl} />
            ) : fileType === "xlsx" ? (
              renderExcel()
            ) : (
              ""
            )}
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* Delete Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Are you sure you want to delete File?</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger light" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="btn btn-primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-3 row">
            <label className="col-lg-4 col-form-label" htmlFor="groupname">
              Visibility
            </label>
            <div className="col-lg-6">
              {/* <input
                type="text"
                className="form-control"
                id="groupname"
                value={activeFile}
                onChange={(e) => setActiveFile(e.target.value)}
                required
              /> */}
              <Select
                options={options}
                value={isActive}
                onChange={handleSelectChange}
              />
            </div>
          </div>
          <div className="form-group my-auto row ">
            <div className="col-lg-4"> </div>
            <div className="col-lg-4">
              <Button onClick={handleEditFile} className="btn btn-primary">
                Update File
              </Button>{" "}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default UserFiles;
