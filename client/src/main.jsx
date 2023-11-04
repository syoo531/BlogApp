//import React from "react"; //need for strictmode
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; //! connect app with store and access store from anywhere
import { store } from "./redux/store";
import App from "./App";

/* styling */
import { globalStyles } from "./styles";
import { Global } from "@emotion/react";
import { ThemeProvider, createTheme } from "@mui/material";

// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
//const store = createStore(reducers, compose(applyMiddleware(thunk)));

const theme = createTheme({
  palette: {
    primary: {
      main: "#008FC9",
      dark: "#00648C",
      light: "#33A5D3",
      //main: "#176B87",
      //light: "#64CCC5",
    },
    secondary: {
      main: "#FF7370",
      dark: "#D0524E",
      light: "#FF8F8C",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <App />
      </ThemeProvider>
    </Provider>
);
//<React.StrictMode>