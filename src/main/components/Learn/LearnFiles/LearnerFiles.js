import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import pic1 from "@images/Users/Filessvg.svg";
import { toast } from "react-toastify";
import { Nav, Button, FormCheck, Table, Modal } from "react-bootstrap";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { MdPreview } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx";

const LearnerFiles = () => {
  const [token, setToken] = useState(); //auth token
  const [allFileData, setAllFileData] = useState([]); //set file data
  const [fileName, setFileName] = useState();
  const [fileType, setFileType] = useState(null);
  const [fileUrl, setFileUrl] = useState();
  const [showPreviewModal, setShowPreviewModal] = useState(false); //Preview modal

  useEffect(() => {
    let accessToken = window.localStorage.getItem("jwt_access_token");
    setToken(accessToken);
    getAllFiles();
  }, []);

  const getAllFiles = async () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const url = "https://v1.eonlearning.tech/lms-service/fetch_active_files";
    try {
      const response = await axios.get(url, {
        headers: {
          "Auth-Token": jwtToken,
        },
      });
      const courseData = response.data.data;
      console.log("getAllFiles", response.data);
      setAllFileData(courseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch Files !"); // Handle the error
    }
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

  const handleDownload = () => {};

  const handlePreview = (e, id, name, fileFormat, file) => {
    console.log("inside handle preview", id, name, fileFormat);
    setShowPreviewModal(true);
    setFileName(name);
    setFileType(fileFormat);
    setFileUrl(file);
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
      <Nav>
        <Nav.Item
          as="div"
          className="nav nav-tabs"
          id="nav-tab"
          role="tablist"></Nav.Item>
      </Nav>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Saved Files </h4>
            </div>
            <div className="card-body">
              {allFileData.length === 0 ? (
                <div className="loader-container">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="140"
                    visible={true}
                  />
                </div>
              ) : allFileData.length > 0 ? (
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
                      {allFileData.map((data) => {
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
                              <center>
                                {data.active === 1 ? "True" : "False"}
                              </center>
                            </td>
                            <td>
                              <center>{data.file_type}</center>
                            </td>
                            <td>
                              <center>
                                {convertFileSize(data.file_size_formatted).MB >=
                                1
                                  ? `${
                                      convertFileSize(data.file_size_formatted)
                                        .MB
                                    } MB`
                                  : `${
                                      convertFileSize(data.file_size_formatted)
                                        .KB
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
                                      data.file
                                    )
                                  }>
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
      </div>
      {/* Preview Modal */}
      <Modal
        show={showPreviewModal}
        onHide={() => setShowPreviewModal(false)}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fs-16">
            File Name :<b>{fileName}</b>
          </p>
          <div>
            {fileType === "pdf" ? (
              <iframe
                src={fileUrl}
                title="PDF"
                style={{ width: "100%", height: "500px" }}
              />
            ) : fileType === "mp4" ? (
              <video controls src={fileUrl} style={{ width: "100%" }} />
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
    </Fragment>
  );
};

export default LearnerFiles;
