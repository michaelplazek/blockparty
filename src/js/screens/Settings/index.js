import React from "react";
import {compose, lifecycle, withHandlers, withState} from "recompose";
import { withRouter } from "react-router-dom";
import { dark, light } from "../../../theme";
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
  selectIsDarkMode,
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
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { loadMyAsks as loadMyAsksAction } from "../../actions/asks";
import { loadMyBids as loadMyBidsAction } from "../../actions/bids";
import { loadOffersByUser as loadOffersByUserAction } from "../../actions/offers";
import { loadTransactions as loadTransactionsAction } from "../../actions/transactions";
import withNav from "../../HOCs/withNav";
import PermissionStatuses from "./PermissionStatuses";
import {WHITE} from "../../constants/colors";

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
  updatedBio,
  history,
  handleUpdate,
  setUpdatedBio,
  handleDelete,
  canDelete,
  totalItems,
  windowWidth,
  buttonText,
  disabled,
  isDarkMode
}) => {
  const theme = isDarkMode ? dark : light;
  return (
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
            <ValidatorForm
              autoComplete="off"
              onSubmit={handleUpdate}
            >
              <Grid
                container
                className={classes.top}
                direction="column"
                alignItems="center"
              >
                <Grid
                  item
                  style={{
                    width: `${windowWidth - 30}px`,
                  }}
                >
                  <TextValidator
                    id="bio-field"
                    name='bio'
                    fullWidth
                    label="Bio"
                    multiline
                    rows="4"
                    value={updatedBio}
                    onChange={({ target }) => setUpdatedBio(target.value)}
                    margin="normal"
                    variant="outlined"
                    validators={['maxStringLength:250']}
                    errorMessages={['must be under 250 characters']}
                    inputProps={{
                      style: {
                        color: isDarkMode ? WHITE : undefined
                      }
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" disabled={disabled} color="primary" type="submit">
                    {buttonText}
                  </Button>
                </Grid>
              </Grid>
            </ValidatorForm>
          </Grid>
          <Grid item>
            <PermissionStatuses />
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
              <Grid item>
                <Button
                  onClick={() => history.push('/policy')}
                  variant='text'
                >
                  View our policy
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
  )
};

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
  transactionsLoaded: selectTransactionsLoaded,
  isDarkMode: selectIsDarkMode
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
    },
  }),
  withState('updatedBio', 'setUpdatedBio', ({ bio }) => bio),
  withState('disabled', 'setDisabled', false),
  withState('buttonText', 'setButtonText', "Update"),
  withHandlers({
    handleUpdate: ({ userId, updateUser, updatedBio, setButtonText, setDisabled }) => () => {
      const update = { id: userId, bio: updatedBio };
      setButtonText("Updating...");
      setDisabled(true);
      setTimeout(() => {
        setButtonText("Update");
        setDisabled(false);
      }, 1000);
      updateUser(update);
    },
    handleDelete: ({ userId, deleteUser }) => () => {
      deleteUser(userId);
    }
  }),
  withDimensions,
  withNav,
)(Settings);
