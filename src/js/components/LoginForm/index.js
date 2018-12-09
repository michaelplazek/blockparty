import React from "react";
import { compose, withState, withHandlers } from "recompose";

import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import {cleanInputs} from "../../constants/validation";

const styles = () => ({
  root: {
    padding: "10px 40px 10px 40px"
  },
  submitButton: {
    marginTop: "10px"
  }
});

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  onClick,
  handleSubmit,
  classes
}) => (
  <form noValidate autoComplete="on">
    <Grid
      container
      className={classes.root}
      justify="center"
      direction="column"
    >
      <TextField
        id="username-field"
        label="Username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        margin="dense"
        variant="outlined"
      />
      <TextField
        id="password-field"
        label="Password"
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        margin="dense"
        variant="outlined"
      />
      <br />
      <Button
        className="submitButton"
        variant="raised"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Grid>
  </form>
);

export default compose(
  withStyles(styles),
  withState("username", "setUsername", ""),
  withState("password", "setPassword", ""),
  withHandlers({
    handleSubmit: ({ onClick, username, password }) => () => {
      const inputs = cleanInputs(username, password);
      onClick(inputs[username], inputs[password]);
    }
  })
)(LoginForm);
