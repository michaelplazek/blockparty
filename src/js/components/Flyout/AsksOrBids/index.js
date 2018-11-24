import React from "react";
import { compose, withHandlers } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";

import Grid from "@material-ui/core/Grid/Grid";
import {setLayer, setLayerOpen as setLayerOpenAction} from "../../../actions/layers";

import {
  selectLayerOpen,
  selectWindowHeight,
  selectWindowWidth
} from "../../../selectors";
import Typography from "@material-ui/core/Typography/Typography";
import Flyout from "../index";
import Paper from "@material-ui/core/Paper/Paper";

const styles = () => ({
  button: {
    marginTop: "10px"
  },
  time: {
    marginTop: "8px"
  },
  bidPaper: {
    margin: "40px 10px 0px 10px",
    padding: "20px",
    cursor: "pointer"
  },
  askPaper: {
    margin: "10px 10px 0px 10px",
    padding: "20px",
    cursor: "pointer"
  },
  box: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  coin: {
    margin: "6px 0px 0px 6px"
  },
  rate: {
    margin: "3px 0px 0px 3px"
  }
});

const AsksOrBids = ({
  classes,
  setLayerOpen,
  windowWidth,
  windowHeight,
  open,
  openBidList,
  openAskList
}) => (
  <Flyout
    onClose={() => {
      setLayerOpen(false);
    }}
    onBackdropClick={() => {
      setLayerOpen(false);
    }}
    size={8}
    open={open}
    title=""
  >
    <Grid
      container
      direction="column"
      justify='center'

    >
      <Grid item onClick={openBidList}>
        <Paper className={classes.bidPaper}>
          <Grid container className={classes.box}>
            <Typography variant="title" className={classes.coin}>
              View Bids
            </Typography>
          </Grid>
        </Paper>
      </Grid>
      <Grid item onClick={openAskList}>
        <Paper className={classes.askPaper}>
          <Grid container className={classes.box}>
            <Typography variant="title" className={classes.coin}>
              View Asks
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  </Flyout>
);

const propMap = {
  open: selectLayerOpen,
  windowHeight: selectWindowHeight,
  windowWidth: selectWindowWidth,
};

const actionMap = {
  setLayerOpen: setLayerOpenAction,
  setLayer
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withHandlers({
    openBidList: ({ setLayer }) => () => {
      setLayer('LIST_BIDS')
    },
    openAskList: ({ setLayer }) => () => {
      setLayer('LIST_ASKS')
    }
  }),
)(AsksOrBids);