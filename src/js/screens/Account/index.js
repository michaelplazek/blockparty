import React from "react";
import {compose, lifecycle, withHandlers, withState} from "recompose";
import { withRouter } from "react-router-dom";
import { faCog, faCopy } from "@fortawesome/free-solid-svg-icons";
import {CopyToClipboard} from 'react-copy-to-clipboard';

import mapper from "../../utils/connect";
import {
  loadUserFromToken as loadUserFromTokenAction,
  logOutUser as logOutUserAction
} from "../../actions/session";

import PageHeader from "../../components/PageHeader";
import withDimensions from "../../HOCs/withDimensions";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import {
  selectLayer, selectLayerOpen,
  selectRun,
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
import Joyride from "react-joyride";
import {accountSteps, isVisited, tourStyle} from "../../config/tour";
import Tooltip from "../../components/TourTooltip";
import {setRun as setRunAction} from "../../actions/app";
import EndOfTour from "../../components/Modal/EndOfTour";
import {setLayer as setLayerAction, setLayerOpen as setLayerOpenAction} from "../../actions/layers";
import {truncateString} from "../../utils/strings";

const styles = () => ({
  body: {
    marginTop: "4em"
  },
  items: {
    margin: "0.5em"
  },
  button: {
    alignSelf: "center",
    marginBottom: "1em"
  },
  copy: {
    cursor: 'pointer',
    marginLeft: "0.5em"
  },
  suggestions: {
    marginTop: "1em",
    marginBottom: "0.25em"
  }
});

const Account = ({
  logOut,
  classes,
  username,
  bio,
  items,
  history,
  run,
  handleCallback,
  layer,
  open,
  copied,
  setCopied,
}) => (
  <div>
    {open &&
      layer === "END_OF_TOUR" && (
        <EndOfTour />
    )}
    <PageHeader
      leftHandLabel="Account"
      rightHandIcon={<FontAwesomeIcon icon={faCog} />}
      rightHandAction={() => history.push("/settings")}
    />
    <Grid container className={classes.body} direction="column">

      <Grid item container direction='column' justify='flex-start'>
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
        <Grid item className={`${classes.items} account-info`}>
          <DetailList items={items} />
        </Grid>
        <Grid item className={classes.button}>
          <Button onClick={logOut}>Log Out</Button>
        </Grid>
      </Grid>

      <Grid item container justify='center'>
        <Grid item>
          <Typography variant='caption'>
            Like the app? Donate Monero to support our developers.
          </Typography>
        </Grid>
        <Grid item container direction='row' justify='center'>
          <Grid item>
            <Typography variant='caption'>
              {truncateString(process.env.MONERO_ADDRESS)}
            </Typography>
          </Grid>
          <Grid item className={classes.copy}>
            <CopyToClipboard
              text={process.env.MONERO_ADDRESS}
              onCopy={() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1000);
              }}
            >
              <FontAwesomeIcon icon={faCopy} />
            </CopyToClipboard>
          </Grid>
          {copied && (
            <Grid item className={classes.copy}>
              <Typography variant='caption'>
                Copied!
              </Typography>
            </Grid>
          )}
        </Grid>
        <Grid
          container
          item
          alignItems='center'
          direction='column'
          className={classes.suggestions}
        >
          <Grid item>
            <Typography variant='caption'>
              Report bugs or send suggestions to
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant='caption'
              component="a"
              href='mailto:blockpartyapp@protonmail.com'
            >
              blockpartyapp@protonmail.com
            </Typography>
          </Grid>
        </Grid>
      </Grid>

    </Grid>
    <Joyride
      steps={accountSteps}
      run={run}
      styles={tourStyle}
      continuous={true}
      tooltipComponent={Tooltip}
      disableOverlay={true}
      callback={handleCallback}
    />
  </div>
);

const propMap = {
  height: selectWindowHeight,
  username: selectUsername,
  bio: selectUserBio,
  reputation: selectUserReputation,
  items: selectUserDetails,
  run: selectRun,
  layer: selectLayer,
  open: selectLayerOpen,
};

const actionMap = {
  logOut: logOutUserAction,
  loadUserFromToken: loadUserFromTokenAction,
  setRun: setRunAction,
  setLayer: setLayerAction,
  setLayerOpen: setLayerOpenAction,
};

export default compose(
  mapper(propMap, actionMap),
  withState('copied', 'setCopied', false),
  withRouter,
  withStyles(styles),
  withDimensions,
  lifecycle({
    componentDidMount() {
      const { setRun } = this.props;
      if (!isVisited()) {
        setRun(true);
      }
    }
  }),
  withHandlers({
    handleCallback: ({ setLayer, setLayerOpen }) => (stats) => {
      if (stats.status === 'finished') {
        setLayer("END_OF_TOUR");
        setLayerOpen(true);
      }
    },
  }),
  withPolling(({ loadUserFromToken }) => {
    loadUserFromToken();
  }, 5000),
  withVisited
)(Account);
