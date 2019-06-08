import React from "react";
import {compose, lifecycle} from "recompose";
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
import {loadUser as loadUserAction, unloadUser as unloadUserAction} from "../../../actions/users";
import {selectUserDetails} from "./selectors";
import DetailList from "../../DetailList";

const styles = () => ({
  items: {
    marginTop: "2.2em"
  }
});

const UserInfo = ({
  setLayerOpen,
  items,
  classes,
  id,
}) => (
  <Modal
    onClose={() => {
      setLayerOpen(false);
    }}
    open={open}
    title=""
  >
    <Grid container direction="column">
      <Grid item className={classes.items}>
        <DetailList elevation={0} items={items} id={id} />
      </Grid>
    </Grid>
  </Modal>
);

const propMap = {
  open: selectLayerOpen,
  userId: selectUserId,
  user: selectUser,
  items: selectUserDetails,
  windowHeight: selectWindowHeight,
  windowWidth: selectWindowWidth,
};

const actionMap = {
  setLayerOpen: setLayerOpenAction,
  loadUser: loadUserAction,
  unloadUser: unloadUserAction,
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
  }),
)(UserInfo);
