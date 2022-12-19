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
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showUpdateCourseDetail, setShowUpdateCourseDetail] = useState(false);
  const [showAddQuizzModal, setShowAddQuizzModal] = useState(false);
  const [quizzResult, setQuizzResult] = useState(null);
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
      const response = await axios.post(`${apiUrl}/courses`, newCourse);
      console.log("response", response);
      if (response.data.success) {
        dispatch({
          type: "ADD_COURSE",
          payload: response.data.course,
        });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };
  // find course
  const findCourse = async (courseId) => {
    const course = courseState.courses.find(
      (course) => course._id === courseId
    );

    dispatch({
      type: "FIND_COURSE",
      payload: course,
    });
  };
  // add student to course
  const addStudentToCourse = async (courseId, newStudent) => {
    try {
      const response = await axios.post(
        `${apiUrl}/users/${courseId}`,
        newStudent
      );

      if (response.data.success) {
        dispatch({
          type: "ADD_STUDENT",
          payload: response.data.data,
        });
      }
    } catch (error) {}
  };

  // get quizz result
  const getQuizzResultById = async (quizzId) => {
    try {
      const response = await axios.get(`${apiUrl}/result/${quizzId}`);
      console.log('response',response);
      if (response.data.success) {
        setQuizzResult(response.data.result);
      }
    } catch (error) {}
  };
  
  // update course detail
  const updateCourse = async (updatedCourse) => {
    try {
      console.log("response", response);
      const response = await axios.put(
        `${apiUrl}/courses/${updatedCourse._id}`,
        updatedCourse
      );
      console.log("response", response.data);
      if (response.data.success) {
        dispatch({
          type: "UPDATE_COURSE",
          payload: { course: response.data.course },
        });
      }
    } catch (error) {}
  };

  const courseContextData = {
    courseState,
    showAddCourse,
    setShowAddCourse,
    getAllCourse,
    addCourse,
    findCourse,
    addStudentToCourse,
    showUploadModal,
    setShowUploadModal,
    showAddStudentModal,
    setShowAddStudentModal,
    showUpdateCourseDetail,
    setShowUpdateCourseDetail,
    updateCourse,
    showAddQuizzModal,
    setShowAddQuizzModal,
    getQuizzResultById,
    quizzResult
  };
  return (
    <CourseContexts.Provider value={courseContextData}>
      {children}
    </CourseContexts.Provider>
  );
};
export default CourseContextsProvider;
