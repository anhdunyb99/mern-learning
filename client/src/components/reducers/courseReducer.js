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
        course: payload,
      };
    case "ADD_COURSE":
      return {
        ...state,
        courses: [...state.courses, payload],
      };
    case "ADD_STUDENT":
      return {
        ...state,
        course: payload,
      };
    case "UPDATE_COURSE":
      const newCourses = state.courses.map((course) =>
        course._id === payload._id ? payload : course
      );
      /* console.log('newCourses',newCourses); */
      return {
        ...state,
        courses: newCourses,
        course: payload,
      };

    case "GET_ALL_QUIZ":
      return {
        ...state,
        quizzs: payload,
      };
    case "UPDATE_QUIZZ":
      const newQuizz = state.quizzs.map((quizz) =>
        quizz._id === payload._id ? payload : quizz
      );
      console.log("newQuizz", newQuizz);
      return {
        ...state,
        quizzs: newQuizz,
        quizz: payload,
      };
    case "DELETE_QUIZ":
      return {
        ...state,
        quizzs: state.quizzs.filter((quizz) => quizz._id !== payload._id),
      };
    case "ADD_QUIZ":
      return {
        ...state,
        quizzs: [...state.quizzs, payload],
      };
    case "DELETE_COURSE":
      return {
        ...state,
        courses: state.courses.filter((course) => course._id !== payload._id),
      };
    default:
      return state;
  }
};
