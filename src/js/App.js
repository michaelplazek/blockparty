import React from "react";
import { compose } from "recompose";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column"
  }
});
const App = ({ classes }) => (
  <div className={classes.root}>
    <Router>
      <Routes />
    </Router>
  </div>
);

export default compose(withStyles(styles))(App);
