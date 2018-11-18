import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";
import Flyout from "../index";
import DetailBox from "../../DetailBox";

import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";
import {
  deleteBid,
  loadMyBids as loadMyBidsAction
} from "../../../actions/bids";
import {
  selectBid,
  selectBidLoaded,
  selectBidOfferTotal,
  selectBidPostTime,
  selectLayerOpen,
  selectOffers,
  selectWindowHeight,
  selectWindowWidth
} from "../../../selectors";
import OfferWidgetList from "../../OfferWidgetList/index";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";

const styles = () => ({
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
  time: {
    marginTop: "6px"
  }
});

const DeleteBid = ({
  classes,
  setLayerOpen,
  windowWidth,
  windowHeight,
  bid,
  open,
  offers,
  time,
  history
}) => (
  <Flyout
    onClose={() => {
      setLayerOpen(false);
    }}
    size={8}
    open={open}
    title="Bid Details"
  >
    <Grid container direction="column">
      <Grid item>
        <DetailBox
          post={bid}
          time={time}
          onClick={() => {
            history.push(`/bid?${bid._id}`);
          }}
        />
      </Grid>
      <Grid item>
        <OfferWidgetList offers={offers} post={bid} />
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
              disabled={offers.length > 0}
              onClick={() => {
                deleteBid(bid._id);
                setLayerOpen(false);
              }}
            >
              Delete Bid
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
  bid: selectBid,
  bidLoaded: selectBidLoaded,
  offers: selectOffers,
  total: selectBidOfferTotal,
  windowHeight: selectWindowHeight,
  windowWidth: selectWindowWidth,
  time: selectBidPostTime
};

const actionMap = {
  setLayerOpen: setLayerOpenAction,
  loadMyBids: loadMyBidsAction,
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withRouter
)(DeleteBid);
