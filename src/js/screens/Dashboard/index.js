import React from "react";
import { compose, lifecycle, withHandlers } from "recompose";
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
  selectAskCurrencyItems,
  selectBidCurrencyItems,
  selectDashboardLoaded,
  selectFilteredAskCurrencyItems,
  selectFilteredBidCurrencyItems, selectIsDarkMode,
  selectLayer,
  selectMyAsks,
  selectMyBids,
  selectMyOffers,
  selectNavHeight,
  selectNumberOfMyAsks,
  selectNumberOfMyBids,
  selectNumberOfMyOffers,
  selectNumberOfMyTransactions,
  selectRun,
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
import {
  setBidCoin as setBidCoinAction,
  setBidPrice as setBidPriceAction
} from "../../actions/createBid";
import {
  setAskCoin as setAskCoinAction,
  setAskPrice as setAskPriceAction
} from "../../actions/createAsk";
import numeral from "numeral";
import { COST } from "../../constants/currency";
import withPolling from "../../HOCs/withPolling";
import AddIcon from "@material-ui/icons/AddLocation";
import AddAskIcon from "@material-ui/icons/AddLocationTwoTone";
import SpeedDialButton from "../../components/SpeedDialButton";
import withVisited from "../../HOCs/withVisited";
import Joyride from "react-joyride";
import { dashboardSteps, isVisited, tourStyle } from "../../config/tour";
import Tooltip from "../../components/TourTooltip";
import {
  setNavIndex as setNavIndexAction,
  setRun as setRunAction
} from "../../actions/app";
import withNav from "../../HOCs/withNav";
import {COLBALT, GOLD} from "../../constants/colors";

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
  handleCallback,
  run,
  isDarkMode,
}) => {
  const actions = [
    {
      name: "Buy",
      icon: <AddIcon />,
      onClick: handleCreateBid
    },
    {
      name: "Sell",
      icon: <AddAskIcon />,
      onClick: handleCreateAsk
    }
  ];

  return (
    <div className={classes.root}>
      {layer === "CREATE_ASK" && <CreateAsk />}
      {layer === "CREATE_BID" && <CreateBid />}
      {layer === "DELETE_ASK" && <DeleteAsk />}
      {layer === "DELETE_BID" && <DeleteBid />}
      {layer === "VIEW_OFFER" && <OfferDetails />}
      {layer === "VIEW_TRANSACTION" && <TransactionDetails />}
      <PageHeader leftHandLabel="Dashboard" />
      <Tile
        className="transactions"
        title="Accepted Offers"
        count={numberOfTransactions}
        description="time to meet up"
        color={isDarkMode ? COLBALT : undefined}
        textColor={isDarkMode ? 'textSecondary' : undefined}
      >
        {myTransactions.map(item => (
          <TransactionTile
            isDarkMode={isDarkMode}
            item={item}
            key={item._id}
            onClick={() => handleTransactionClick(item)}
          />
        ))}
      </Tile>
      <Tile
        className="offers"
        title="My Offers"
        count={numberOfOffers}
        description="offers I've made"
        color={isDarkMode ? COLBALT : undefined}
        textColor={isDarkMode ? 'textSecondary' : undefined}
      >
        {myOffers.map(item => (
          <OfferTile
            item={item}
            key={item._id}
            onClick={() => handleOfferClick(item)}
          />
        ))}
      </Tile>
      <Tile
        className="asks"
        title="My Asks"
        count={numberOfAsks}
        description="looking to sell"
        color={isDarkMode ? COLBALT : undefined}
        textColor={isDarkMode ? 'textSecondary' : undefined}
      >
        {myAsks.map(item => (
          <ListTile
            item={item}
            key={item._id}
            onClick={() => handleAskClick(item)}
          />
        ))}
      </Tile>
      <Tile
        className="bids"
        title="My Bids"
        count={numberOfBids}
        description="looking to buy"
        color={isDarkMode ? COLBALT : undefined}
        textColor={isDarkMode ? 'textSecondary' : undefined}
      >
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
        <SpeedDialButton className="create-post" actions={actions} />
      </div>
      <Joyride
        steps={dashboardSteps}
        run={run}
        styles={tourStyle}
        continuous={true}
        tooltipComponent={Tooltip}
        disableOverlay={true}
        callback={handleCallback}
      />
    </div>
  );
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
  run: selectRun,
  askCoins: selectAskCurrencyItems,
  bidCoins: selectBidCurrencyItems,
  filteredBidCoins: selectFilteredBidCurrencyItems,
  filteredAskCoins: selectFilteredAskCurrencyItems,
  isDarkMode: selectIsDarkMode
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
  setRun: setRunAction,
  setNavIndex: setNavIndexAction,
  setBidCoin: setBidCoinAction,
  setAskCoin: setAskCoinAction
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
        userId,
        setRun
      } = this.props;
      loadMyAsks(userId);
      loadMyBids(userId);
      loadOffersByUser(userId);
      loadTransactions(userId);

      if (!isVisited()) {
        setRun(true);
      }
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
      setBidCoin,
      filteredBidCoins
    }) => () => {
      loadLastPrice(filteredBidCoins[0].value).then(response =>
        setBidPrice(numeral(response.data).format(COST))
      );
      setBidCoin(filteredBidCoins[0].value);
      setLayer("CREATE_BID");
      setLayerOpen(true);
    },
    handleCreateAsk: ({
      loadLastPrice,
      setAskPrice,
      setLayer,
      setLayerOpen,
      setAskCoin,
      filteredAskCoins
    }) => () => {
      loadLastPrice(filteredAskCoins[0].value).then(response =>
        setAskPrice(numeral(response.data).format(COST))
      );
      setAskCoin(filteredAskCoins[0].value);
      setLayer("CREATE_ASK");
      setLayerOpen(true);
    },
    handleCallback: ({ history, setRun, setNavIndex }) => stats => {
      if (stats.status === "finished") {
        setRun(false);
        history.push("/account");
        setNavIndex(2);
      }
    }
  }),
  withLocation,
  withLoader,
  withPolling(
    ({
      loadOffersByUser,
      loadTransactions,
      loadMyAsks,
      loadMyBids,
      userId
    }) => {
      loadOffersByUser(userId);
      loadTransactions(userId);
      loadMyAsks(userId);
      loadMyBids(userId);
    },
    5000
  ),
  withVisited,
  withNav,
)(Dashboard);
