import React, { useContext, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import { Link, redirect, useNavigate } from "react-router-dom";

import { CourseContexts } from "../contexts/CourseContexts";
//import ActionButton from "./ActionButton";

const SingleCourse = ({ course: { _id, name, description, thumbnail } }) => {
  const {
    findCourse,
    courseState: { course },
  } = useContext(CourseContexts);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(false);
  const handleCourseSelection = (courseId) => {
    findCourse(courseId);
    setSelected(true);
  };

  useEffect(() => {
    if (selected == true ) {
      navigate("/courses-detail");
    }
  }, [selected]);
  
  return (
    <div>
      <div
        className="card text-white card-has-bg click-col"
        style={{
          backgroundImage: `url(${thumbnail})`,
        }}
        onClick={handleCourseSelection.bind(this, _id)}
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
    </div>
  );
};

export default SingleCourse;
