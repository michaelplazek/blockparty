import React from "react";
import { compose, withHandlers } from "recompose";
import { withRouter } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

import { logInUser } from "../actions/session";
import mapper from "../utils/connect";
import Button from "@material-ui/core/Button/Button";
import withSplash from "../HOCs/withSplash";
import Fade from "@material-ui/core/Fade";
import {getMode as getModeAction, setNavIndex} from "../actions/app";
import {selectIsDarkMode, selectModeLoaded, selectPostLoginPath, selectUserId} from "../selectors";
import {COLBALT, WHITE} from "../constants/colors";
import withNav from "../HOCs/withNav";

const Login = ({ handleLogIn, history, isDarkMode }) => (
  <Grid
    container
    justify="center"
    direction="column"
    style={{
      background: isDarkMode ? COLBALT : WHITE,
      height: "100vh",
      padding: "20px"
    }}
  >
    <Fade
      in={true}
      timeout={{
        enter: 1000
      }}
    >
      <Grid item>
        <Grid container direction="column" justify="center">
          <Typography color={isDarkMode ? 'textSecondary' : undefined} align="center" variant="display1">
            Log In
          </Typography>
          <LoginForm isDarkMode={isDarkMode} onClick={handleLogIn} />
        </Grid>
        <Typography color={isDarkMode ? 'textSecondary' : undefined} className="signUpText" align="right">
          or,{" "}
          <Button
            className="signUpLink"
            onClick={() => history.push("/register")}
            variant="text"
            color={isDarkMode ? 'inherit' : undefined}
          >
            sign up for account
          </Button>
        </Typography>
      </Grid>
    </Fade>
  </Grid>
);

const propMap = {
  modeLoaded: selectModeLoaded,
  userId: selectUserId,
  isDarkMode: selectIsDarkMode,
  postLoginPath: selectPostLoginPath
};

const actionMap = {
  logInUser,
  setNavIndex,
  getMode: getModeAction
};

export default compose(
  withRouter,
  mapper(propMap, actionMap),
  withHandlers({
    handleLogIn: ({ logInUser, setNavIndex, history, postLoginPath }) => (
      username,
      password
    ) => {
      logInUser(username, password, history, setNavIndex, postLoginPath);
    }
  }),
  withSplash,
  withNav
)(Login);
