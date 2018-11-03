import React from "react";
import { compose, withHandlers, withState } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import numeral from 'numeral';
import mapper from "../../../utils/connect";
import Flyout from "../index";

import Grid from "@material-ui/core/Grid/Grid";
import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";
import {
  deleteAsk,
  loadMyAsks as loadMyAsksAction
} from "../../../actions/asks";
import Modal from "@material-ui/core/Modal/Modal";
import {
  selectAsk, selectAskPostTime,
  selectLayerOpen,
  selectWindowHeight,
  selectWindowWidth
} from "../../../selectors";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import {USD} from "../../../constants/currency";

const styles = theme => ({
  paper: {
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing.unit * 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  button: {
    marginTop: "10px"
  },
  coin: {
    margin: "6px 0px 0px 6px"
  },
  rate: {
    margin: "3px 0px 0px 3px"
  },
  time: {
    marginTop: "4px"
  }
});

const DeleteAsk = ({
  classes,
  setLayerOpen,
  loadMyAsks,
  windowWidth,
  windowHeight,
  ask,
  open,
  time
}) => (
  <Flyout
    onClose={() => {
      setLayerOpen(false);
    }}
    onBackdropClick={() => {
      setLayerOpen(false);
    }}
    size={3}
    open={open}
  >
    <div
      style={{
        position: "absolute",
        top: `${windowHeight / 3}px`,
        left: "20%",
        right: "20%",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Grid container className={classes.paper}>
        <Grid item>
          <Grid container direction='row'>
            <Grid item>
              <Typography variant="headline">{ask.volume}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subheading" className={classes.coin}>{ask.coin}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction='row'>
            <Grid item>
              <Typography variant="subheading">
                at {numeral(ask.price).format(USD)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.rate} variant="caption">
                /{ask.coin}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.time}>
          <Typography>Posted {time}</Typography>
        </Grid>
        <div className={classes.button}>
          <Button
            variant="contained"
            onClick={() => {
              deleteAsk(ask._id);
              setLayerOpen(false);
            }}
          >
            Delete
          </Button>
        </div>
      </Grid>
    </div>
  </Flyout>
);

const propMap = {
  open: selectLayerOpen,
  ask: selectAsk,
  windowHeight: selectWindowHeight,
  windowWidth: selectWindowWidth,
  time: selectAskPostTime
};

const actionMap = {
  setLayerOpen: setLayerOpenAction,
  loadMyAsks: loadMyAsksAction
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withHandlers({}),
  withHandlers({})
)(DeleteAsk);
