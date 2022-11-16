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
  const newProps = [];
  const handleSelectChange = (event) => {
    setState(event);
  };
  console.log("course", course);
  console.log("props", props);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudentToCourse(course._id, state);
    console.log("123");
  };
  /* useEffect(() => {
    
  }, []); */
  if (course) {
    for (let i in props) {
      for (let j in course.listStudent) {
        if (props[i]._id != course.listStudent[j]) {
          newProps.push(props[i]);
        }
      }
    }
  }
  console.log("newProps", newProps);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Select
          options={props.map((x) => ({ label: x.fullName, value: x._id }))}
          onChange={handleSelectChange}
          isMulti
        />
        <button type="submit">Select</button>
      </form>
    </div>
  );
};
