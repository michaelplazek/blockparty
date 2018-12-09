import React from "react";
import { compose, withHandlers } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";

import Flyout from "../index";
import PostList from "./PostList";
import Grid from "@material-ui/core/Grid/Grid";

import {
  selectFilterType,
  selectFormattedFilterPrice
} from "../../../selectors";
import {
  createAsk as createAskAction,
  loadMyAsks as loadMyAsksAction
} from "../../../actions/asks";
import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";
import { resetAsk as resetAskAction } from "../../../actions/createAsk";
import PostFilters from "./PostFilters";
import {selectListItems} from "./selectors";

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  },
  filters: {
    paddingTop: "1.5em"
  }
});

const ChartList = ({
                     classes,
                     onSubmit,
                     setLayerOpen,
                     items,
                     price,
  type
}) => (
  <Flyout
    onClose={() => {
      setLayerOpen(false);
    }}
    size={8}
    title={`Price: ${price}`}
  >
    <Grid className={classes.root}>
      <Grid item className={classes.filters}>
        <PostFilters />
      </Grid>
      <Grid item>
        <PostList items={items} type={type} />
      </Grid>
    </Grid>
  </Flyout>
);

const propMap = {
  items: selectListItems,
  price: selectFormattedFilterPrice,
  type: selectFilterType
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
)(ChartList);
