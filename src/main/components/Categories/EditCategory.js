import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Nav, Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

const EditCategory = (props) => {
  const catId = props.match.params.id;
  const [categoryId, setCategoryId] = useState("");
  const [catData, setCatData] = useState(); //category data by id
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [token, setToken] = useState(); //auth token
  const [activeTab, setActiveTab] = useState("edit-category/:id");
  const history = useHistory();

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    if (catId !== undefined) {
      setCategoryId(catId);
      getCategoryById(catId, token);
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  useEffect(() => {
    const currentPath = history.location.pathname;
    const tab = currentPath.substring(1);
    setActiveTab(tab);
  }, [history.location.pathname]);

  // Category details by ID
  const getCategoryById = async (id, authToken) => {
    console.log("inside get cat by id", id, authToken);
    try {
      const response = await axios.get(
        "lms-service/categories_by_onlyid",
        {
          headers: {
            "Auth-Token": authToken,
          },
          params: {
            id: catId,
          },
        }
      );
      setCatData(response.data.data);
      if (response.data.status === "success") {
        console.log(response.data.data);
        const res = response.data.data;
        setName(res.name);
        setPrice(res.price);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users!"); // Handle the error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", categoryId);
    formData.append("name", name);
    formData.append("price", price);
    const url = "lms-service/update_categories";
    const authToken = token;
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Auth-Token": authToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Category updated successfully!!!");
        clearAllState();
        history.push(`/categories`);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed !!! Unable to update category...");
      });
  };

  const clearAllState = () => {
    console.log("inside clear function");
    setName("");
    setPrice("");
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey={`dashboard`} title="Dashboard"></Tab>
              <Tab eventKey={`add-category`} title="Add Category"></Tab>
            </Tabs>
            <div className="card-header">
              <h4 className="card-title">Edit Category</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                {catData === undefined ? (
                  <div className="loader-container">
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="100"
                      visible={true}
                    />
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="form-group mb-3 row">
                          <label
                            className="col-lg-4 col-form-label"
                            htmlFor="val-username">
                            Name
                            <span className="text-danger">*</span>
                          </label>
                          <div className="col-lg-6">
                            <input
                              type="text"
                              className="form-control"
                              id="val-username"
                              name="val-username"
                              value={name}
                              placeholder="e.g. React-Redux"
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        {/* <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-website"
                        >
                          Parent Category
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            >
            </Select>
                        </div>
                      </div> */}
                        <div className="form-group mb-3 row">
                          <label
                            className="col-lg-4 col-form-label"
                            htmlFor="val-currency">
                            Price
                            <span className="text-danger">*</span>
                          </label>
                          <div className="col-lg-6">
                            <input
                              type="text"
                              className="form-control"
                              id="val-currency"
                              name="val-currency"
                              value={price}
                              placeholder="₹21.60"
                              onChange={(e) => setPrice(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <br />

                        <br />
                        <div className="form-group mb-5 row">
                          <div className="col-lg-8 ms-auto">
                            <Button
                              type="submit"
                              value="submit"
                              className="btn me-2 btn-primary">
                              Update Category
                            </Button>{" "}
                            or &nbsp;&nbsp;
                            <Link to="/categories">
                              <Button className="btn me-2 btn-light">
                                Cancel
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditCategory;
