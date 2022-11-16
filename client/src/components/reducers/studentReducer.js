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

    default:
      return state;
  }
};
