import React from "react";
import { compose, withHandlers } from "recompose";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";
import Flyout from "../index";
import DetailBox from "../../DetailBox";

import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";
import { deleteAsk, loadMyAsks } from "../../../actions/asks";
import {
  selectAsk,
  selectAskLoaded,
  selectAskOfferTotal,
  selectAskPostTime,
  selectIsDarkMode,
  selectLayerOpen,
  selectOffers,
  selectUserId,
  selectWindowHeight,
  selectWindowWidth
} from "../../../selectors";
import OfferWidgetList from "../../OfferWidgetList/index";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import { loadMyBids } from "../../../actions/bids";
import { loadOffersByUser } from "../../../actions/offers";
import { dark, light } from "../../../../theme";

const styles = () => ({
  paper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start"
  },
  button: {
    marginTop: "10px"
  },
  coin: {
    margin: "6px 0px 0px 6px"
  },
  rate: {
    margin: "3px 0px 0px 3px"
  },
  time: {
    marginTop: "6px"
  }
});

const AskDetails = ({
  classes,
  ask,
  offers,
  time,
  history,
  handleDelete,
  isDarkMode
}) => {
  const theme = isDarkMode ? dark : light;
  return (
    <Flyout size={8} title="Ask Details">
      <Grid container direction="column">
        <Grid item>
          <DetailBox
            post={ask}
            time={time}
            onClick={() => {
              history.push(`/ask?${ask._id}`);
            }}
            isDarkMode={isDarkMode}
          />
        </Grid>
        <Grid item>
          <OfferWidgetList isDarkMode={isDarkMode} offers={offers} post={ask} />
        </Grid>
        <Grid item>
          <Grid
            direction="column"
            className={classes.footer}
            alignItems="center"
            container
          >
            <div className={classes.button}>
              <Button
                variant="contained"
                disabled={offers.length > 0}
                style={
                  !(offers.length > 0)
                    ? theme.palette.errorButton
                    : theme.palette.disabledErrorButton
                }
                onClick={() => handleDelete(ask._id)}
              >
                Delete Ask
              </Button>
            </div>
            <Typography
              className={classes.time}
              color={isDarkMode ? "textSecondary" : undefined}
            >
              Posted {time}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Flyout>
  );
};

const propMap = {
  open: selectLayerOpen,
  ask: selectAsk,
  userId: selectUserId,
  askLoaded: selectAskLoaded,
  offers: selectOffers,
  total: selectAskOfferTotal,
  windowHeight: selectWindowHeight,
  windowWidth: selectWindowWidth,
  time: selectAskPostTime,
  isDarkMode: selectIsDarkMode
};

const actionMap = {
  setLayerOpen: setLayerOpenAction,
  deleteAsk,
  loadOffersByUser,
  loadMyAsks,
  loadMyBids
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withRouter,
  withHandlers({
    handleDelete: ({
      deleteAsk,
      loadOffersByUser,
      userId,
      setLayerOpen,
      loadMyAsks,
      loadMyBids
    }) => id => {
      deleteAsk(id).then(() => {
        loadOffersByUser(userId);
        loadMyBids(userId);
        loadMyAsks(userId);
      });
      setLayerOpen(false);
    }
  })
)(AskDetails);
