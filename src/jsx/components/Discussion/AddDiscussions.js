import React, { Fragment, useState } from "react";
import { read, utils, writeFile } from 'xlsx';
import { Link } from "react-router-dom";
import { Formik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import TimePickerPicker from 'react-time-picker';
import profile from "../../../images/profile/profile.png";
import {
  Dropdown,
  DropdownButton,
  Button,
} from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Your username must consist of at least 3 characters ")
    .max(50, "Your username must consist of at least 3 characters ")
    .required("Please enter a username"),
  password: Yup.string()
    .min(5, "Your password must be at least 5 characters long")
    .max(50, "Your password must be at least 5 characters long")
    .required("Please provide a password"),
});

const AddDiscussion = () => {
  const [movies, setMovies] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [value, onChange] = useState(new Date());
  const [file, setFile] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
}

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
const options = [
  { value: "everybody", label: "Everybody can see this topic" },
  { value: "onlythis", label: "Only this selected users" },
  { value: "nobody", label: "Nobody" },
];
const options_1 = [
  { value: "classroom", label: "Classroom Training Type" },
  { value: "conference", label: "Conference Training Type" },
  { value: "virtual", label: "Virtual Training Type" },
];

  return (
    <Fragment>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Discussion </h4>
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
                        <label
                          className="col-lg-12 col-form-label"
                          htmlFor="val-username"
                        >
                          Topic
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-12">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            name="val-username"
                            placeholder=""
                          />
                        </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-12 col-form-label"
                          htmlFor="val-suggestions"
                        >
                        <br/>
                        <br/>
                          Message <span className="text-danger">*</span>
                        </label>&nbsp;&nbsp;
                        <div className="col-lg-12">
                        <br/>
                        <br/>
                          <textarea
                            className="form-control"
                            id="val-suggestions"
                            name="val-suggestions"
                            rows="5"
                            placeholder="Message up to 500 characters"
                          ></textarea>
                          <br/>
                          <br/>
                          
                          
                          <h5 className="mb-4"><input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
								<i className="fa fa-paperclip" type="file" onChange={handleImport}></i> Select attachment
							  </h5>
                          <br/>
                          <div className="form-group mb-3 row">
                        <div className="col-lg-6">
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                        >
                        </Select>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <div className="col-lg-6">
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options_1}
                        >
                        </Select>
                      </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <div className="col-lg-8 ms-auto">
                          <br/>
                          <br/>
                        <Button
                          type="submit"
                          className="btn me-2 btn-primary"
                        >
                         &nbsp;&nbsp;&nbsp;&nbsp; Save&nbsp;&nbsp;&nbsp;&nbsp;
                        </Button> or &nbsp;&nbsp;
                        <Button  className="btn btn-light">
                          Cancel
                        </Button>
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
    </Fragment>
  );
};

export default AddDiscussion;
