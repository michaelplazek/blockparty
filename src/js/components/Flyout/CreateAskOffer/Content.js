import React from "react";
import { compose } from "recompose";

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
  selectOfferFormVolumeInUSD
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

const styles = () => ({
  info: {
    padding: "5px",
    margin: "5px 5px 5px 0px"
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
  totalFormattedInUSD
}) => {
  switch (index) {
    case 0:
      return (
        <div>
          <FormControl margin="dense" fullWidth={true}>
            <Grid container>
              <Grid item>
                <TextValidator
                  id="volume"
                  name="volume"
                  value={volume}
                  onChange={({ target }) => {
                    const totalInUSD = price * target.value;
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
                />
              </Grid>
              <Grid item>
                <TextValidator
                  id="volumeInUSD"
                  name="volumeInUSD"
                  value={volumeInUSD}
                  onChange={({ target }) => {
                    const total = (target.value / price).toFixed(6);
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
                />
              </Grid>
            </Grid>
          </FormControl>
          <Grid container direction="column" className={classes.info}>
            <Typography>Type: {coin}</Typography>
            <Typography>Price: {formattedPrice}</Typography>
            <Typography>Amount: {volume}</Typography>
            <Typography variant="subheading">Total: {total}</Typography>
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
          />
        </FormControl>
      );
    case 2:
      return (
        <Grid container direction="column">
          <Typography>Type: {coin}</Typography>
          <Typography>Price: {formattedPrice}</Typography>
          <Typography>Amount: {volume}</Typography>
          <Typography variant="subheading">Total: {total}</Typography>
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
  totalFormattedInUSD: selectFormattedAskOfferTotalInUSD
};

const actionMap = {
  setOfferVolume,
  setContactInfo,
  setError,
  setOfferVolumeInUSD
};

export default compose(
  withStyles(styles),
  mapper(propMap, actionMap)
)(CreateAskContent);
