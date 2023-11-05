import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../api/auth";

const initialState = {
  user: null,
  error: null,
  isPending: false
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
      console.log(action.payload.data);
      state.posts = action.payload.data; //update store with all user's post
    },
    setPostToStore: (state, action) => {
      //update single user post
      const updatedPosts = state.posts.map((post) =>
        post._id == action.payload._id ? action.payload : post
      );

      state.posts = updatedPosts; //return updated post
    },
    setProfileState: (state, action) => {
      state.setProfileState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isPending = true
    }),
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user
       state.isPending = false
       state.error = null;
    }),
    builder.addCase(login.rejected, (state, action) => {
      state.error = action?.payload || action?.error?.message
      state.isPending = false
    }),
    builder.addCase(register.pending, (state) => {
      state.isPending = true
    }),
    builder.addCase(register.fulfilled, (state) => {
      state.isPending = false
      state.error = null;
    }),
    builder.addCase(register.rejected, (state, action) => {
      state.error = action?.payload || action?.error?.message
      state.isPending = false
    })
  }
})

// Action creators are generated for each case reducer function
export const {
  setPostsToStore,
  setPostToStore,
  setLogin,
  setLogout,
  setProfileState,
} = authSlice.actions;

//used to connect with store
export default authSlice.reducer;
