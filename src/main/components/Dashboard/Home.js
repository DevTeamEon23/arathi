import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import Bar2 from "./../../components/charts/Chartjs/bar2";
import BarChart1 from "./../../components/charts/Chartjs/bar1";
// sample
// import { useGetUsersQuery } from "../../../services/testService";

//Import Components
import { ThemeContext } from "@context/ThemeContext";
import DropDownBlog from "./DropDownBlog";
import CourseBlog from "./Dashboard/CourseBlog";
import CalendarBlog from "./Dashboard/CalendarBlog";

//images
import Educat from "@images/egucation-girl.png";
import Calpng from "@images/vector/calpng.png";
import Book from "@images/vector/book.png";

const LearningActivityChart = loadable(() =>
  pMinDelay(import("./Dashboard/LearningActivityChart"), 1000)
);
const ScoreActivityChart = loadable(() =>
  pMinDelay(import("./Dashboard/ScoreActivityChart"), 1000)
);
const ProgressChart = loadable(() =>
  pMinDelay(import("./Dashboard/ProgressChart"), 1000)
);

const Home = () => {
  // Smaple
  // const { data, isLoading, isError, isFetching, isSuccess } =
  //   useGetUsersQuery();
  const [dropSelect, setDropSelect] = useState("This Month");
  const { changeBackground } = useContext(ThemeContext);

  const [dataCounts, setDataCounts] = useState([]);
  const [deptCount, setDeptCount] = useState([]);
  const [userActivity, setuserActivity] = useState("");
  const [userEnrolledCourses, setUserEnrolledCourses] = useState([]);
  const Department = window.localStorage.getItem("dept");
  const role = window.localStorage.getItem("role");
  const jwtToken = window.localStorage.getItem("jwt_access_token");
  const ID = window.localStorage.getItem("id");

  useEffect(() => {
    changeBackground({ value: "light", label: "Light" });
    if (role === "Admin") {
      getDataCounts();
      getUserActivity();
      getDeptCount();
      getUserEnrolledCourses();
    } else {
      getDataCountsSA();
      getUserActivitySA();
      getDeptCountSA();
      getUserEnrolledCoursesSA();
    }
  }, []);

  //data counts
  const getDataCounts = async () => {
    try {
      const queryParams = {
        user_id: ID,
      };
      const url = new URL(
        "https://beta.eonlearning.tech/lms-service/data_counts_for_admin"
      );
      url.search = new URLSearchParams(queryParams).toString();
      const response = await axios.get(url.toString(), {
        headers: {
          "Auth-Token": jwtToken,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("inside course blog", response.data.data.data_counts_data);
      setDataCounts(response.data.data.data_counts_data);
    } catch (error) {
      // toast.error("Failed to fetch users!");
    }
  };

  //User Login data
  const getUserActivity = async () => {
    try {
      const queryParams = {
        user_id: ID,
      };
      const url = new URL(
        "https://beta.eonlearning.tech/lms-service/fetch_userpoints_by_userid_for_admin"
      );
      url.search = new URLSearchParams(queryParams).toString();
      const response = await axios.get(url.toString(), {
        headers: {
          "Auth-Token": jwtToken,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.data.user_ids);
      setuserActivity(response.data.data.user_ids);
    } catch (error) {
      // toast.error("Failed to fetch users!");
    }
  };

  //User dept count
  const getDeptCount = () => {
    const config = {
      headers: {
        "Auth-Token": jwtToken,
      },
    };
    axios
      .get(
        "https://beta.eonlearning.tech/lms-service/department_counts_for_admin",
        config
      )
      .then((response) => {
        setDeptCount(response.data.data.dept_counts_data);
      })
      .catch((error) => {
        // toast.error("Failed to fetch users!");
      });
  };

  //enrolled courses to user
  const getUserEnrolledCourses = async () => {
    try {
      const queryParams = {
        user_id: ID,
      };
      const url = new URL(
        "https://beta.eonlearning.tech/lms-service/fetch_user_enrolled_course_data_for_admin"
      );
      url.search = new URLSearchParams(queryParams).toString();
      const response = await axios.get(url.toString(), {
        headers: {
          "Auth-Token": jwtToken,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.data.enrolled_info);
      setUserEnrolledCourses(response.data.data.enrolled_info);
    } catch (error) {
      // toast.error("Failed to fetch users!");
    }
  };

  //data counts SA
  const getDataCountsSA = async () => {
    try {
      const queryParams = {
        user_id: ID,
      };
      const url = new URL(
        "https://beta.eonlearning.tech/lms-service/data_counts"
      );
      url.search = new URLSearchParams(queryParams).toString();
      const response = await axios.get(url.toString(), {
        headers: {
          "Auth-Token": jwtToken,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("inside Home SA", response.data.data.data_counts_data);
      setDataCounts(response.data.data.data_counts_data);
    } catch (error) {
      // toast.error("Failed to fetch users!");
    }
  };

  //User Login data SA
  const getUserActivitySA = async () => {
    try {
      const queryParams = {
        user_id: ID,
      };
      const url = new URL(
        "https://beta.eonlearning.tech/lms-service/fetch_userpoints_superadmin_by_id"
      );
      url.search = new URLSearchParams(queryParams).toString();
      const response = await axios.get(url.toString(), {
        headers: {
          "Auth-Token": jwtToken,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.data.user_ids);
      setuserActivity(response.data.data.user_ids);
    } catch (error) {
      // toast.error("Failed to fetch users!");
    }
  };

  //User dept count SA
  const getDeptCountSA = () => {
    const config = {
      headers: {
        "Auth-Token": jwtToken,
      },
    };
    axios
      .get(
        "https://beta.eonlearning.tech/lms-service/department_counts",
        config
      )
      .then((response) => {
        setDeptCount(response.data.data.dept_counts_data);
      })
      .catch((error) => {
        // toast.error("Failed to fetch users!");
      });
  };

  //enrolled courses to user SA
  const getUserEnrolledCoursesSA = async () => {
    try {
      const queryParams = {
        user_id: ID,
      };
      const url = new URL(
        "https://beta.eonlearning.tech/lms-service/fetch_user_enrolled_course_data"
      );
      url.search = new URLSearchParams(queryParams).toString();
      const response = await axios.get(url.toString(), {
        headers: {
          "Auth-Token": jwtToken,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.data.enrolled_info);
      setUserEnrolledCourses(response.data.data.enrolled_info);
    } catch (error) {
      // toast.error("Failed to fetch users!");
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <CourseBlog data={dataCounts} />
        </div>

        <div className="col-xl-6 col-lg-12">
          <div className="card">
            <div className="card-header border-0  flex-wrap">
              <h4>Department wise User Count</h4>
            </div>
            <div
              className="card-body pb-1 pt-0"
              style={{ overflow: "visible" }}>
              <ScoreActivityChart data={deptCount} />
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-lg-12">
          <div className="card score-active">
            <div className="card-header border-0 flex-wrap">
              <h4>Enrolled Courses</h4>{" "}
            </div>
            <div className="card-body pb-1 custome-tooltip style-1 py-0">
              <BarChart1 data={userEnrolledCourses} />
            </div>{" "}
          </div>
        </div>

        <div className="col-xl-12 col-lg-6">
          <div className="card score-active">
            <div className="card-header border-0 flex-wrap">
              <h4>Learning Activity</h4>
            </div>
            <div className="card-body pb-1 py-0 ">
              <LearningActivityChart data={userActivity} />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="col-xl-12 col-xxl-6">
          <div className="card score-active">
            <div className="card-header border-0 flex-wrap">
              <h4>Learning Activity</h4>
            </div>

            <div className="card-body pb-1 py-0 ">
              <ul className="d-flex ">
                <li>
                  <svg
                    className="me-2"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect
                      x="1.5"
                      y="1.5"
                      width="9"
                      height="9"
                      rx="4.5"
                      fill="white"
                      stroke="rgba(173,216,230,0.2)"
                      strokeWidth="3"
                    />
                  </svg>
                  Learner
                </li>
                <li>
                  <svg
                    className="me-2"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect
                      x="1.5"
                      y="1.5"
                      width="9"
                      height="9"
                      rx="4.5"
                      fill="white"
                      stroke="rgba(0,0,139,0.2)"
                      strokeWidth="3"
                    />
                  </svg>
                  Instructor
                </li>
              </ul>
              <Bar2 data={userActivity} />
            </div>
          </div>
        </div> */}

      {/* <div className="col-xl-8 col-lg-6">
              <div className="card">
                <div className="card-body card-calendar home-calendar">
                  <CalendarBlog />
                </div>
              </div>
            </div> */}
    </>
  );
};
export default Home;
