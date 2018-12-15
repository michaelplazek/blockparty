import React from "react";
import { compose, withHandlers } from "recompose";
import { withRouter } from "react-router-dom";
import theme from "../../../theme";
import { VERSION } from "../../constants/app";

import mapper from "../../utils/connect";
import { logOutUser as logOutUserAction } from "../../actions/session";
import { setLayerOpen as setLayerOpenAction } from "../../actions/layers";

import PageHeader from "../../components/PageHeader";
import withDimensions from "../../HOCs/withDimensions";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import {
  selectScreenHeight,
  selectUserBio,
  selectUsername
} from "../../selectors";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import {ValidatorForm} from "react-material-ui-form-validator";

const styles = () => ({
  top: {
    paddingTop: "1em"
  },
  bottom: {
    marginBottom: "0.5em"
  },
  version: {
    marginTop: "0.2em"
  }
});

const Settings = ({
  logOut,
  classes,
  height,
  username,
  bio,
  items,
  history,
                    handleUpdate
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
          <ValidatorForm
            ref="form"
            autoComplete="off"
            onSubmit={handleUpdate}
            onError={errors => console.log(errors)}
          >
            <Grid
              container
              className={classes.top}
              direction="column"
              alignItems="center"
            >
              <Grid item>
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
                <Button
                  variant="raised"
                  color="primary"
                  type="submit"
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
        </Grid>
        <Grid item className={classes.bottom}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Button
                variant="raised"
                style={theme.palette.errorButton}
                type="submit"
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
  bio: selectUserBio
};

const actionMap = {
  logOut: logOutUserAction,
  setLayerOpen: setLayerOpenAction
};

export default compose(
  mapper(propMap, actionMap),
  withRouter,
  withStyles(styles),
  withHandlers({
    handleUpdate: () => () => {
      const text = document.getElementById('bio-field').value;
    }
  }),
  withDimensions
)(Settings);
