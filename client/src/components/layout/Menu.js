import React, { useContext, useState } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContexts";
import "./Menu.css";
const Menu = () => {
  const { logoutUser } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);

  const logout = () => logoutUser();
  const toggleClose = () => {
    setToggle(false);
  };
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);
  
  return (
    <>
      {" "}
      {isAuthenticated ? (
        <div className="header">
          <div className="left__header">
            <Link to="/">
              <img
                src="https://thumbs.dreamstime.com/b/e-learning-icon-trendy-logo-concept-white-backgro-background-education-collection-suitable-use-web-apps-mobile-131175980.jpg"
                alt=""
              />
              <h4>Learn With Me</h4>
            </Link>
          </div>

          <div
            className={`middle__header ${
              toggle ? `show__sidebar__nav` : `sidebar__nav`
            }`}
          >
            <ul>
              <>
                <li>
                  <Link onClick={toggleClose} to="/courses">
                    Khóa học
                  </Link>
                </li>
                <li>
                  <Link onClick={toggleClose} to="/profile">
                    Thông tin cá nhân
                  </Link>
                </li>

                <li>
                  <Link onClick={toggleClose} to="/meeting">
                    Tạo phòng họp
                  </Link>
                </li>

                {localStorage.role === "TEACHER" && (
                  <li>
                    <Link onClick={toggleClose} to="/course-management">
                      Quản lý khóa học
                    </Link>
                  </li>
                )}

                {localStorage.role === "TEACHER" && (
                  <li>
                    <Link onClick={toggleClose} to="/user-management">
                      Quản lý người dùng
                    </Link>
                  </li>
                )}
              </>
            </ul>
          </div>
          <div className="right__header" onClick={logout}>
            Đăng xuất
            <i className="bi bi-box-arrow-left"></i>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Menu;
