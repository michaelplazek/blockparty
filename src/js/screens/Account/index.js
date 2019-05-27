import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { faCog } from "@fortawesome/free-solid-svg-icons";

import mapper from "../../utils/connect";
import {
  loadUserFromToken as loadUserFromTokenAction,
  logOutUser as logOutUserAction,
} from "../../actions/session";

import PageHeader from "../../components/PageHeader";
import withDimensions from "../../HOCs/withDimensions";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import {
  selectUserBio,
  selectUsername,
  selectUserReputation,
  selectWindowHeight
} from "../../selectors";
import Typography from "@material-ui/core/Typography/Typography";
import DetailList from "../../components/DetailList";
import { selectUserDetails } from "./selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button/Button";
import withPolling from "../../HOCs/withPolling";
import withVisited from "../../HOCs/withVisited";

const styles = () => ({
  body: {
    marginTop: "4em"
  },
  items: {
    margin: "0.5em"
  },
  button: {
    alignSelf: "center"
  }
});

const Account = ({
  logOut,
  classes,
  username,
  bio,
  items,
  history
}) => (
  <div>
    <PageHeader
      leftHandLabel="Account"
      rightHandIcon={<FontAwesomeIcon icon={faCog} />}
      rightHandAction={() => history.push("/settings")}
    />
    <Grid container className={classes.body} direction="column">
      <Grid item className={classes.items}>
        <Grid container direction="column" alignItems="center">
          <Grid item className={classes.items}>
            <Typography variant="display1">{username}</Typography>
          </Grid>
          <Grid item className={classes.items}>
            <Typography variant="caption">{bio}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.items}>
        <DetailList items={items} />
      </Grid>
      <Grid item className={classes.button}>
        <Button onClick={logOut}>Log Out</Button>
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
  loadUserFromToken: loadUserFromTokenAction,
};

export default compose(
  mapper(propMap, actionMap),
  withRouter,
  withStyles(styles),
  withDimensions,
  withPolling(({ loadUserFromToken }) => {
    loadUserFromToken();
  }, 5000),
  withVisited,
)(Account);
