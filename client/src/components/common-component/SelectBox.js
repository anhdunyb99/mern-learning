import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { CourseContexts } from "../contexts/CourseContexts";
import { StudentContexts } from "../contexts/StudentContext";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
export const SelectBox = ({ props }) => {
  const [state, setState] = useState(null);
  const {
    addStudentToCourse,
    courseState: { course },
  } = useContext(CourseContexts);
  let newProps = [];
  const handleSelectChange = (event) => {
    setState(event);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudentToCourse(course._id, state);
  };
  /* useEffect(() => {
    
  }, []); */
  if (course) {
    newProps = props.filter((x) => {
      return course.listStudent.indexOf(x._id) === -1;
    });
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Select
          options={newProps.map((x) => ({ label: x.fullName, value: x._id }))}
          onChange={handleSelectChange}
          isMulti
        />
        <button type="submit">Select</button>
      </form>
    </div>
  );
};
