import React, { useState, useEffect } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import axios from "axios";

const ExportUser = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("/export-user");
  const [exportType, setExportType] = useState();
  const [error, setError] = useState("");

  const handleExport = async () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const url =
      "https://v1.eonlearning.tech/lms-service/download/exported_data.xlsx"; // Update the URL as needed

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Auth-Token": jwtToken,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob); // Create an object URL for the blob

        // Create a hidden anchor element for downloading
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "exported_data.xlsx";
        downloadLink.style.display = "none";

        // Append the anchor to the document
        document.body.appendChild(downloadLink);

        // Simulate a click event to trigger the download
        downloadLink.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(downloadLink);
      } else {
        console.error("Failed to download the file:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed !!! Unable to Export data...");
    }
  };

  const handleExportCSV = async () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const url =
      "https://v1.eonlearning.tech/lms-service/download/exported_data.csv"; // Update the URL for the CSV file

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Auth-Token": jwtToken,
        },
      });

      if (response.ok) {
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob); // Create an object URL for the blob

        // Create a hidden anchor element for downloading
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "exported_data.csv"; // Set the filename to match the CSV file
        downloadLink.style.display = "none";

        // Append the anchor to the document
        document.body.appendChild(downloadLink);

        // Simulate a click event to trigger the download
        downloadLink.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(downloadLink);
      } else {
        console.error("Failed to download the file:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed !!! Unable to Export data...");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  useEffect(() => {
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1);
    setActiveTab(tab);
  }, [history.location.pathname]);

  const exportTypeOption = [
    { value: "excel", label: "Excel" },
    { value: "csv", label: "CSV" },
  ];

  const handleExportTypeChange = (selectedExportType) => {
    setError("");
    setExportType(selectedExportType);

    if (selectedExportType.value === "excel") {
      handleExportToExcel();
    } else if (selectedExportType.value === "csv") {
      handleExportToCSV();
    }
  };

  const handleExportToExcel = () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const config = {
      headers: {
        "Auth-Token": jwtToken,
      },
    };
    axios
      .get("https://v1.eonlearning.tech/lms-service/export_to_excel", config)
      .then((response) => {
        const data = response.data.data;
      })
      .catch((error) => {
        toast.error("Failed to fetch data!");
      });
  };

  const handleExportToCSV = () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const config = {
      headers: {
        "Auth-Token": jwtToken,
      },
    };
    axios
      .get("https://v1.eonlearning.tech/lms-service/export_to_csv", config)
      .then((response) => {
        const data = response.data.data;
      })
      .catch((error) => {
        toast.error("Failed to fetch data!");
      });
  };

  const handleExportButtonClick = () => {
    if (exportType === undefined) {
      setError("Please select Export type...");
    } else {
      setError("");
      if (exportType.value === "excel") {
        handleExport();
      } else if (exportType.value === "csv") {
        handleExportCSV();
      }
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey="export-user" title="Export"></Tab>
              <Tab eventKey="import-user" title="Import"></Tab>
            </Tabs>
            <div className="card-header">
              <h4 className="card-title">Export Data</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form className="form-valide">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="form-group mb-3 row">
                        <label className="col-xl-1 col-form-label">
                          Export Type
                          <span className="text-danger">*</span>
                        </label>

                        <div className="col-xl-5 me-2">
                          <Select
                            value={exportType}
                            options={exportTypeOption}
                            onChange={(exportType) =>
                              handleExportTypeChange(exportType)
                            }
                          />
                          <br />
                          <br />
                          <Button onClick={handleExportButtonClick}>
                            Export
                          </Button>
                          &nbsp;&nbsp; &nbsp;
                          <Link to="/users-list">
                            <Button className="btn btn-light">Cancel</Button>
                          </Link>
                          {error && (
                            <div className="text-danger fs-16 mt-2">
                              {error}
                            </div>
                          )}
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
  );
};

export default ExportUser;
