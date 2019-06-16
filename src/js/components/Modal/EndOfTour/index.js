import React from "react";
import { withRouter } from "react-router";
import { compose, withHandlers } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";
import Modal from "../index";

import { setModalOpen as setModalOpenAction } from "../../../actions/layers";
import { selectWindowHeight, selectWindowWidth } from "../../../selectors";
import Grid from "@material-ui/core/Grid/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {
  setNavIndex as setNavIndexAction,
  setRun as setRunAction
} from "../../../actions/app";
import { setAppVisited } from "../../../config/tour";

const styles = () => ({
  root: {
    padding: "1.5em"
  },
  description: {
    marginTop: "2.2em"
  },
  buttons: {
    marginTop: "2em"
  }
});

const EndOfTour = ({ classes, handleSubmit, handleClose }) => (
  <Modal onClose={handleClose} title="">
    <Grid className={classes.root} container direction="column">
      <Grid item className={classes.items}>
        <Typography variant="title">Thanks for taking the tour!</Typography>
      </Grid>
      <Grid item className={classes.description}>
        <Typography>
          Now that you you've seen all that Blockparty can do, feel free to get
          started. Click <b>Enter Blockparty</b> to begin.
        </Typography>
      </Grid>
      <Grid item container className={classes.buttons} justify="center">
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Enter Blockparty
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </Modal>
);

const propMap = {
  windowHeight: selectWindowHeight,
  windowWidth: selectWindowWidth
};

const actionMap = {
  setModalOpen: setModalOpenAction,
  setRun: setRunAction,
  setNavIndex: setNavIndexAction
};

export default compose(
  withRouter,
  mapper(propMap, actionMap),
  withStyles(styles),
  withHandlers({
    handleSubmit: ({ setRun, setModalOpen, setNavIndex, history }) => () => {
      setRun(false);
      setModalOpen(false);
      setAppVisited();
      setNavIndex(0);
      history.push("/");
    },
    handleClose: ({ setRun, setModalOpen }) => () => {
      setRun(false);
      setModalOpen(false);
      setAppVisited();
    }
  })
)(EndOfTour);
