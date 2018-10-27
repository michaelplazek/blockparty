import React from "react";
import { compose, withState, lifecycle } from "recompose";
import mapper from "../utils/connect";

import Tile from "../components/Tile";

import {
  setLayer as setLayerAction,
  setLayerOpen as setLayerOpenAction
} from "../actions/layers";
import { loadMyAsks as loadMyAsksAction } from "../actions/asks";
import { loadMyBids as loadMyBidsAction } from "../actions/bids";

import PageHeader from "../components/PageHeader";
import MailIcon from "@material-ui/icons/Mail";
import AddIcon from "@material-ui/icons/Add";
import CreateAsk from "../components/Flyout/CreateAsk/index";
import CreateBid from "../components/Flyout/CreateBid/index";

import withDimensions from "../HOCs/withDimensions";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  selectLayer,
  selectNumberOfMyAsks,
  selectNumberOfMyBids,
  selectUserId
} from "../selectors";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Icon from "@material-ui/core/Icon";
import Grow from "@material-ui/core/Grow/Grow";

const styles = () => ({
  // createAskButton: {
  //   position: "absolute",
  //   bottom: "8em",
  //   right: "2em"
  // },
  // createBidButton: {
  //   position: "absolute",
  //   bottom: "12em",
  //   right: "2em"
  // },
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
  numberOfAsks
}) => (
  <div>
    {layer === "CREATE_ASK" && <CreateAsk />}
    {layer === "CREATE_BID" && <CreateBid />}
    <PageHeader
      leftHandLabel="Dashboard"
      rightHandLabel="Inbox"
      rightHandIcon={<MailIcon />}
    />
    <Tile title="Asks" count={numberOfAsks} />
    <Tile title="Bids" count={numberOfBids} />
    <div>
      {showButtons && (
        <Grow in={showButtons}>
          <div
            className={classes.buttonContainer}
            onMouseLeave={() => setTimeout(() => setShowButtons(false), 500)}
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
  numberOfBids: selectNumberOfMyBids,
  numberOfAsks: selectNumberOfMyAsks
};

const actionMap = {
  setLayer: setLayerAction,
  setLayerOpen: setLayerOpenAction,
  loadMyAsks: loadMyAsksAction,
  loadMyBids: loadMyBidsAction
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
