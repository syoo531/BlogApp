import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../redux/api"

let PaginationContainer = styled.div({
  display: "flex",
  marginTop: "50px",
  justifyContent: "space-around",
});

const Paginate = ({ page }) => {
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);


  // const renderCount = useRef(0);
  // useEffect(() => {
  //   renderCount.current += 1;
  // });
  // console.log("pagination", renderCount)

  // const getPosts = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `http://localhost:5000/posts?page=${page}`
  //     );
  //     dispatch(setAllPosts(data));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    if (page) {
      dispatch(API.getAllPosts(page));
    }
    // return () => {
    //   dispatch(clearStore());
    // };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <PaginationContainer>
      <Stack spacing={2}>
        <Pagination
          count={numberOfPages}
          page={Number(page)}
          size="small"
          // variant="outlined"
          color="primary"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              component={Link}
              to={`/posts?page=${item.page}`}
            />
          )}
        />
      </Stack>
    </PaginationContainer>
  );
}

const MemoizedPaginate = memo(Paginate)
export default MemoizedPaginate