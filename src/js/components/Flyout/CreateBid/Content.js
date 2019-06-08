import React from "react";
import { compose, withHandlers } from "recompose";

import { TextValidator } from "react-material-ui-form-validator";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import {
  selectBidLatitude,
  selectBidLongitude,
  selectBidUseCurrentLocation,
  selectBidFormVolume,
  selectFormattedBidFormPrice,
  selectWindowWidth,
  selectBidFormTotal,
  selectBidFormContactInfo,
  selectBidFormCoin,
  selectBidFormPrice,
  selectCurrentLocation,
  selectBidFormVolumeInUSD,
  selectFormattedBidFormVolume,
  selectCurrencyItems,
  selectLastPrice
} from "../../../selectors";
import mapper from "../../../utils/connect";
import {
  setBidCoin as setBidCoinAction,
  setBidContactInfo,
  setBidLatitude as setBidLatitudeAction,
  setBidLongitude as setBidLongitudeAction,
  setBidPrice as setBidPriceAction,
  setBidUseCurrentLocation as setBidUseCurrentLocationAction,
  setBidVolume as setBidVolumeAction,
  setBidVolumeInUSD
} from "../../../actions/createBid";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
import LocationSelector from "../../LocationSelector";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import { getMinimalUnit } from "../../../utils/validate";
import { loadLastPrice } from "../../../actions/metrics";
import numeral from "numeral";
import { USD_DECIMALS } from "../../../constants/currency";
import SelectCoin from "./SelectCoin";

const CreateBidContent = ({
  index,
  coin,
  volume,
  volumeInUSD,
  price,
  formattedPrice,
  formattedVolume,
  total,
  contactInfo,
  lat,
  lng,
  width,
  useCurrentLocation,
  handleDrag,
  handleToggle,
  setBidPrice,
  setBidVolume,
  setBidContactInfo,
  setBidVolumeInUSD,
  currentLocation,
  lastPrice
}) => {
  switch (index) {
    case 0:
      return <SelectCoin />;
    case 1:
      return (
        <FormControl margin="dense" fullWidth={true}>
          <Typography variant="caption">{`Suggested price: ${numeral(
            lastPrice
          ).format(USD_DECIMALS)}`}</Typography>
          <TextValidator
            id="price"
            name="price"
            value={price}
            onChange={({ target }) => setBidPrice(target.value)}
            validators={["isPositive", `minFloat:0.01`, "required"]}
            errorMessages={[
              "invalid number",
              "under minimum volume",
              "this field is required"
            ]}
            helperText={formattedPrice}
            margin="dense"
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">{`/${coin}`}</InputAdornment>
              )
            }}
          />
        </FormControl>
      );
    case 2:
      return (
        <FormControl margin="dense" fullWidth={true}>
          <Grid container>
            <Grid item>
              <TextValidator
                id="volume"
                name="volume"
                value={volume}
                onChange={({ target }) => {
                  const totalInUSD = price * target.value;
                  setBidVolume(target.value);
                  setBidVolumeInUSD(totalInUSD);
                }}
                validators={[
                  "isPositive",
                  `minFloat:${getMinimalUnit()}`,
                  "required"
                ]}
                errorMessages={[
                  "invalid number",
                  "under minimum volume",
                  "this field is required"
                ]}
                margin="dense"
                variant="standard"
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
                  setBidVolumeInUSD(target.value);
                  setBidVolume(total);
                }}
                validators={["isPositive", `minFloat:0.01`, "required"]}
                errorMessages={[
                  "invalid number",
                  "under minimum volume",
                  "this field is required"
                ]}
                helperText={formattedVolume}
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
      );
    case 3:
      return (
        <div>
          <FormControl margin="dense" fullWidth={true}>
            <FormControlLabel
              control={
                <Switch
                  checked={useCurrentLocation}
                  onChange={handleToggle}
                  value="location"
                />
              }
              label="Use current location"
            />
          </FormControl>
          {!useCurrentLocation && (
            <LocationSelector
              showLabels={false}
              markers={[{ id: 0, lat, lng }]}
              height="10em"
              width={`${width / 2}px`}
              position="relative"
              onDrag={coords => handleDrag(coords)}
              currentLocation={currentLocation}
            />
          )}
        </div>
      );
    case 4:
      return (
        <FormControl margin="dense" fullWidth={true}>
          <TextValidator
            id="contactInfo"
            name="contactInfo"
            value={contactInfo}
            onChange={({ target }) => setBidContactInfo(target.value)}
            validators={["required"]}
            errorMessages={["this field is required"]}
            margin="dense"
            helperText="Usually a phone number"
            variant="standard"
          />
        </FormControl>
      );
    case 5:
      return (
        <Grid container direction="column">
          <Typography>Type: {coin}</Typography>
          <Typography>Amount: {volume}</Typography>
          <Typography>Price: {formattedPrice}</Typography>
          <Typography variant="subheading">Total: {total}</Typography>
        </Grid>
      );
  }
};

const propMap = {
  coin: selectBidFormCoin,
  coins: selectCurrencyItems,
  volume: selectBidFormVolume,
  volumeInUSD: selectBidFormVolumeInUSD,
  price: selectBidFormPrice,
  formattedPrice: selectFormattedBidFormPrice,
  formattedVolume: selectFormattedBidFormVolume,
  total: selectBidFormTotal,
  contactInfo: selectBidFormContactInfo,
  lat: selectBidLatitude,
  lng: selectBidLongitude,
  useCurrentLocation: selectBidUseCurrentLocation,
  width: selectWindowWidth,
  currentLocation: selectCurrentLocation,
  lastPrice: selectLastPrice
};

const actionMap = {
  setBidCoin: setBidCoinAction,
  setBidVolume: setBidVolumeAction,
  setBidVolumeInUSD,
  setBidPrice: setBidPriceAction,
  setBidLatitude: setBidLatitudeAction,
  setBidLongitude: setBidLongitudeAction,
  setUseCurrentLocation: setBidUseCurrentLocationAction,
  setBidContactInfo,
  loadLastPrice
};

export default compose(
  mapper(propMap, actionMap),
  withHandlers({
    handleToggle: ({
      useCurrentLocation,
      setUseCurrentLocation,
      setBidLatitude,
      setBidLongitude,
      currentLocation
    }) => () => {
      setUseCurrentLocation(!useCurrentLocation);
      setBidLatitude(currentLocation.lat);
      setBidLongitude(currentLocation.lng);
    },
    handleDrag: ({ setBidLatitude, setBidLongitude }) => item => {
      setBidLatitude(item.latLng.lat());
      setBidLongitude(item.latLng.lng());
    }
  }),
)(CreateBidContent);
