import React, { useState } from "react"; 
import Select from "react-select"; 
import { read, utils, writeFile } from 'xlsx';
import { Button, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";


const options = [
    { value:"excel", label:"Excel"},
    { value:"csv", label:"CSV"},
]
const SuExportUser = () => {
        const [ movies, setMovies] = useState([]);
        const [ history, useHistory] = useState("");
        const [selectedOption, setSelectedOption] = useState(null);

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
            writeFile(wb, 'Export Report.xlsx');
        }
        const goBack = () => [
            history.back(-1)
        ]

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
                        <div className="col-xl-6">
                        <div className="form-group mb-3 row">
                        <label
                          className="col-xl-4 col-form-label"
                          htmlFor="val-website"
                        >
                          Export Type
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-xl-8">
                        <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            >
            </Select><br/><br/><br/><br/>
                                <div className="me-2">
                                <button onClick={handleExport} className="btn btn-primary float-right">
                                    Export <i className="fa fa-download"></i>
                                </button>&nbsp;&nbsp; Or &nbsp;
                                <Link to="/users-list"><Button className="btn btn-light">
                                    Cancel
                                </Button></Link>
                                </div>
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

export default SuExportUser