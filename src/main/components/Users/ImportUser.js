import React, { useState } from "react";
import { read, utils, writeFile } from "xlsx";
// import { useDropzone } from "react-dropzone";
// import Dropzone from "react-dropzone-uploader";
import { Link, useHistory } from "react-router-dom";
import { Nav, Row, Col, Card, Table, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

import Dropzone from "react-dropzone";
import * as XLSX from "xlsx";

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
  const [file, setFile] = useState([]); //excel file
  const [isActive, setIsActive] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  //   const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});
  const history = useHistory();
  const [excelData, setExcelData] = useState(null);

  //Add user api
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", movies);
    const url = "http://127.0.0.1:8000/lms-service/addusers_excel";
    const authToken = window.localStorage.getItem("jwt_access_token");
    console.log(movies);
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Auth-Token": authToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("✔️ Users Added Successfully!!!");
        history.push(`/users-list`);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to add user...");
      });
  };

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  //   const files = acceptedFiles.map((file) => (
  //     <li key={file.path}>
  //       {file.path} - {file.size} bytes
  //     </li>
  //   ));

  const handleImport = ($event) => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          setMovies(rows);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  //sample excel btn
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

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const excelData = XLSX.utils.sheet_to_json(
        workbook.Sheets[firstSheetName]
      );
      setMovies(excelData);
      //   setExcelData(excelData);
    };

    reader.readAsArrayBuffer(file);
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
              <div className="row">
                <div className="col-lg-12">
                  <div className="container">
                    {/* <div {...getRootProps}>
                      <input
                        {...getInputProps()}
                        required
                        onChange={handleImport}
                      />
                      <Dropzone
                        styles={{
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
                        }}></Dropzone>
                    </div> */}
                  </div>
                </div>
                {/* <input
                            type="file"
                            name="file"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={handleImport}
                          /> */}
                <br />
                <br />
                <div>
                  <h1>Excel File Uploader</h1>

                  <Dropzone onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropzone" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>
                          Drag and drop an Excel file here, or click to select
                          one.
                        </p>
                      </div>
                    )}
                  </Dropzone>
                  {excelData && (
                    <div>
                      <h2>Excel Data:</h2>
                      <pre>{JSON.stringify(excelData, null, 2)}</pre>
                    </div>
                  )}
                </div>
                <h5 style={{ textAlign: "center", marginTop: "10px" }}>
                  Preview Excel file
                </h5>
                <br />
                <form onSubmit={handleSubmit}>
                  <div className="col-lg-12">
                    <Table
                      style={{ textAlign: "center" }}
                      responsive
                      striped
                      bordered
                      className="verticle-middle">
                      <thead>
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
                      </thead>
                      <tbody>
                        {movies.length ? (
                          movies.map((movie, index) => (
                            <tr key={index}>
                              <td>{movie.eid}</td>
                              <td>{movie.sid}</td>
                              <td>{movie.full_name}</td>
                              <td>{movie.email}</td>
                              <td>{movie.dept}</td>
                              <td>{movie.adhr}</td>
                              <td>{movie.username}</td>
                              <td>{movie.password}</td>
                              <td>{movie.bio}</td>
                              <td>{movie.role}</td>
                              <td>{movie.timezone}</td>
                              <td>{movie.langtype}</td>
                              <td>{movie.active}</td>
                              <td>{movie.deactive}</td>
                              <td>{movie.exclude_from_email}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="15"
                              rowSpan="15"
                              className="text-center">
                              No File Selected.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                    <br />
                    <br />
                    <div className="d-flex justify-content-between">
                      <Button type="submit" className="btn btn-primary ">
                        Add Users&nbsp; <i className="bi bi-plus-circle"></i>
                      </Button>
                      <Button
                        onClick={handleExport}
                        className="btn btn-primary ">
                        Sample File&nbsp;<i className="fa fa-download"></i>
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ImportUser;
