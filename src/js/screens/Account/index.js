import React from "react";
import { compose, lifecycle, withHandlers, withState } from "recompose";
import { withRouter } from "react-router-dom";
import { faCog, faCopy, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
  selectModal,
  selectRun,
  selectUserBio, selectUserId,
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
import { accountSteps, isVisited, tourStyle } from "../../config/tour";
import Tooltip from "../../components/TourTooltip";
import { setRun as setRunAction } from "../../actions/app";
import EndOfTour from "../../components/Modal/EndOfTour";
import QR from "../../components/Modal/QR";
import {
  setModal as setModalAction,
  setModalOpen as setModalOpenAction
} from "../../actions/layers";
import { truncateString } from "../../utils/strings";
import { setQR as setQRAction } from "../../actions/metrics";
import withNav from "../../HOCs/withNav";
import { BLUE, GOLD } from "../../constants/colors";
import withMode from "../../HOCs/withMode";
import withDarkMode from "../../HOCs/withDarkMode";

const styles = () => ({
  body: {
    marginTop: "1.2em"
  },
  items: {
    margin: "0.3em"
  },
  bio: {
    marginLeft: "1.5em",
    marginRight: "1.5em"
  },
  button: {
    alignSelf: "center",
    marginBottom: "1em",
    marginTop: "0.75em"
  },
  likeTheApp: {
    marginBottom: "0.5em"
  },
  icon: {
    cursor: "pointer",
    marginLeft: "0.5em"
  },
  suggestions: {
    marginTop: "0.75em",
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
  modal,
  moneroCopied,
  setMoneroCopied,
  bitcoinCopied,
  setBitcoinCopied,
  handleQR,
  isDarkMode
}) => {
  const ICON_COLOR = isDarkMode ? GOLD : BLUE;
  return (
    <Grid>
      {modal === "END_OF_TOUR" && <EndOfTour />}
      {modal === "QR" && <QR />}
      <PageHeader
        leftHandLabel="Account"
        rightHandIcon={<FontAwesomeIcon icon={faCog} />}
        rightHandAction={() => history.push("/settings")}
      />
      <Grid container className={classes.body} direction="column">
        <Grid item container direction="column">
          <Grid item className={classes.items}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Typography
                  color={isDarkMode ? "secondary" : undefined}
                  variant="display1"
                >
                  {username}
                </Typography>
              </Grid>
              <Grid item className={classes.bio}>
                <Typography variant="caption">{bio}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={`${classes.items} account-info`} align='center'>
              <Grid item sm={8} lg={6} xl={4}>
                <DetailList items={items} />
                <Grid item className={classes.button}>
                  <Button
                    color={isDarkMode ? 'secondary' : undefined}
                    variant='contained'
                    onClick={logOut}
                  >
                    Log Out
                  </Button>
                </Grid>
                <Grid item container justify="center">
                  <Grid item className={classes.likeTheApp}>
                    <Typography variant="caption">
                      Like the app? Donate to support our developers.
                    </Typography>
                  </Grid>
                  <Grid item container direction="row" justify="center">
                    <Grid item>
                      <Typography variant="caption">
                        {`Monero: ${truncateString(process.env.MONERO_ADDRESS)}`}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.icon}>
                      <FontAwesomeIcon
                        style={{ color: ICON_COLOR }}
                        onClick={() => handleQR("XMR")}
                        icon={faQrcode}
                      />
                    </Grid>
                    <Grid item className={classes.icon}>
                      <CopyToClipboard
                        text={process.env.MONERO_ADDRESS}
                        onCopy={() => {
                          setMoneroCopied(true);
                          setTimeout(() => setMoneroCopied(false), 1000);
                        }}
                      >
                        <FontAwesomeIcon style={{ color: ICON_COLOR }} icon={faCopy} />
                      </CopyToClipboard>
                    </Grid>
                    {moneroCopied && (
                      <Grid item className={classes.icon}>
                        <Typography variant="caption">Copied!</Typography>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item container direction="row" justify="center">
                    <Grid item>
                      <Typography variant="caption">
                        {`Bitcoin: ${truncateString(process.env.BITCOIN_ADDRESS)}`}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.icon}>
                      <FontAwesomeIcon
                        style={{ color: ICON_COLOR }}
                        onClick={() => handleQR("BTC")}
                        icon={faQrcode}
                      />
                    </Grid>
                    <Grid item className={classes.icon}>
                      <CopyToClipboard
                        text={process.env.BITCOIN_ADDRESS}
                        onCopy={() => {
                          setBitcoinCopied(true);
                          setTimeout(() => setBitcoinCopied(false), 1000);
                        }}
                      >
                        <FontAwesomeIcon style={{ color: ICON_COLOR }} icon={faCopy} />
                      </CopyToClipboard>
                    </Grid>
                    {bitcoinCopied && (
                      <Grid item className={classes.icon}>
                        <Typography variant="caption">Copied!</Typography>
                      </Grid>
                    )}
                  </Grid>
                  <Grid
                    container
                    item
                    alignItems="center"
                    direction="column"
                    className={classes.suggestions}
                  >
                    <Grid item>
                      <Typography variant="caption">
                        Report bugs or send suggestions to
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="caption"
                        component="a"
                        href="mailto:blockpartyapp@protonmail.com"
                      >
                        blockpartyapp@protonmail.com
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Joyride
        steps={accountSteps}
        run={run}
        styles={tourStyle(isDarkMode)}
        continuous={true}
        tooltipComponent={Tooltip}
        disableOverlay={true}
        callback={handleCallback}
      />
    </Grid>
  );
};

const propMap = {
  height: selectWindowHeight,
  username: selectUsername,
  bio: selectUserBio,
  reputation: selectUserReputation,
  items: selectUserDetails,
  run: selectRun,
  modal: selectModal,
  userId: selectUserId
};

const actionMap = {
  logOut: logOutUserAction,
  loadUserFromToken: loadUserFromTokenAction,
  setRun: setRunAction,
  setModal: setModalAction,
  setModalOpen: setModalOpenAction,
  setQR: setQRAction
};

export default compose(
  mapper(propMap, actionMap),
  withMode,
  withDarkMode,
  withState("moneroCopied", "setMoneroCopied", false),
  withState("bitcoinCopied", "setBitcoinCopied", false),
  withRouter,
  withStyles(styles),
  withDimensions,
  lifecycle({
    componentDidMount() {
      const { setRun, loadUserFromToken, userId } = this.props;
      isVisited(userId).then(visited => {
        if (!visited) {
          setRun(true);
        }
      });
      loadUserFromToken();
    }
  }),
  withHandlers({
    handleCallback: ({ setModal, setModalOpen }) => stats => {
      if (stats.status === "finished") {
        setModal("END_OF_TOUR");
        setModalOpen(true);
      }
    },
    handleQR: ({ setModalOpen, setModal, setQR }) => type => {
      setQR(type);
      setModal("QR");
      setModalOpen(true);
    }
  }),
  withPolling(({ loadUserFromToken }) => {
    loadUserFromToken();
  }, 5000),
  withVisited,
  withNav,
)(Account);
