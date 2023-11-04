import { css } from "@emotion/react";
// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";

export const styles = {
  appBar: css({
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      //backgroundColor: theme.palette.primary.main,
      position: "sticky",
      top: 0,
      left: 0,
      width: "100%",
      background: "rgba(0, 0, 0, 0.4)",
      padding: "10px 0"
      //borderBottom: "1px solid #fff"
    }),
  leftBar: css({
    display: "flex",
    //alignItems: "center",
  }),
  heading: css({
    color: "black",
    padding: " 10px 10px 10px calc(7vw)",
    height: "50%",
    textDecoration: "none",
    fontFamily: "serif",
    fontStyle: "italic",
    fontWeight: "bold",
  }),
  toolBar: css({
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "calc(5vw)",
  }),
  profile: css({
    display: "flex",
    justifyContent: "space-between",
    gap: "10px"
  }),
};

// export const CustomNavButton = styled(Button)(({ theme }) => ({
//   color: "black",
//   "&:hover": {
//     backgroundColor: theme.palette.secondary.light,
//     color: "black",
//   },
//   "&:active": {
//     backgroundColor: theme.palette.secondary.dark,
//   },
// }));

// export const NavImage = styled("div")({
//   background: `url('https://images.unsplash.com/photo-1546177461-79dfec0b0928?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
//   backgroundSize: "cover", 
//   backgroundPosition: "right 0% bottom 20%",
//   height: "300px",
// });


// export const styles = {
//   appBar: css`
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//     background-color: #f5f5f5;
//     padding: 10px 0px;
//   `,
//   brandContainer: css`
//     display: flex;
//     align-items: center;
//   `,
//   heading: css`
//     color: black;
//     padding-left: calc(7vw);
//     height: 50px;
//     // align-self: center;
//   `,
//   image: css`
//     margin-left: 5px;
//   `,
//   toolbar: css`
//     display: flex;
//     justify-content: flex-end;
//     width: 300px;
//     margin-right: calc(5vw);
//   `,
//   profile: css`
//     display: flex;
//     justify-content: space-between;
//     width: 400px;
//   `,
//   userName: css`
//     display: flex;
//     align-items: center;
//   `,
//   purple: css`
//     color: theme.palette.getContrastText(${deepPurple}[500]);
//     background-color: ${deepPurple}[500];
//   `,
// };

// export const navContainer = css({
//   backgroundColor: "#f5f5f5",

// })
