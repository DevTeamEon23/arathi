import React, { useState, useRef } from "react";
import { read, utils, writeFile } from "xlsx";
// import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { Link, useHistory } from "react-router-dom";
import { Nav, Row, Col, Card, Table, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { useDropzone } from "react-dropzone";

const ImportUser = () => {
  const [id, setId] = useState("");
  const [eid, setEid] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("");
  const [adhr, setAdhr] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [categorytype, setCategoryType] = useState("");
  const [timezonetype, setTimezoneType] = useState("");
  const [langtype, setLangType] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [file, setFile] = useState([]); //excel file

  const [fileError, setFileError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const dropzoneRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleFileDrop = async (files, allFiles) => {
    console.log("inside handleFileDrop", allFiles);
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

  const handleMouseEnter = () => {
    console.log("inside mouse enter");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, movies, { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "Sample File.xlsx");
  };

  //Add user api
  const handleSubmit = async () => {
    // e.preventDefault();
    console.log("inside handleSubmit");
    if (selectedFile) {
      setFileError("");
      console.log(selectedFile);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const url = "http://127.0.0.1:8000/lms-service/addusers_excel";
      const authToken = window.localStorage.getItem("jwt_access_token");

      await axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Auth-Token": authToken,
          },
        })
        .then((response) => {
          console.log(response.data);
          toast.success("✔️ Users Added Successfully!!!");
          // history.push(`/users-list`);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed !!! Unable to add user...");
        });
    } else {
      console.log("No file selected.");
      setFileError("Please Select file OR Submit the selected file.");
    }
  };
  // const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const styles = {
    dropzone: {
      minHeight: 200,
      maxHeight: 250,
      width: "100%",
      backgroundColor: "#f2f4fa",
      border: "1px dashed #DDDFE1",
      overflow: "hidden",
    },
    inputLabel: {
      color: "#7e7e7e",
      fontSize: "18px",
      fontWeight: "normal",
      backgroundColor: "#f2f4fa",
    },
  };

  return (
    <>
      <Nav>
        <Nav.Item as="div" className="nav nav-tabs" id="nav-tab" role="tablist">
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventKey="Follow"
            type="button"
            to="/users-list">
            Users List
          </Link>
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            eventKey="Follow"
            type="button"
            to="/export-user">
            Export Users
          </Link>
        </Nav.Item>
      </Nav>
      <Row>
        <Col xxl={12}>
          <Card>
            <Card.Header>
              <Card.Title>Import</Card.Title>
            </Card.Header>
            <Card.Body>
              {" "}
              {/* <div>
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  <p>Drag & drop an Excel file here, or click to select one</p>
                </div>
                <button onClick={handleUpload}>Upload</button>
              </div> */}
              <div className="dropzone-container">
                <Dropzone
                  onSubmit={handleFileDrop}
                  ref={dropzoneRef}
                  accept=".xlsx"
                  // inputContent="Drag a Excel or CSV file or click to brows"
                  styles={styles}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}>
                  <p className="dropzone-message">
                    {isHovered
                      ? "Accepted Files : CSV, xls, xlsx - 1 MB"
                      : "Drag an Excel or CSV file or click to browse"}
                  </p>
                </Dropzone>
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
                  {/* <thead>
                    <tr>
                      <th scope="col">EID</th>
                      <th scope="col">SID</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Email ID</th>
                      <th scope="col">Department</th>
                      <th scope="col">Aadhar Card No.</th>
                      <th scope="col">Username</th>
                      <th scope="col">Password</th>
                      <th scope="col">Bio</th>
                      <th scope="col">Role</th>
                      <th scope="col">Time Zone</th>
                      <th scope="col">Language</th>
                      <th scope="col">IsActive</th>
                      <th scope="col">IsDeactive</th>
                      <th scope="col">ExcludeFromEmail</th>
                    </tr>
                  </thead> */}
                  <tbody>
                    {/* {excelData.length > 0 ? (
                      excelData[0].map((data, index) => (
                        <tr key={index}>
                          <td>{data.eid}</td>
                          <td>{data.sid}</td>
                          <td>{data.full_name}</td>
                          <td>{data.email}</td>
                          <td>{data.dept}</td>
                          <td>{data.adhr}</td>
                          <td>{data.username}</td>
                          <td>{data.password}</td>
                          <td>{data.bio}</td>
                          <td>{data.role}</td>
                          <td>{data.timezone}</td>
                          <td>{data.langtype}</td>
                          <td>{data.active}</td>
                          <td>{data.deactive}</td>
                          <td>{data.exclude_from_email}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="15" rowSpan="15" className="text-center">
                          No File Selected.
                        </td>
                      </tr>
                    )} */}
                    <tbody>
                      {excelData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </tbody>
                </Table>
              </div>
              {/* {excelData.length > 0 && (
                <div>
                  <table>
                    <thead>
                      <tr>
                        {excelData[0].map((header, index) => (
                          <th key={index}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {excelData.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )} */}
              <div className="d-flex justify-content-between mt-3">
                <Button onClick={handleSubmit} className="btn btn-primary ">
                  Add Users&nbsp; <i className="bi bi-plus-circle"></i>
                </Button>
                <Button onClick={handleExport} className="btn btn-primary ">
                  Sample File&nbsp;<i className="fa fa-download"></i>
                </Button>
              </div>
              <br />
              {fileError && (
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
