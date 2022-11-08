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
import addIcon from "../../assets/plus-circle-fill.svg"
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
  console.log("courses", courses);
  let body = null;
  body = (
    <div>
      <UploadFile/>
      <h1 className="display-4" style={{ textAlign: "center" }}>
        Học lập trình để đi làm
      </h1>
      <Row style={{ marginTop: "25px" }}>
        {courses.map((course) => (
          <Col
            style={{ marginLeft: "25px", marginRight: "25px" }}
            key={course._id}
          >
            <SingleCourse course={course} />
          </Col>
        ))}
      </Row>
      <Button
        className="btn-floating"
        onClick={setShowAddCourse.bind(this, true)}
      >
        <img src={addIcon} alt="add-post" width="60" height="60" />
      </Button>
    </div>
  );
  return (
    <div>
      <NavbarMenu />
      <AddCourseModal />
      {body}
    </div>
  );
};

export default Courses;
