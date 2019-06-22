import React from "react";
import { compose } from "recompose";

import { dark, light } from "../../../../theme";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";

const styles = () => ({
  container: {
    marginTop: "0.5em"
  },
  button: {
    margin: "0.2em"
  }
});

const ButtonContainer = ({
  id,
  classes,
  handleComplete,
  handleCancel,
  disabled,
  isDarkMode
}) => {
  const theme = isDarkMode ? dark : light;
  return (
    <Grid
      container
      direction="row"
      justify="center"
      className={classes.container}
    >
      <Grid item className={classes.button}>
        <Button
          variant="contained"
          onClick={handleCancel}
          style={theme.palette.errorButton}
        >
          Cancel
        </Button>
      </Grid>
      <Grid item className={classes.button}>
        <Button
          variant="contained"
          onClick={handleComplete}
          style={
            !disabled
              ? theme.palette.submitButton
              : theme.palette.disabledSubmitButton
          }
          disabled={disabled}
        >
          {disabled ? "Marked as completed" : "Mark as completed"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default compose(withStyles(styles))(ButtonContainer);
