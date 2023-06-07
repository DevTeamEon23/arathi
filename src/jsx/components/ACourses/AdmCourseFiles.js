import React, { useState } from "react";  
import { read, utils, writeFile } from 'xlsx';
import { useDropzone } from "react-dropzone";
import Dropzone from 'react-dropzone-uploader';
import DropFile from "../AppsMenu/Email/Compose/DropFile";
import { Link } from "react-router-dom";
import {
  Nav,
  Row,
  Col,
  Card,
  Table,
  Dropdown,
} from "react-bootstrap";


const AdmCourseFiles = () => {
    const [movies, setMovies] = useState([]);
    const { getRootProps, getInputProps, acceptedFiles } =
      useDropzone({});
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      let errorsObj = { email: '', password: '' };
      const [errors, setErrors] = useState(errorsObj);
      const [password, setPassword] = useState('');

    const files = acceptedFiles.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));

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
                    setMovies(rows)
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }
      
    
    const handleExport = () => {
        const headings = [[
            'id',
            'Name',
            'Share',
            'Type',
            'Size',
            'Uploaded_on',
        ]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, movies, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'Sample File.xlsx');
    }

    return (
        <>
        {/* <Nav >
		      <Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
            <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/dashboard">Dashboard</Link>
            <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/adm_courses-info">Courses</Link>
            <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/adm_course_files">Files</Link>
          </Nav.Item>
        </Nav> */}
        <Row>
        <Col xxl={12}>
          <Card>
            <div className="row mt-5">
              <div className="col-lg-1">
                </div>
              <div className="col-lg-10">
                <DropFile />
                </div>
                <div className="col-lg-5">
                </div>
                <div className="col-lg-7">
                <h3>OR</h3>
                </div>
                <div className="row">
                <div className="col-lg-1">
                </div>
                    <label
                      className="col-lg-3 col-form-label"
                      htmlFor="val-username"
                    >
                      <h4>Upload from external link</h4>
                    </label>
                    <div className="col-xl-8">
                      <input
                        type="text"
                        className="form-control"
                        id="val-username"
                        name="val-username"
                        placeholder="Https://....."
                      />
                    </div>
                  </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group">
                                <div className="custom-file">
                                <div className="container">
                                <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                                <label className="custom-file-label" htmlFor="inputGroupFile">Choose file Or Drag on Choose Button</label>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <Table style={{ textAlign: "center" }} responsive striped bordered className="verticle-middle">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Share</th>
                                <th scope="col">Type</th>
                                <th scope="col">Size</th>
                                <th scope="col">Uploaded on</th>
                                <th scope="col">options</th>
                            </tr>
                        </thead>
                        <tbody> 
                                {
                                    movies.length
                                    ?
                                    movies.map((movie, index) => (
                                        <tr key={index}>
                                            <th scope="row">{ index + 1 }</th>
                                            <td>{ movie.Name }</td>
                                            <td>{ movie.Share }</td>
                                            <td>{ movie.Type}</td>
                                            <td>{ movie.Size }</td>
                                            <td>{ movie.Uploaded_on }</td>
                                            <td>
                                              <Dropdown>
                                                <Dropdown.Toggle
                                                  variant="success"
                                                  className="light sharp i-false"
                                                >
                                                  {}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                  <Dropdown.Item href="#"><i class="bi bi-pencil">  &nbsp;</i>Edit</Dropdown.Item>
                                                  <Dropdown.Item href="#"><i class="bi bi-graph-up">  &nbsp;</i>Save</Dropdown.Item>
                                                  <Dropdown.Item href="#"><i class="bi bi-pencil-square">  &nbsp;</i>View</Dropdown.Item>
                                                  <Dropdown.Item href="#"><i class="bi bi-x-circle">  &nbsp;</i>Delete</Dropdown.Item>
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            </td>
                                        </tr> 
                                    ))
                                    :
                                    <tr>
                                        <td colSpan="11" rowSpan="11" className="text-center">No File Found.</td>
                                    </tr> 
                                }
                        </tbody>
                    </Table>
                    <br/>
                    <br/>
                      <div className="form-group mb-3 row">
                        <div className="col-lg-3 ms-auto">
                    <button type="submit" className="btn btn-primary float-right">
                        Add Users&nbsp; <i className="bi bi-plus-circle"></i>
                    </button>
                    </div>
                    </div>
                </div>
            </div>
          </Card>
        </Col>
      </Row>
        </>

    );
};

export default AdmCourseFiles;