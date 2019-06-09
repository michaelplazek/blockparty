import React from "react";
import { compose, lifecycle } from "recompose";
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

const Welcome = ({ setLayerOpen, classes }) => (
  <Modal
    onClose={() => {
      setLayerOpen(false);
    }}
    open={open}
    title=""
  >
    <Grid className={classes.root} container direction="column">
      <Grid item className={classes.items}>
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
          >
            Skip Tour
          </Button>
        </Grid>
        <Grid className={classes.rightButton} item>
          <Button
            color='primary'
            variant='contained'
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
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),

)(Welcome);
