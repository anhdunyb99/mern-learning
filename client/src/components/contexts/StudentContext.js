import React, { createContext, useReducer, useState } from "react";
import axios from "axios";
import { apiUrl } from "./constants";
import { studentReducer } from "../reducers/studentReducer";

export const StudentContexts = createContext();

const StudentContextProvider = ({ children }) => {
  const [studentState, dispatch] = useReducer(studentReducer, {
    student: null,
    students: [],
    teachers: [],
  });
  const [editStudentId, setEditStudentId] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const getAllStudent = async () => {
    try {
      const response = await axios.get(`${apiUrl}/users/student`);

      if (response.data.success) {
        dispatch({
          type: "STUDENT_LOAD_SUCCESS",
          payload: response.data.student,
        });
      }
    } catch (error) {
      dispatch({
        type: "STUDENT_LOAD_FAIL",
      });
    }
  };

  const getAllTeacher = async () => {
    try {
      const response = await axios.get(`${apiUrl}/users/teacher`);
      console.log('response',response);
      if (response.data.success) {
        dispatch({
          type: "TEACHER_LOAD_SUCCESS",
          payload: response.data.teacher,
        });
      }
    } catch (error) {}
  };

  /* const addStudentToCourse = async (courseId,newStudent) => {
    try {
      const response = await axios.post(`${apiUrl}/users/${courseId}`,newStudent)
      console.log('response',response);
    } catch (error) {
      
    }
  } */

  // update student detail
  const updateStudent = async (updatedStudent) => {
    try {
      const response = await axios.put(
        `${apiUrl}/users/${updatedStudent._id}`,
        updatedStudent
      );
      if (response.data.success) {
        dispatch({
          type: "UPDATE_STUDENT",
          payload: response.data.data,
        });
      }
      return response;
    } catch (error) {}
  };

  // delete student
  const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/users/${id}`);
      if (response.data.success) {
        dispatch({
          type: "DELETE_STUDENT",
          payload: response.data.data,
        });
      }
    } catch (error) {}
  };

  const studentContextData = {
    getAllStudent,
    studentState,
    editStudentId,
    setEditStudentId,
    showEditModal,
    setShowEditModal,
    updateStudent,
    deleteStudent,
    getAllTeacher
    /* addStudentToCourse */
  };

  return (
    <StudentContexts.Provider value={studentContextData}>
      {children}
    </StudentContexts.Provider>
  );
};

export default StudentContextProvider;
