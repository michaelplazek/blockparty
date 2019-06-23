import React from "react";
import { compose, lifecycle } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";
import Modal from "../index";

import {
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
  container: {},
  items: {
    marginTop: "2em",
    marginBottom: "1em"
  },
  item: {},
  paper: {
    paddingRight: "1em",
    paddingLeft: "1em"
  },
  secondary: {}
});

const UserInfo = ({ items, classes }) => (
  <Modal title="">
    <Grid container direction="column" className={classes.container}>
      <Grid item className={classes.items}>
        <Paper elevation={0} className={classes.paper}>
          <List>
            {items.map((item, index) => (
              <ListItem key={item.name} dense={true} divider={index !== items.length - 1}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="space-between"
                  className={classes.item}
                >
                  <Grid item>
                    <ListItemText
                      primary={
                        <Typography color="textPrimary" variant="caption">
                          {item.name}
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item className={classes.secondary}>
                    <ListItemText
                      primary={
                        <Typography color="textPrimary">
                          {item.value}
                        </Typography>
                      }
                    />
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
