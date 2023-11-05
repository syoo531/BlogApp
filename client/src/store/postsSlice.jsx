import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getAllPosts,
  getUserPosts,
  createPost,
  updatePost,
  postLikePost,
  deletePost,
  searchPost
} from "../api/services";

const initialState = {
  posts: [],
  currentPage: 1,
  numberOfPages: 0,
  isLoading: false,
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  //initialState: [],
  initialState,
  reducers: {
    clearStore: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    //* create post */
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts = [action.payload, ...state.posts];
    }),
      builder.addCase(createPost.rejected, (state, action) => {
        state.error = action?.error?.message || action?.payload;
      }),
      //* delete post */
      builder.addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      }),
      builder.addCase(deletePost.rejected, (state, action) => {
        state.error = action?.error?.message || action?.payload;
      }),
      
      //* like post */
      builder.addCase(postLikePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      }),
      builder.addCase(postLikePost.rejected, (state, action) => {
        state.error = action?.error?.message || action?.payload;
      }),

      //* update post */
      builder.addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(updatePost.fulfilled, (state, action) => {
        const updatedPosts = state.posts.map((post) =>
          post._id == action.payload._id ? action.payload : post
        );
        state.posts = updatedPosts;
        state.isLoading = false;
      }),
      builder.addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.error?.message || action?.payload;
      });

    //* fetch post */
    builder.addMatcher(
      isAnyOf(getAllPosts.pending, getUserPosts.pending, searchPost.pending),
      (state) => {
        state.isLoading = true;
      }
    ),
      builder.addMatcher(
        isAnyOf(getAllPosts.fulfilled, getUserPosts.fulfilled, searchPost.fulfilled),
        (state, action) => {
          state.posts = action?.payload?.data || action?.payload?.userPosts;
          state.currentPage = action?.payload?.currentPage;
          state.numberOfPages = action?.payload?.numberOfPages;
          state.isLoading = false;
        }
      ),
      builder.addMatcher(
        isAnyOf(getAllPosts.rejected, getUserPosts.rejected, searchPost.rejected),
        (state, action) => {
          console.log("action.payload:", action.payload);
          console.log("action.error:", action.error.message);
          state.isLoading = false;
          state.error = action?.error?.message || action?.payload;
        }
      );
  },
});

//used to connect with store
export default postsSlice.reducer;
