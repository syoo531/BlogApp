/* @jsxImportSource @emotion/react */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../redux/authSlice";
import axios from "axios";

import { paperStyle } from "./styles";
import {
  Container,
  Button,
  Paper,
  Grid,
  Typography,
} from "@mui/material";
//import useStyles from "./styles";
import Input from "./Input";

const initialState = {
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Form = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false); //checks if signup page or not
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setIsSignup((currentState) => !currentState); //toggle state login<>signup
    setShowPassword(false);
    setForm(initialState);
  };

  const register = async () => {
    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify JSON content
        },
        body: JSON.stringify(form), //convert to JSON
      });
      if (res.ok) setIsSignup(false); //direct to login form
    } catch (err) {
      console.log(err);
    }
  };

  const login = async () => {
    const res = await axios.post(
      "http://localhost:5000/auth",
      JSON.stringify(form),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include credentials in the request
      }
    );

    if (res.status == 200) {
      const authorizationHeader = res.headers.get("Authorization");
      localStorage.setItem("Authorization", authorizationHeader);
      
      dispatch(setLogin({ user: res.data.user })); //** 일단 disatch and setLocalStorage together
      localStorage.setItem('profile', JSON.stringify(res.data.user));
      navigate("/");
    } else {
      setForm(initialState);
      window.alert("잘못된 정보를 입력하였습니다");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    isSignup ? register() : login();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} css={paperStyle}>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} sx={{mt: 1, mb: 2}}>
            {isSignup && (
              <>
                <Input
                  name="name"
                  label="name"
                  handleChange={handleChange}
                  value={form.name}
                  autoFocus
                  // half
                />
                <Input
                  name="username"
                  label="username"
                  handleChange={handleChange}
                  value={form.username}
                  autoFocus
                  // half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              // type="email"
              value={form.email}
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              value={form.password}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
export default Form;
