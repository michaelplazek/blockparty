import React from "react";
import { compose, lifecycle, withHandlers } from "recompose";
import { withRouter } from "react-router-dom";
import theme from "../../../theme";
import { VERSION } from "../../constants/app";

import mapper from "../../utils/connect";
import {
  deleteUser,
  logOutUser as logOutUserAction,
  updateUser
} from "../../actions/session";

import PageHeader from "../../components/PageHeader";
import withDimensions from "../../HOCs/withDimensions";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import {
  selectMyAsksLoaded,
  selectMyBidsLoaded,
  selectMyOffersLoaded,
  selectScreenHeight,
  selectTransactionsLoaded,
  selectUserBio,
  selectUserCanDelete,
  selectUserId,
  selectUsername,
  totalActionItems
} from "../../selectors";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import { ValidatorForm } from "react-material-ui-form-validator";
import { loadMyAsks as loadMyAsksAction } from "../../actions/asks";
import { loadMyBids as loadMyBidsAction } from "../../actions/bids";
import { loadOffersByUser as loadOffersByUserAction } from "../../actions/offers";
import { loadTransactions as loadTransactionsAction } from "../../actions/transactions";
import withNav from "../../HOCs/withNav";

const styles = () => ({
  top: {
    paddingTop: "1em"
  },
  bottom: {
    marginBottom: "0.5em"
  },
  deleteInfo: {
    marginBottom: "0.5em"
  },
  version: {
    marginTop: "0.2em"
  }
});

const Settings = ({
  classes,
  height,
  bio,
  history,
  handleUpdate,
  handleDelete,
  canDelete,
  totalItems,
  windowWidth
}) => (
  <div>
    <PageHeader
      leftHandLabel="Settings"
      rightHandButton="Back"
      rightHandAction={() => history.goBack()}
    />
    <div>
      <Grid
        container
        className={classes.top}
        style={{ height: `${height}px` }}
        direction="column"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <ValidatorForm autoComplete="off" onSubmit={handleUpdate}>
            <Grid
              container
              className={classes.top}
              direction="column"
              alignItems="center"
            >
              <Grid
                item
                style={{
                  width: `${windowWidth - 30}px`
                }}
              >
                <TextField
                  id="bio-field"
                  fullWidth
                  label="Bio"
                  multiline
                  rows="4"
                  defaultValue={bio}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  Update
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
        </Grid>
        <Grid item className={classes.bottom}>
          <Grid container direction="column" alignItems="center">
            <Grid item className={classes.deleteInfo}>
              <Typography variant="caption">
                To delete account, first delete all posts and offers
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                style={
                  totalItems === 0
                    ? theme.palette.errorButton
                    : theme.palette.disabledErrorButton
                }
                onClick={handleDelete}
                disabled={!canDelete}
              >
                Delete Account
              </Button>
            </Grid>
            <Grid item className={classes.version}>
              <Typography variant="caption">{VERSION}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  </div>
);

const propMap = {
  height: selectScreenHeight,
  username: selectUsername,
  userId: selectUserId,
  bio: selectUserBio,
  canDelete: selectUserCanDelete,
  totalItems: totalActionItems,
  asksLoaded: selectMyAsksLoaded,
  bidsLoaded: selectMyBidsLoaded,
  offersLoaded: selectMyOffersLoaded,
  transactionsLoaded: selectTransactionsLoaded
};

const actionMap = {
  logOut: logOutUserAction,
  updateUser,
  deleteUser,
  loadMyAsks: loadMyAsksAction,
  loadMyBids: loadMyBidsAction,
  loadOffersByUser: loadOffersByUserAction,
  loadTransactions: loadTransactionsAction
};

export default compose(
  mapper(propMap, actionMap),
  withRouter,
  withStyles(styles),
  lifecycle({
    componentDidMount() {
      const {
        loadMyAsks,
        loadMyBids,
        loadOffersByUser,
        loadTransactions,
        userId,
        asksLoaded,
        bidsLoaded,
        offersLoaded,
        transactionsLoaded
      } = this.props;
      if (!asksLoaded) {
        loadMyAsks(userId);
      }
      if (!bidsLoaded) {
        loadMyBids(userId);
      }
      if (!offersLoaded) {
        loadOffersByUser(userId);
      }
      if (!transactionsLoaded) {
        loadTransactions(userId);
      }
    }
  }),
  withHandlers({
    handleUpdate: ({ userId, updateUser }) => () => {
      const text = document.getElementById("bio-field").value;
      const update = { id: userId, bio: text };
      updateUser(update);
    },
    handleDelete: ({ userId, deleteUser }) => () => {
      deleteUser(userId);
    }
  }),
  withDimensions,
  withNav,
)(Settings);
