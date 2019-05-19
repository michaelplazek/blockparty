import React from "react";
import { compose, withState, lifecycle, withHandlers } from "recompose";
import mapper from "../../utils/connect";

import Tile from "../../components/Tile";
import ListTile from "../../components/ListTile";
import TransactionTile from "../../components/TransactionTile";

import {
  setLayer as setLayerAction,
  setLayerOpen as setLayerOpenAction
} from "../../actions/layers";
import {
  loadAsk as loadAskAction,
  loadMyAsks as loadMyAsksAction,
  unloadAsk as unloadAskAction
} from "../../actions/asks";
import {
  loadBid as loadBidAction,
  loadMyBids as loadMyBidsAction,
  unloadBid as unloadBidAction
} from "../../actions/bids";

import PageHeader from "../../components/PageHeader";
import OfferTile from "../../components/OfferTile";
import CreateAsk from "../../components/Flyout/CreateAsk";
import CreateBid from "../../components/Flyout/CreateBid";
import DeleteAsk from "../../components/Flyout/AskDetails";
import DeleteBid from "../../components/Flyout/BidDetails";

import withDimensions from "../../HOCs/withDimensions";
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
} from "../../selectors";
import withLoader from "../../HOCs/withLoader";
import {
  loadOffer,
  loadOffersByAsk,
  loadOffersByBid,
  loadOffersByUser,
  unloadOffers
} from "../../actions/offers";
import OfferDetails from "../../components/Flyout/OfferDetails";
import { loadTransaction, loadTransactions } from "../../actions/transactions";
import TransactionDetails from "../../components/Flyout/TransactionDetail";
import withLocation from "../../HOCs/withLocation";
import { loadLastPrice as loadLastPriceAction } from "../../actions/metrics";
import { setBidPrice as setBidPriceAction } from "../../actions/createBid";
import { setAskPrice as setAskPriceAction } from "../../actions/createAsk";
import numeral from "numeral";
import { COST } from "../../constants/currency";
import withPolling from "../../HOCs/withPolling";
import AddIcon from '@material-ui/icons/AddLocation';
import AddAskIcon from '@material-ui/icons/AddLocationTwoTone';
import SpeedDialButton from "../../components/SpeedDialButton";


const styles = () => ({
  root: {
    paddingBottom: "4.5em"
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
  classes,
  layer,
  numberOfBids,
  numberOfAsks,
  numberOfOffers,
  numberOfTransactions,
  myBids,
  myAsks,
  myOffers,
  myTransactions,
  footerHeight,
  handleAskClick,
  handleBidClick,
  handleOfferClick,
  handleTransactionClick,
  handleCreateAsk,
  handleCreateBid,
}) => {

  const actions = [
    {
      name: 'Create Bid',
      icon: <AddIcon />,
      onClick:  handleCreateBid,
    },
    {
      name: 'Create Ask',
      icon: <AddAskIcon />,
      onClick: handleCreateAsk
    }
  ];

  return <div className={classes.root}>
    {layer === "CREATE_ASK" && <CreateAsk/>}
    {layer === "CREATE_BID" && <CreateBid/>}
    {layer === "DELETE_ASK" && <DeleteAsk/>}
    {layer === "DELETE_BID" && <DeleteBid/>}
    {layer === "VIEW_OFFER" && <OfferDetails/>}
    {layer === "VIEW_TRANSACTION" && <TransactionDetails/>}
    <PageHeader leftHandLabel="Dashboard"/>
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
      <SpeedDialButton
        actions={actions}
      />
    </div>
  </div>
};

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
  footerHeight: selectNavHeight,
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
  loadLastPrice: loadLastPriceAction,
  setAskPrice: setAskPriceAction,
  setBidPrice: setBidPriceAction,
};

export default compose(
  mapper(propMap, actionMap),
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
      setLayerOpen
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
      setLayerOpen
    }) => ({ _id }) => {
      unloadOffers();
      loadBid(_id).then(() => {
        loadOffersByBid(_id);
        setLayer("DELETE_BID");
        setLayerOpen(true);
      });
    },
    handleOfferClick: ({ loadOffer, setLayer, setLayerOpen }) => ({ _id }) => {
      loadOffer(_id).then(() => {
        setLayer("VIEW_OFFER");
        setLayerOpen(true);
      });
    },
    handleTransactionClick: ({ loadTransaction, setLayer, setLayerOpen }) => ({
      _id
    }) => {
      loadTransaction(_id).then(() => {
        setLayer("VIEW_TRANSACTION");
        setLayerOpen(true);
      });
    },
    handleCreateBid: ({
      loadLastPrice,
      setBidPrice,
      setLayer,
      setLayerOpen,
    }) => () => {
      loadLastPrice("BTC").then(response =>
        setBidPrice(numeral(response.data).format(COST))
      );
      setLayer("CREATE_BID");
      setLayerOpen(true);
    },
    handleCreateAsk: ({
      loadLastPrice,
      setAskPrice,
      setLayer,
      setLayerOpen,
  }) => () => {
      // console.log('clicked asked');
      // console.log(setLayer);
      loadLastPrice("BTC").then(response =>
        setAskPrice(numeral(response.data).format(COST))
      );
      setLayer("CREATE_ASK");
      setLayerOpen(true);
    },
  }),
  withLocation,
  withLoader,
  withPolling(({
    loadOffersByUser,
    loadTransactions,
    userId,
  }) => {
    loadOffersByUser(userId);
    loadTransactions(userId);
  }, 5000)
)(Dashboard);
