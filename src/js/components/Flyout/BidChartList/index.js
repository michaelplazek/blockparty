import React from "react";
import { compose, withHandlers } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";

import Flyout from "../index";
import PostList from "../../PostList";
import Grid from "@material-ui/core/Grid/Grid";

import {
  selectChartBids,
  selectFormattedFilterPrice
} from "../../../selectors";
import {
  createAsk as createAskAction,
  loadMyAsks as loadMyAsksAction
} from "../../../actions/asks";
import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";
import { resetAsk as resetAskAction } from "../../../actions/createAsk";
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
  root: {
    margin: "30px"
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  }
});

const BidChartList = ({ classes, onSubmit, setLayerOpen, bids, price }) => (
  <Flyout
    onClose={() => {
      setLayerOpen(false);
    }}
    size={8}
  >
    <Grid className={classes.root}>
      <Typography variant="title">Bids under {price}</Typography>
      <PostList items={bids} type="BID" />
    </Grid>
  </Flyout>
);

const propMap = {
  bids: selectChartBids,
  price: selectFormattedFilterPrice
};

const actionMap = {
  createAsk: createAskAction,
  loadMyAsks: loadMyAsksAction,
  setLayerOpen: setLayerOpenAction,
  resetAsk: resetAskAction
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withHandlers({
    handleClick: () => () => {}
  }),
  withHandlers({})
)(BidChartList);
