export const courseReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "COURSE_LOAD_SUCCESS":
      return {
        ...state,
        courses: payload,
        courseLoading: false,
      };

    case "COURSE_LOAD_FAIL":
      return {
        ...state,
        courses: [],
        courseLoading: false,
      };
    case "FIND_COURSE":
      return {
        ...state,
        course : payload
      }
    case "ADD_COURSE":
      return {
        ...state,
        courses: [...state.courses, payload],
      };
    case "ADD_STUDENT":
    return {
      ...state,
      course : payload
    }
    default:
      return state;
  }
};
