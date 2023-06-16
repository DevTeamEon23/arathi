import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";

import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { v4 as uuid } from 'uuid';


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

const AddGroups = () => {
  const [id, setId] = useState('');
  const [groupname, setGroupname] = useState('');
  const [groupdesc, setGroupdesc] = useState('');
  const [groupkey, setGroupkey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [value, onChange] = useState(new Date());
  const [groups, setGroups] = useState([]);
  const unique_id = uuid();
  const small_id = unique_id.slice(0,8)

  let history= useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {id,groupname, groupdesc, groupkey};

    fetch('https://localhost:8000/groups', {
      method: 'POST',
    })
    .then((data) => {
      console.log('new group added')
      alert("✔️ Group Added Successfully");
      setGroups(data);
      history.push("/add-groups");
    })
      .catch((err) => {
        console.log(err);
      });
    }


  return (
    <Fragment>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Groups</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form action="https://localhost:8000/groups" method="post" encType="multipart/form-data">
                  <div className="row">
                    <div className="col-xl-10">
                    <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          id
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            name="id"
                            placeholder="e.g. 1"
                            onChange={(e) => setId(e.target.value)}
                          />
                        </div>
                      </div>    
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="groupname"
                            name="groupname"
                            placeholder="E.g Startup Courses"
                            onChange={(e) => setGroupname(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-suggestions"
                        >
                          Description <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <textarea
                            className="form-control"
                            id="groupdesc"
                            name="groupdesc"
                            rows="5"
                            placeholder="Short Description about course.."
                            onChange={(e) => setGroupdesc(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-04">

                          
                        </div><br />

                      <div className="form-group mb-3 row">
                    </div>
                    <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          Group Key
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <p>{small_id}</p>
                          <input
                            type="text"
                            className="form-control"
                            id="groupkey"
                            name="groupkey"
                            placeholder="Enter Group Key"
                            onChange={(e) => setGroupkey(e.target.value)}
                          />
                        </div>
                      </div>
                  <button
                    type="submit"
                    className="btn me-2 btn-primary"
                  >
                    Add Group
                  </button>
                  <Link to="/groups"><Button className="btn btn-light">
                    Cancel
                  </Button></Link>
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

export default AddGroups;
