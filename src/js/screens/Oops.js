import React from "react";
import { compose } from "recompose";

import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import { withRouter } from "react-router";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button/Button";

const styles = {
  root: {
    margin: `50px`,
  },
  info: {
    marginLeft: "10px",
    padding: "2px",
    fontSize: "1.1em"
  },
  description: {
    padding: "5px"
  }
};

const Oops = ({ history, classes }) => (
  <div className={classes.root}>
    <Grid container direction="column">
      <Grid item>
        <Grid container direction="row">
          <Typography className={classes.description} variant="caption">
            You seem to be lost. The page you're looking for does not exist.
          </Typography>
          <Button
            onClick={() => history.push('/')}
          >
            <Typography className={classes.info} variant="subheading">
              Return to home
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </div>
);

export default compose(
  withStyles(styles),
  withRouter,
)(Oops);