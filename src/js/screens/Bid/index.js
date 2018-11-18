import React from "react";
import PropTypes from "prop-types";
import { compose, lifecycle, withHandlers } from "recompose";
import { withRouter } from "react-router";
import mapper from "../../utils/connect";
import {
  selectBid,
  selectBidLoaded,
  selectLayer,
  selectLayerOpen
} from "../../selectors/index";
import { loadBid as loadBidAction } from "../../actions/bids";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";

import withStyles from "@material-ui/core/styles/withStyles";
import { selectBidDetails } from "./selectors";
import DetailList from "../../components/DetailList";
import {
  setLayer as setLayerAction,
  setLayerOpen as setLayerOpenAction
} from "../../actions/layers";
import CreateBidOffer from "../../components/Flyout/CreateBidOffer";

const styles = () => ({
  root: {
    textAlign: "center",
    marginTop: "40px"
  },
  body: {
    marginTop: "10px"
  },
  buttons: {
    position: "fixed",
    bottom: "7em",
    right: "2em"
  }
});

const Bid = ({
  bid,
  items,
  classes,
  loaded,
  history,
  open,
  layer,
  handleOffer
}) => (
  <div>
    {loaded && (
      <div>
        {open &&
          layer === "poop" && (
            <CreateBidOffer handleClose={() => {}} handleSubmit={() => {}} />
          )}
        <Grid>
          <Button onClick={() => history.goBack()}>Go Back</Button>
          <div className={classes.root}>
            <Grid item className={classes.body}>
              <Typography variant="display1">Bid for</Typography>
              <Typography variant="display2">
                {bid.volume} {bid.coin}
              </Typography>
            </Grid>
            <br />
            <DetailList items={items} />
          </div>
          <Button
            className={classes.buttons}
            color="primary"
            variant="extendedFab"
            onClick={handleOffer}
          >
            Make an offer
          </Button>
        </Grid>
        <Grid />
      </div>
    )}
  </div>
);

Bid.propTypes = {
  bid: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired
};

const propMap = {
  bid: selectBid,
  items: selectBidDetails,
  loaded: selectBidLoaded,
  layer: selectLayer,
  open: selectLayerOpen
};

const actionMap = {
  loadBid: loadBidAction,
  setLayer: setLayerAction,
  setLayerOpen: setLayerOpenAction
};

export default compose(
  withRouter,
  withStyles(styles),
  mapper(propMap, actionMap),
  lifecycle({
    componentDidMount() {
      const { search } = this.props.location;
      const id = search.substr(1);
      this.props.loadBid(id);
    }
  }),
  withHandlers({
    handleOffer: ({ setLayer, setLayerOpen }) => () => {
      setLayer("poop");
      setLayerOpen(true);
    }
  })
)(Bid);
