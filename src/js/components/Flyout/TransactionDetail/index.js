import React from "react";
import {compose, withHandlers} from "recompose";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";
import Flyout from "../index";

import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";
import {
  selectLayerOpen,
  selectWindowHeight,
  selectWindowWidth
} from "../../../selectors";
import Grid from "@material-ui/core/Grid/Grid";
import {loadTransaction} from "../../../actions/transactions";
import {selectTransactionDetails} from "./selectors";
import DetailList from "./DetailList";

const styles = () => ({
  list: {
    marginTop: "3em"
  }
});

const TransactionDetails = ({
  classes,
  setLayerOpen,
  windowWidth,
  windowHeight,
  ask,
  open,
  items,
}) => (
  <Flyout
    onClose={() => {
      setLayerOpen(false);
    }}
    size={8}
    open={open}
    title="Accepted Offer"
  >
    <Grid className={classes.list} container direction="column">
      <DetailList items={items} />
    </Grid>
  </Flyout>
);

const propMap = {
  open: selectLayerOpen,
  windowHeight: selectWindowHeight,
  windowWidth: selectWindowWidth,
  items: selectTransactionDetails
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
