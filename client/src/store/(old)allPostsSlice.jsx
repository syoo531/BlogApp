import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  currentPage: 1,
  numberOfPages: 0,
  loading: false
}

export const allPostsSlice = createSlice({
  name: "allPosts",
  //initialState: [],
  initialState,
  reducers: {
    setAllPosts: (state, action) => {
      state.posts = action.payload.data || action.payload.userPosts
      state.currentPage = action.payload.currentPage
      state.numberOfPages= action.payload.numberOfPages
    },
    setPost: (state, action) => {  //update single post
      const updatedPosts = state.posts.map((post) =>
        post._id == action.payload._id ? action.payload : post
      );
      state.posts = updatedPosts
    },
    newPost: (state, action) => {
      state.posts = [...state.posts, action.payload]
      //state.posts.push(action.payload);
    },
    clearStore: (state) => {
      state.posts = []
    }
  },
});

// Action creators are generated for each case reducer function
export const { setAllPosts, setPost, newPost, clearStore} = allPostsSlice.actions;

//used to connect with store
export default allPostsSlice.reducer;
