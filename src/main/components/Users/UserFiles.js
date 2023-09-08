import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { utils, writeFile } from "xlsx";
import * as XLSX from "xlsx";

import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Nav,
  Button,
  FormCheck,
  Tab,
  Tabs,
} from "react-bootstrap";

const UserFiles = (props) => {
  const userId = props.match.params.id;
  const [activeTab, setActiveTab] = useState("user-files/:id");
  const [selectedFile, setSelectedFile] = useState(null); //excel file
  const [excelData, setExcelData] = useState([]);
  const dropzoneRef = useRef(null);
  const history = useHistory();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  useEffect(() => {
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1);
    setActiveTab(tab);
  }, [history.location.pathname]);

  const handleFileDrop = async (files, allFiles) => {
    if (files.length > 0) {
      setSelectedFile(files[0].file);

      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          raw: true,
        });
        setExcelData(jsonData);
      };
      reader.readAsArrayBuffer(files[0].file);
    }
  };

  const styles = {
    dropzone: {
      minHeight: 200,
      maxHeight: 250,
      width: "100%",
      backgroundColor: "#f2f4fa",
      border: "4px dashed #DDDFE1",
      overflow: "hidden",
    },
    inputLabel: {
      color: "#7e7e7e",
      fontSize: "18px",
      fontWeight: "normal",
      backgroundColor: "#f2f4fa",
    },
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey={`edit-user/${userId}`} title="Info"></Tab>
              <Tab
                eventKey={`user-courses-info/${userId}`}
                title="Courses"></Tab>
              <Tab eventKey={`user-groups/${userId}`} title="Groups"></Tab>
              <Tab eventKey={`user-files/${userId}`} title="Files"></Tab>
            </Tabs>
            <div className="card-header">
              <h4 className="card-title">Files</h4>
            </div>
            <div className="card-body">
              <Dropzone
                onSubmit={handleFileDrop}
                ref={dropzoneRef}
                inputContent="Drag a Excel or CSV file or click to browse"
                styles={styles}></Dropzone>
              {/* <div className="text-end fs-6">
                Accepted Files : CSV, xls, xlsx - 1 MB
              </div> */}
              <br />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserFiles;
