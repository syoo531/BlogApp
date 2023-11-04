import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getAllPosts,
  getUserPosts,
  createPost,
  updatePost,
  postLikePost,
  deletePost,
} from "./api";

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
    //!standard reducer logic, with auto-generated action tpes per reducer
    clearStore: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    //* create post */
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts = [...state.posts, action.payload];
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

      //* update post */
      builder.addMatcher(
        isAnyOf(updatePost.pending, postLikePost.pending),
        (state) => {
          state.isLoading = true;
        }
      ),
      builder.addMatcher(
        isAnyOf(updatePost.fulfilled, postLikePost.fulfilled),
        (state, action) => {
          const updatedPosts = state.posts.map((post) =>
            post._id == action.payload._id ? action.payload : post
          );
          state.posts = updatedPosts;
          state.isLoading = false;
        }
      ),
      builder.addMatcher(
        isAnyOf(updatePost.rejected, postLikePost.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action?.error?.message || action?.payload;
        }
      );

    //* fetch post */
    builder.addMatcher(
      isAnyOf(getAllPosts.pending, getUserPosts.pending),
      (state) => {
        state.isLoading = true;
      }
    ),
      builder.addMatcher(
        isAnyOf(getAllPosts.fulfilled, getUserPosts.fulfilled),
        (state, action) => {
          state.posts = action?.payload?.data || action?.payload?.userPosts;
          state.currentPage = action?.payload?.currentPage;
          state.numberOfPages = action?.payload?.numberOfPages;
          state.isLoading = false;
        }
      ),
      builder.addMatcher(
        isAnyOf(getAllPosts.rejected, getUserPosts.rejected),
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