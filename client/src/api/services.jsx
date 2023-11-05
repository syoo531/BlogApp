import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000";

//needed to change this to a function because token does not update upon login
const config = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    withCredentials: true,
  },
});

//accepts 3 paramters: 1) action type 2) payloadCreator callback 3) options
export const getAllPosts = createAsyncThunk(
  "posts/setAllPosts",
  async (page, thunkAPI) => {
    try {
      // console.log("thunkAPI", thunkAPI);
      console.log("GET ALL POST");
      const { data } = await axios.get(`${url}/posts?page=${page}`);
      return data;
    } catch (err) {
      if (err.message) throw err.message; //! whatever I throw, it will get passed as message property {message: 'ERR_BAD_REQUEST'}
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/setUserPosts",
  async (_, thunkAPI) => {
    try {
      console.log("FETCH USER POST");
      const { data } = await axios.get(`${url}/users/profile`, config());
      return data;
    } catch (err) {
      if (err.message) throw err.message;
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.post(`${url}/posts`, formData, config());
      return data;
    } catch (err) {
      console.log(err);
      if (err.message) throw err.message;
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ currentId, formData }, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `${url}/posts/${currentId}`,
        formData,
        config()
      );
      return data;
    } catch (err) {
      if (err.message) throw err.message;
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

//likes: [id, id]
export const postLikePost = createAsyncThunk(
  "posts/updateOnePost",
  async (postId, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `${url}/posts/${postId}/likePost`,
        null,
        config()
      );
      return data;
    } catch (err) {
      if (err.message) throw err.message;
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, thunkAPI) => {
    console.log(postId);
    try {
      await axios.delete(`${url}/posts/${postId}`, config());
      return postId;
    } catch (err) {
      console.log(err);
      if (err.message) throw err.message;
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

export const searchPost = createAsyncThunk(
  "posts/searchPost",
  async (searchQuery, thunkAPI) => {
    try {
      const { search, tags } = searchQuery;
      const { data } = await axios.get(
        `${url}/posts/search?searchQuery=${search || "none"}&tags=${tags?.join(",") || "none"}`
      );
      return data;
    } catch (err) {
      const message = err?.response?.data?.message;
      if (message) return thunkAPI.rejectWithValue(message);
      if (err.message) throw err.message;
    }
  }
);
