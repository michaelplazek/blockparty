import React from "react";
import { compose, withHandlers } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";

import Grid from "@material-ui/core/Grid/Grid";
import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";

import {
  selectLayerOpen,
  selectOffer,
  selectOfferPostTime, selectOfferTotal,
  selectUserId,
  selectWindowHeight,
  selectWindowWidth
} from "../../../selectors";
import Typography from "@material-ui/core/Typography/Typography";
import numeral from "numeral";
import { USD } from "../../../constants/currency";
import Flyout from "../index";
import Paper from "@material-ui/core/Paper/Paper";
import { getStatusColor } from "../../../utils/status";
import Button from "@material-ui/core/Button/Button";
import {deleteOffer, loadOffersByUser} from "../../../actions/offers";
import {loadMyAsks} from "../../../actions/asks";
import {loadMyBids} from "../../../actions/bids";

const styles = () => ({
  button: {
    marginTop: "10px"
  },
  time: {
    marginTop: "8px"
  },
  paper: {
    margin: "40px 30px 0px 30px",
    padding: "20px",
    cursor: "pointer"
  },
  box: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  coin: {
    margin: "6px 0px 0px 6px"
  },
  rate: {
    margin: "3px 0px 0px 3px"
  },
  bid: {
    position: "relative",
    top: "3px",
    marginRight: "3px"
  }
});

const OfferDetails = ({
  classes,
  setLayerOpen,
  windowWidth,
  windowHeight,
  offer,
  open,
  time,
  handleDelete,
  total
}) => (
  <Flyout
    onClose={() => {
      setLayerOpen(false);
    }}
    onBackdropClick={() => {
      setLayerOpen(false);
    }}
    size={8}
    open={open}
    title="Offer Details"
  >
    <Grid container direction="column">
      <Grid item>
        <Paper className={classes.paper}>
          <Grid container className={classes.box}>
            <Grid item>
              <Grid container direction="row">
                <Grid className={classes.bid} item>
                  <Typography variant="title">
                    {offer.bid ? "Sell" : "Buy"}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="headline">{offer.volume}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subheading" className={classes.coin}>
                    {offer.coin}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row">
                <Grid item>
                  <Typography variant="subheading">
                    at {numeral(offer.price).format(USD)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.rate} variant="caption">
                    /{offer.coin}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subheading">
                for {total}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                style={getStatusColor(offer.status)}
                className={classes.rate}
                variant="caption"
              >
                {offer.status}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <Grid
          direction="column"
          className={classes.footer}
          alignItems="center"
          container
        >
          <div className={classes.button}>
            <Button
              variant="contained"
              disabled={offer.status === "ACCEPTED"}
              onClick={() => handleDelete(offer._id)}
            >
              Delete Offer
            </Button>
          </div>
          <Typography className={classes.time}>Posted {time}</Typography>
        </Grid>
      </Grid>
    </Grid>
  </Flyout>
);

const propMap = {
  open: selectLayerOpen,
  userId: selectUserId,
  total: selectOfferTotal,
  offer: selectOffer,
  windowHeight: selectWindowHeight,
  windowWidth: selectWindowWidth,
  time: selectOfferPostTime
};

const actionMap = {
  setLayerOpen: setLayerOpenAction,
  deleteOffer,
  loadOffersByUser,
  loadMyAsks,
  loadMyBids
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withHandlers({
    handleDelete: ({
      deleteOffer,
      loadOffersByUser,
      userId,
      setLayerOpen,
      loadMyAsks,
      loadMyBids
    }) => (id) => {
      deleteOffer(id).then(() => {
        loadOffersByUser(userId);
        loadMyBids(userId);
        loadMyAsks(userId);
      });
      setLayerOpen(false);
    }
  }),
)(OfferDetails);
