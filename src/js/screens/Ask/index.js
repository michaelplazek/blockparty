import React from "react";
import { compose, lifecycle } from "recompose";
import { withRouter } from "react-router";
import mapper from "../../utils/connect";
import {
  selectAsk,
  selectAskLoaded,
  selectNavHeight,
  selectWindowHeight,
  selectWindowWidth
} from "../../selectors/index";
import { loadAsk as loadAskAction } from "../../actions/asks";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";

import withStyles from "@material-ui/core/styles/withStyles";

import {selectAskDetails} from "./selectors";
import DetailList from "../../components/DetailList";

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
  },
});

const Ask = ({
  ask,
  items,
  classes,
  loaded,
}) => (
  <div>
    {loaded && (
      <div>
        <Grid>
          <Button onClick={() => history.goBack()}>Go Back</Button>
          <div className={classes.root}>
            <Grid item className={classes.body}>
              <Typography variant="display2">
                {ask.volume} {ask.coin}
              </Typography>
            </Grid>
            <br />
            <DetailList items={items}/>
          </div>
          <Button
            className={classes.buttons}
            variant="extendedFab"
            color="primary"
            onClick={() => {}}
          >
            Contact seller
          </Button>
        </Grid>
        <Grid />
      </div>
    )}
  </div>
);

const propMap = {
  ask: selectAsk,
  windowHeight: selectWindowHeight,
  width: selectWindowWidth,
  footerHeight: selectNavHeight,
  loaded: selectAskLoaded,
  items: selectAskDetails
};

const actionMap = {
  loadAsk: loadAskAction
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
    }
  })
)(Ask);
