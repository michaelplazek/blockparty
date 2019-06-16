import React from "react";
import { compose, lifecycle } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";
import Modal from "../index";

import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";
import {
  selectLayerOpen,
  selectUser,
  selectUserId,
  selectWindowHeight,
  selectWindowWidth
} from "../../../selectors";
import Grid from "@material-ui/core/Grid/Grid";
import {
  loadUser as loadUserAction,
  unloadUser as unloadUserAction
} from "../../../actions/users";
import { selectUserDetails } from "./selectors";
import { List } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
  items: {
    marginTop: "2.2em",
    marginBottom: "1em"
  },
  paper: {
    margin: "0px 20px 0px 20px"
  },
  secondary: {
    marginTop: "5px"
  }
});

const UserInfo = ({ items, classes }) => (
  <Modal title="">
    <Grid container direction="column">
      <Grid item className={classes.items}>
        <Paper elevation={0} className={classes.paper}>
          <List>
            {items.map((item, index) => (
              <ListItem divider={index !== items.length - 1}>
                <Grid container direction="column" justify="space-between">
                  <Grid item>
                    <ListItemText
                      primary={
                        <Typography variant="caption">{item.name}</Typography>
                      }
                    />
                  </Grid>
                  <Grid item className={classes.secondary}>
                    <ListItemText>{item.value}</ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  </Modal>
);

const propMap = {
  userId: selectUserId,
  user: selectUser,
  items: selectUserDetails,
  windowHeight: selectWindowHeight,
  windowWidth: selectWindowWidth
};

const actionMap = {
  loadUser: loadUserAction,
  unloadUser: unloadUserAction
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  lifecycle({
    componentDidMount() {
      const { loadUser, id } = this.props;
      loadUser(id);
    },
    componentWillUnmount() {
      const { unloadUser } = this.props;
      unloadUser();
    }
  })
)(UserInfo);
