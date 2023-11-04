import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  posts: [],
  setProfileState: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  //initialState: [],
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.user = null;
    },
    setPostsToStore: (state, action) => {
      console.log(action.payload.data)
      state.posts = action.payload.data //update store with all user's post
    },
    setPostToStore: (state, action) => {  //update single user post
      const updatedPosts = state.posts.map((post) =>
        post._id == action.payload._id ? action.payload : post
      );
      // state.posts.map((post) => {
      //   if (post._id == action.payload.post._id) return action.payload.post;
      //   return post;
      // });
      state.posts = updatedPosts; //return updated post
    },
    setProfileState: (state, action) => {
      console.log(action.payload)
      state.setProfileState = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setPostsToStore, setPostToStore, setLogin, setLogout, setProfileState } = authSlice.actions;

//used to connect with store
export default authSlice.reducer;
