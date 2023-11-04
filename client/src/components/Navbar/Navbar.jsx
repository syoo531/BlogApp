/* @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLogout, setProfileState } from "../../redux/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppBar, Typography, Toolbar, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { styles} from "./styles";
import { jwtDecode } from "jwt-decode"; 
//import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  //const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  //const userState = useSelector((state) => state.auth.user); //this gets reset upon refresh..
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    localStorage.clear();
    dispatch(setLogout()); //need to call action first
    navigate("/");
  };

  //decode token and logout() if expired > run every time location changes
  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <NavImage>
      <AppBar
        css={styles.appBar} //can pass theme to appBar
        position="absolute"
        elevation={0}
        sx={{
          display: "flex !important",
          flexDirection: "row !important",
          justifyContent: "space-between !important",
          alignItems: "flex-start !important",
        }}
      >
        <div css={styles.leftBar}>
          <Typography
            component={Link}
            to="/"
            css={styles.heading}
            variant="h4"
            align="center"
            onClick={() => dispatch(setProfileState(false))} //! need to look into this..
          >
            Memories
          </Typography>
          {/* <img
          css={styles.image}
          src="https://png.pngtree.com/png-vector/20210604/ourlarge/pngtree-cartoon-color-green-camera-png-image_3395289.jpg"
          alt="memories"
          height="80"
        /> */}
        </div>
        <Toolbar css={styles.toolBar}>
          {user ? (
            <div css={styles.profile}>
              {/* <Avatar css={styles.purple} alt={user.name} src={user.imageUrl}>
              {user.name.charAt(0)}
            </Avatar>
            <Typography css={styles.userName} variant="h6">
              {user.name}
            </Typography> */}
              <CustomNavButton
                variant="text"
                color="secondary"
                size="large"
                component={Link}
                to="/myposts"
                // sx={{
                //   "&:hover": {
                //     backgroundColor: (theme) => theme.palette.secondary.light,
                //   },
                // }}
              >
                My posts
              </CustomNavButton>
              <Button variant="contained" color="secondary" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="secondary"
              sx={{
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.secondary.dark,
                },
              }}
              disableElevation
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </NavImage>
  );
};
const CustomNavButton = styled(Button)(({ theme }) => ({
  color: "black",
  "&:hover": {
    backgroundColor: theme.palette.secondary.light,
    color: "black",
  },
  "&:active": {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const NavImage = styled("div")({
  background: `url('https://images.unsplash.com/photo-1546177461-79dfec0b0928?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
  backgroundSize: "cover", 
  backgroundPosition: "right 0% bottom 20%",
  height: "300px",
});

export default Navbar;
