import React from "react";
import { compose, withHandlers } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";

import Grid from "@material-ui/core/Grid/Grid";
import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";

import {
  selectLayerOpen,
  selectOffer,
  selectOfferPostTime,
  selectWindowHeight,
  selectWindowWidth
} from "../../../selectors";
import Typography from "@material-ui/core/Typography/Typography";
import numeral from "numeral";
import { USD } from "../../../constants/currency";
import Flyout from "../index";
import Paper from "@material-ui/core/Paper/Paper";
import {getStatusColor} from "../../../utils/status";

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
  }
});

const OfferDetails = ({
  classes,
  setLayerOpen,
  windowWidth,
  windowHeight,
  offer,
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
    size={8}
    open={open}
    title="Offer Details"
  >
    <Grid container direction="column">
      <Grid item>
        <Paper className={classes.paper}>
          <Grid container className={classes.box}>
            <Grid item>
              <Typography variant="subheading">
                {offer.bid ? "Sell" : "Buy"}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container direction="row">
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
              <Typography style={getStatusColor(offer.status)} className={classes.rate} variant="caption">
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
          <Typography className={classes.time}>Posted {time}</Typography>
        </Grid>
      </Grid>
    </Grid>
  </Flyout>
);

const propMap = {
  open: selectLayerOpen,
  offer: selectOffer,
  windowHeight: selectWindowHeight,
  windowWidth: selectWindowWidth,
  time: selectOfferPostTime
};

const actionMap = {
  setLayerOpen: setLayerOpenAction
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withHandlers({}),
  withHandlers({})
)(OfferDetails);
