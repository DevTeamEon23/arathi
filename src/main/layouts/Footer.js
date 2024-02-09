import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../theme/css/style.css"
import Indian from "@images/Indian-flag.png";

const Footer = () => {
  const [isBlasted, setBlasted] = useState(false);

  const handleClick = () => {
    // Toggle the blast effect
    setBlasted(!isBlasted);
  };

  return (
    <div className={`footer-container ${isBlasted ? 'blast' : ''}`}>
      <div className="copyright">
        <p className="fs-14">
          Copyright © 2024 AnandRathi, Made with
          <span className={`heart ${isBlasted ? 'blast' : ''}`} onClick={handleClick}></span>
          in India&nbsp;
          <img src={Indian} alt="Indian Flag" className={`flag ${isBlasted ? 'blast' : ''}`} />
        </p>
      </div>
    </div>
  );
};

export default Footer;