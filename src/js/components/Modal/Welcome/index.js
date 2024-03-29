import React from "react";
import { compose, withHandlers } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";
import Modal from "../index";

import { setModalOpen as setModalOpenAction } from "../../../actions/layers";
import {
  selectModalOpen, selectUserId,
  selectWindowHeight,
  selectWindowWidth
} from "../../../selectors";
import Grid from "@material-ui/core/Grid/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { setRun as setRunAction } from "../../../actions/app";
import { setAppVisited } from "../../../config/tour";

const styles = () => ({
  root: {
    padding: "1.5em"
  },
  heading: {
    marginTop: "0.5em"
  },
  description: {
    marginTop: "1.5em"
  },
  explanation: {
    marginTop: "0.5em"
  },
  buttons: {
    marginTop: "2em"
  },
  leftButton: {
    marginLeft: "0.25em"
  },
  rightButton: {
    marginRight: "0.25em"
  }
});

const Welcome = ({ classes, handleTour, handleSkip }) => (
  <Modal onClose={handleSkip} open={open} title="">
    <Grid className={classes.root} container direction="column">
      <Grid item className={classes.heading}>
        <Typography variant="title">Welcome to Blockparty!</Typography>
      </Grid>
      <Grid item className={classes.description}>
        <Typography>
          Blockparty allows you to buy and sell your cryptocurrencies for cash
          with other local enthusiasts.
        </Typography>
      </Grid>
      <Grid item className={classes.explanation}>
        <Typography>
          To take a tour and see what Blockparty has to offer, click{" "}
          <b>Begin</b>. If you want to just get started, click <b>Skip Tour</b>.
        </Typography>
      </Grid>
      <Grid item container className={classes.buttons} justify="space-between">
        <Grid className={classes.leftButton} item>
          <Button variant="contained" onClick={handleSkip}>
            Skip Tour
          </Button>
        </Grid>
        <Grid className={classes.rightButton} item>
          <Button color="primary" variant="contained" onClick={handleTour}>
            Begin
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </Modal>
);

const propMap = {
  open: selectModalOpen,
  windowHeight: selectWindowHeight,
  windowWidth: selectWindowWidth,
  userId: selectUserId
};

const actionMap = {
  setModalOpen: setModalOpenAction,
  setRun: setRunAction
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withHandlers({
    handleSkip: ({ setRun, setModalOpen, userId }) => () => {
      setAppVisited(userId)
        .then(() => {
          setRun(false);
          setModalOpen(false);
        });
    },
    handleTour: ({ setRun, setModalOpen }) => () => {
      setRun(true);
      setModalOpen(false);
    }
  })
)(Welcome);
