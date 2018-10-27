import React from "react";
import { compose, withHandlers } from "recompose";
import { withRouter } from "react-router";

import withStyles from "@material-ui/core/styles/withStyles";
import RegisterForm from "../components/RegisterForm";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

import { validateInput } from "../utils/validate";
import { registerUser } from "../actions/session";
import mapper from "../utils/connect";
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
  root: {
    background: "white",
    height: "90vh",
    padding: "20px"
  }
});

const Register = ({ handleSignUp, classes, history }) => (
  <Grid style={{ background: "white" }}>
    <Button onClick={() => history.goBack()}>Back to login</Button>
    <Grid
      className={classes.root}
      container
      justify="center"
      direction="column"
    >
      <Grid item>
        <Grid container direction="column" justify="center">
          <Typography align="center" variant="display1">
            Sign Up
          </Typography>
          <RegisterForm onClick={handleSignUp} />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

const propMap = {};

const actionMap = {
  registerUser
};

export default compose(
  withStyles(styles),
  withRouter,
  mapper(propMap, actionMap),
  withHandlers({
    handleSignUp: ({ registerUser, history }) => (username, password, confirmPassword) => {
      if (validateInput(username, password, confirmPassword)) {
        registerUser(username, password, history);
      }
    }
  })
)(Register);
