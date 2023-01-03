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
    getCourseByUser,
    courseState: { courses, course, courseByUser },
  } = useContext(CourseContexts);
  useEffect(() => {
    getAllCourse();
    getCourseByUser(localStorage.id);
  }, []);

  return (
    <div>
      <AddCourseModal />
      {localStorage.role === "TEACHER" && (
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
          </section>
        </div>
      )}
      {localStorage.role === "STUDENT" && (
        <div>
          <section className="wrapper">
            <div>
              <div className="row-cols-4 row-cols-md-12 g-4 mx-auto mt-3 row">
                {courseByUser.map((course) => (
                  <Col key={course._id}>
                    <SingleCourse course={course} />
                  </Col>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Courses;
