import React from "react";
import { compose, withHandlers } from "recompose";

import { TextValidator } from "react-material-ui-form-validator";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import {
  selectAskOfferTotal,
  selectContactInfo,
  selectOfferFormVolume,
  selectAskVolume,
  selectAskDisplayPrice,
  selectAskCoin,
  selectAskOfferTotalInUSD,
  selectFormattedAskOfferTotalInUSD,
  selectAskPrice,
  selectFormattedOfferFormVolume,
  selectOfferFormVolumeInUSD,
  selectIsDarkMode
} from "../../../selectors";
import mapper from "../../../utils/connect";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import {
  setContactInfo,
  setOfferVolume,
  setOfferVolumeInUSD
} from "../../../actions/createOffer";
import withStyles from "@material-ui/core/styles/withStyles";
import { getMinimalUnit } from "../../../utils/validate";
import { setError } from "../../../actions/errors";
import Chip from "@material-ui/core/Chip";
import { WHITE } from "../../../constants/colors";

const styles = () => ({
  info: {
    padding: "5px",
    margin: "5px 5px 5px 0px"
  },
  chip: {
    marginRight: "2px"
  }
});

const CreateAskContent = ({
  index,
  classes,
  coin,
  volume,
  volumeInUSD,
  formattedVolume,
  price,
  formattedPrice,
  total,
  max,
  contactInfo,
  setOfferVolume,
  setOfferVolumeInUSD,
  setContactInfo,
  totalInUSD,
  totalFormattedInUSD,
  handleChipClick,
  isDarkMode
}) => {
  switch (index) {
    case 0:
      return (
        <div>
          <FormControl margin="dense" fullWidth={true}>
            <Grid direction="column" container>
              <Grid item>
                <Grid container>
                  <Grid className={classes.chip} item>
                    <Chip
                      clickable={true}
                      onClick={() => handleChipClick(0.25)}
                      label="25%"
                      size="small"
                      variant="outlined"
                      style={{
                        marginRight: "2px",
                        color: isDarkMode ? WHITE : undefined
                      }}
                    />
                  </Grid>
                  <Grid className={classes.chip} item>
                    <Chip
                      clickable={true}
                      onClick={() => handleChipClick(0.5)}
                      label="50%"
                      size="small"
                      variant="outlined"
                      style={{
                        marginRight: "2px",
                        color: isDarkMode ? WHITE : undefined
                      }}
                    />
                  </Grid>
                  <Grid className={classes.chip} item>
                    <Chip
                      clickable={true}
                      onClick={() => handleChipClick(1)}
                      label="100%"
                      size="small"
                      variant="outlined"
                      style={{
                        marginRight: "2px",
                        color: isDarkMode ? WHITE : undefined
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <TextValidator
                  id="volume"
                  name="volume"
                  value={volume}
                  onChange={({ target }) => {
                    const totalInUSD = (price * target.value).toFixed(3);
                    setOfferVolume(target.value);
                    setOfferVolumeInUSD(totalInUSD);
                  }}
                  validators={[
                    `maxFloat:${max}`,
                    "isPositive",
                    `minFloat:${getMinimalUnit()}`,
                    "required"
                  ]}
                  errorMessages={[
                    "over max volume",
                    "invalid number",
                    "under minimum volume",
                    "this field is required"
                  ]}
                  margin="dense"
                  variant="standard"
                  helperText={`Max of ${max}`}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">{coin}</InputAdornment>
                    )
                  }}
                  inputProps={{
                    style: {
                      color: isDarkMode ? WHITE : undefined
                    }
                  }}
                />
              </Grid>
              <Grid item>
                <TextValidator
                  id="volumeInUSD"
                  name="volumeInUSD"
                  value={volumeInUSD}
                  onChange={({ target }) => {
                    const total = (target.value / price).toFixed(8);
                    setOfferVolumeInUSD(target.value);
                    setOfferVolume(total);
                  }}
                  validators={[
                    "isPositive",
                    `minFloat:0.01`,
                    `maxFloat:${totalInUSD}`,
                    "required"
                  ]}
                  errorMessages={[
                    "invalid number",
                    "under minimum volume",
                    "over max volume",
                    "this field is required"
                  ]}
                  helperText={`${formattedVolume} (Max of ${totalFormattedInUSD})`}
                  margin="dense"
                  variant="standard"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">USD</InputAdornment>
                    )
                  }}
                  inputProps={{
                    style: {
                      color: isDarkMode ? WHITE : undefined
                    }
                  }}
                />
              </Grid>
            </Grid>
          </FormControl>
          <Grid container direction="column" className={classes.info}>
            <Typography color={isDarkMode ? "textSecondary" : undefined}>
              Type: {coin}
            </Typography>
            <Typography color={isDarkMode ? "textSecondary" : undefined}>
              Price: {formattedPrice}
            </Typography>
            <Typography color={isDarkMode ? "textSecondary" : undefined}>
              Amount: {volume}
            </Typography>
            <Typography
              color={isDarkMode ? "textSecondary" : undefined}
              variant="subheading"
            >
              Total: {total}
            </Typography>
          </Grid>
        </div>
      );
    case 1:
      return (
        <FormControl margin="dense" fullWidth={true}>
          <TextValidator
            id="contactInfo"
            name="contactInfo"
            value={contactInfo}
            onChange={({ target }) => setContactInfo(target.value)}
            validators={["required"]}
            errorMessages={["this field is required"]}
            margin="dense"
            helperText="Usually a phone number"
            variant="standard"
            inputProps={{
              style: {
                color: isDarkMode ? WHITE : undefined
              }
            }}
          />
        </FormControl>
      );
    case 2:
      return (
        <Grid container direction="column">
          <Typography color={isDarkMode ? "textSecondary" : undefined}>
            Type: {coin}
          </Typography>
          <Typography color={isDarkMode ? "textSecondary" : undefined}>
            Price: {formattedPrice}
          </Typography>
          <Typography color={isDarkMode ? "textSecondary" : undefined}>
            Amount: {volume}
          </Typography>
          <Typography
            color={isDarkMode ? "textSecondary" : undefined}
            variant="subheading"
          >
            Total: {total}
          </Typography>
        </Grid>
      );
  }
};

const propMap = {
  coin: selectAskCoin,
  max: selectAskVolume,
  volume: selectOfferFormVolume,
  formattedVolume: selectFormattedOfferFormVolume,
  volumeInUSD: selectOfferFormVolumeInUSD,
  contactInfo: selectContactInfo,
  price: selectAskPrice,
  formattedPrice: selectAskDisplayPrice,
  total: selectAskOfferTotal,
  totalInUSD: selectAskOfferTotalInUSD,
  totalFormattedInUSD: selectFormattedAskOfferTotalInUSD,
  isDarkMode: selectIsDarkMode
};

const actionMap = {
  setOfferVolume,
  setContactInfo,
  setError,
  setOfferVolumeInUSD
};

export default compose(
  withStyles(styles),
  mapper(propMap, actionMap),
  withHandlers({
    handleChipClick: ({
      setOfferVolume,
      setOfferVolumeInUSD,
      max,
      price
    }) => percentage => {
      const updatedVolume = max * percentage;
      const totalInUSD = (price * updatedVolume).toFixed(3);
      setOfferVolume(updatedVolume);
      setOfferVolumeInUSD(totalInUSD);
    }
  })
)(CreateAskContent);
