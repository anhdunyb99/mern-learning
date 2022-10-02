import { createContext, useReducer } from "react";
import React from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { apiUrl } from "./constants";
import { LOCAL_STORAGE_LOCAL_NAME } from "./constants";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
    // userReducer nhận hai tham số, thứ nhất là authReducer
    //và thứ 2 là trạng thái ban đầu của state trong authReducer

    // login function
  });

  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`);
      console.log("response", response);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_LOCAL_NAME,
          response.data.accessToken
        );
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else
        return {
          success: false,
          message: error.message,
        };
    }
  };

  const authContextData = { loginUser };

  // return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
