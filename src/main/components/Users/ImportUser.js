import React, { useState } from "react";
import { read, utils, writeFile } from "xlsx";
// import { useDropzone } from "react-dropzone";
// import Dropzone from "react-dropzone-uploader";
import { Link, useHistory } from "react-router-dom";
import { Nav, Row, Col, Card, Table, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
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

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  //Add user api
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    const url = "http://127.0.0.1:8000/lms-service/addusers_excel";
    const authToken = window.localStorage.getItem("jwt_access_token");

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
        // history.push(`/users-list`);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to add user...");
      });
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
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
              <div>
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  <p>Drag & drop an Excel file here, or click to select one</p>
                </div>
                <button onClick={handleUpload}>Upload</button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ImportUser;
