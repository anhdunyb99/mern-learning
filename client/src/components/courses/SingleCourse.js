import React, { useContext, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import { Link, redirect, useNavigate } from "react-router-dom";
import { CourseContexts } from "../contexts/CourseContexts";
import Typography from "@material-ui/core/Typography";
import Button from "react-bootstrap/esm/Button";
//import ActionButton from "./ActionButton";

const SingleCourse = ({ course: { _id, name, description, thumbnail } }) => {
  const {
    findCourse,
  } = useContext(CourseContexts);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(false);
  const handleCourseSelection = (courseId) => {
    findCourse(courseId);
    setSelected(true);
  };

  useEffect(() => {
    if (selected == true) {
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
      >
        <div className="card-img-overlay d-flex flex-column">
          <div className="card-body">
            <big className="card-meta mb-2">{name}</big>
            <h4 className="card-title mt-0 ">
              <a>{description}</a>
            </h4>
          </div>
          <div className="card-footer">
            <Button
              onClick={handleCourseSelection.bind(this, _id)}
              variant="primary"
              type="submit"
            >
              Join Class
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
