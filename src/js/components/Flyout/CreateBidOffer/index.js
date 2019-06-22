import React from "react";
import PropTypes from "prop-types";
import { compose, withHandlers, withState } from "recompose";
import { withRouter } from "react-router-dom";

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

import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";
import withDimensions from "../../../HOCs/withDimensions";
import { resetOffer } from "../../../actions/createOffer";
import { createBidOffer } from "../../../actions/offers";
import {
  selectBidFormCoin,
  selectBidId,
  selectBidOfferTotal,
  selectBidOwner,
  selectBidPrice,
  selectBidFormVolume,
  selectContactInfo,
  selectOfferFormVolume,
  selectUserId,
  selectUsername,
  selectIsDarkMode
} from "../../../selectors/index";
import { ValidatorForm } from "react-material-ui-form-validator";
import { cleanInputs } from "../../../constants/validation";
import {
  setNavIndex as setNavIndexAction,
  setNotification
} from "../../../actions/app";
import { getIndexFromPath } from "../../../utils/location";
import { COLBALT, DARK_GREEN, WHITE } from "../../../constants/colors";

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
  }
});

const CreateBidOffer = ({
  classes,
  activeIndex,
  setActiveIndex,
  handleBack,
  handleNext,
  resetOffer,
  handleError,
  isDarkMode
}) => (
  <Flyout
    onClose={() => {
      resetOffer();
      setActiveIndex(0);
    }}
    size={8}
    title="Make an offer to sell"
  >
    <Grid
      style={{
        margin: "30px"
      }}
    >
      <Stepper
        activeStep={activeIndex}
        orientation="vertical"
        style={{
          background: isDarkMode ? DARK_GREEN : WHITE
        }}
      >
        {STEPS.map((step, index) => {
          return (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
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
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>Offer successfully created.</Typography>
        </Paper>
      )}
    </Grid>
  </Flyout>
);

CreateBidOffer.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

const propMap = {
  coin: selectBidFormCoin,
  max: selectBidFormVolume,
  volume: selectOfferFormVolume,
  contactInfo: selectContactInfo,
  price: selectBidPrice,
  userId: selectUserId,
  owner: selectBidOwner,
  total: selectBidOfferTotal,
  postId: selectBidId,
  username: selectUsername,
  isDarkMode: selectIsDarkMode
};

const actionMap = {
  setLayerOpen: setLayerOpenAction,
  resetOffer,
  setNavIndex: setNavIndexAction
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withDimensions,
  withRouter,
  withState("activeIndex", "setActiveIndex", 0),
  withHandlers({
    handleSubmit: ({
      volume,
      userId,
      owner,
      price,
      coin,
      contactInfo,
      postId,
      setActiveIndex,
      setLayerOpen,
      resetOffer,
      history,
      username,
      setNavIndex
    }) => () => {
      // clean the text inputs
      const inputs = cleanInputs(contactInfo);

      const offer = {
        volume,
        userId,
        owner,
        price,
        coin,
        contactInfo: inputs[contactInfo],
        postId,
        username
      };

      createBidOffer(offer);
      setTimeout(() => {
        setLayerOpen(false);
        setActiveIndex(0);
        history.push("/dashboard");
        setNavIndex(getIndexFromPath("/dashboard"));
        const data = {
          title: "You have a new offer!",
          body: `${username} offered to sell $${price} worth of ${coin}.`,
          owner
        };
        setNotification(data);
      }, 1500);
      resetOffer();
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
)(CreateBidOffer);
