import React from "react";
import { compose } from "recompose";

import { TextValidator} from 'react-material-ui-form-validator';
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import {
  selectAskOfferTotal,
  selectContactInfo,
  selectOfferFormVolume,
  selectAskVolume,
  selectAskDisplayPrice,
  selectAskCoin
} from "../../../selectors";
import mapper from "../../../utils/connect";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import { setContactInfo, setOfferVolume } from "../../../actions/createOffer";
import withStyles from "@material-ui/core/styles/withStyles";
import {getMinimalUnit} from "../../../utils/validate";
import {setError} from "../../../actions/errors";

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
  price,
  total,
  max,
  contactInfo,
  setOfferVolume,
  setContactInfo,
}) => {
  switch (index) {
    case 0:
      return (
        <div>
          <FormControl margin="dense" fullWidth={true}>
            <TextValidator
              id="volume"
              name='volume'
              value={volume}
              onChange={({ target }) => setOfferVolume(target.value)}
              validators={[`maxFloat:${max}`, 'isPositive', `minFloat:${getMinimalUnit()}`, 'required']}
              errorMessages={['over max volume', 'invalid number', 'under minimum volume', 'this field is required']}
              margin="dense"
              variant="standard"
              helperText={`Max of ${max}`}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">{coin}</InputAdornment>
                )
              }}
            />
          </FormControl>
          <Grid container direction="column" className={classes.info}>
            <Typography>Type: {coin}</Typography>
            <Typography>Price: {price}</Typography>
            <Typography>Volume: {volume}</Typography>
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
            validators={['required']}
            errorMessages={['this field is required']}
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
          <Typography>Price: {price}</Typography>
          <Typography>Volume: {volume}</Typography>
          <Typography variant="subheading">Total: {total}</Typography>
        </Grid>
      );
  }
};

const propMap = {
  coin: selectAskCoin,
  max: selectAskVolume,
  volume: selectOfferFormVolume,
  contactInfo: selectContactInfo,
  price: selectAskDisplayPrice,
  total: selectAskOfferTotal
};

const actionMap = {
  setOfferVolume,
  setContactInfo,
  setError
};

export default compose(
  withStyles(styles),
  mapper(propMap, actionMap),
)(CreateAskContent);
