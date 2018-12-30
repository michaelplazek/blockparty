import React from "react";
import PropTypes from "prop-types";
import { compose, lifecycle, withHandlers } from "recompose";
import { withRouter } from "react-router";
import theme from "../../../theme";
import mapper from "../../utils/connect";
import {
  selectBid,
  selectBidLoaded,
  selectLayer,
  selectLayerOpen,
  selectBidHasOffer,
  selectBidOfferButtonText,
  selectMyOffersLoaded,
  selectUserId, selectWindowHeight
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
import { loadOffersByUser } from "../../actions/offers";
import { selectBidHasButton } from "../../selectors";

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
  handleOffer,
  bidHasOffer,
  buttonText,
  showButton,
  height
}) => (
  <div style={{ background: theme.palette.inverse.background, height: `${height}px` }}>
    {loaded && (
      <div>
        {open &&
          layer === "poop" && (
            <CreateBidOffer handleClose={() => {}} handleSubmit={() => {}} />
          )}
        <Grid>
          <Button style={theme.palette.inverse} onClick={() => history.goBack()}>Go Back</Button>
          <div className={classes.root}>
            <Grid item className={classes.body}>
              <Typography style={theme.palette.inverse} variant="display1">Bid for</Typography>
              <Typography style={theme.palette.inverse} variant="display2">
                {bid.volume} {bid.coin}
              </Typography>
            </Grid>
            <br />
            <DetailList items={items} />
          </div>
          {showButton && (
            <Button
              className={classes.buttons}
              color="primary"
              disabled={bidHasOffer}
              variant="extendedFab"
              onClick={handleOffer}
            >
              {buttonText}
            </Button>
          )}
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
  open: selectLayerOpen,
  bidHasOffer: selectBidHasOffer,
  buttonText: selectBidOfferButtonText,
  myOffersLoaded: selectMyOffersLoaded,
  userId: selectUserId,
  showButton: selectBidHasButton,
  height: selectWindowHeight
};

const actionMap = {
  loadBid: loadBidAction,
  setLayer: setLayerAction,
  setLayerOpen: setLayerOpenAction,
  loadOffersByUser
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

      if (!this.props.myOffersLoaded) {
        this.props.loadOffersByUser(this.props.userId);
      }
    }
  }),
  withHandlers({
    handleOffer: ({ setLayer, setLayerOpen }) => () => {
      setLayer("poop");
      setLayerOpen(true);
    }
  })
)(Bid);
