import React from "react";
import PropTypes from "prop-types";
import { compose, lifecycle, withHandlers } from "recompose";
import { withRouter } from "react-router";
import { dark, light } from "../../../theme";
import mapper from "../../utils/connect";
import {
  selectBid,
  selectBidLoaded,
  selectLayer,
  selectLayerOpen,
  selectBidHasOffer,
  selectBidOfferButtonText,
  selectMyOffersLoaded,
  selectUserId,
  selectWindowHeight,
  selectModal,
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
  setLayerOpen as setLayerOpenAction,
  setModal as setModalAction,
  setModalOpen as setModalOpenAction
} from "../../actions/layers";
import CreateBidOffer from "../../components/Flyout/CreateBidOffer";
import { loadOffersByUser } from "../../actions/offers";
import { selectBidHasButton } from "../../selectors";
import Fab from "@material-ui/core/Fab";
import UserInfo from "../../components/Modal/UserInfo";
import withNav from "../../HOCs/withNav";
import withMode from "../../HOCs/withMode";
import withDarkMode from "../../HOCs/withDarkMode";
import numeral from "numeral";
import { USD } from "../../constants/currency";

const styles = theme => ({
  root: {
    textAlign: "center",
    marginTop: "12px"
  },
  body: {
    marginTop: "10px"
  },
  buttons: {
    position: "fixed",
    bottom: "7em",
    right: "2em",
    background: theme.palette.createButton.background
  },
  backButton: {
    padding: "1em"
  },
  description: {
    margin: "12px"
  }
});

const Bid = ({
  bid,
  items,
  classes,
  loaded,
  history,
  layer,
  modal,
  handleOffer,
  bidHasOffer,
  buttonText,
  showButton,
  height,
  handleUserClick,
  isDarkMode
}) => {
  const theme = isDarkMode ? dark : light;
  return (
    <Grid
      style={{
        background: theme.palette.inverse.background,
        height: `${height}px`
      }}
    >
      {loaded && (
        <Grid>
          {layer === "CREATE_BID_OFFER" && (
            <CreateBidOffer handleClose={() => {}} handleSubmit={() => {}} />
          )}
          {modal === "VIEW_USER_DETAILS" && <UserInfo id={bid.userId} />}
          <Grid>
            <Grid className={classes.backButton}>
              <Button
                style={theme.palette.inverse}
                onClick={() => history.goBack()}
              >
                Go Back
              </Button>
            </Grid>
            <Grid className={classes.root}>
              <Grid item className={classes.body}>
                <Typography style={theme.palette.inverse} variant="display1">
                  Bid for
                </Typography>
                <Typography style={theme.palette.inverse} variant="display2">
                  {bid.volume} {bid.coin}
                </Typography>
              </Grid>
              <br />
              <Grid align='center'>
                <Grid item sm={8} lg={6} xl={4}>
                  <DetailList items={items} userClick={handleUserClick} />
                </Grid>
              </Grid>
              <Grid className={classes.description}>
                <Typography variant='caption'>
                  {`${bid.owner} wants to buy ${bid.volume} ${bid.coin} `}
                </Typography>
                <Typography variant='caption'>
                  {`at ${numeral(bid.price).format(USD)} for ${numeral(bid.volume * bid.price).format(USD)}.`}
                </Typography>
              </Grid>
            </Grid>
            {showButton && (
              <Fab
                className={classes.buttons}
                disabled={bidHasOffer}
                variant="extended"
                onClick={handleOffer}
              >
                {buttonText}
              </Fab>
            )}
          </Grid>
          <Grid />
        </Grid>
      )}
    </Grid>
  );
};

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
  modal: selectModal,
  open: selectLayerOpen,
  bidHasOffer: selectBidHasOffer,
  buttonText: selectBidOfferButtonText,
  myOffersLoaded: selectMyOffersLoaded,
  userId: selectUserId,
  showButton: selectBidHasButton,
  height: selectWindowHeight,
};

const actionMap = {
  loadBid: loadBidAction,
  setLayer: setLayerAction,
  setLayerOpen: setLayerOpenAction,
  loadOffersByUser,
  setModal: setModalAction,
  setModalOpen: setModalOpenAction
};

export default compose(
  withRouter,
  withStyles(styles),
  withMode,
  withDarkMode,
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
      setLayer("CREATE_BID_OFFER");
      setLayerOpen(true);
    },
    handleUserClick: ({ setModal, setModalOpen }) => () => {
      setModal("VIEW_USER_DETAILS");
      setModalOpen(true);
    }
  }),
  withNav
)(Bid);
