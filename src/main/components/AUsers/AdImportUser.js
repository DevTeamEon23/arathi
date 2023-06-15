import React, { useState } from "react";  
import { read, utils, writeFile } from 'xlsx';
import { useDropzone } from "react-dropzone";
import Dropzone from 'react-dropzone-uploader';
import { Link } from "react-router-dom";
import {
  Nav,
  Row,
  Col,
  Card,
  Table,
} from "react-bootstrap";


const AdImportUser = () => {
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
            'FullName',
            'Email_Address',
            'Employee_id',
            'Department',
            'Aadhar_Card_No',
            'Username',
            'Password',
            'Bio',
            'Photo',
            'User_Type',
            'TimeZone',
            'Language',
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
      <Nav >
        <Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/a-users-list">Users List</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/ad-export-user">Export Users</Link>
        </Nav.Item>
      </Nav>
        <Row>
        <Col xxl={12}>
          <Card>
            <div className="row">
                <div className="container">
                    <div {...getRootProps }>
                        <input {...getInputProps()} required onChange={handleImport}/>
                        <Dropzone styles={{
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
                        }} >
                        Drag 'n' drop a Excel or CSV files here<br/> </Dropzone>
                    </div>
                    <aside>
                        <ul>{files}</ul>
                    </aside>
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
                    <div className="row">
                        <div className="col-md-4">
                            <button onClick={handleExport} className="btn btn-primary float-right">
                                Sample File <i className="fa fa-download"></i>
                            </button>
                            <br/>
                            <br/>
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
                                <th scope="col">FullName</th>
                                <th scope="col">Email-Address</th>
                                <th scope="col">Employee ID</th>
                                <th scope="col">Department</th>
                                <th scope="col">Aadhar Card No.</th>
                                <th scope="col">Username</th>
                                <th scope="col">Password</th>
                                <th scope="col">Bio</th>
                                <th scope="col">Photo</th>
                                <th scope="col">User Type</th>
                                <th scope="col">TimeZone</th>
                                <th scope="col">Language</th>
                            </tr>
                        </thead>
                        <tbody> 
                                {
                                    movies.length
                                    ?
                                    movies.map((movie, index) => (
                                        <tr key={index}>
                                            <th scope="row">{ index + 1 }</th>
                                            <td>{ movie.FullName }</td>
                                            <td>{ movie.Email_Address }</td>
                                            <td>{ movie.Employee_id}</td>
                                            <td>{ movie.Department }</td>
                                            <td>{ movie.Aadhar_Card_No }</td>
                                            <td>{ movie.Username }</td>
                                            <td>{ movie.Password }</td>
                                            <td>{ movie.Bio }</td>
                                            <td>{ movie.Photo }</td>
                                            <td>{ movie.User_Type }</td>
                                            <td>{ movie.TimeZone }</td>
                                            <td>{ movie.Language }</td>
                                            <td><span className="badge bg-warning text-dark">{ movie.Rating }</span></td>
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

export default AdImportUser;