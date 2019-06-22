import React, { Fragment } from "react";
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
import {
  setLayerOpen,
  setModal as setModalAction,
  setModalOpen as setModalOpenAction
} from "../../actions/layers";
import { selectModal, selectUserId, selectUsername } from "../../selectors";
import { loadMyAsks } from "../../actions/asks";
import { loadMyBids } from "../../actions/bids";
import { setNotification } from "../../actions/app";
import { loadUser as loadUserAction } from "../../actions/users";
import UserInfo from "../Modal/UserInfo";
import {COLBALT, WHITE} from "../../constants/colors";

const OfferWidgetList = ({
  offers,
  post,
  modal,
  handleAccept,
  handleDecline,
  handleUserClick,
  isDarkMode
}) => (
  <Tile
    color={isDarkMode ? COLBALT : undefined}
    textColor={isDarkMode ? 'textSecondary' : undefined}
    title="Offers"
    count={offers.length}
  >
    <Grid container direction="column">
      {offers.map((item, index) => (
        <Fragment key={`${item.username}-${item.timestamp}`}>
          {modal === "VIEW_USER_DETAILS" && <UserInfo id={item.userId} />}
          <OfferWidget
            isDarkMode={isDarkMode}
            key={`${item.volume}-${index}`}
            total={getTotal(post.price, item.volume)}
            volume={item.volume}
            price={post.price}
            coin={post.coin}
            username={item.username}
            onUserClick={handleUserClick}
            time={moment(item.timestamp).fromNow()}
            handleAccept={() => handleAccept(item)}
            handleDecline={() => handleDecline(item)}
          />
        </Fragment>
      ))}
    </Grid>
  </Tile>
);

OfferWidgetList.propTypes = {
  offers: PropTypes.array.isRequired
};

const propMap = {
  userId: selectUserId,
  username: selectUsername,
  modal: selectModal
};

const actionMap = {
  loadMyAsks,
  loadMyBids,
  loadTransactions,
  setLayerOpen,
  createTransaction,
  loadOffersByUser,
  patchOffer,
  loadUser: loadUserAction,
  setModal: setModalAction,
  setModalOpen: setModalOpenAction
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
    }) => ({ _id, coin, price, owner, username: offerer }) => {
      createTransaction(_id, username).then(() => {
        loadTransactions(userId);
        loadOffersByUser(userId);
        loadMyAsks(userId);
        loadMyBids(userId);
        setLayerOpen(false);
        const data = {
          title: "Your offer was accepted!",
          body: `${username} accepted your offer of $${price} worth of ${coin}. Time to meet up!`,
          owner: offerer
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
      username
    }) => ({ _id, coin, price, owner, username: offerer }) => {
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
          owner: offerer
        };
        setNotification(data);
      });
    },
    handleUserClick: ({ setModal, setModalOpen }) => e => {
      setModal("VIEW_USER_DETAILS");
      setModalOpen(true);
      e.stopPropagation();
    }
  })
)(OfferWidgetList);
