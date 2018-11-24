import React from "react";
import { compose, withHandlers } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";

import Flyout from "../index";
import PostList from "../../PostList";
import Grid from "@material-ui/core/Grid/Grid";

import {selectFormattedFilterPrice} from "../../../selectors";
import {selectChartBids} from "../../ComparisonChart/selectors"
import {
  createAsk as createAskAction,
  loadMyAsks as loadMyAsksAction
} from "../../../actions/asks";
import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";
import { resetAsk as resetAskAction } from "../../../actions/createAsk";

const styles = theme => ({
  root: {
    margin: "20px 10px 10px 10px"
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
    title={`Bids under ${price}`}
  >
    <Grid className={classes.root}>
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
