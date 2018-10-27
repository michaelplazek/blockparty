import React from "react";
import { compose } from "recompose";
import mapper from "../utils/connect";

import Tile from "../components/Tile";

import {
  setLayer as setLayerAction,
  setLayerOpen as setLayerOpenAction
} from "../actions/layers";

import PageHeader from "../components/PageHeader";
import MailIcon from "@material-ui/icons/Mail";
import CreateAsk from "../components/Flyout/CreateAsk/index";
import CreateBid from "../components/Flyout/CreateBid/index";

import withDimensions from "../HOCs/withDimensions";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import { selectLayer } from "../selectors";

const styles = () => ({
  createAskButton: {
    position: "absolute",
    bottom: "8em",
    right: "2em"
  },
  createBidButton: {
    position: "absolute",
    bottom: "12em",
    right: "2em"
  }
});

const Dashboard = ({ setLayerOpen, setLayer, classes, layer }) => (
  <div>
    {layer === "CREATE_ASK" && <CreateAsk />}
    {layer === "CREATE_BID" && <CreateBid />}
    <PageHeader
      leftHandLabel="Dashboard"
      rightHandLabel="Inbox"
      rightHandIcon={<MailIcon />}
    />
    <Tile title="Asks" count={0} />
    <Tile title="Bids" count={0} />
    <div>
      <Button
        className={classes.createBidButton}
        variant="extendedFab"
        onClick={() => {
          setLayer("CREATE_BID");
          setLayerOpen(true);
        }}
      >
        Create a new bid
      </Button>
      <Button
        className={classes.createAskButton}
        variant="extendedFab"
        onClick={() => {
          setLayer("CREATE_ASK");
          setLayerOpen(true);
        }}
      >
        Create a new ask
      </Button>
    </div>
  </div>
);

const propMap = {
  layer: selectLayer
};

const actionMap = {
  setLayer: setLayerAction,
  setLayerOpen: setLayerOpenAction
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withDimensions
)(Dashboard);
