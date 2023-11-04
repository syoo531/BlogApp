import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import MyPosts from "./pages/MyPosts";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

// import { setPostsToStore } from "./redux/postSlice";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

function App() {
  const [isAuth, setIsAuth] = useState(
    Boolean(localStorage.getItem("Authorization"))
  );

  //Get local storage every time user refreshes the page
  useEffect(() => {
    setIsAuth(Boolean(localStorage.getItem("Authorization")));
  }, []);

  return (
    <Container maxWidth={false} style={{ padding: 0 }}>
      <BrowserRouter>
        <Navbar isAuth={isAuth} />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />

          <Route path="/auth" element={<Auth />} />
          <Route
            path="/myposts"
            element={isAuth ? <MyPosts /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
