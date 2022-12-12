import React, { useContext, useEffect } from "react";
import NavbarMenu from "../layout/NavbarMenu";
import UploadFile from "../common-component/UploadFile";
import FileViewer from "react-file-viewer";
import axios from "axios";
import { apiUrl } from "../contexts/constants";
import { CourseContexts } from "../contexts/CourseContexts";
import SingleCourse from "../courses/SingleCourse";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import AddCourseModal from "../courses/AddCourseModal";
import addIcon from "../../assets/plus-circle-fill.svg";
import Menu from "../layout/Menu";
import CourseDetail from "../courses/CourseDetail";
const Courses = () => {
  const {
    showAddCourse,
    setShowAddCourse,
    getAllCourse,
    courseState: { courses, course },
  } = useContext(CourseContexts);
  useEffect(() => {
    getAllCourse();
  }, []);

  let body = null;
  body = (
    <div>
      <section className="wrapper">
        <div>
          <div className="row-cols-4 row-cols-md-12 g-4 mx-auto mt-3 row">
            {courses.map((course) => (
              <Col key={course._id}>
                <SingleCourse course={course} />
              </Col>
            ))}
          </div>
        </div>
        <button
          style={{ float: "right" }}
          onClick={setShowAddCourse.bind(this, true)}
        >
          <i className="bi bi-plus-lg"></i>
          Thêm khóa học
        </button>
      </section>
    </div>
  );
  return (
    <div>
      <AddCourseModal />

      {body}
    </div>
  );
};

export default Courses;
