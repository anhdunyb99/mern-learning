import React, { useState } from "react";
import { createContext, useReducer } from "react";
import { postReducer } from "../reducers/postReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const PostContexts = createContext();

const PostContextsProvider = ({ children }) => {
  //state
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postsLoading: true,
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  // Get all posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
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

  //add post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost);
      console.log("response", response);
      if (response.data.success) {
        dispatch({
          type: "ADD_POST",
          payload: response.data.post,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`);
      if (response.data.success) {
        dispatch({
          type: "DELETE_POST",
          payload: postId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // find post

  const findPost = async (postId) => {
    const post = postState.posts.find((post) => post._id === postId);
    console.log('post',post);
    dispatch({
      type: "FIND_POST",
      payload: post,
    });
  };

  const updatePost = async (updatedPost) => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/${updatedPost._id}`,
        updatedPost
      );
      if (response.data.success) {
        dispatch({
          type: "UPDATE_POST",
          payload: response.data.post,
        });
      }
    } catch (error) {}
  };
  const uploadFile = async (fileUpload) => {
    try {
      const response = await axios.post(
        `${apiUrl}/posts/uploadFile`,
        fileUpload,
        {
          headers: {
            "Content-Type": "Multipart/formData",
          },
        }
      );
    } catch (error) {}
  };

  /* const getFile = async () => {
    try {
    const response =  await axios.get(`${apiUrl}/posts/getFile`)
    } catch (error) {
      
    }
  } */
  const postContextData = {
    postState,
    getPosts,
    showAddModal,
    setShowAddModal,
    addPost,
    deletePost,
    updatePost,
    findPost,
    showUpdateModal,
    setShowUpdateModal,
    uploadFile,
  };
  return (
    <PostContexts.Provider value={postContextData}>
      {children}
    </PostContexts.Provider>
  );
};

export default PostContextsProvider;
