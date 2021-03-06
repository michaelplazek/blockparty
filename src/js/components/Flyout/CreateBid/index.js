import React from "react";
import { compose, withHandlers, withState } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";

import Flyout from "../index";

import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import Stepper from "@material-ui/core/Stepper/Stepper";
import { STEPS } from "./constants";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import StepContent from "@material-ui/core/StepContent/StepContent";
import Content from "./Content";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";

import {
  selectBidFormCoin,
  selectBidLatitude,
  selectBidLongitude,
  selectBidFormPrice,
  selectBidFormVolume,
  selectUserId,
  selectUsername,
  selectBidFormContactInfo,
  selectBidCurrencyItems,
  selectLastPrice,
  selectIsDarkMode
} from "../../../selectors";
import {
  createBid as createBidAction,
  loadMyBids as loadMyBidsAction
} from "../../../actions/bids";
import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";
import { resetBid as resetBidAction } from "../../../actions/createBid";
import { ValidatorForm } from "react-material-ui-form-validator";
import { cleanInputs } from "../../../constants/validation";
import {
  DARK_GREEN, GOLD,
  WHITE
} from "../../../constants/colors";

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  },
  completed: {
    color: `${WHITE} !important`
  },
  active: {
    color: `${GOLD} !important`
  },
});

const CreateBid = ({
  classes,
  activeIndex,
  setActiveIndex,
  handleBack,
  handleNext,
  resetBid,
  handleError,
  isDarkMode
}) => {
  const stepClasses = isDarkMode ? {
    completed: classes.completed,
    active: classes.active
  } : {};
  return (
    <Flyout
      onClose={() => {
        resetBid();
        setActiveIndex(0);
      }}
      title="Create new bid"
    >
      <Grid
        style={{
          margin: "30px",
        }}
      >
        <Typography variant="caption">
          Please note that there is a limit of one bid <b>per coin</b> at any
          time.
        </Typography>
        <Stepper
          activeStep={activeIndex}
          orientation="vertical"
          style={{
            background: isDarkMode ? DARK_GREEN : WHITE,
          }}
        >
          {STEPS.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel classes={stepClasses}>{step}</StepLabel>
                <StepContent>
                  <ValidatorForm
                    autoComplete="on"
                    onSubmit={handleNext}
                    onError={handleError}
                    instantValidate={false}
                  >
                    <Content index={index} />
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeIndex === 0}
                          onClick={handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className={classes.button}
                        >
                          {activeIndex === STEPS.length - 1 ? "Finish" : "Next"}
                        </Button>
                      </div>
                    </div>
                  </ValidatorForm>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeIndex === STEPS.length && (
          <Paper
            square
            elevation={0}
            className={classes.resetContainer}
            style={{
              background: isDarkMode ? DARK_GREEN : undefined
            }}
          >
            <Typography color={isDarkMode ? "textSecondary" : undefined}>
              Bid successfully created.
            </Typography>
          </Paper>
        )}
      </Grid>
    </Flyout>
  );
};

const propMap = {
  coin: selectBidFormCoin,
  volume: selectBidFormVolume,
  price: selectBidFormPrice,
  contactInfo: selectBidFormContactInfo,
  lat: selectBidLatitude,
  lng: selectBidLongitude,
  username: selectUsername,
  userId: selectUserId,
  lastPrice: selectLastPrice,
  coins: selectBidCurrencyItems,
  isDarkMode: selectIsDarkMode
};

const actionMap = {
  createBid: createBidAction,
  loadMyBids: loadMyBidsAction,
  setLayerOpen: setLayerOpenAction,
  resetBid: resetBidAction
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withState("activeIndex", "setActiveIndex", 0),
  withHandlers({
    handleSubmit: ({
      userId,
      coin,
      volume,
      price,
      lat,
      lng,
      username,
      createBid,
      loadMyBids,
      setLayerOpen,
      resetBid,
      setActiveIndex,
      contactInfo
    }) => () => {
      const inputs = cleanInputs(contactInfo);

      const bid = {
        coin,
        volume: parseFloat(volume),
        price: parseFloat(price),
        contactInfo: inputs[contactInfo],
        owner: username,
        lat,
        lng
      };

      createBid(bid).then(() => loadMyBids(userId));
      setTimeout(() => {
        setLayerOpen(false);
        setActiveIndex(0);
      }, 1500);
      resetBid();
    }
  }),
  withHandlers({
    handleBack: ({ activeIndex, setActiveIndex }) => () => {
      setActiveIndex(activeIndex - 1);
    },
    handleNext: ({ activeIndex, setActiveIndex, handleSubmit }) => () => {
      setActiveIndex(activeIndex + 1);
      if (activeIndex === STEPS.length - 1) {
        handleSubmit();
      }
    },
    handleError: () => () => {},
    handleSubmit: () => () => {}
  })
)(CreateBid);
