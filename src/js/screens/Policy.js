import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Typography, Grid, withStyles, Button } from "@material-ui/core";
import withNav from "../HOCs/withNav";
import withMode from "../HOCs/withMode";
import withDarkMode from "../HOCs/withDarkMode";

const styles = () => ({
  root: {
    margin: "2em"
  },
  backButton: {},
  title: {
    marginTop: "1em",
    marginBottom: "1em"
  },
  body1: {},
  body2: {
    marginTop: "0.3em"
  }
});

const Policy = ({ history, classes, isDarkMode }) => (
  <Grid className={classes.root}>
    <Grid container direction="column">
      <Grid item className={classes.backButton}>
        <Button
          onClick={() => history.goBack()}
          color={isDarkMode ? "secondary" : undefined}
        >
          Go Back
        </Button>
      </Grid>
      <Grid item className={classes.title}>
        <Grid container justify="center">
          <Grid item>
            <Typography
              color={isDarkMode ? "textSecondary" : undefined}
              variant="subheading"
            >
              Policy
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid align='center'>
      <Grid item sm={8} lg={6} xl={4}>
        <Typography variant="caption">
          Blockparty is global platform free and open to use. No guarantees are
          expressed or implied with the use of Blockparty. It is your
          responsibility to ensure you are complaint with laws that are
          applicable to you before using Blockparty. By using Blockparty you
          assume any all risks and liabilities. Furthermore, you agree to
          indemnify and hold harmless Blockparty, and all of its affiliates,
          free of any and all liabilities or malfeasance.
        </Typography>
      </Grid>
      <Grid item className={classes.body2} sm={8} lg={6} xl={4}>
        <Typography variant="caption">
          Use common sense. Blockparty is an application for meeting strangers
          on the internet. Plan for the worst. These people are potentially
          dangerous and mean to do you harm. Consider meeting in open public
          places or in the presence of law enforcement. Tell a friend where
          you're going, what you're doing and how long you expect it to take.
          Don't bring more of a currency with you than you absolutely have to.
          Agree beforehand how many people will be coming to the meeting. The
          Blockparty reputation system can be easily gamed; its supposed to act
          only as a bell weather.
        </Typography>
      </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default compose(
  withStyles(styles),
  withRouter,
  withMode,
  withDarkMode,
  withNav,
)(Policy);
