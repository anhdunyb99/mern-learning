import React from "react";
import { createContext, useReducer } from "react";
import { postReducer } from "../reducers/postReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const PostContexts = createContext();

const PostContextsProvider = ({ children }) => {
  //state
  const [postState, dispatch] = useReducer(postReducer, {
    posts: [],
    postsLoading: true,
  });

  // Get all posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        console.log("response.data.posts", response.data);
        dispatch({
          type: "POSTS_LOADED_SUCCESS",
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispatch({ type: "POSTS_LOADED_FAIL" });
    }
  };
  //post context data
  const postContextData = {
    postState,
    getPosts,
  };
  return (
    <PostContexts.Provider value={postContextData}>
      {children}
    </PostContexts.Provider>
  );
};

export default PostContextsProvider;
