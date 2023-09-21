import Metismenu from "metismenujs"; /// Menu
import React, { Component, useContext, useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar"; /// Scroll
import { Link } from "react-router-dom";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "@context/ThemeContext";
import { useSelector } from "react-redux";
import { selectUser } from "src/store/user/userSlice";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new Metismenu(this.$el);
  }
  componentWillUnmount() {}
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const SideBar = () => {
  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext);
  const roleType = useSelector(selectUser).role[0];

  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);
    return () => {
      btn.removeEventListener("click", toggleFunc);
    };
  }, []);

  //For scroll
  const [hideOnScroll, setHideOnScroll] = useState(true);
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll]
  );
  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  let deshBoard = [""],
    superadmin = ["", "dashboard-dark", "users", "categories"],
    admin = ["", "dashboard-dark", "users", "categories"],
    maininstructor = ["inst-dash", "dashboard-dark", "users", "categories"],
    learner = [
      "learn-dash",
      "st-profile",
      "courses",
      "discussion",
      "calender",
      "groups",
    ],
    learnfiles = ["learn-files"],
    learngroups = ["learn-group"],
    learncertificate = ["learn-certificate"],
    learntimeline = ["learn-timeline"],
    users = [
      "users-list",
      "add-user",
      "import-user",
      "export-user",
      "user-types",
      "add-user-type",
    ],
    ausers = [
      "users-list",
      "add-user",
      "ad-add-user",
      "ad-edit-user",
      "ad-user-types",
      "ad-add-user-type",
      "ad-edit-user-type",
      "ad-import-user",
      "ad-export-user",
      "ad-user-files",
      "ad-user-groups",
      "ad-user-course",
      "ad-user-progress",
      "ad-user-certificates",
      "ad-user-timeline",
      "ad-user-infographic",
    ],
    importexport = ["import-user", "export-user"],
    usertypes = ["user-types", "add-user-type"],
    categories = ["categories", "add-category"],
    courses = [
      "courses",
      "course-details-1",
      "course-details-2",
      "add-courses",
      "courses-info",
      "scorm-file",
    ],
    learnercourse = ["learn-course"],
    admcourses = [
      "adm_courses",
      "adm_course-details-1",
      "adm_course-details-2",
      "adm_add-courses",
      "adm_courses-info",
    ],
    groups = ["groups", "add-groups"],
    agroups = ["adm_groups", "adm_add-groups"],
    igroups = ["inst_groups", "inst_add-groups"],
    events = ["events", "add-events"],
    aevents = ["adm_events", "adm_add-events"],
    instructor = [
      "instructor-dashboard",
      "instructor-courses",
      "instructor-schedule",
      "instructor-students",
      "instructor-resources",
      "instructor-transactions",
      "instructor-liveclass",
      "form-validation-jquery",
    ],
    reports = [
      "reports-overview",
      "user-reports",
      "course-reports",
      "group-reports",
      "scorm-reports",
      "test-reports",
      "survey-reports",
      "assign-reports",
      "ilt-reports",
      // "custom-reports",
      "infographics",
    ],
    areports = [
      "adm_reports-overview",
      "adm_user-reports",
      "adm_course-reports",
      "adm_group-reports",
      "adm_infographics",
    ],
    accountsettings = [
      "basic-settings",
      "certificates",
      "domains",
      "ecommerce",
      "gamification",
      "subscriptions",
      "thoms-page",
      "user-settings",
    ],
    admaccountsettings = [
      "adm_basic-settings",
      "adm_certificates",
      "adm_domains",
      "adm_ecommerce",
      "adm_gamification",
      "adm_subscriptions",
      "adm_thoms-page",
      "adm_user-settings",
    ],
    trainings = [
      "classroom",
      "conference",
      "virtual-training",
      "add-classroom",
      "add-conference",
      "add-virtual-trainings",
    ],
    learnertrainings = ["lclassroom", "lconference", "lvirtualtraining"],
    calender = ["calender", "add-c-event", "private-address"],
    learncalender = ["learn_calender"],
    discussion = ["discussion", "add-discussion"],
    ldiscussion = ["learn_discussion", "learn_add-discussion"];

  return (
    <div
      className={`dlabnav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? hideOnScroll > 120
            ? "fixed"
            : ""
          : ""
      }`}>
      <PerfectScrollbar className="dlabnav-scroll">
        <MM className="metismenu" id="menu">
          <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow" to="#">
              <i className="bi bi-grid"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "dashboard" ? "mm-active" : ""}`}
                  to="/dashboard">
                  {" "}
                  Dashboard Light
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "dashboard-dark" ? "mm-active" : ""}`}
                  to="/dashboard-dark">
                  Dark Mode
                </Link>
              </li>
            </ul>
          </li>
          {/* *********************************** Superadmin Dashboard Options************************************ */}
          {roleType === "Superadmin" && (
            <>
              <li className={`${superadmin.includes(path) ? "mm-active" : ""}`}>
                <Link className="has-arrow" to="#">
                  <i className="bi bi-grid"></i>
                  <span className="nav-text">SUPERADMIN</span>
                </Link>
                <ul>
                  <li>
                    <Link
                      className={`${path === "dashboard" ? "mm-active" : ""}`}
                      to="/dashboard">
                      Superadmin Dashboard
                    </Link>
                  </li>
                  <li className={`${users.includes(path) ? "mm-active" : ""}`}>
                    <Link className="has-arrow" to="#">
                      <i className="bi bi-person-circle"></i>
                      <span className="nav-text">USERS</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "users-list" ? "mm-active" : ""
                          }`}
                          to="/users-list">
                          {" "}
                          Users{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "add-user" ? "mm-active" : ""
                          }`}
                          to="/add-user">
                          {" "}
                          Add User{" "}
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`${
                      categories.includes(path) ? "mm-active" : ""
                    }`}>
                    <Link className="has-arrow" to="#">
                      <i className="bi bi-list-ul"></i>
                      <span className="nav-text">CATEGORIES</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "categories" ? "mm-active" : ""
                          }`}
                          to="/categories">
                          {" "}
                          Categories{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "add-category" ? "mm-active" : ""
                          }`}
                          to="/add-category">
                          {" "}
                          Add Category
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`${courses.includes(path) ? "mm-active" : ""}`}>
                    <Link className="has-arrow" to="#">
                      <i className="bi bi-book"></i>
                      <span className="nav-text">COURSES</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "courses-info" ? "mm-active" : ""
                          }`}
                          to="/courses-info">
                          Courses
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "add-courses" ? "mm-active" : ""
                          }`}
                          to="/add-courses">
                          Add Courses
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${path === "courses" ? "mm-active" : ""}`}
                          to="/courses">
                          Course Store
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className={`${groups.includes(path) ? "mm-active" : ""}`}>
                    <Link className="has-arrow" to="#">
                      <i className="bi bi-people"></i>
                      <span className="nav-text">GROUPS</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${path === "groups" ? "mm-active" : ""}`}
                          to="/groups">
                          Groups
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "add-groups" ? "mm-active" : ""
                          }`}
                          to="/add-groups">
                          Add Groups
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li
                    className={`${
                      importexport.includes(path) ? "mm-active" : ""
                    }`}>
                    <Link className="has-arrow" to="#">
                      <i className="bi bi-tags-fill"></i>
                      <span className="nav-text">IMPORT/EXPORT</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "import-user" ? "mm-active" : ""
                          }`}
                          to="/import-user">
                          {" "}
                          Import{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "export-user" ? "mm-active" : ""
                          }`}
                          to="/export-user">
                          {" "}
                          Export{" "}
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </>
          )}
          {/* *********************************** Admin Dashboard Options************************************ */}
          {roleType === "Admin" && (
            <>
              <li className={`${admin.includes(path) ? "mm-active" : ""}`}>
                <Link className="has-arrow" to="#">
                  <i className="bi bi-grid"></i>
                  <span className="nav-text">ADMIN</span>
                </Link>
                <ul>
                  <li>
                    <Link
                      className={`${path === "dashboard" ? "mm-active" : ""}`}
                      to="/dashboard">
                      Admin Dashboard
                    </Link>
                  </li>
                  <li className={`${ausers.includes(path) ? "mm-active" : ""}`}>
                    <Link className="has-arrow" to="#">
                      <i className="bi bi-person-circle"></i>
                      <span className="nav-text">USERS</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "users-list" ? "mm-active" : ""
                          }`}
                          to="/users-list">
                          {" "}
                          Users{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "add-user" ? "mm-active" : ""
                          }`}
                          to="/add-user">
                          Add User
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`${
                      categories.includes(path) ? "mm-active" : ""
                    }`}>
                    <Link className="has-arrow" to="#">
                      <i className="bi bi-list-ul"></i>
                      <span className="nav-text">CATEGORIES</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "categories" ? "mm-active" : ""
                          }`}
                          to="/categories">
                          {" "}
                          Categories{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "add-category" ? "mm-active" : ""
                          }`}
                          to="/add-category">
                          {" "}
                          Add Category
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`${
                      admcourses.includes(path) ? "mm-active" : ""
                    }`}>
                    <Link className="has-arrow" to="#">
                      <i className="bi bi-book"></i>
                      <span className="nav-text">COURSES</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "courses-info" ? "mm-active" : ""
                          }`}
                          to="/courses-info">
                          Courses
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "add-courses" ? "mm-active" : ""
                          }`}
                          to="/add-courses">
                          Add Courses
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${path === "courses" ? "mm-active" : ""}`}
                          to="/courses">
                          Course Store
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`${agroups.includes(path) ? "mm-active" : ""}`}>
                    <Link className="has-arrow" to="#">
                      <i className="bi bi-people"></i>
                      <span className="nav-text">GROUPS</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "adm_groups" ? "mm-active" : ""
                          }`}
                          to="/adm_groups">
                          Groups
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "adm_add-groups" ? "mm-active" : ""
                          }`}
                          to="/adm_add-groups">
                          Add Groups
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`${
                      importexport.includes(path) ? "mm-active" : ""
                    }`}>
                    <Link className="has-arrow" to="#">
                      <i className="bi bi-tags-fill"></i>
                      <span className="nav-text">IMPORT/EXPORT</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "import-user" ? "mm-active" : ""
                          }`}
                          to="/import-user">
                          {" "}
                          Import{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "export-user" ? "mm-active" : ""
                          }`}
                          to="/export-user">
                          {" "}
                          Export{" "}
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </>
          )}
          {/* *********************************** Instructor Dashboard Options************************************ */}
          {roleType === "Instructor" && (
            <>
              <li
                className={`${
                  maininstructor.includes(path) ? "mm-active" : ""
                }`}>
                <Link className="has-arrow" to="#">
                  <i className="bi bi-grid"></i>
                  <span className="nav-text">INSTRUCTOR</span>
                </Link>
                <ul>
                  <li>
                    <Link
                      className={`${path === "inst-dash" ? "mm-active" : ""}`}
                      to="/inst-dash">
                      Instructor Dashboard
                    </Link>
                  </li>
                  <li className={`${users.includes(path) ? "mm-active" : ""}`}>
                    <Link className="has-arrow" to="#">
                      <i className="bi bi-person-circle"></i>
                      <span className="nav-text">USERS</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "insusers-list" ? "mm-active" : ""
                          }`}
                          to="/insusers-list">
                          {" "}
                          Users{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "insadd-user" ? "mm-active" : ""
                          }`}
                          to="/insadd-user">
                          {" "}
                          Add User{" "}
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`${
                      categories.includes(path) ? "mm-active" : ""
                    }`}>
                    <Link className="has-arrow" to="#">
                      <i className="bi bi-list-ul"></i>
                      <span className="nav-text">CATEGORIES</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "categories" ? "mm-active" : ""
                          }`}
                          to="/categories">
                          {" "}
                          Categories{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "add-category" ? "mm-active" : ""
                          }`}
                          to="/add-category">
                          {" "}
                          Add Category
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`${courses.includes(path) ? "mm-active" : ""}`}>
                    <Link className="has-arrow" to="#">
                      <i className="bi bi-book"></i>
                      <span className="nav-text">COURSES</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "courses-info" ? "mm-active" : ""
                          }`}
                          to="/courses-info">
                          Courses
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "add-courses" ? "mm-active" : ""
                          }`}
                          to="/add-courses">
                          Add Courses
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "adm_courses" ? "mm-active" : ""
                          }`}
                          to="/adm_courses">
                          Course Store
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`${igroups.includes(path) ? "mm-active" : ""}`}>
                    <Link className="has-arrow" to="#">
                      <i className="bi bi-people"></i>
                      <span className="nav-text">GROUPS</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "inst_groups" ? "mm-active" : ""
                          }`}
                          to="/inst_groups">
                          Groups
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "inst_add-groups" ? "mm-active" : ""
                          }`}
                          to="/inst_add-groups">
                          Add Groups
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`${
                      trainings.includes(path) ? "mm-active" : ""
                    }`}>
                    <Link className="has-arrow" to="#">
                      {" "}
                      <i className="bi bi-people"></i>{" "}
                      <span className="nav-text">Trainings</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "conference" ? "mm-active" : ""
                          }`}
                          to="/conference">
                          Conference Training
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "classroom" ? "mm-active" : ""
                          }`}
                          to="/classroom">
                          Classroom Training
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "virtual-training" ? "mm-active" : ""
                          }`}
                          to="/virtual-training">
                          Virtual Trainings
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "add-classroom" ? "mm-active" : ""
                          }`}
                          to="/add-classroom">
                          Add Classroom
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "add-conference" ? "mm-active" : ""
                          }`}
                          to="/add-conference">
                          Add Conference
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "add-virtual-trainings" ? "mm-active" : ""
                          }`}
                          to="/add-virtual-trainings">
                          Add Virtual Trainings
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li
                    className={`${calender.includes(path) ? "mm-active" : ""}`}>
                    <Link className="has-arrow" to="#">
                      {" "}
                      <i className="bi bi-calendar3"></i>{" "}
                      <span className="nav-text">Calender</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "calender" ? "mm-active" : ""
                          }`}
                          to="/calender">
                          Calender
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "add-c-event" ? "mm-active" : ""
                          }`}
                          to="/add-c-event">
                          Add Event
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`${
                      importexport.includes(path) ? "mm-active" : ""
                    }`}>
                    <Link className="has-arrow" to="#">
                      <i className="bi bi-tags-fill"></i>
                      <span className="nav-text">IMPORT/EXPORT</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "import-user" ? "mm-active" : ""
                          }`}
                          to="/import-user">
                          {" "}
                          Import{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${
                            path === "export-user" ? "mm-active" : ""
                          }`}
                          to="/export-user">
                          {" "}
                          Export{" "}
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </>
          )}
          {/* *********************************** Learner Dashboard Options************************************ */}
          {roleType === "Learner" && (
            <>
              <li className={`${learner.includes(path) ? "mm-active" : ""}`}>
                <Link className="has-arrow" to="#">
                  <i className="bi bi-grid"></i>
                  <span className="nav-text">LEARNERS</span>
                </Link>
                <ul>
                  <li>
                    <Link
                      className={`${path === "learn-dash" ? "mm-active" : ""}`}
                      to="/learn-dash">
                      Overview
                    </Link>
                  </li>
                  <li
                    className={`${
                      learnercourse.includes(path) ? "mm-active" : ""
                    }`}>
                    <Link className="has-arrow" to="#">
                      <i className="bi bi-book"></i>
                      <span className="nav-text">COURSES</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "learn-course" ? "mm-active" : ""
                          }`}
                          to="/learn-course">
                          Info
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${path === "courses" ? "mm-active" : ""}`}
                          to="/courses">
                          Course Store
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`${
                      learnertrainings.includes(path) ? "mm-active" : ""
                    }`}>
                    <Link className="has-arrow" to="#">
                      {" "}
                      <i className="bi bi-people"></i>{" "}
                      <span className="nav-text">Trainings</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "lclassroom" ? "mm-active" : ""
                          }`}
                          to="/lclassroom">
                          Trainings
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li
                    className={`${
                      learncalender.includes(path) ? "mm-active" : ""
                    }`}>
                    <Link className="has-arrow" to="#">
                      {" "}
                      <i className="bi bi-calendar3"></i>{" "}
                      <span className="nav-text">Calender</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "learn_calender" ? "mm-active" : ""
                          }`}
                          to="/learn_calender">
                          Calender
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li
                    className={`${
                      learngroups.includes(path) ? "mm-active" : ""
                    }`}>
                    <Link className="has-arrow" to="#">
                      <i className="bi bi-people"></i>
                      <span className="nav-text">GROUPS</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "learn-group" ? "mm-active" : ""
                          }`}
                          to="/learn-group">
                          Groups
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`${
                      learnfiles.includes(path) ? "mm-active" : ""
                    }`}>
                    <Link className="has-arrow" to="#">
                      {" "}
                      <i className="bi bi-file-earmark-zip"></i>{" "}
                      <span className="nav-text">Files</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "learn-files" ? "mm-active" : ""
                          }`}
                          to="/learn-files">
                          Files
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`${
                      learncertificate.includes(path) ? "mm-active" : ""
                    }`}>
                    <Link className="has-arrow" to="#">
                      {" "}
                      <i className="bi bi-award"></i>{" "}
                      <span className="nav-text">Certificates</span>
                    </Link>
                    <ul>
                      <li>
                        <Link
                          className={`${
                            path === "learn-certificate" ? "mm-active" : ""
                          }`}
                          to="/learn-certificate">
                          Certificates
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </>
          )}
        </MM>
        {/* <div className="plus-box">
          <div className="d-flex align-items-center">
            <h5>Upgrade your Account to Pro</h5>
            <img src={medal} alt="" />
          </div>
          <p>Upgrade to premium to get premium features</p>
          <Link to={"#"} className="btn btn-primary btn-sm">
            Upgrade
          </Link>
        </div> */}

        {/* <div className="copyright">
          
          <p className="fs-14">
            Made with <span className="heart"></span> by EonLearning
          </p>
        </div> */}
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
