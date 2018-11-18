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

const styles = theme => ({
  paper: {
    width: "100%",
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
  status: {
    marginTop: "2px"
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
    size={5}
    open={open}
    title="Offer Details"
  >
    <div
      style={{
        position: "absolute",
        top: `${windowHeight / 3}px`,
        left: "10%",
        right: "10%",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Grid container className={classes.paper}>
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
          <Typography>
            Offered {time} to {offer.owner}
          </Typography>
        </Grid>
        <Grid className={classes.status} item>
          <Typography>{offer.status}</Typography>
        </Grid>
      </Grid>
    </div>
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
