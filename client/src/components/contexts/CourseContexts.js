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
  // find course 
  const findCourse = async (courseId) => {
    const course = courseState.courses.find((course) => course._id === courseId);
    
    dispatch({
      type : "FIND_COURSE",
      payload : course,
    })
  }
  // add student to course
  const addStudentToCourse = async (courseId,newStudent) => {
    try {
      const response = await axios.post(`${apiUrl}/users/${courseId}`,newStudent)
      
      if(response.data.success){
        dispatch({
          type : "ADD_STUDENT",
          payload : response.data.data
        })
      }
    } catch (error) {
      
    }
  }
const courseContextData = {
  courseState,
  showAddCourse,
  setShowAddCourse,
  getAllCourse,
  addCourse,
  findCourse,
  addStudentToCourse
};
return (
  <CourseContexts.Provider value={courseContextData}>
    {children}
  </CourseContexts.Provider>
);
};
export default CourseContextsProvider;
