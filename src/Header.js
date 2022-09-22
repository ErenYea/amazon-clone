import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";

function Header() {
  return (
    <div className="header">
      <img
        src="http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG"
        alt=""
        className="header__image"
      />
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <div className="header__searchbtn">
          <SearchIcon />
        </div>
      </div>
      <div className="header__nav">
        <div className="header__signin"></div>
        <div className="header__return"></div>
        <div className="header__cart"></div>
      </div>
    </div>
  );
}

export default Header;
