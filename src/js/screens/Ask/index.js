import React from "react";
import PropTypes from "prop-types";
import { compose, lifecycle, withHandlers } from "recompose";
import { withRouter } from "react-router";
import { light, dark } from "../../../theme";
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
  setModal as setModalAction
} from "../../actions/layers";
import CreateAskOffer from "../../components/Flyout/CreateAskOffer";
import { loadOffersByUser } from "../../actions/offers";
import { selectAskHasButton } from "../../selectors";
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
          {layer === "CREATE_ASK_OFFER" && (
            <CreateAskOffer handleClose={() => {}} handleSubmit={() => {}} />
          )}
          {modal === "VIEW_USER_DETAILS" && <UserInfo id={ask.userId} />}
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
                  Ask for
                </Typography>
                <Typography style={theme.palette.inverse} variant="display2">
                  {ask.volume} {ask.coin}
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
                  {`${ask.owner} wants to sell ${ask.volume} ${ask.coin} `}
                </Typography>
                <Typography variant='caption'>
                  {`at ${numeral(ask.price).format(USD)} for ${numeral(ask.volume * ask.price).format(USD)}.`}
                </Typography>
              </Grid>
            </Grid>
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
        </Grid>
      )}
    </Grid>
  );
};

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
  setModal: setModalAction
};

export default compose(
  withRouter,
  withMode,
  withDarkMode,
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
  }),
  withNav
)(Ask);
