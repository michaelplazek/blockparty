import React from "react";
import { withRouter } from "react-router";
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
import {setNavIndex as setNavIndexAction, setRun as setRunAction} from "../../../actions/app";
import { setAppVisited } from "../../../config/tour";

const styles = () => ({
  root: {
    padding: '1.5em',
  },
  description: {
    marginTop: "2.2em"
  },
  explanation: {
    marginTop: "0.5em"
  },
  buttons: {
    marginTop: '2em'
  },
  leftButton: {
    marginLeft: '0.5em'
  },
  rightButton: {
    marginRight: '0.5em'
  }
});

const EndOfTour = ({ setLayerOpen, classes, handleSubmit }) => (
  <Modal
    onClose={() => {
      setLayerOpen(false);
    }}
    open={open}
    title=""
  >
    <Grid className={classes.root} container direction="column">
      <Grid item className={classes.items}>
        <Typography variant='title'>Thanks for taking the tour!</Typography>
      </Grid>
      <Grid item className={classes.description}>
        <Typography>
          Now that you you've seen all that Blockparty can do, feel free to get started.
          Click <b>Enter Blockparty</b> to begin.
        </Typography>
      </Grid>
      <Grid item container className={classes.buttons} justify='center'>
        <Grid className={classes.leftButton} item>
          <Button
            variant='contained'
            color='primary'
            onClick={handleSubmit}
          >
            Enter Blockparty
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
  setRun: setRunAction,
  setNavIndex: setNavIndexAction,
};

export default compose(
  withRouter,
  mapper(propMap, actionMap),
  withStyles(styles),
  withHandlers({
    handleSubmit: ({ setRun, setLayerOpen, setNavIndex, history }) => () => {
      setRun(false);
      setLayerOpen(false);
      setAppVisited();
      setNavIndex(0);
      history.push("/");
    },
  }),
)(EndOfTour);
