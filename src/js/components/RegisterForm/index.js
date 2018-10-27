import React from "react";
import { compose, withState, withHandlers } from "recompose";

import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
  root: {
    padding: "10px 40px 10px 40px"
  },
  submitButton: {
    marginTop: "10px"
  }
});

const RegisterForm = ({
  username,
  password,
  passwordConfirm,
  setUsername,
  setPassword,
  setPasswordConfirm,
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
      <br />
      <TextField
        id="password-field"
				type="password"
        label="Password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        margin="dense"
        variant="outlined"
      />
      <TextField
        id="password-field-confirm"
				type="password"
        label="Confirm password"
        value={passwordConfirm}
        onChange={({ target }) => setPasswordConfirm(target.value)}
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
  withState("passwordConfirm", "setPasswordConfirm", ""),
  withHandlers({
    handleSubmit: ({ onClick, username, password, passwordConfirm }) => () => {
			onClick(username, password, passwordConfirm);
    }
  })
)(RegisterForm);
