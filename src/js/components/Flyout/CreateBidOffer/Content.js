import React from "react";
import { compose } from "recompose";

import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import {
  selectBidCoin,
  selectBidOfferTotal,
  selectBidFormVolume,
  selectContactInfo,
  selectOfferVolume,
  selectBidDisplayPrice
} from "../../../selectors/index";
import mapper from "../../../utils/connect";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import { setContactInfo, setOfferVolume } from "../../../actions/createOffer";
import withStyles from "@material-ui/core/styles/withStyles";
import { selectBidVolume } from "../../../selectors";

const styles = () => ({
  info: {
    padding: "5px",
    margin: "5px 5px 5px 0px"
  }
});

const CreateBidOfferContent = ({
  index,
  classes,
  coin,
  volume,
  price,
  total,
  max,
  contactInfo,
  setOfferVolume,
  setContactInfo
}) => {
  switch (index) {
    case 0:
      return (
        <div>
          <FormControl margin="dense" fullWidth={true}>
            <TextField
              id="volume"
              value={volume}
              onChange={({ target }) => setOfferVolume(target.value || 0)}
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
          <TextField
            id="contactInfo"
            value={contactInfo}
            onChange={({ target }) => setContactInfo(target.value)}
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
  coin: selectBidCoin,
  max: selectBidVolume,
  volume: selectOfferVolume,
  contactInfo: selectContactInfo,
  price: selectBidDisplayPrice,
  total: selectBidOfferTotal
};

const actionMap = {
  setOfferVolume,
  setContactInfo
};

export default compose(
  withStyles(styles),
  mapper(propMap, actionMap)
)(CreateBidOfferContent);