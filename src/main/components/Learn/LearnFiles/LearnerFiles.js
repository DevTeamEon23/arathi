import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import pic1 from "@images/Users/Filessvg.svg";
import { toast } from "react-toastify";
import { Nav, Button, FormCheck, Table, Modal } from "react-bootstrap";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { MdPreview } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import { CircularProgress } from "@material-ui/core";
import FileViewer from "react-file-viewer";

const LearnerFiles = () => {
  const [token, setToken] = useState(); //auth token
  const [allFileData, setAllFileData] = useState([]); //set file data
  const [fileName, setFileName] = useState();
  const [fileType, setFileType] = useState(null);
  const [fileUrl, setFileUrl] = useState();
  const [loadingStates, setLoadingStates] = useState({});
  const [showPreviewModal, setShowPreviewModal] = useState(false); //Preview modal
  const accessToken = window.localStorage.getItem("jwt_access_token");
  const jwtToken = window.localStorage.getItem("jwt_access_token");

  useEffect(() => {
    setToken(accessToken);
    getAllFiles();
  }, []);

  const getAllFiles = async () => {
    const url = "https://beta.eonlearning.tech/lms-service/fetch_active_files";
    try {
      const response = await axios.get(url, {
        headers: {
          "Auth-Token": jwtToken,
        },
      });
      const courseData = response.data.data;
      console.log("getAllFiles", response.data.data);
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

  const handleDownload = async (e, files_name) => {
    setLoadingStates((prevState) => ({ ...prevState, [files_name]: true }));
    try {
      const url = new URL(
        `https://beta.eonlearning.tech/lms-service/file_download/${files_name}`
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
        const contentType = response.headers["content-type"];
        const blob = new Blob([response.data], { type: contentType });
        const blobUrl = window.URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = files_name;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Clean up
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(downloadLink);
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to download file!");
    } finally {
      setLoadingStates((prevState) => ({ ...prevState, [files_name]: false }));
    }
  };

  const handlePreview = (e, id, name, fileFormat, file) => {
    console.log("inside handle preview", id, name, fileFormat);
    setShowPreviewModal(true);
    setFileName(name);
    setFileType(fileFormat);
    setFileUrl(file);
  };

  const FileViewerMain = ({ fileType, fileUrl }) => {
    const supportedImageTypes = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
    const supportedTextTypes = ["txt", "xml", "js", "pdf", "csv"];
    const supportedDocumentTypes = [
      "doc",
      "docx",
      "ppt",
      "xlsx",
      "pptx",
      "odt",
      "ods",
    ];
    const supportedVideoTypes = ["mp4", "mkv"];
    const supportedAudioTypes = ["mp3"];

    if (supportedImageTypes.includes(fileType)) {
      return (
        <img
          src={fileUrl}
          alt="img"
          title={fileType}
          style={{ width: "100%", height: "500px" }}
        />
      );
    }

    if (supportedTextTypes.includes(fileType)) {
      if (supportedTextTypes.includes(fileType)) {
        if (fileType === "pdf" || fileType === "txt" || fileType === "csv") {
          return (
            <iframe
              title={fileType === "csv" ? "CSV Preview" : fileType}
              src={
                fileType === "csv"
                  ? `https://docs.google.com/viewer?url=${encodeURIComponent(
                      fileUrl
                    )}`
                  : fileUrl
              }
              style={{ width: "100%", height: "500px" }}
              onError={(e) => console.error("Iframe error", e)}
            />
          );
        } else {
          return <p>Text document preview not available.</p>;
        }
      }
    }

    if (supportedDocumentTypes.includes(fileType)) {
      if (
        fileType === "xlsx" ||
        fileType === "docx" ||
        fileType === "pptx" ||
        fileType === "doc"
      ) {
        return (
          <iframe
            title="PDF Preview"
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${fileUrl}`}
            style={{ width: "100%", height: "500px" }}
          />
        );
      } else if (fileType === "odt" || fileType === "ods") {
        <iframe
          title={fileType}
          src={fileUrl}
          style={{ width: "100%", height: "500px" }}
        />;
      } else {
        return <p>Document preview not available.</p>;
      }
    }

    if (supportedVideoTypes.includes(fileType)) {
      return <video controls src={fileUrl} style={{ width: "100%" }} />;
    }

    if (supportedAudioTypes.includes(fileType)) {
      return <audio controls src={fileUrl} style={{ width: "100%" }} />;
    }

    return null;
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
                        const inputDateTime = data.created_at;

                        const dateObj = new Date(inputDateTime);

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
                              <center>{formattedDate}</center>
                            </td>
                            <td>
                              <center>
                                {data.file_type !== "zip" && (
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
                                )}
                                <div
                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                  onClick={(e) =>
                                    handleDownload(e, data.filename)
                                  }>
                                  {loadingStates[data.filename] ? (
                                    <CircularProgress
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        color: "#fff",
                                      }}
                                    />
                                  ) : (
                                    <FaDownload
                                      className="fs-14 fs-bold"
                                      title="Download"
                                    />
                                  )}
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
          {fileType === "csv" ? (
            <FileViewer
              className="file-viewer-style"
              fileType={fileType}
              filePath={fileUrl}
            />
          ) : (
            <FileViewerMain fileType={fileType} fileUrl={fileUrl} />
          )}
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default LearnerFiles;
