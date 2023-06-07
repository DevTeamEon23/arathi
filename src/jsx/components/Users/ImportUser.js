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
} from "react-bootstrap";


const ImportUser = () => {
    const [id, setId] = useState('');
    const [eid, setEid] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [dept, setDept] = useState('');
    const [adhr, setAdhr] = useState('');
    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [categorytype, setCategoryType] = useState('');
    const [timezonetype, setTimezoneType] = useState('');
    const [langtype, setLangType] = useState('');
    const [file, setFile] = useState([]);
    const [isActive, setIsActive] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [movies, setMovies] = useState([]);
    const { getRootProps, getInputProps, acceptedFiles } =
      useDropzone({});

//     const onUploadClick = async (event) => {
//     event.preventDefault()
//     var formData = new FormData();

//     formData.append(
//         "file",
//         this.state.uploadFile,
//         this.state.uploadFile.name
//     );

//     this.setState({isFileUploaded: true})
//     console.log(this.state.uploadFile)

//     const headers={'Content-Type': this.state.uploadFile.type}
    
//     await data.post("http:localhost:8000/FileUpload/",formData,headers);
// };
//     const onFileChange = (event) => {
//     this.setState({
//         uploadFile: event.target.files[0],
//         isFileSelected: true
//     });
// };

    //   const handleSubmit = (e) => {
    //     e.preventDefault();
        
    //     const data = {id, eid, firstname, lastname, email, dept, adhr, file, bio, username, password, isActive};
    
    //     fetch('/import-excel', {
    //       headers: {
    //         'Accept': 'muiltipart/form-data',
    //         'Content-Type': 'muiltipart/form-data'
    //       },
    //       method: 'POST',
    //       body: {
    //         id: setId,
    //         eid: setEid,
    //         firstname: setFirstname,
    //         lastname: setLastname,
    //         email: setEmail,
    //         dept: setDept,
    //         adhr: setAdhr,
    //         file: setEid,
    //         bio: setBio,
    //         username: setUsername,
    //         password: setPassword,
    //         categorytype: setCategoryType,
    //         timezonetype: setTimezoneType,
    //         langtype: setLangType,
    //         isActive: setIsActive
    //       }
    //     })
    //     .then((data) => {
    //       console.log('new user added')
    //       alert("✔️ User Added Successfully");
    //       setUsers(data);
    //     })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //     }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
      function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
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
            'eid',
            'firstname',
            'lastname',
            'email',
            'dept',
            'adhr',
            'username',
            'password',
            'bio',
            'file',
            'categorytype',
            'timezonetype',
            'langtype',
            'isActive',
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
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/users-list">Users List</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventkey='Follow' type="button" to="/export-user">Export Users</Link>
        </Nav.Item>
      </Nav>
        <Row>
        <Col xxl={12}>
          <Card>
            <div className="row">
                <div className="col-lg-1">
                </div>
                    <div className="col-lg-10">    
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
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="input-group">
                                    <div className="custom-file">
                                    <div className="container">
                                    <form action="/import-excel" encType="multipart/form-data" method="post" />
                        {/* <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/> */}
                                <input
                                    type="file"
                                    name="file"
                                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={handleImport}
                                    placeholder="Choose file Or Drag on Choose Button"
                                /><br/><br/>
                                {/* <label className="custom-file-label" htmlFor="inputGroupFile">Choose file Or Drag on Choose Button</label> */}
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
                        <div className="row">
                        <form action="/import-excel" encType="multipart/form-data" method="post">
                                <div className="col-lg-12">
                                
                                <Table style={{ textAlign: "center" }} responsive striped bordered className="verticle-middle">
                                    <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Employee ID</th>
                                    <th scope="col">FirstName</th>
                                    <th scope="col">LastName</th>
                                    <th scope="col">Email-Address</th>
                                    <th scope="col">Department</th>
                                    <th scope="col">Aadhar Card No.</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Password</th>
                                    <th scope="col">Bio</th>
                                    <th scope="col">Photo</th>
                                    <th scope="col">User Type</th>
                                    <th scope="col">TimeZone</th>
                                    <th scope="col">Language</th>
                                    <th scope="col">IsActive</th>
                                </tr>
                            </thead>
                            <tbody> 
                                            
                                {
                                    movies.length
                                    ?
                                    movies.map((movie, index) => (
                                        <tr key={index}>
                                        <td type="text" name="id" value={id} onChange={(e) => setId(e.target.value)}>{ movie.id }</td>
                                        <td>{ movie.eid }</td>
                                        <td>{ movie.firstname }</td>
                                        <td>{ movie.lastname }</td>
                                        <td>{ movie.email }</td>
                                        <td>{ movie.dept }</td>
                                        <td>{ movie.adhr }</td>
                                        <td>{ movie.username }</td>
                                        <td>{ movie.password }</td>
                                        <td>{ movie.bio }</td>
                                        <td>{ movie.file }</td>
                                        <td>{ movie.categorytype }</td>
                                        <td>{ movie.timezonetype }</td>
                                        <td>{ movie.langtype }</td>
                                        <td>{ movie.isActive }</td>
                                        <td><span className="badge bg-warning text-dark">{ movie.Rating }</span></td>
                                        </tr> 
                                    ))
                                    : 
                                     
                                    <tr>
                                        <td colSpan="13" rowSpan="13" className="text-center">No File Found.</td>
                                    </tr> 
                                }
                            </tbody>
                        </Table>
                        <br/>
                        <br/>
                        <div className="form-group mb-3 row">
                            <div className="col-lg-3 ms-auto">
                        <button type="submit" value="Store File" className="btn btn-primary float-right">
                            Add Users&nbsp; <i className="bi bi-plus-circle"></i>
                        </button>
                        </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
          </Card>
        </Col>
      </Row>
        </>

    );
};

export default ImportUser;