import React, { useContext } from "react";
import { CourseContexts } from "../contexts/CourseContexts";
import Menu from "../layout/Menu";

const CourseDetail = () => {
  const {
    courseState: { course },
  } = useContext(CourseContexts);
  console.log("course", course);
  return (
    <div>
      <Menu />
    </div>
  );
};

export default CourseDetail;
