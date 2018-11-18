import React from "react";
import { compose } from "recompose";
import mapper from "../utils/connect";

import { logOutUser as logOutUserAction } from "../actions/session";
import { setLayerOpen as setLayerOpenAction } from "../actions/layers";

import PageHeader from "../components/PageHeader";
import CreateAsk from "../components/Flyout/CreateAsk/index";
import withDimensions from "../HOCs/withDimensions";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import { selectUsername, selectWindowHeight } from "../selectors";
import Typography from "@material-ui/core/Typography/Typography";

const styles = () => ({
  createButton: {
    position: "absolute",
    bottom: "8em",
    right: "2em"
  },
  body: {
    marginTop: "4em"
  }
});

const Account = ({ logOut, classes, height, username }) => (
  <div>
    <CreateAsk />
    <PageHeader
      leftHandLabel="Account"
      rightHandButton="Log Out"
      rightHandAction={logOut}
    />
    <Grid
      container
      className={classes.body}
      direction="column"
      style={{ height: `${height / 6}px` }}
      alignItems="center"
      justify="center"
    >
      <Grid item>
        <Typography className={classes.username} variant="display1">
          {username}
        </Typography>
      </Grid>
      <Button>Change password</Button>
    </Grid>
  </div>
);

const propMap = {
  height: selectWindowHeight,
  username: selectUsername
};

const actionMap = {
  logOut: logOutUserAction,
  setLayerOpen: setLayerOpenAction
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withDimensions
)(Account);
