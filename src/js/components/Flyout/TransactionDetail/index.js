import React from "react";
import {compose, withHandlers} from "recompose";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";
import Flyout from "../index";
import DetailBox from "../../DetailBox";

import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";
import {
  deleteAsk,
  loadMyAsks
} from "../../../actions/asks";
import {
  selectAsk,
  selectAskLoaded,
  selectAskOfferTotal,
  selectAskPostTime,
  selectLayerOpen,
  selectOffers, selectUserId,
  selectWindowHeight,
  selectWindowWidth
} from "../../../selectors";
import OfferWidgetList from "../../OfferWidgetList/index";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import {loadMyBids} from "../../../actions/bids";
import {loadOffersByUser} from "../../../actions/offers";
import {loadTransaction} from "../../../actions/transactions";

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

const TransactionDetails = ({
  classes,
  setLayerOpen,
  windowWidth,
  windowHeight,
  ask,
  open,
}) => (
  <Flyout
    onClose={() => {
      setLayerOpen(false);
    }}
    size={8}
    open={open}
    title="Accepted Offer"
  >
    <Grid container direction="column">

    </Grid>
  </Flyout>
);

const propMap = {
  open: selectLayerOpen,
  windowHeight: selectWindowHeight,
  windowWidth: selectWindowWidth,
};

const actionMap = {
  setLayerOpen: setLayerOpenAction,
  loadTransaction
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withRouter,
  withHandlers({
  }),
)(TransactionDetails);
