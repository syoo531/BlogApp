/* @jsxImportSource @emotion/react */
import {  useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Grow, Container } from "@mui/material";
import Search from "../components/Search/Search"
import MemoizedPaginate from "../components/Paginate";
import Posts from "../components/Posts/Posts";


const Home = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search); //get page num from url
  const page = parseInt(query.get("page") || 1);

  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current += 1;
  });
  console.log("home render", renderCount)

  return (
    <Grow in>
      <div>
        <Container maxWidth={false} sx={{ width: "90%", minHeight: "80vh"}}>
          <Search />
          <Grid item xs={12} sm={12}>
            <Posts page={page} />
          </Grid>
        </Container>
        <MemoizedPaginate page={page} />
      </div>
    </Grow>
  );
};

export default Home;
