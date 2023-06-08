import React, { useContext } from "react";

/// React router dom
import {  Switch, Route } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";
/// Dashboard
import Home from "./components/Dashboard/Home";
import Login from "./pages/Login";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
import { ThemeContext } from "@context/ThemeContext";

const Markup = () => {
  const { menuToggle } = useContext(ThemeContext);
  const routes = [
    /// Dashboard
    { url: "", component: Home },
    { url: "dashboard", component: Home },
    { url: "page-login", component: Login },
    { url: "page-error-400", component: Error400 },
    { url: "page-error-403", component: Error403 },
    { url: "page-error-404", component: Error404 },
    { url: "page-error-500", component: Error500 },
    { url: "page-error-503", component: Error503 },
  ];
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? "content-body" : ""}`}
			style={{ minHeight: window.screen.height - 45 }}
		>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
          >
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                />
              ))}
            </Switch>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
	  <ScrollToTop />
    </>
  );
};

export default Markup;
