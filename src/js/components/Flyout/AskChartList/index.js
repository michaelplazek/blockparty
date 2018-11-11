import React from "react";
import { compose, withHandlers } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";

import Flyout from "../index";
import PostList from "../../PostList";
import Grid from "@material-ui/core/Grid/Grid";

import {
  selectChartAsks, selectFormattedFilterPrice
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

const AskChartList = ({
  classes,
  onSubmit,
  setLayerOpen,
  asks,
  price
}) => (
  <Flyout
    onClose={() => {
      setLayerOpen(false);
    }}
    size={8}
  >
    <Grid className={classes.root}>
        <Typography variant='headline'>
          Asks under {price}
        </Typography>
      <PostList
        items={asks}
        type='ASK'
      />
    </Grid>
  </Flyout>
);

const propMap = {
  asks: selectChartAsks,
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
    handleClick: () => () => {

    }
  }),
  withHandlers({

  })
)(AskChartList);