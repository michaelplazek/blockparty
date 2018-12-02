import React from "react";
import {compose, withHandlers} from "recompose";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";
import Flyout from "../index";

import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";
import {
  selectLayerOpen, selectTransaction, selectTransactionId,
  selectWindowHeight,
  selectWindowWidth
} from "../../../selectors";
import Grid from "@material-ui/core/Grid/Grid";
import {loadTransaction} from "../../../actions/transactions";
import {selectTransactionDetails} from "./selectors";
import DetailList from "./DetailList";
import ButtonContainer from "./ButtonContainer";

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
  id,
  handleComplete,
  handleCancel
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
      <ButtonContainer
        id={id}
        handleComplete={handleComplete}
        handleCancel={handleCancel}
      />
    </Grid>
  </Flyout>
);

const propMap = {
  open: selectLayerOpen,
  windowHeight: selectWindowHeight,
  windowWidth: selectWindowWidth,
  items: selectTransactionDetails,
  id: selectTransactionId
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
    handleComplete: () => () => {

    },
    handleCancel: () => () => {

    }
  }),
)(TransactionDetails);
