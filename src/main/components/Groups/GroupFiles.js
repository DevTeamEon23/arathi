import React, { useState, useEffect } from "react";
import { read, utils, writeFile } from "xlsx";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone-uploader";
import { Link, useHistory } from "react-router-dom";
import { Nav, Row, Col, Card, Table, Tab, Tabs } from "react-bootstrap";

const GroupFiles = (props) => {
  const grpId = props.match.params.id;
  console.log({ grpId });
  const [movies, setMovies] = useState([]);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});
  const [activeTab, setActiveTab] = useState("group-files/:id");
  const history = useHistory();

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
          setMovies(rows);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  useEffect(() => {
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1); // Remove the leading slash
    setActiveTab(tab);
  }, [history.location.pathname]);

  return (
    <>
      <Row>
        <Col xxl={12}>
          <Card>
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey={`edit-groups/${grpId}`} title="Info"></Tab>
              <Tab eventKey={`groups-users/${grpId}`} title="Users"></Tab>
              <Tab eventKey={`group-courses/${grpId}`} title="Courses"></Tab>
              <Tab eventKey={`group-files/${grpId}`} title="Files"></Tab>
            </Tabs>
            <div className="row">
              <div className="container">
                <div {...getRootProps}>
                  <input
                    {...getInputProps()}
                    required
                    onChange={handleImport}
                  />
                  <Dropzone
                    styles={{
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
                    }}>
                    <i class="bi bi-cloud-upload"></i>&nbsp;Choose files to
                    upload or drag-and-drop here
                    <br />{" "}
                  </Dropzone>
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
                        <input
                          type="file"
                          name="file"
                          className="custom-file-input"
                          id="inputGroupFile"
                          required
                          onChange={handleImport}
                          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="inputGroupFile">
                          Choose file Or Drag on Choose Button
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <Table
                  style={{ textAlign: "center" }}
                  responsive
                  striped
                  bordered
                  className="verticle-middle">
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
                    {movies.length ? (
                      movies.map((movie, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{movie.NAME}</td>
                          <td>{movie.VISIBILITY}</td>
                          <td>{movie.TYPE}</td>
                          <td>{movie.SIZE}</td>
                          <td>{movie.UPLOADED}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="11" rowSpan="11" className="text-center">
                          No File Found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <br />
                <br />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default GroupFiles;
