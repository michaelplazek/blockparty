import React from "react";
import { compose, withState, withHandlers } from "recompose";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import { cleanInputs, PASSWORD, USERNAME } from "../../constants/validation";
import {GOLD} from "../../constants/colors";

const styles = () => ({
  root: {
    padding: "10px 40px 10px 40px"
  },
  submitButton: {
    marginTop: "10px"
  },
  label: {
    color: `${GOLD} !important`
  },
  outlinedInput: {
    '&$focused $notchedOutline': {
      borderColor: `${GOLD} !important`,
    }
  },
  focused: {
    color: GOLD
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: `${GOLD} !important`
  },
});

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleSubmit,
  classes,
  isDarkMode,
}) => {
  const inputClasses = isDarkMode ? {
    root: classes.outlinedInput,
    focused: classes.focused,
    notchedOutline: classes.notchedOutline,
  } : {};
  const labelClasses = isDarkMode ? {
    root: classes.label,
    focused: classes.focused,
  } : {};
  return (
    <ValidatorForm
      autoComplete="on"
      onSubmit={handleSubmit}
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
          InputProps={{
            classes: inputClasses,
          }}
          InputLabelProps={{
            classes: labelClasses,
          }}
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
          InputProps={{
            classes: inputClasses,
          }}
          InputLabelProps={{
            classes: labelClasses,
          }}
          onChange={({ target }) => setPassword(target.value)}
          validators={PASSWORD.VALIDATORS}
          errorMessages={PASSWORD.MESSAGES}
          margin="dense"
          variant="outlined"
        />
        <br />
        <Button
          className="submitButton"
          variant="contained"
          color={isDarkMode ? 'secondary' : 'primary'}
          type="submit"
        >
          Submit
        </Button>
      </Grid>
    </ValidatorForm>
  )
};

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
