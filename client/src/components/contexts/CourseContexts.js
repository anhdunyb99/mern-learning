import React from "react";
import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "./constants";
import { courseReducer } from "../reducers/courseReducer";

export const CourseContexts = createContext();

const CourseContextsProvider = ({ children }) => {
  const [courseState, dispatch] = useReducer(courseReducer, {
    course: null,
    courses: [],
    courseLoading: true,
  });
  const [showAddCourse, setShowAddCourse] = useState(false);

  // get all course

  const getAllCourse = async () => {
    try {
      const response = await axios.get(`${apiUrl}/courses`);
      
      if (response.data.success) {
        dispatch({
          type: "COURSE_LOAD_SUCCESS",
          payload: response.data.course,
        });
      }
    } catch (error) {
      dispatch({
        type: "COURSE_LOAD_FAIL",
      });
    }
  };

  // add course
  const addCourse = async (newCourse) => {
    try {
      const response = await axios.post(`${apiUrl}/courses`,newCourse)
      console.log('response',response);
      if(response.data.success){
        dispatch({
          type : "ADD_COURSE",
          payload : response.data.course
        })
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  }

const courseContextData = {
  courseState,
  showAddCourse,
  setShowAddCourse,
  getAllCourse,
  addCourse
};
return (
  <CourseContexts.Provider value={courseContextData}>
    {children}
  </CourseContexts.Provider>
);
};
export default CourseContextsProvider;
