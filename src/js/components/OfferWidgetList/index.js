import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { withHandlers, compose } from "recompose";
import mapper from "../../utils/connect";

import OfferWidget from "../OfferWidget/index";
import { getTotal } from "../Flyout/AskDetails/utils";
import Grid from "@material-ui/core/Grid/Grid";
import Tile from "../Tile";
import {
  createTransaction,
  loadTransactions
} from "../../actions/transactions";
import { loadOffersByUser, patchOffer } from "../../actions/offers";
import { setLayerOpen } from "../../actions/layers";
import { selectUserId, selectUsername } from "../../selectors";
import { loadMyAsks } from "../../actions/asks";
import { loadMyBids } from "../../actions/bids";
import {setNotification} from "../../actions/app";

const OfferWidgetList = ({ offers, post, handleAccept, handleDecline }) => (
  <Tile title="Offers" count={offers.length}>
    <Grid container direction="column">
      {offers.map((item, index) => (
        <OfferWidget
          key={`${item.volume}-${index}`}
          total={getTotal(post.price, item.volume)}
          volume={item.volume}
          price={post.price}
          coin={post.coin}
          time={moment(item.timestamp).fromNow()}
          handleAccept={() => handleAccept(item)}
          handleDecline={() => handleDecline(item)}
        />
      ))}
    </Grid>
  </Tile>
);

OfferWidgetList.propTypes = {
  offers: PropTypes.array.isRequired
};

const propMap = {
  userId: selectUserId,
  username: selectUsername
};

const actionMap = {
  loadMyAsks,
  loadMyBids,
  loadTransactions,
  setLayerOpen,
  createTransaction,
  loadOffersByUser,
  patchOffer
};

export default compose(
  mapper(propMap, actionMap),
  withHandlers({
    handleAccept: ({
      userId,
      setLayerOpen,
      username,
      loadTransactions,
      loadMyBids,
      loadMyAsks,
      createTransaction,
      loadOffersByUser
    }) => ({ _id, coin, price, owner }) => {
      createTransaction(_id, username).then(() => {
        loadTransactions(userId);
        loadOffersByUser(userId);
        loadMyAsks(userId);
        loadMyBids(userId);
        setLayerOpen(false);
        const data = {
          title: "Your offer was accepted!",
          body: `${username} accepted your offer of $${price} worth of ${coin}. Time to meet up!`,
          owner,
        };
        setNotification(data);
      });
    },
    handleDecline: ({
      userId,
      setLayerOpen,
      loadOffersByUser,
      loadTransactions,
      loadMyBids,
      loadMyAsks,
      patchOffer,
      username,
    }) => ({ _id, coin, price, owner }) => {
      const items = { status: "DECLINED" };
      patchOffer(_id, items).then(() => {
        loadTransactions(userId);
        loadOffersByUser(userId);
        loadMyAsks(userId);
        loadMyBids(userId);
        setLayerOpen(false);
        const data = {
          title: "Your offer was rejected",
          body: `${username} rejected your offer of $${price} worth of ${coin}.`,
          owner,
        };
        setNotification(data);
      });
    }
  })
)(OfferWidgetList);
