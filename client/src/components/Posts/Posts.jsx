/* @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import * as API from "../../api/services";

import { Grid, CircularProgress } from "@mui/material";
import { styles } from "./styles";
import styled from "@emotion/styled";
import Post from "./Post/Post";

const MessageContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});


const Posts = ({ setCurrentId }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { posts, isLoading, error } = useSelector((state) => state.posts);
  const isProfile = location.pathname === "/myposts";

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
      getUserPosts();  //if url path is /myposts render user posts
    } 
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <MessageContainer><CircularProgress /></MessageContainer>;
  }

  if (error) {
    return <MessageContainer>Error fetching data...Error: {error}</MessageContainer>;
  }

  return !posts?.length ? (
    <MessageContainer>There are no posts..</MessageContainer>
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
