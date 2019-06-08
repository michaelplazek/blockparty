import React from "react";
import { compose, withHandlers } from "recompose";
import { withRouter } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import LoginForm from "../components/LoginForm";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

import { logInUser } from "../actions/session";
import mapper from "../utils/connect";
import Button from "@material-ui/core/Button/Button";
import withSplash from "../HOCs/withSplash";
import Fade from "@material-ui/core/Fade";
import { setNavIndex } from "../actions/app";

const styles = () => ({
  root: {
    background: "white",
    height: "90vh",
    padding: "20px"
  },
  signUpText: {
    marginRight: "20px",
    align: "right",
    cursor: "pointer"
  }
});

const Login = ({ handleLogIn, classes, history }) => (
  <Grid className={classes.root} container justify="center" direction="column">
    <Fade
      in={true}
      timeout={{
        enter: 1000
      }}
    >
      <Grid item>
        <Grid container direction="column" justify="center">
          <Typography align="center" variant="display1">
            Log In
          </Typography>
          <LoginForm onClick={handleLogIn} />
        </Grid>
        <Typography className="signUpText" align="right">
          or,{" "}
          <Button
            className="signUpLink"
            onClick={() => history.push("/register")}
            variant="text"
          >
            sign up for account
          </Button>
        </Typography>
      </Grid>
    </Fade>
  </Grid>
);

const propMap = {};

const actionMap = {
  logInUser,
  setNavIndex
};

export default compose(
  withStyles(styles),
  withRouter,
  mapper(propMap, actionMap),
  withHandlers({
    handleLogIn: ({ logInUser, setNavIndex, history }) => (
      username,
      password
    ) => {
      logInUser(username, password, history, setNavIndex);
    }
  }),
  withSplash
)(Login);
