import React from "react";
import {compose, withHandlers} from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";
import Modal from "../index";

import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";
import {
  selectLayerOpen,
  selectWindowHeight,
  selectWindowWidth
} from "../../../selectors";
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {setRun as setRunAction} from "../../../actions/app";
import {setAppVisited} from "../../../config/tour";

const styles = () => ({
  root: {
    padding: '1.5em',
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
    marginTop: '2em'
  },
  leftButton: {
    marginLeft: '0.25em',
    marginRight: '0.25em'

  },
  rightButton: {
    marginRight: '0.25em',
    marginLeft: '0.25em',
  }
});

const Welcome = ({ setLayerOpen, classes, handleTour, handleSkip }) => (
  <Modal
    onClose={() => {
      setLayerOpen(false);
    }}
    open={open}
    title=""
  >
    <Grid className={classes.root} container direction="column">
      <Grid item className={classes.heading}>
        <Typography variant='title'>Welcome to Blockparty!</Typography>
      </Grid>
      <Grid item className={classes.description}>
        <Typography>
          Blockparty allows you to buy and sell your cryptocurrencies for cash with other local enthusiasts.
        </Typography>
      </Grid>
      <Grid item className={classes.explanation}>
        <Typography>
          To take a tour and see what Blockparty has to offer, click <b>Begin Tour</b>. If you want to just get
          started, click <b>Skip Tour</b>.
        </Typography>
      </Grid>
      <Grid item container className={classes.buttons} justify='space-between'>
        <Grid className={classes.leftButton} item>
          <Button
            variant='contained'
            onClick={handleSkip}
          >
            Skip Tour
          </Button>
        </Grid>
        <Grid className={classes.rightButton} item>
          <Button
            color='primary'
            variant='contained'
            onClick={handleTour}
          >
            Begin Tour
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </Modal>
);

const propMap = {
  open: selectLayerOpen,
  windowHeight: selectWindowHeight,
  windowWidth: selectWindowWidth
};

const actionMap = {
  setLayerOpen: setLayerOpenAction,
  setRun: setRunAction
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withHandlers({
    handleSkip: ({ setRun, setLayerOpen }) => () => {
      setRun(false);
      setAppVisited();
      setLayerOpen(false);
    },
    handleTour: ({ setRun, setLayerOpen }) => () => {
      setRun(true);
      setLayerOpen(false);
    },
  }),
)(Welcome);
