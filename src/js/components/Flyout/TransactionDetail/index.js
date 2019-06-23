import React from "react";
import { compose, withHandlers } from "recompose";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";
import Flyout from "../index";

import {
  setLayerOpen as setLayerOpenAction,
  setModal as setModalAction,
  setModalOpen as setModalOpenAction
} from "../../../actions/layers";
import {
  selectIsDarkMode,
  selectLayerOpen,
  selectModal,
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
import { Typography } from "@material-ui/core";
import ConfirmCancel from "../../Modal/ConfirmCancel";

const styles = () => ({
  list: {
    marginTop: "3em"
  },
  description: {
    margin: "0em 1.5em 1em 1.5em"
  }
});

const TransactionDetails = ({
  classes,
  items,
  handleComplete,
  handleCancel,
  completeButtonIsDisabled,
  modal,
  openConfirm,
  isDarkMode
}) => (
  <Flyout size={8} title="Accepted Offer">
    {modal === "CONFIRM_CANCEL" && (
      <ConfirmCancel handleCancel={handleCancel} />
    )}
    <Grid className={classes.list} container direction="column">
      <Grid className={classes.description} item>
        <Typography variant="caption">
          After reviewing the transaction details, contact the other party. Once
          the transaction is complete, click <b>Mark As Completed</b>. Once both
          parties have marked the transaction as complete, your reputation will
          be updated and the transaction will be considered completed.
        </Typography>
      </Grid>
      <DetailList isDarkMode={isDarkMode} items={items} />
      <ButtonContainer
        disabled={completeButtonIsDisabled}
        handleComplete={handleComplete}
        handleCancel={openConfirm}
        isDarkMode={isDarkMode}
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
  username: selectUsername,
  modal: selectModal,
  isDarkMode: selectIsDarkMode
};

const actionMap = {
  setLayerOpen: setLayerOpenAction,
  loadTransaction,
  completeTransaction,
  loadTransactions,
  loadMyAsks,
  loadMyBids,
  loadOffersByUser,
  cancelTransaction,
  setModal: setModalAction,
  setModalOpen: setModalOpenAction
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
      setModalOpen,
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
        setModalOpen(false);
        setLayerOpen(false);
        const data = {
          title: "Offer marked as cancelled",
          body: `${username} cancelled your transaction for $${price} worth of ${coin}.`,
          owner: username === buyer ? seller : buyer
        };
        setNotification(data);
      });
    },
    openConfirm: ({ setModal, setModalOpen }) => () => {
      setModal("CONFIRM_CANCEL");
      setModalOpen(true);
    }
  })
)(TransactionDetails);
