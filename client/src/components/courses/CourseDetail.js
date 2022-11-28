import React, { useContext, useEffect } from "react";
import { CourseContexts } from "../contexts/CourseContexts";
import Menu from "../layout/Menu";
import UploadFile from "../common-component/UploadFile";
import { SelectBox } from "../common-component/SelectBox";
import { StudentContexts } from "../contexts/StudentContext";
import ReactPlayer from "react-player";
import { Navigate, useNavigate } from "react-router-dom";
import { FileViewer } from "react-file-viewer";
const CourseDetail = () => {
  const {
    courseState: { course },
  } = useContext(CourseContexts);

  const {
    getAllStudent,
    studentState: { students },
  } = useContext(StudentContexts);
  const navigate = useNavigate();
  useEffect(() => {
    getAllStudent();
  }, []);
  console.log("course", course);

  return (
    <>
      {course ? (
        <div className="container rounded bg-white">
          <UploadFile />
          <SelectBox props={students} />
          {course.files.map((courses) =>
            courses.contenType == "video/mp4" ? (
              <video width="320" height="240" controls>
                <source src={courses.url} type="video/mp4" />
              </video>
            ) : courses.contenType == "image/jpeg" ||
              courses.contenType == "image/png" ? (
              <img width="320" height="240" src={courses.url} />
            ) : (
              <p>
                <a href={courses.url}>View PDF</a>
              </p>
            )
          )}
        </div>
      ) : (
        <Navigate to="/courses" />
      )}
    </>
  );
};

export default CourseDetail;
