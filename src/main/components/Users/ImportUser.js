import React, { useState, useRef, useEffect } from "react";
import { utils, writeFile } from "xlsx";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { useHistory } from "react-router-dom";
import { Nav, Row, Col, Card, Table, Button, Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

const ImportUser = () => {
  const [fileError, setFileError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); //excel file
  const [excelData, setExcelData] = useState([]);
  const dropzoneRef = useRef(null);
  const [activeTab, setActiveTab] = useState("import-user");

  const history = useHistory();

  const handleFileDrop = async (files, allFiles) => {
    if (files.length > 0) {
      setSelectedFile(files[0].file);

      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          raw: true,
        });
        setExcelData(jsonData);
      };
      reader.readAsArrayBuffer(files[0].file);
    }
  };

  const handleExport = () => {
    const headings = [
      [
        "eid",
        "sid",
        "fullname",
        "email",
        "dept",
        "adhr",
        "username",
        "password",
        "bio",
        "categorytype",
        "timezonetype",
        "langtype",
        "isActive",
        "isDeactive",
        "excludeFromEmail",
        "generate_token",
      ],
    ];

    const wb = utils.book_new();
    const ws = utils.aoa_to_sheet(headings); // Convert headings array to a worksheet
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "Sample File.xlsx");
  };

  //Add user api
  const handleSubmit = async () => {
    if (selectedFile) {
      setFileError("");
      console.log(selectedFile);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const url = "https://v1.eonlearning.tech/lms-service/addusers_excel";
      const authToken = window.localStorage.getItem("jwt_access_token");

      await axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Auth-Token": authToken,
          },
        })
        .then((response) => {
          console.log(response.data, response.data.message);

          // toast.success(" Users Added Successfully!!!");

          Swal.fire({
            title: "Success!",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            history.push(`/users-list`);
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error("An error occurred. Please try again later.", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    } else {
      console.log("No file selected.");
      setFileError("Please Select file OR Submit the selected file.");
    }
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  useEffect(() => {
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1);
    setActiveTab(tab);
  }, [history.location.pathname]);

  return (
    <>
      <Row>
        <Col xxl={12}>
          <Card>
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey="import-user" title="Import"></Tab>
              <Tab eventKey="export-user" title="Export"></Tab>
            </Tabs>
            <Card.Header>
              <Card.Title>Import User</Card.Title>
            </Card.Header>
            <Card.Body>
              {" "}
              <Dropzone
                onSubmit={handleFileDrop}
                ref={dropzoneRef}
                accept=".csv, .xls, .xlsx"
                inputContent="Drag a Excel or CSV file or click to browse"
                styles={styles}></Dropzone>
              <div className="text-end fs-6">
                Accepted Files : CSV, xls, xlsx - 1 MB
              </div>
              <br />
              <div className="d-flex align-items-center justify-content-center fs-18">
                {" "}
                {selectedFile ? selectedFile.name : ""}
              </div>
              <div className="col-lg-12">
                <Table
                  style={{ textAlign: "center" }}
                  responsive
                  striped
                  bordered
                  className="verticle-middle">
                  <tbody>
                    {excelData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <br />
              <div className="d-flex justify-content-between mt-3">
                <div>
                  <Button onClick={handleSubmit} className="btn btn-primary">
                    Import&nbsp; <i className="bi bi-plus-circle"></i>
                  </Button>
                  &nbsp;&nbsp; or &nbsp;&nbsp;
                  <Button
                    className="btn me-2 btn-light"
                    onClick={() => history.goBack()}>
                    Cancel
                  </Button>
                </div>
                <div>
                  <Button onClick={handleExport} className="btn btn-primary">
                    <i className="fa fa-download"></i>&nbsp;Sample Excel File
                  </Button>
                </div>
              </div>
              <br />
              {!selectedFile && fileError && (
                <div className="text-danger fs-14">{fileError}</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ImportUser;
