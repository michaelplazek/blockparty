import React from "react";
import { compose } from "recompose";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

import { DARK_GREEN } from "./constants/colors";
import mapper from "./utils/connect";
import { selectIsDarkMode } from "./selectors";
import { light, dark } from "../theme";
import { MuiThemeProvider } from "@material-ui/core";

const App = ({ isDarkMode }) => (
  <MuiThemeProvider theme={isDarkMode ? dark : light}>
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        background: isDarkMode ? DARK_GREEN : undefined
      }}
    >
      <Router>
        <Routes />
      </Router>
    </div>
  </MuiThemeProvider>
);

const propMap = {
  isDarkMode: selectIsDarkMode
};

export default compose(mapper(propMap, {}))(App);
