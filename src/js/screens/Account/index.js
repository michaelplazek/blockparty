import React from "react";
import { compose } from "recompose";

import mapper from "../../utils/connect";

import { logOutUser as logOutUserAction } from "../../actions/session";
import { setLayerOpen as setLayerOpenAction } from "../../actions/layers";

import PageHeader from "../../components/PageHeader";
import CreateAsk from "../../components/Flyout/CreateAsk";
import withDimensions from "../../HOCs/withDimensions";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import {selectUserBio, selectUsername, selectUserReputation, selectWindowHeight} from "../../selectors";
import Typography from "@material-ui/core/Typography/Typography";
import DetailList from "../../components/DetailList";
import Paper from "@material-ui/core/Paper/Paper";
import {selectUserDetails} from "./selectors";

const styles = () => ({
  createButton: {
    position: "absolute",
    bottom: "8em",
    right: "2em"
  },
  body: {
    marginTop: "4em"
  },
  bio: {
    padding: "1em"
  }
});

const Account = ({
                   logOut,
                   classes,
                   height,
                   username,
  bio,
  items
}) => (
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
      <Grid item>
        <Paper className={classes.bio}>
          <Typography>
            {bio}
          </Typography>
        </Paper>
      </Grid>
      <Grid item>
        <DetailList items={items} />
      </Grid>
    </Grid>
  </div>
);

const propMap = {
  height: selectWindowHeight,
  username: selectUsername,
  bio: selectUserBio,
  reputation: selectUserReputation,
  items: selectUserDetails
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
