import React, { useState } from "react";
import { Button, Modal, Dropdown } from "react-bootstrap";
import Select from "react-select";

const UserInfographics = () => {
  const options = [
    { value: "sample", label: "Samples" },
    { value: "sample", label: "Samples" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Infographics </h4>
              <div className="me-2">
                {" "}
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  placeholder="Your training infographic"></Select>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default UserInfographics;
