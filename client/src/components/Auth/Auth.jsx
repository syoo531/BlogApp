/* @jsxImportSource @emotion/react */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as API from "../../api/auth";

import { Container, Button, Paper, Grid, Typography } from "@mui/material";
import { paperStyle } from "./styles";
import Input from "./Input";

const initialState = {
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Form = ({setIsAuth}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false); //checks if signup page or not
  const [helperText, setHelperText] = useState({})
  //const error = useSelector((state) => state.auth.error);
  //const isPending = useSelector((state) => state.auth.isPending);
  //const user = useSelector((state) => state.auth.user);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setIsSignup((currentState) => !currentState); //toggle state login<>signup
    setShowPassword(false);
    setForm(initialState);
  };
  
  const register = () => {
    if (checkPasswordConfirm()) {
      return
    }
    dispatch(API.register(form)).then((data) => {
      if (data?.type?.endsWith("fulfilled")) setIsSignup(false);
    }).then(()=>{ setHelperText({})})
  };

  const login = async () => {
    try {
      const data = await dispatch(API.login(form));
      if (data?.type?.endsWith("fulfilled")) {
        setIsAuth(true)
        navigate("/");
      } else {
        setForm(initialState);
        window.alert("잘못된 정보를 입력하였습니다");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //logic check
  const checkPasswordConfirm = () => {
    if (form.confirmPassword === form.password) {
      setHelperText({...helperText, password: "비밀번호가 일치하지 않습니다."})
      return false
    }
  }
  
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
          <Grid container spacing={3} sx={{ mt: 1, mb: 2 }}>
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
              helperText={helperText.password ? helperText.password : null}
              //error={error && true}
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
