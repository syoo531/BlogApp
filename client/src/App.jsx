import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import { useState } from "react";

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

  return (
    <BrowserRouter>
      <Container maxWidth={false} style={{ padding: 0 }}>
        <Navbar isAuth={isAuth} />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Home setIsAuth={setIsAuth} />} />
          <Route
            path="/posts/search"
            element={<Home setIsAuth={setIsAuth} />}
          />
          <Route path="/posts/:id" element={<PostDetails />} />

          <Route path="/auth" element={<Auth setIsAuth={setIsAuth} />} />
          <Route
            path="/myposts"
            element={isAuth ? <MyPosts /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
