import React from "react";
import { compose, withHandlers, withState } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";

import Grid from "@material-ui/core/Grid/Grid";
import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";
import {
  deleteBid,
  loadMyBids as loadMyBidsAction
} from "../../../actions/bids";
import Modal from "@material-ui/core/Modal/Modal";
import {
  selectBid,
  selectBidPostTime,
  selectLayerOpen,
  selectWindowHeight,
  selectWindowWidth
} from "../../../selectors";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import numeral from "numeral";
import { USD } from "../../../constants/currency";
import { deleteAsk } from "../../../actions/asks";
import Flyout from "../index";

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
  }
});

const DeleteBid = ({
  classes,
  setLayerOpen,
  loadMyBids,
  windowWidth,
  windowHeight,
  bid,
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
          <Grid container direction="row">
            <Grid item>
              <Typography variant="headline">{bid.volume}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subheading" className={classes.coin}>
                {bid.coin}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row">
            <Grid item>
              <Typography variant="subheading">
                at {numeral(bid.price).format(USD)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.rate} variant="caption">
                /{bid.coin}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography>Posted {time}</Typography>
        </Grid>
        <div className={classes.button}>
          <Button
            variant="contained"
            onClick={() => {
              deleteBid(bid._id);
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
  bid: selectBid,
  windowHeight: selectWindowHeight,
  windowWidth: selectWindowWidth,
  time: selectBidPostTime
};

const actionMap = {
  setLayerOpen: setLayerOpenAction,
  loadMyBids: loadMyBidsAction
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withHandlers({}),
  withHandlers({})
)(DeleteBid);
