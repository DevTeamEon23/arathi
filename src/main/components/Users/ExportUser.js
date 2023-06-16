import React, { useState, useEffect } from "react"; 
import Select from "react-select"; 
import { read, utils, writeFile } from 'xlsx';
import { Button, Nav } from 'react-bootstrap';
import {CSVLink} from 'react-csv';
import { Link } from "react-router-dom";


const options = [
    { value:"excel", label:"Excel"},
    { value:"csv", label:"CSV"},
]
const ExportUser = () => {
        const [ movies ] = useState([]);
        const [ history, useHistory] = useState("");
        const [selectedOption, setSelectedOption] = useState(null);
        const [data, setData] = useState([]);

        const fetchData = () => {
          fetch(`https://localhost:8000/users/`)
            .then((response) => response.json())
            .then((actualData) => {
              console.log(actualData);
              setData(actualData.data);
              console.log(data);
            })
            .catch((err) => {
              console.log(err.message);
            });
        };
      
        useEffect(() => {
          fetchData();
        }, []);
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
            utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });
            utils.book_append_sheet(wb, ws, 'Report');
            writeFile(wb, 'Export Report.xlsx');
        }

  return (
    <>
    <Nav >
        <Nav.Item as='div' className="nav nav-tabs" id="nav-tab" role="tablist">
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/users-list">Users List</Link>
        <Link as="button" className="nav-link  nt-unseen" id="nav-following-tab" eventKey='Follow' type="button" to="/import-user">Import File</Link>
        </Nav.Item>
    </Nav>
    <div className="row">
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Export All Users Data</h4>
                </div>
                <div className="card-body">
                    <div className="form-validation">
                        <form
                        className="form-valide"
                        action="#"
                        method="post"
                        onSubmit={(e) => e.preventDefault()}
                        >
                    <div className="row">
                        <div className="col-xl-12">
                        <div className="form-group mb-3 row">
                        <label
                          className="col-xl-2 col-form-label"
                          htmlFor="val-website"
                        >
                          Export Type
                          <span className="text-danger">*</span>
                        </label>
                        {/* <div className="col-xl-8">
                        <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            >
            </Select><br/><br/><br/><br/>
                                </div> */}
                                <div className="col-xl-8 me-2">
                                <button onClick={handleExport} className="btn btn-primary float-right">
                                    Export in Excel <i className="fa fa-download"></i>
                                </button>&nbsp;&nbsp; OR &nbsp;
                                <CSVLink data={data} className="btn btn-primary">
                                Export in Csv <i className="fa fa-download"></i></CSVLink><br/>&nbsp;&nbsp;  &nbsp;
                                
                                </div>
                                <div>
                                    <br/>
                                    <br/>
                                <Link to="/users-list"><Button className="btn btn-light">
                                    Cancel
                                </Button></Link>
                                </div>
                            </div>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ExportUser