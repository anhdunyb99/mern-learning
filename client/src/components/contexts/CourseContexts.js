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
    quizz: null,
    quizzs: [],
    notification: null,
    notifications: [],
  });
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showUpdateCourseDetail, setShowUpdateCourseDetail] = useState(false);
  const [showAddQuizzModal, setShowAddQuizzModal] = useState(false);
  const [quizzResult, setQuizzResult] = useState(null);
  const [editCourseId, setEditCourseId] = useState("");
  const [showAddNotification, setShowAddNotification] = useState(false);
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
      console.log("response", response);
      if (response.data.success) {
        setQuizzResult(response.data.result);
      }
    } catch (error) {}
  };

  // update course detail
  const updateCourse = async (updatedCourse) => {
    try {
      const response = await axios.put(
        `${apiUrl}/courses/${updatedCourse._id}`,
        updatedCourse
      );

      if (response.data.success) {
        dispatch({
          type: "UPDATE_COURSE",
          payload: response.data.course,
        });
      }
    } catch (error) {}
  };
  // get all quiz of a course
  const getAllQuiz = async (courseId) => {
    try {
      const response = await axios.get(`${apiUrl}/quizz/${courseId}`);

      if (response.data.success) {
        dispatch({
          type: "GET_ALL_QUIZ",
          payload: response.data.quizz,
        });
      }
    } catch (error) {}
  };
  // get all notification of a course
  const getNotification = async (courseId) => {
    try {
      const response = await axios.get(`${apiUrl}/notification/${courseId}`);
      
      if (response.data.success) {
        dispatch({
          type: "GET_ALL_NOTIFICATION",
          payload: response.data.data,
        });
      }
    } catch (error) {}
  };
  // update quizz
  const updateQuizzsState = async (res) => {
    try {
      console.log("res", res.data.quizz);
      dispatch({
        type: "UPDATE_QUIZZ",
        payload: res.data.quizz,
      });
    } catch (error) {}
  };
  //delete quizz
  const deleteQuiz = async (res) => {
    try {
      console.log("res", res.data.data);
      dispatch({
        type: "DELETE_QUIZ",
        payload: res.data.data,
      });
    } catch (error) {}
  };

  const addQuiz = async (res) => {
    try {
      dispatch({
        type: "ADD_QUIZ",
        payload: res.data.quizz,
      });
    } catch (error) {}
  };

  const getCourseById = async (courseId) => {
    try {
      console.log("courseId", courseId);
      /* const response = await axios.get(`${apiUrl}/courses/get-by-id/${courseId}`); */
    } catch (error) {}
  };

  //delete course
  const deleteCourse = async (res) => {
    try {
      console.log("res", res.data.course);
      dispatch({
        type: "DELETE_COURSE",
        payload: res.data.course,
      });
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
    quizzResult,
    getAllQuiz,
    updateQuizzsState,
    deleteQuiz,
    addQuiz,
    editCourseId,
    setEditCourseId,
    getCourseById,
    deleteCourse,
    showAddNotification,
    setShowAddNotification,
    getNotification
  };
  return (
    <CourseContexts.Provider value={courseContextData}>
      {children}
    </CourseContexts.Provider>
  );
};
export default CourseContextsProvider;
