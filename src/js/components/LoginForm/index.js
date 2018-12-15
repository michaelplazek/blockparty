import React from "react";
import { compose, withState, withHandlers } from "recompose";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import { cleanInputs, PASSWORD, USERNAME } from "../../constants/validation";

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
  <ValidatorForm
    ref="form"
    autoComplete="on"
    onSubmit={handleSubmit}
    onError={}
    instantValidate={false}
  >
    <Grid
      container
      className={classes.root}
      justify="center"
      direction="column"
    >
      <TextValidator
        id="username-field"
        name="username"
        label="Username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        validators={USERNAME.VALIDATORS}
        errorMessages={USERNAME.MESSAGES}
        margin="dense"
        variant="outlined"
      />
      <TextValidator
        id="password-field"
        name="password"
        label="Password"
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        validators={PASSWORD.VALIDATORS}
        errorMessages={PASSWORD.MESSAGES}
        margin="dense"
        variant="outlined"
      />
      <br />
      <Button
        className="submitButton"
        variant="raised"
        color="primary"
        type="submit"
      >
        Submit
      </Button>
    </Grid>
  </ValidatorForm>
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
