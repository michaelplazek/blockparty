import React from "react";
import { compose } from "recompose";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";

const styles = () => ({
  container: {
    marginTop: "1em"
  },
  button: {
    margin: "0.2em"
  }
});

const ButtonContainer = ({ id, classes, handleComplete, handleCancel }) => (
  <Grid
    container
    direction='column'
    alignItems='center'
    className={classes.container}
  >
    <Grid item className={classes.button}>
      <Button
        variant="contained"
        onClick={() => handleComplete(id)}
        color="primary"
      >
        Mark as Completed
      </Button>
    </Grid>
    <Grid item className={classes.button}>
      <Button
        variant="contained"
        onClick={() => handleCancel(id)}
      >
        Mark as Cancelled
      </Button>
    </Grid>
  </Grid>
);

export default compose(withStyles(styles))(ButtonContainer);
