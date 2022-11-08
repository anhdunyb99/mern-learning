import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
//import ActionButton from "./ActionButton";
import "../styles/Style.css";
const SingleCourse = ({ course: { _id, name, description, thumbnail } }) => {
  const handleCourseSelection = () => {
    console.log("thumbnail", thumbnail);
  };
  return (
    <div
      className="card text-white card-has-bg click-col"
      style={{
        backgroundImage: `url(${thumbnail})`,
      }}
      onClick={handleCourseSelection}
    >
      <div className="card-img-overlay d-flex flex-column">
        <div className="card-body">
          <big className="card-meta mb-2">{name}</big>
          <h4 className="card-title mt-0 ">
            <a className="text-white" herf="#">
              {description}
            </a>
          </h4>
        </div>
        <div className="card-footer">
          <div className="media">
            <div className="media-body">
              <h6 className="my-0 text-white d-block">Người tạo</h6>
              <small>Director of UI/UX</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
