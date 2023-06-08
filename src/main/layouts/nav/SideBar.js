/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect, useState } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";

import {useScrollPosition} from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "@context/ThemeContext";

import medal from "@images/medal.png";


class MM extends Component {
	componentDidMount() {
		this.$el = this.el;
		this.mm = new Metismenu(this.$el);
	}
  componentWillUnmount() {
  }
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
	const {
		iconHover,
		sidebarposition,
		headerposition,
		sidebarLayout,
	} = useContext(ThemeContext);
  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);
	
	//sidebar icon Heart blast
	var handleheartBlast = document.querySelector('.heart');
        function heartBlast() {
            return handleheartBlast.classList.toggle("heart-blast");
        }
        handleheartBlast.addEventListener('click', heartBlast);
	
  }, []);
 //For scroll
 const [hideOnScroll, setHideOnScroll] = useState(true)
	useScrollPosition(
		({ prevPos, currPos }) => {
		  const isShow = currPos.y > prevPos.y
		  if (isShow !== hideOnScroll) setHideOnScroll(isShow)
		},
		[hideOnScroll]
	)
  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  let deshBoard = [
      "",
    ];
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
      }`}
    >
      <PerfectScrollbar className="dlabnav-scroll">
        <MM className="metismenu" id="menu">
			<li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
				<Link className="has-arrow" to="#" >
					<i className="bi bi-grid"></i>
					<span className="nav-text">Dashboard</span>
				</Link>
				<ul>
					<li><Link className={`${path === "dashboard" ? "mm-active" : ""}`} to="/dashboard"> Dashboard Light</Link></li>
				</ul>
			</li>
        </MM>
			<div className="plus-box">
				<div className="d-flex align-items-center">
					<h5>Upgrade your Account to Pro</h5>
					<img src={medal} alt="" />
				</div>
				<p>Upgrade to premium to get premium features</p>
				<Link to={'#'} className="btn btn-primary btn-sm">Upgrade</Link>
			</div>
			<div className="copyright">
				<p><strong>GetSkills Online Learning Admin</strong> © 2022 All Rights Reserved</p>
				<p className="fs-12">Made with <span className="heart"></span> by DexignZone</p>
			</div>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
