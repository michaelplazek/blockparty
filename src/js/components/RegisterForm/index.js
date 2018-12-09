import React from "react";
import { compose, withState, withHandlers } from "recompose";
import Recaptcha from 'react-recaptcha';

import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";

const styles = () => ({
  root: {
    padding: "10px 20px 10px 20px"
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
  handleVerification,
  handleExpiration,
  classes
}) => (
  <form noValidate autoComplete="on">
    <Grid
      container
      className={classes.root}
      justify="center"
      direction="column"
      alignItems='center'
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
      <Grid item>
        <Recaptcha
          sitekey="6LfFsn8UAAAAAHTnG7NwOVTX9pD4H63_6F6bY1Jj"
          render="explicit"
          verifyCallback={handleVerification}
          expiredCallback={handleExpiration}
          size='compact'
        />
      </Grid>
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
  withState("verified", "setVerified", false),
  withHandlers({
    handleSubmit: ({ onClick, username, password, passwordConfirm, verified }) => () => {
      onClick(username, password, passwordConfirm);
    },
    handleVerification: ({ setVerified }) => (response) => {
      if(response.length !== 0) setVerified(true);
      else setVerified(false);
    },
    handleExpiration: ({ setVerified }) => () => {
      setVerified(false);
    },
  })
)(RegisterForm);
