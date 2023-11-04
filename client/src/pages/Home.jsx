/* @jsxImportSource @emotion/react */
import {  useEffect, useRef } from "react";
//import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Grid, Grow, Container } from "@mui/material";
//import { MuiChipsInput } from "mui-chips-input";
import Search from "../components/Search/Search"
import MemoizedPaginate from "../components/Paginate";
import Posts from "../components/Posts/Posts";
// import { setAllPosts } from "../redux/allPostsSlice";
// import axios from "axios";

//import { useSelector } from "react-redux"
//import Form from "../Form/Form";
//import {setProfileState} from "../../redux/authSlice"

//TODO: Why is this needed?
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  //const [currentId, setCurrentId] = useState(0); //Form component에서 사용하기 위함
  //const isLogin = Boolean(localStorage.getItem("profile"));

  //const isProfile = useSelector((state) => state.auth.setProfileState)
  // Get the current route using React Router's useLocation
  // const location = useLocation();
  // const isMyPostsRoute = location.pathname == "/myposts";

  const query = useQuery();
  const page = query.get("page") || 1;
  //const searchQuery = query.get("searchQuery");

  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current += 1;
  });
 

  // const handleKeyPress = (e) => {
  //   if (e.keyCode == 13) {
  //     //search for post
  //   }
  // };

  return (
    <Grow in>
      <div>
        <Container maxWidth={false} style={{ width: "90%", minHeight: "80vh"}}>
          
          <Search />

          {/* <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={5}
          > */}
          <Grid item xs={12} sm={12}>
            <Posts page={page} />
          </Grid>
          {/* </Grid> */}
        </Container>
        <MemoizedPaginate page={page} />
      </div>
    </Grow>
  );

  // const ShowProfile = () => {
  //   if (isProfile) {
  //     return (
  //       <>
  //         <Grid item xs={12} sm={12}>
  //           <Posts setCurrentId={setCurrentId} isProfile={isProfile} />
  //         </Grid>
  //         <Grid item xs={12} sm={12}>
  //           <Form currentId={currentId} setCurrentId={setCurrentId} />;
  //         </Grid>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <Grid item xs={12} sm={12}>
  //         <Posts setCurrentId={currentId} isProfile={isProfile} />
  //       </Grid>
  //     );
  //   }
  // };

  // return (
  //   <Grow in>
  //     <div style={{ padding: "30px 0px" }}>
  //       <Container maxWidth={false} style={{ width: "90%" }}>
  //         <Grid
  //           container
  //           justifyContent="space-between"
  //           alignItems="stretch"
  //           spacing={5}
  //         >
  //           <MyPosts />
  //           {/* <Grid item xs={12} sm={8}>
  //             <Posts setCurrentId={currentId} isProfile={isMyPostsRoute} />
  //           </Grid>
  //           <Grid item xs={12} sm={4}>
  //             <ShowProfile />
  //           </Grid> */}
  //         </Grid>
  //       </Container>
  //     </div>
  //   </Grow>
  // );
};

export default Home;
