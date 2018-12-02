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

const OfferWidgetList = ({ offers, post, handleAccept, handleDecline }) => (
  <Tile color="#f2f2f2" title="Offers" count={offers.length}>
    <Grid container direction="column">
      {offers.map((item, index) => (
        <OfferWidget
          key={`${item.volume}-${index}`}
          total={getTotal(post.price, item.volume)}
          volume={item.volume}
          price={post.price}
          coin={post.coin}
          time={moment(item.timestamp).fromNow()}
          handleAccept={() => handleAccept(item._id)}
          handleDecline={() => handleDecline(item._id)}
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
    }) => id => {
      createTransaction(id, username).then(() => {
        loadTransactions(userId);
        loadOffersByUser(userId);
        loadMyAsks(userId);
        loadMyBids(userId);
        setLayerOpen(false);
      });
    },
    handleDecline: ({
      userId,
      setLayerOpen,
      loadOffersByUser,
      loadTransactions,
      loadMyBids,
      loadMyAsks,
      patchOffer
    }) => id => {
      const items = { status: "DECLINED" };
      patchOffer(id, items).then(() => {
        loadTransactions(userId);
        loadOffersByUser(userId);
        loadMyAsks(userId);
        loadMyBids(userId);
        setLayerOpen(false);
      });
    }
  })
)(OfferWidgetList);
