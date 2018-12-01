import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";
import Flyout from "../index";
import DetailBox from "../../DetailBox";

import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";
import {
  deleteAsk,
  loadMyAsks as loadMyAsksAction
} from "../../../actions/asks";
import {
  selectAsk,
  selectAskLoaded,
  selectAskOfferTotal,
  selectAskPostTime,
  selectLayerOpen,
  selectOffers,
  selectWindowHeight,
  selectWindowWidth
} from "../../../selectors";
import OfferWidgetList from "../../OfferWidgetList/index";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";

const styles = () => ({
  paper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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
  setLayerOpen,
  windowWidth,
  windowHeight,
  ask,
  open,
  offers,
  time,
  history
}) => (
  <Flyout
    onClose={() => {
      setLayerOpen(false);
    }}
    size={8}
    open={open}
    title="Ask Details"
  >
    <Grid container direction="column">
      <Grid item>
        <DetailBox
          post={ask}
          time={time}
          onClick={() => {
            history.push(`/ask?${ask._id}`);
          }}
        />
      </Grid>
      <Grid item>
        <OfferWidgetList offers={offers} post={ask} />
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
              onClick={() => {
                deleteAsk(ask._id);
                setLayerOpen(false);
              }}
            >
              Delete Ask
            </Button>
          </div>
          <Typography className={classes.time}>Posted {time}</Typography>
        </Grid>
      </Grid>
    </Grid>
  </Flyout>
);

const propMap = {
  open: selectLayerOpen,
  ask: selectAsk,
  askLoaded: selectAskLoaded,
  offers: selectOffers,
  total: selectAskOfferTotal,
  windowHeight: selectWindowHeight,
  windowWidth: selectWindowWidth,
  time: selectAskPostTime
};

const actionMap = {
  setLayerOpen: setLayerOpenAction,
  loadMyAsks: loadMyAsksAction
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withRouter
)(AskDetails);
