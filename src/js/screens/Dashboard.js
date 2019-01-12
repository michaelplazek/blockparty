import React from "react";
import { compose, withState, lifecycle, withHandlers } from "recompose";
import mapper from "../utils/connect";

import Tile from "../components/Tile";
import ListTile from "../components/ListTile/index";
import TransactionTile from "../components/TransactionTile/index";

import {
  setLayer as setLayerAction,
  setLayerOpen as setLayerOpenAction
} from "../actions/layers";
import {
  loadAsk as loadAskAction,
  loadMyAsks as loadMyAsksAction,
  unloadAsk as unloadAskAction
} from "../actions/asks";
import {
  loadBid as loadBidAction,
  loadMyBids as loadMyBidsAction,
  unloadBid as unloadBidAction
} from "../actions/bids";

import PageHeader from "../components/PageHeader";
import OfferTile from "../components/OfferTile";
import AddIcon from "@material-ui/icons/Add";
import CreateAsk from "../components/Flyout/CreateAsk/index";
import CreateBid from "../components/Flyout/CreateBid/index";
import DeleteAsk from "../components/Flyout/AskDetails";
import DeleteBid from "../components/Flyout/BidDetails";

import withDimensions from "../HOCs/withDimensions";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  selectDashboardLoaded,
  selectLayer,
  selectMyAsks,
  selectMyBids,
  selectMyOffers,
  selectNavHeight,
  selectNumberOfMyAsks,
  selectNumberOfMyBids,
  selectNumberOfMyOffers,
  selectNumberOfMyTransactions,
  selectTransactionsForDisplay,
  selectUserId,
  selectUsername
} from "../selectors";
import Grow from "@material-ui/core/Grow/Grow";
import withLoader from "../HOCs/withLoader";
import {
  loadOffer,
  loadOffersByAsk,
  loadOffersByBid,
  loadOffersByUser,
  unloadOffers
} from "../actions/offers";
import OfferDetails from "../components/Flyout/OfferDetails";
import { loadTransaction, loadTransactions } from "../actions/transactions";
import TransactionDetails from "../components/Flyout/TransactionDetail";
import withLocation from "../HOCs/withLocation";
import {loadLastPrice} from "../actions/metrics";
import {setBidPrice} from "../actions/createBid";
import {setAskPrice} from "../actions/createAsk";

const styles = () => ({
  root: {
    paddingBottom: "50px"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column"
  },
  buttons: {
    margin: "6px"
  }
});

const Dashboard = ({
  setLayerOpen,
  setLayer,
  classes,
  layer,
  showButtons,
  setShowButtons,
  numberOfBids,
  numberOfAsks,
  numberOfOffers,
  numberOfTransactions,
  myBids,
  myAsks,
  myOffers,
  myTransactions,
  loadAsk,
  loadBid,
  loadOffer,
  unloadAsk,
  unloadBid,
  footerHeight,
  unloadOffers,
  loadOffersByAsk,
  loadOffersByBid,
  handleAskClick,
  handleBidClick,
  handleOfferClick,
  handleTransactionClick,
  loadLastPrice,
  setAskPrice,
  setBidPrice,
}) => (
  <div className={classes.root}>
    {layer === "CREATE_ASK" && <CreateAsk />}
    {layer === "CREATE_BID" && <CreateBid />}
    {layer === "DELETE_ASK" && <DeleteAsk />}
    {layer === "DELETE_BID" && <DeleteBid />}
    {layer === "VIEW_OFFER" && <OfferDetails />}
    {layer === "VIEW_TRANSACTION" && <TransactionDetails />}
    <PageHeader leftHandLabel="Dashboard" />
    <Tile
      title="Accepted Offers"
      count={numberOfTransactions}
      description="time to meet up"
    >
      {myTransactions.map(item => (
        <TransactionTile
          item={item}
          key={item._id}
          onClick={() => handleTransactionClick(item)}
        />
      ))}
    </Tile>
    <Tile
      title="My Offers"
      count={numberOfOffers}
      description="offers I've made"
    >
      {myOffers.map(item => (
        <OfferTile
          item={item}
          key={item._id}
          onClick={() => handleOfferClick(item)}
        />
      ))}
    </Tile>
    <Tile title="My Asks" count={numberOfAsks} description="looking to sell">
      {myAsks.map(item => (
        <ListTile
          item={item}
          key={item._id}
          onClick={() => handleAskClick(item)}
        />
      ))}
    </Tile>
    <Tile title="My Bids" count={numberOfBids} description="looking to buy">
      {myBids.map(item => (
        <ListTile
          item={item}
          key={item._id}
          onClick={() => handleBidClick(item)}
        />
      ))}
    </Tile>
    <div
      style={{
        position: "fixed",
        right: "2em",
        bottom: `${footerHeight + 20}px`,
        zIndex: 100
      }}
    >
      {showButtons && (
        <Grow in={showButtons}>
          <div
            className={classes.buttonContainer}
            onMouseLeave={() => setTimeout(() => setShowButtons(false), 3000)}
            onMouseOver={() => setShowButtons(true)}
          >
            <Button
              className={classes.buttons}
              variant="extendedFab"
              onClick={() => {
                loadLastPrice("BTC")
                  .then(response => setBidPrice(response.data));
                setLayer("CREATE_BID");
                setLayerOpen(true);
              }}
            >
              Create new bid
            </Button>
            <Button
              className={classes.buttons}
              variant="extendedFab"
              onClick={() => {
                loadLastPrice("BTC")
                  .then(response => setAskPrice(response.data));
                setLayer("CREATE_ASK");
                setLayerOpen(true);
              }}
            >
              Create new ask
            </Button>
          </div>
        </Grow>
      )}

      {!showButtons && (
        <Button
          className={classes.buttonContainer}
          color="primary"
          variant="fab"
          onClick={() => setShowButtons(true)}
        >
          <AddIcon />
        </Button>
      )}
    </div>
  </div>
);

const propMap = {
  layer: selectLayer,
  userId: selectUserId,
  owner: selectUsername,
  myBids: selectMyBids,
  myAsks: selectMyAsks,
  myOffers: selectMyOffers,
  myTransactions: selectTransactionsForDisplay,
  numberOfBids: selectNumberOfMyBids,
  numberOfAsks: selectNumberOfMyAsks,
  numberOfOffers: selectNumberOfMyOffers,
  numberOfTransactions: selectNumberOfMyTransactions,
  loaded: selectDashboardLoaded,
  footerHeight: selectNavHeight
};

const actionMap = {
  setLayer: setLayerAction,
  setLayerOpen: setLayerOpenAction,
  loadMyAsks: loadMyAsksAction,
  loadMyBids: loadMyBidsAction,
  loadAsk: loadAskAction,
  loadBid: loadBidAction,
  unloadAsk: unloadAskAction,
  unloadBid: unloadBidAction,
  loadOffersByUser,
  loadOffer,
  loadOffersByAsk,
  unloadOffers,
  loadOffersByBid,
  loadTransactions,
  loadTransaction,
  loadLastPrice,
  setAskPrice,
  setBidPrice,
};

export default compose(
  mapper(propMap, actionMap),
  withState("showButtons", "setShowButtons", false),
  withStyles(styles),
  withDimensions,
  lifecycle({
    componentDidMount() {
      const {
        loadMyAsks,
        loadMyBids,
        loadOffersByUser,
        loadTransactions,
        userId
      } = this.props;
      loadMyAsks(userId);
      loadMyBids(userId);
      loadOffersByUser(userId);
      loadTransactions(userId);
    }
  }),
  withHandlers({
    handleAskClick: ({
      unloadOffers,
      loadAsk,
      loadOffersByAsk,
      setLayer,
      setLayerOpen,
    }) => ({ _id }) => {
      unloadOffers();
      loadAsk(_id).then(() => {
        loadOffersByAsk(_id);
        setLayer("DELETE_ASK");
        setLayerOpen(true);
      });
    },
    handleBidClick: ({
      unloadOffers,
      loadBid,
      loadOffersByBid,
      setLayer,
      setLayerOpen,
    }) => ({ _id }) => {
      unloadOffers();
      loadBid(_id).then(() => {
        loadOffersByBid(_id);
        setLayer("DELETE_BID");
        setLayerOpen(true);
      });
    },
    handleOfferClick: ({ loadOffer, setLayer, setLayerOpen }) => ({ _id }) => {
      loadOffer(_id);
      setLayer("VIEW_OFFER");
      setLayerOpen(true);
    },
    handleTransactionClick: ({ loadTransaction, setLayer, setLayerOpen }) => ({
      _id
    }) => {
      loadTransaction(_id);
      setLayer("VIEW_TRANSACTION");
      setLayerOpen(true);
    }
  }),
  withLocation,
  withLoader
)(Dashboard);
