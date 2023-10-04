import React, { Fragment, useState, useEffect } from "react";
import Select from "react-select";
import { Link, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Tab,
  Tabs,
} from "react-bootstrap";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "src/store/user/userSlice";

const options = [
  { value: "all", label: "Add a course to all groups" },
  { value: "removeall", label: "Remove a course from all groups" },
];

const Groups = () => {
  const [grpId, setGrpId] = useState(); //grp id save for delete
  const [token, setToken] = useState(); //auth token
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [grpData, setGrpData] = useState([]); //super admin
  const [showModal, setShowModal] = useState(false); //delete button modal
  const [showMassActionModal, setShowMassActionModal] = useState(false); //mass action modal
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectCourseData, setSelectCourseData] = useState(null); //course
  const [getAllCourseData, setGetAllCourseData] = useState({}); //save all course data
  const [selectCourseError, setselectCourseError] = useState(null);
  const [groups, setGroups] = useState([]); //admin instructor
  const roleType = useSelector(selectUser).role[0];
  let history = useHistory();

  useEffect(() => {
    let accessToken = window.localStorage.getItem("jwt_access_token");
    let ID = window.localStorage.getItem("id");
    setToken(accessToken);
    getAllGroups();
    getAllCourses();
    fetchGroupsData(accessToken, ID);
  }, []);

  // All Groups List
  const getAllGroups = async () => {
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    const url = "https://v1.eonlearning.tech/lms-service/groups";
    try {
      const response = await axios.get(url, {
        headers: {
          "Auth-Token": jwtToken,
        },
      });
      const data = response.data.data;
      setGrpData(data === null ? data : data.groups_data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch Groups !"); // Handle the error
    }
  };

  // All Courses List
  const getAllCourses = async () => {
    const url = "https://v1.eonlearning.tech/lms-service/courses";
    const jwtToken = window.localStorage.getItem("jwt_access_token");
    try {
      const response = await axios.get(url, {
        headers: {
          "Auth-Token": jwtToken,
        },
      });
      const data = response?.data?.data;
      const expectedOutput = data.courses_data.map(({ id, coursename }) => ({
        value: id,
        label: coursename,
      }));
      setGetAllCourseData(data === null ? data : expectedOutput);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch Courses !"); // Handle the error
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

  const fetchGroupsData = async (accessToken, ID) => {
    try {
      const queryParams = {
        user_id: ID,
      };
      const url = new URL(
        "https://v1.eonlearning.tech/lms-service/fetch_enrolled_groups_of_users"
      );
      url.search = new URLSearchParams(queryParams).toString();
      const response = await axios.get(url.toString(), {
        headers: {
          "Auth-Token": accessToken,
          "Content-Type": "multipart/form-data",
        },
      });
      const list = response.data.data;
      setGroups(list === null ? list : list.group_ids);
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to fetch Groups !");
    }
  };

  const handleEdit = (id) => {
    console.log("inside course handle edit page", id);
    history.push(`/edit-groups/${id}`);
  };

  const deleteGrp = (grpId) => {
    console.log(grpId);
    setShowModal(true);
    setGrpId(grpId);
  };

  //superadmin delete
  const handleDeleteMain = async () => {
    const config = {
      headers: {
        "Auth-Token": token,
      },
    };
    const requestBody = {
      id: grpId,
    };
    await axios
      .delete(`https://v1.eonlearning.tech/lms-service/delete_group`, {
        ...config,
        data: requestBody,
      })
      .then((response) => {
        setShowModal(false);
        getAllGroups();
        toast.success("Group deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete group!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleDelete = async () => {
    const ID = window.localStorage.getItem("id");
    try {
      const queryParams = {
        data_user_group_enrollment_id: grpId,
      };
      const url = new URL(
        "https://v1.eonlearning.tech/lms-service/remove_groups_from_enrolled_user"
      );
      url.search = new URLSearchParams(queryParams).toString();
      await axios.delete(url.toString(), {
        headers: {
          "Auth-Token": token,
          "Content-Type": "multipart/form-data",
        },
      });
      setShowModal(false);
      fetchGroupsData(token, ID);
      toast.success("Group deleted successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.error(error);
      setShowModal(false);
      toast.error("Failed to delete Group!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
    setSelectedValue(selected.value);

    if (selected.value === "all") {
      setShowMassActionModal(true);
    }
    if (selected.value === "removeall") {
      setShowMassActionModal(true);
    }
  };

  const handleSelectCourse = (selected) => {
    setSelectCourseData(selected);
    setselectCourseError(null);
  };

  const handleMassActionAdd = (e) => {
    e.preventDefault();
    if (selectCourseData === null) {
      setselectCourseError("Please select a course before adding");
    } else {
      setselectCourseError(null);
      setShowMassActionModal(false);
      const formData = new FormData();
      formData.append("course_id", selectCourseData.value);
      formData.append("generate_token", true);
      const url =
        "https://v1.eonlearning.tech/lms-service/mass_enroll_course_group";
      axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Auth-Token": token,
          },
        })
        .then((response) => {
          console.log(response.data);
          toast.success("Course Add successfully!!!");
        })
        .catch((error) => {
          console.error(error);
          setShowMassActionModal(false);
          toast.error("Failed !!! Unable to add course...");
        });
    }
  };

  const handleMassActionRemove = async (e) => {
    e.preventDefault();
    if (selectCourseData === null) {
      setselectCourseError("Please select a course before remove");
    } else {
      setselectCourseError(null);
      setShowMassActionModal(false);
      const url =
        "https://v1.eonlearning.tech/lms-service/mass_unenroll_course_group";
      const formData = new FormData();
      formData.append("course_id", selectCourseData.value);
      await axios
        .delete(url, {
          headers: {
            "Auth-Token": token,
          },
          data: formData,
        })
        .then((response) => {
          console.log(response.data);
          toast.success("Course remove successfully!!!");
        })
        .catch((error) => {
          console.error(error);
          setShowMassActionModal(false);
          toast.error("Failed !!! Unable to remove course...");
        });
    }
  };

  return (
    <Fragment>
      <Tabs activeKey={activeTab} onSelect={handleTabChange}>
        <Tab eventKey="dashboard" title="Dashboard"></Tab>
        <Tab eventKey="add-groups" title="Add Groups"></Tab>
      </Tabs>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>
                <div>
                  <Link to="/add-groups">
                    <Button variant="primary">Add Groups</Button>
                  </Link>
                </div>
              </Card.Title>
              <Select
                defaultValue={selectedOption}
                onChange={handleSelectChange}
                options={options}
                placeholder="Mass Action"
                className="col-lg-5"></Select>
            </Card.Header>
            {roleType === "Superadmin" && (
              <Card.Body>
                {grpData?.length <= 0 ? (
                  <div className="loader-container">
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="130"
                      visible={true}
                    />
                  </div>
                ) : grpData === null ? (
                  <div>
                    <p className="text-center fs-20 fw-bold">No Group Found.</p>
                  </div>
                ) : (
                  <>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th className="text-center">
                            <strong>NAME</strong>
                          </th>
                          <th className="text-center">
                            <strong>DESCRIPTION</strong>
                          </th>
                          <th className="text-center">
                            <strong>OPTION</strong>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {grpData?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="text-center">{item.groupname}</td>
                              <td className="text-center">{item.groupdesc}</td>
                              <td className="text-center">
                                <div
                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                  onClick={(e) => handleEdit(item.id)}>
                                  <i className="fas fa-pencil-alt"></i>
                                </div>
                                <div
                                  className="btn btn-danger shadow btn-xs sharp"
                                  onClick={() => deleteGrp(item.id)}>
                                  <i className="fa fa-trash"></i>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </>
                )}
              </Card.Body>
            )}
            {roleType === "Admin" || roleType === "Instructor" ? (
              <Card.Body>
                {" "}
                {groups?.length <= 0 ? (
                  <div className="loader-container">
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="130"
                      visible={true}
                    />
                  </div>
                ) : groups === null ? (
                  <div>
                    <p className="text-center fs-20 fw-bold">No Group Found.</p>
                  </div>
                ) : (
                  <>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th className="text-center">
                            <strong>NAME</strong>
                          </th>
                          <th className="text-center">
                            <strong>DESCRIPTION</strong>
                          </th>
                          <th className="text-center">
                            <strong>OPTION</strong>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {groups?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="text-center">{item.groupname}</td>
                              <td className="text-center">{item.groupdesc}</td>
                              <td className="text-center">
                                <div
                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                  onClick={(e) => handleEdit(item.id)}>
                                  <i className="fas fa-pencil-alt"></i>
                                </div>
                                <div
                                  className="btn btn-danger shadow btn-xs sharp"
                                  onClick={() =>
                                    deleteGrp(
                                      item.data_user_group_enrollment_id
                                    )
                                  }>
                                  <i className="fa fa-trash"></i>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </>
                )}
              </Card.Body>
            ) : (
              ""
            )}
          </Card>
        </Col>
      </Row>
      <div>
        <Button onClick={() => history.goBack()}>Back</Button>
      </div>
      {/* Delete Group Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Are you sure you want to delete a Group?</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger light" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="btn btn-primary"
            onClick={
              roleType === "Superadmin" ? handleDeleteMain : handleDelete
            }>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Mass Action Modal */}
      <Modal
        show={showMassActionModal}
        onHide={() => setShowMassActionModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedValue === "all" ? (
              <>Add a course to all groups</>
            ) : (
              <>Remove a course from all groups</>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            value={selectCourseData}
            options={getAllCourseData}
            onChange={handleSelectCourse}
            placeholder="Select a Course"
            required></Select>
        </Modal.Body>
        <Modal.Footer>
          {selectedValue === "all" ? (
            <>
              {" "}
              <Button
                variant="btn btn-primary w-25"
                onClick={handleMassActionAdd}>
                Add
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="btn btn-primary w-25"
                onClick={handleMassActionRemove}>
                Remove
              </Button>
            </>
          )}

          <Button
            variant="danger light w-25"
            onClick={() => setShowMassActionModal(false)}>
            Cancel
          </Button>
          <br />
          {selectCourseError && (
            <div className="error-message text-danger fs-14">
              {selectCourseError}
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Groups;
