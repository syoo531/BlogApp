/* @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
//import { setAllPosts } from "../../redux/allPostsSlice";
//import { setPostsToStore } from "../../redux/authSlice";
import * as API from "../../redux/api";

import { Grid, CircularProgress } from "@mui/material";
import { styles } from "./styles";
import Post from "./Post/Post";

// page = 1
const Posts = ({ setCurrentId }) => {
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.posts);
  const location = useLocation();
  const isProfile = location.pathname === "/myposts"; //TODO: 불안정함

  // const renderCount = useRef(0);
  // useEffect(() => {
  //   renderCount.current += 1;
  // });

  // const getPosts = () => {
  //   dispatch(API.getAllPosts(page))
  //     .unwrap()
  //     .catch((rejectedValue) => {
  //       console.log("rejectedValue", rejectedValue);
  //     });
  // };

  const getUserPosts = () => {
    dispatch(API.getUserPosts())
      .unwrap()
      .catch((rejectedValue) => {
        console.log("rejectedValue", rejectedValue);
      });
  };

  useEffect(() => {
    if (isProfile) {
      //URL 따서 myposts인지 확인
      getUserPosts();
    } 
    // return () => {
    //   dispatch(clearStore());
    //};
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    //return <div>is loading...</div>
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error fetching data...Error: {error}</div>;
  }

  return !posts?.length ? (
    <div>There are no posts..</div>
  ) : (
    <Grid css={styles.container} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={isProfile ? 4 : 3}>
          <Post post={post} setCurrentId={setCurrentId} isProfile={isProfile} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
