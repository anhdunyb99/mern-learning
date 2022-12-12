import React, { createContext, useReducer } from "react";
import axios from "axios";
import { apiUrl } from "./constants";
import { studentReducer } from "../reducers/studentReducer";

export const StudentContexts = createContext();

const StudentContextProvider = ({ children }) => {
  const [studentState, dispatch] = useReducer(studentReducer, {
    student: null,
    students: [],
  });

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

  /* const addStudentToCourse = async (courseId,newStudent) => {
    try {
      const response = await axios.post(`${apiUrl}/users/${courseId}`,newStudent)
      console.log('response',response);
    } catch (error) {
      
    }
  } */

  const studentContextData = {
    getAllStudent,
    studentState,
    /* addStudentToCourse */
  };

  return (
    <StudentContexts.Provider value={studentContextData}>
      {children}
    </StudentContexts.Provider>
  );
};

export default StudentContextProvider;
