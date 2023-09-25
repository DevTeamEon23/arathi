import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

const AddClassrooms = () => {
  const [instname, setInstname] = useState("");
  const [classname, setClassname] = useState("");
  const [date, setDate] = useState("");
  const [starttime, setStarttime] = useState("");
  const [venue, setVenue] = useState("");
  const [messg, setMessg] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Classroom Training</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form>
                  <div className="row"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddClassrooms;
