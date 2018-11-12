import React from "react";
import { compose, withState, lifecycle } from "recompose";
import mapper from "../utils/connect";

import Tile from "../components/Tile";
import ListTile from "../components/ListTile";

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
import MailIcon from "@material-ui/icons/Mail";
import AddIcon from "@material-ui/icons/Add";
import CreateAsk from "../components/Flyout/CreateAsk/index";
import CreateBid from "../components/Flyout/CreateBid/index";
import DeleteAsk from "../components/Flyout/DeleteAsk";
import DeleteBid from "../components/Flyout/DeleteBid";

import withDimensions from "../HOCs/withDimensions";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  selectDashboardLoaded,
  selectLayer,
  selectMyAsks,
  selectMyBids, selectMyOffers,
  selectNavHeight,
  selectNumberOfMyAsks,
  selectNumberOfMyBids, selectNumberOfMyOffers,
  selectUserId
} from "../selectors";
import Grow from "@material-ui/core/Grow/Grow";
import withLoader from "../HOCs/withLoader";
import { loadOffersByUser} from "../actions/offers";

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
  myBids,
  myAsks,
  myOffers,
  loadAsk,
  loadBid,
  unloadAsk,
  unloadBid,
  footerHeight
}) => (
  <div className={classes.root}>
    {layer === "CREATE_ASK" && <CreateAsk />}
    {layer === "CREATE_BID" && <CreateBid />}
    {layer === "DELETE_ASK" && <DeleteAsk />}
    {layer === "DELETE_BID" && <DeleteBid />}
    <PageHeader
      leftHandLabel="Dashboard"
      rightHandLabel="Inbox"
      rightHandIcon={<MailIcon />}
    />
    <Tile title="My Offers" count={numberOfOffers}>
      {myOffers.map(item => (
        <OfferTile
          item={item}
          key={item._id}
          onClick={() => {
            // loadAsk(item._id);
            setLayer("DELETE_ASK");
            setLayerOpen(true);
          }}
        />
      ))}
    </Tile>
    <Tile title="My Asks" count={numberOfAsks}>
      {myAsks.map(item => (
        <ListTile
          item={item}
          key={item._id}
          onClick={() => {
            loadAsk(item._id);
            setLayer("DELETE_ASK");
            setLayerOpen(true);
          }}
        />
      ))}
    </Tile>
    <Tile title="My Bids" count={numberOfBids}>
      {myBids.map(item => (
        <ListTile
          item={item}
          key={item._id}
          onClick={() => {
            loadBid(item._id);
            setLayer("DELETE_BID");
            setLayerOpen(true);
          }}
        />
      ))}
    </Tile>
    <div
      style={{
        position: "fixed",
        right: "2em",
        bottom: `${footerHeight + 20}px`
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
                setLayer("CREATE_BID");
                setLayerOpen(true);
              }}
            >
              Create a new bid
            </Button>
            <Button
              className={classes.buttons}
              variant="extendedFab"
              onClick={() => {
                setLayer("CREATE_ASK");
                setLayerOpen(true);
              }}
            >
              Create a new ask
            </Button>
          </div>
        </Grow>
      )}

      {!showButtons && (
        <Button
          className={classes.buttonContainer}
          color="primary"
          variant="fab"
          onClick={() => {
            setShowButtons(true);
          }}
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
  myBids: selectMyBids,
  myAsks: selectMyAsks,
  myOffers: selectMyOffers,
  numberOfBids: selectNumberOfMyBids,
  numberOfAsks: selectNumberOfMyAsks,
  numberOfOffers: selectNumberOfMyOffers,
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
  loadOffersByUser
};

export default compose(
  mapper(propMap, actionMap),
  withState("showButtons", "setShowButtons", false),
  withStyles(styles),
  withDimensions,
  lifecycle({
    componentDidMount() {
      const { loadMyAsks, loadMyBids, loadOffersByUser, userId } = this.props;
      loadMyAsks(userId);
      loadMyBids(userId);
      loadOffersByUser(userId);
    }
  }),
  withLoader
)(Dashboard);
