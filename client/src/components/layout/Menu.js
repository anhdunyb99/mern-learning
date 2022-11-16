import React, { useContext } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContexts";

const Menu = () => {
  const { logoutUser } = useContext(AuthContext);

  const logout = () => logoutUser();
  return (
    <div id="body-pd">
      <header className="header" id="header">
        <div className="header_toggle">
          <i className="bi bi-house"></i>
        </div>
        <div className="header_img">
          <img src="https://i.imgur.com/hczKIze.jpg" alt="" />
        </div>
      </header>
      <div className="l-navbar" id="nav-bar">
        <nav className="nav">
          <div>
            <a href="#" className="nav_logo">
              <i className="bi bi-book"></i>
            </a>
            <div className="nav_list">
              <Link to="/home" className="nav_link">
                <i className="bi bi-house"></i>
              </Link>
              <Link to="/dashboard" className="nav_link">
                <i className="bi bi-bar-chart-line-fill"></i>
              </Link>
              <Link to="/profile" className="nav_link">
                <i className="bi bi-person-circle" />
              </Link>
              <Link to="/courses" className="nav_link">
                <i className="bi bi-book" />
              </Link>
            </div>
          </div>
          <div onClick={logout} className="nav_link">
            <i className="bi bi-box-arrow-left"></i>
            <span className="nav_name">SignOut</span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
