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
  selectLayer,
  selectMyAsks,
  selectMyBids,
  selectNumberOfMyAsks,
  selectNumberOfMyBids,
  selectUserId
} from "../selectors";
import Grow from "@material-ui/core/Grow/Grow";

const styles = () => ({
  addButton: {
    position: "absolute",
    bottom: "8em",
    right: "2em"
  },
  buttonContainer: {
    position: "absolute",
    bottom: "8em",
    right: "2em",
    // textAlign: "vertical",
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
  myBids,
  myAsks,
  loadAsk,
  loadBid,
  unloadAsk,
  unloadBid
}) => (
  <div>
    {layer === "CREATE_ASK" && <CreateAsk />}
    {layer === "CREATE_BID" && <CreateBid />}
    {layer === "DELETE_ASK" && <DeleteAsk />}
    {layer === "DELETE_BID" && <DeleteBid />}
    <PageHeader
      leftHandLabel="Dashboard"
      rightHandLabel="Inbox"
      rightHandIcon={<MailIcon />}
    />
    <Tile title="Asks" count={numberOfAsks}>
      {myAsks.map(item => (
        <ListTile
          age={item.timestamp}
          type={item.coin}
          volume={item.volume}
          key={item._id}
          onClick={() => {
            loadAsk(item._id);
            setLayer("DELETE_ASK");
            setLayerOpen(true);
          }}
        />
      ))}
    </Tile>
    <Tile title="Bids" count={numberOfBids}>
      {myBids.map(item => (
        <ListTile
          age={item.timestamp}
          type={item.coin}
          volume={item.volume}
          key={item._id}
          onClick={() => {
            loadBid(item._id);
            setLayer("DELETE_BID");
            setLayerOpen(true);
          }}
        />
      ))}
    </Tile>
    <div>
      {showButtons && (
        <Grow in={showButtons}>
          <div
            className={classes.buttonContainer}
            onMouseLeave={() => setTimeout(() => setShowButtons(false), 1000)}
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
          className={classes.addButton}
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
  numberOfBids: selectNumberOfMyBids,
  numberOfAsks: selectNumberOfMyAsks
};

const actionMap = {
  setLayer: setLayerAction,
  setLayerOpen: setLayerOpenAction,
  loadMyAsks: loadMyAsksAction,
  loadMyBids: loadMyBidsAction,
  loadAsk: loadAskAction,
  loadBid: loadBidAction,
  unloadAsk: unloadAskAction,
  unloadBid: unloadBidAction
};

export default compose(
  mapper(propMap, actionMap),
  withState("showButtons", "setShowButtons", false),
  withStyles(styles),
  withDimensions,
  lifecycle({
    componentDidMount() {
      const { loadMyAsks, loadMyBids, userId } = this.props;
      loadMyAsks(userId);
      loadMyBids(userId);
    }
  })
)(Dashboard);
