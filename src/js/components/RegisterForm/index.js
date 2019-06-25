import React from "react";
import { compose, withState, withHandlers, lifecycle } from "recompose";
import Recaptcha from "react-recaptcha";

import withStyles from "@material-ui/core/styles/withStyles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import {
  cleanInputs,
  PASSWORD,
  PASSWORD_CONFIRM,
  USERNAME
} from "../../constants/validation";
import {GOLD} from "../../constants/colors";

const styles = () => ({
  root: {
    padding: "10px 20px 10px 20px"
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

const RegisterForm = ({
  username,
  password,
  passwordConfirm,
  setUsername,
  setPassword,
  setPasswordConfirm,
  handleSubmit,
  handleVerification,
  handleExpiration,
  classes,
  isDarkMode
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
        alignItems="center"
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
        <br />
        <TextValidator
          id="password-field"
          name="password"
          type="password"
          label="Password"
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
        <TextValidator
          id="password-field-confirm"
          name="confirmPassword"
          type="password"
          label="Confirm password"
          value={passwordConfirm}
          InputProps={{
            classes: inputClasses,
          }}
          InputLabelProps={{
            classes: labelClasses,
          }}
          onChange={({ target }) => setPasswordConfirm(target.value)}
          validators={PASSWORD_CONFIRM.VALIDATORS}
          errorMessages={PASSWORD_CONFIRM.MESSAGES}
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
            size="compact"
          />
        </Grid>
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
  withState("passwordConfirm", "setPasswordConfirm", ""),
  withState("verified", "setVerified", false),
  lifecycle({
    componentDidMount() {
      ValidatorForm.addValidationRule("isPasswordMatch", value => {
        return value === this.props.password;
      });
    }
  }),
  withHandlers({
    handleSubmit: ({ onClick, username, password, verified }) => () => {
      if (verified) {
        const inputs = cleanInputs(username, password);
        onClick(inputs[username], inputs[password]);
      }
    },
    handleVerification: ({ setVerified }) => response => {
      if (response.length !== 0) setVerified(true);
      else setVerified(false);
    },
    handleExpiration: ({ setVerified }) => () => {
      setVerified(false);
    }
  })
)(RegisterForm);
