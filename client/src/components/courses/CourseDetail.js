import React, { useContext, useEffect } from "react";
import { CourseContexts } from "../contexts/CourseContexts";
import Menu from "../layout/Menu";
import UploadFile from "../common-component/UploadFile";
import { SelectBox } from "../common-component/SelectBox";
import { StudentContexts } from "../contexts/StudentContext";
const CourseDetail = () => {
  const {
    courseState: { course },
  } = useContext(CourseContexts);
  
  const {
    getAllStudent,
    studentState: { students },
  } = useContext(StudentContexts);
  useEffect(() => {
    getAllStudent();
  }, []);
  
  return (
    <div className="container rounded bg-white">
      <UploadFile />
      <SelectBox props = {students}/>
    </div>
  );
};

export default CourseDetail;
