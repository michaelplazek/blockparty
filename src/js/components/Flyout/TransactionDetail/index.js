import React from "react";
import { compose, withHandlers } from "recompose";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";
import Flyout from "../index";

import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";
import {
  selectLayerOpen,
  selectTransactionBuyerUsername,
  selectTransactionCoin,
  selectTransactionId,
  selectTransactionPrice,
  selectTransactionSellerUsername,
  selectUserId,
  selectUsername,
  selectWindowHeight,
  selectWindowWidth
} from "../../../selectors";
import Grid from "@material-ui/core/Grid/Grid";
import {
  cancelTransaction,
  completeTransaction,
  loadTransaction,
  loadTransactions
} from "../../../actions/transactions";
import {
  selectCompleteButtonIsDisabled,
  selectTransactionDetails
} from "./selectors";
import DetailList from "./DetailList";
import ButtonContainer from "./ButtonContainer";
import { loadMyAsks } from "../../../actions/asks";
import { loadMyBids } from "../../../actions/bids";
import { loadOffersByUser } from "../../../actions/offers";
import { setNotification } from "../../../actions/app";

const styles = () => ({
  list: {
    marginTop: "3em"
  }
});

const TransactionDetails = ({
  classes,
  setLayerOpen,
  open,
  items,
  handleComplete,
  handleCancel,
  completeButtonIsDisabled
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
        disabled={completeButtonIsDisabled}
        handleComplete={handleComplete}
        handleCancel={handleCancel}
      />
    </Grid>
  </Flyout>
);

const propMap = {
  open: selectLayerOpen,
  userId: selectUserId,
  windowHeight: selectWindowHeight,
  windowWidth: selectWindowWidth,
  items: selectTransactionDetails,
  id: selectTransactionId,
  price: selectTransactionPrice,
  coin: selectTransactionCoin,
  buyer: selectTransactionBuyerUsername,
  seller: selectTransactionSellerUsername,
  completeButtonIsDisabled: selectCompleteButtonIsDisabled,
  username: selectUsername
};

const actionMap = {
  setLayerOpen: setLayerOpenAction,
  loadTransaction,
  completeTransaction,
  loadTransactions,
  loadMyAsks,
  loadMyBids,
  loadOffersByUser,
  cancelTransaction
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withRouter,
  withHandlers({
    handleComplete: ({
      userId,
      id,
      completeTransaction,
      setLayerOpen,
      loadTransactions,
      loadMyAsks,
      loadMyBids,
      loadOffersByUser,
      buyer,
      seller,
      username,
      coin,
      price
    }) => () => {
      completeTransaction(id, userId).then(() => {
        loadTransactions(userId);
        loadMyAsks(userId);
        loadMyBids(userId);
        loadOffersByUser(userId);
        setLayerOpen(false);
        const data = {
          title: "Offer marked as complete!",
          body: `${username} marked your transaction for $${price} worth of ${coin} as complete.`,
          owner: username === buyer ? seller : buyer
        };
        setNotification(data);
      });
    },
    handleCancel: ({
      id,
      userId,
      cancelTransaction,
      setLayerOpen,
      loadTransactions,
      loadMyAsks,
      loadMyBids,
      loadOffersByUser,
      buyer,
      seller,
      username,
      coin,
      price
    }) => () => {
      cancelTransaction(id).then(() => {
        loadTransactions(userId);
        loadMyAsks(userId);
        loadMyBids(userId);
        loadOffersByUser(userId);
        setLayerOpen(false);
        const data = {
          title: "Offer marked as cancelled",
          body: `${username} cancelled your transaction for $${price} worth of ${coin}.`,
          owner: username === buyer ? seller : buyer
        };
        setNotification(data);
      });
    }
  })
)(TransactionDetails);
