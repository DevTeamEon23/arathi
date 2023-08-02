import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import * as Yup from "yup";
import { Button, Nav } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

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

const options = [
  { value: "parent_category_1", label: "Parent Category 1" },
  { value: "parent_category_2", label: "Parent Category 2" },
  { value: "parent_category_3", label: "Parent Category 3" },
  { value: "parent_category_4", label: "Parent Category 4" },
];

const EditCategory = (props) => {
  const catId = props.match.params.id;
  console.log({ catId });
  const [categoryId, setCategoryId] = useState("");
  const [catData, setCatData] = useState(); //category data by id
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [value, onChange] = useState(new Date());
  const [file, setFile] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [token, setToken] = useState(); //auth token
  const history = useHistory();

  useEffect(() => {
    let token = window.localStorage.getItem("jwt_access_token");
    setToken(token);
    if (catId !== undefined) {
      setCategoryId(catId);
      getCategoryById(catId, token);
    }
  }, []);

  // Category details by ID
  const getCategoryById = async (id, authToken) => {
    console.log("inside get cat by id", id, authToken);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/lms-service/categories_by_onlyid",
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
    const url = "http://127.0.0.1:8000/lms-service/update_categories";
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
      <Nav>
        <Nav.Item as="div" className="nav nav-tabs" id="nav-tab" role="tablist">
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            type="button"
            to="/dashboard">
            Dashboard
          </Link>
          <Link
            as="button"
            className="nav-link  nt-unseen"
            id="nav-following-tab"
            type="button"
            to="/add-category">
            Add Category
          </Link>
        </Nav.Item>
      </Nav>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Edit Category </h4>
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
