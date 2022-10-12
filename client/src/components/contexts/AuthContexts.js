import { createContext, useReducer, useEffect } from "react";
import React from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { apiUrl } from "./constants";
import { LOCAL_STORAGE_LOCAL_NAME } from "./constants";
import setAuthToken from "../../utils/setAuthToken";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
    // userReducer nhận hai tham số, thứ nhất là authReducer
    //và thứ 2 là trạng thái ban đầu của state trong authReducer

    // login functiondi
  });
  // authen user
  const loadUser = async () => {
    
    if (localStorage[LOCAL_STORAGE_LOCAL_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_LOCAL_NAME]);
    }

    try {
      const response = await axios.get(`${apiUrl}/auth`);
      
			if (response.data.success) {
				dispatch({
					type: 'SET_AUTH',
					payload: { isAuthenticated: true, user: response.data.user }
				})
			}
    } catch (error) {
      
      localStorage.removeItem(LOCAL_STORAGE_LOCAL_NAME);
      setAuthToken(null)
			dispatch({
				type: 'SET_AUTH',
				payload: { isAuthenticated: false, user: null }
			})
    }
  };

  //useEffect(() => loadUser(), []);
  useEffect(() => {
    loadUser();
},[]);


  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      console.log("response", response);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_LOCAL_NAME,
          response.data.accessToken
        );
        await loadUser();
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

  const authContextData = { loginUser, authState };
  
  // return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
