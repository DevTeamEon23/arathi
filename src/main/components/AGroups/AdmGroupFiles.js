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


const AdmGroupFiles = () => {
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
      


    return (
        <>
        <Nav >
	      <Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
          <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/edit-groups">Info</Link>
          <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/groups-users">Users</Link>
          <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/group-courses">Courses</Link>
          <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/group-files">Files</Link>
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
                        <i class="bi bi-cloud-upload"></i>&nbsp;Choose files to upload or drag-and-drop here<br/> </Dropzone>
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
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <Table style={{ textAlign: "center" }} responsive striped bordered className="verticle-middle">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">NAME</th>
                                <th scope="col">VISIBILITY</th>
                                <th scope="col">TYPE</th>
                                <th scope="col">SIZE</th>
                                <th scope="col">UPLOADED</th>
                                <th scope="col">OPTIONS</th>
                            </tr>
                        </thead>
                        <tbody> 
                                {
                                    movies.length
                                    ?
                                    movies.map((movie, index) => (
                                        <tr key={index}>
                                            <th scope="row">{ index + 1 }</th>
                                            <td>{ movie.NAME }</td>
                                            <td>{ movie.VISIBILITY }</td>
                                            <td>{ movie.TYPE}</td>
                                            <td>{ movie.SIZE }</td>
                                            <td>{ movie.UPLOADED }</td>
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
                </div>
            </div>
          </Card>
        </Col>
      </Row>
        </>

    );
};

export default AdmGroupFiles;