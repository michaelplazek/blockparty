import React from "react";
import { compose, withHandlers } from "recompose";
import { withRouter } from "react-router";

import withStyles from "@material-ui/core/styles/withStyles";
import RegisterForm from "../components/RegisterForm";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

import { registerUser } from "../actions/session";
import mapper from "../utils/connect";
import Button from "@material-ui/core/Button/Button";
import {selectIsDarkMode} from "../selectors";
import {COLBALT, WHITE} from "../constants/colors";
import withNav from "../HOCs/withNav";

const styles = () => ({
  body: {
    marginTop: "2.5em"
  }
});

const Register = ({ handleSignUp, classes, history, isDarkMode }) => (
  <div
    style={{
      background: isDarkMode ? COLBALT : WHITE,
      height: "100vh",
      padding: "20px"
    }}
  >
    <Grid>
      <Button
        onClick={() => history.goBack()}
        color={isDarkMode ? 'secondary' : undefined}
      >
        Back to login
      </Button>
      <Grid
        className={classes.body}
        container
        justify="center"
        direction="column"
      >
        <Grid item>
          <Grid container direction="column" justify="center">
            <Typography color={isDarkMode ? 'textSecondary' : undefined} align="center" variant="display1">
              Sign Up
            </Typography>
            <RegisterForm isDarkMode={isDarkMode} onClick={handleSignUp} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
);

const propMap = {
  isDarkMode: selectIsDarkMode
};

const actionMap = {
  registerUser
};

export default compose(
  withStyles(styles),
  withRouter,
  mapper(propMap, actionMap),
  withHandlers({
    handleSignUp: ({ registerUser, history }) => (username, password) => {
      registerUser(username, password, history);
    }
  }),
  withNav
)(Register);
