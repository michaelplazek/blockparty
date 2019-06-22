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
import { createAskOffer } from "../../../actions/offers";
import {
  selectAskFormCoin,
  selectAskId,
  selectAskOfferTotal,
  selectAskOwner,
  selectAskPrice,
  selectContactInfo,
  selectOfferFormVolume,
  selectUserId,
  selectAskVolume,
  selectUsername, selectIsDarkMode
} from "../../../selectors";
import { ValidatorForm } from "react-material-ui-form-validator";
import { cleanInputs } from "../../../constants/validation";
import {
  setNavIndex as setNavIndexAction,
  setNotification
} from "../../../actions/app";
import { getIndexFromPath } from "../../../utils/location";
import {DARK_GREEN} from "../../../constants/colors";

const styles = theme => ({
  root: {
    margin: "30px"
  },
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

const CreateAskOffer = ({
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
    title="Make an offer to buy"
  >
    <Grid className={classes.root}>
      <Stepper
        activeStep={activeIndex}
        orientation="vertical"
        style={{
          background: isDarkMode ? DARK_GREEN : undefined
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

CreateAskOffer.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

const propMap = {
  coin: selectAskFormCoin,
  max: selectAskVolume,
  volume: selectOfferFormVolume,
  contactInfo: selectContactInfo,
  price: selectAskPrice,
  userId: selectUserId,
  owner: selectAskOwner,
  total: selectAskOfferTotal,
  postId: selectAskId,
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
      createAskOffer(offer);
      setTimeout(() => {
        setLayerOpen(false);
        setActiveIndex(0);
        history.push("/dashboard");
        setNavIndex(getIndexFromPath("/dashboard"));
        const data = {
          title: "You have a new offer!",
          body: `${username} offered to buy $${price} worth of ${coin}.`,
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
)(CreateAskOffer);
