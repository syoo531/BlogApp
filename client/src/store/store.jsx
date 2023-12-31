import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; //import as is for default export
import postsReducer from "./postsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});
