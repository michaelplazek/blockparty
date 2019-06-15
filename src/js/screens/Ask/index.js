import React from "react";
import PropTypes from "prop-types";
import { compose, lifecycle, withHandlers } from "recompose";
import { withRouter } from "react-router";
import theme from "../../../theme";
import mapper from "../../utils/connect";
import {
  selectAsk,
  selectAskLoaded,
  selectLayer,
  selectLayerOpen,
  selectAskHasOffer,
  selectAskOfferButtonText,
  selectMyOffersLoaded,
  selectUserId,
  selectWindowHeight,
  selectModal,
} from "../../selectors/index";
import { loadAsk as loadAskAction } from "../../actions/asks";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";

import withStyles from "@material-ui/core/styles/withStyles";

import { selectAskDetails } from "./selectors";
import DetailList from "../../components/DetailList";
import {
  setLayer as setLayerAction,
  setLayerOpen as setLayerOpenAction,
  setModalOpen as setModalOpenAction,
  setModal as setModalAction,
} from "../../actions/layers";
import CreateAskOffer from "../../components/Flyout/CreateAskOffer";
import { loadOffersByUser } from "../../actions/offers";
import { selectAskHasButton } from "../../selectors";
import Fab from "@material-ui/core/Fab";
import UserInfo from "../../components/Modal/UserInfo";

const styles = theme => ({
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
    right: "2em",
    background: theme.palette.createButton.background
  }
});

const Ask = ({
  ask,
  items,
  classes,
  loaded,
  history,
  layer,
  modal,
  handleOffer,
  hasAskOffer,
  buttonText,
  showButton,
  height,
  handleUserClick
}) => (
  <div
    style={{
      background: theme.palette.inverse.background,
      height: `${height}px`
    }}
  >
    {loaded && (
      <div>
        {layer === "CREATE_ASK_OFFER" && (
          <CreateAskOffer handleClose={() => {}} handleSubmit={() => {}} />
        )}
        {modal === "VIEW_USER_DETAILS" && (
          <UserInfo id={ask.userId} />
        )}
        <Grid>
          <Button
            style={theme.palette.inverse}
            onClick={() => history.goBack()}
          >
            Go Back
          </Button>
          <div className={classes.root}>
            <Grid item className={classes.body}>
              <Typography style={theme.palette.inverse} variant="display1">
                Ask for
              </Typography>
              <Typography style={theme.palette.inverse} variant="display2">
                {ask.volume} {ask.coin}
              </Typography>
            </Grid>
            <br />
            <DetailList items={items} userClick={handleUserClick} />
          </div>
          {showButton && (
            <Fab
              className={classes.buttons}
              variant="extended"
              disabled={hasAskOffer}
              onClick={handleOffer}
            >
              {buttonText}
            </Fab>
          )}
        </Grid>
        <Grid />
      </div>
    )}
  </div>
);

Ask.propTypes = {
  ask: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired
};

const propMap = {
  ask: selectAsk,
  loaded: selectAskLoaded,
  items: selectAskDetails,
  layer: selectLayer,
  modal: selectModal,
  open: selectLayerOpen,
  hasAskOffer: selectAskHasOffer,
  buttonText: selectAskOfferButtonText,
  myOffersLoaded: selectMyOffersLoaded,
  height: selectWindowHeight,
  userId: selectUserId,
  showButton: selectAskHasButton,
};

const actionMap = {
  loadAsk: loadAskAction,
  setLayer: setLayerAction,
  setLayerOpen: setLayerOpenAction,
  loadOffersByUser,
  setModalOpen: setModalOpenAction,
  setModal: setModalAction,
};

export default compose(
  withRouter,
  withStyles(styles),
  mapper(propMap, actionMap),
  lifecycle({
    componentDidMount() {
      const { search } = this.props.location;
      const id = search.substr(1);
      this.props.loadAsk(id);

      if (!this.props.myOffersLoaded) {
        this.props.loadOffersByUser(this.props.userId);
      }
    }
  }),
  withHandlers({
    handleOffer: ({ setLayer, setLayerOpen }) => () => {
      setLayer("CREATE_ASK_OFFER");
      setLayerOpen(true);
    },
    handleUserClick: ({ setModal, setModalOpen }) => () => {
      setModal("VIEW_USER_DETAILS");
      setModalOpen(true);
    }
  })
)(Ask);
