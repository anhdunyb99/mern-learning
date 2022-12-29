export const studentReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "STUDENT_LOAD_SUCCESS":
      return {
        ...state,
        students: payload,
      };
    case "STUDENT_LOAD_FAIL":
      return {
        ...state,
        students: [],
      };
    case "UPDATE_STUDENT":
      const newStudent = state.students.map((student) =>
        student._id === payload._id ? payload : student
      );
      
      return {
        ...state,
        students: newStudent,
        student: payload,
      };
      case "DELETE_STUDENT":
        return {
          ...state,
          students: state.students.filter((student) => student._id !== payload._id),
        };
    default:
      return state;
  }
};
