import React from "react";
import { compose, withHandlers } from "recompose";
import numeral from "numeral";

import { TextValidator } from "react-material-ui-form-validator";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import {
  selectAskFormCoin,
  selectAskLatitude,
  selectAskLongitude,
  selectAskUseCurrentLocation,
  selectAskFormVolume,
  selectWindowWidth,
  selectAskFormTotal,
  selectAskFormContactInfo,
  selectAskFormPrice,
  selectFormattedAskFormPrice,
  selectCurrentLocation,
  selectAskFormVolumeInUSD,
  selectFormattedAskFormVolume,
  selectCurrencyItems,
  selectLastPrice,
  selectIsDarkMode
} from "../../../selectors";
import mapper from "../../../utils/connect";
import {
  setAskCoin as setAskCoinAction,
  setAskPrice as setAskPriceAction,
  setAskVolume as setAskVolumeAction,
  setAskLatitude as setAskLatitudeAction,
  setAskLongitude as setAskLongitudeAction,
  setAskUseCurrentLocation as setAskUseCurrentLocationAction,
  setAskContactInfo,
  setAskVolumeInUSD
} from "../../../actions/createAsk";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
import LocationSelector from "../../LocationSelector";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import { getMinimalUnit } from "../../../utils/validate";
import { loadLastPrice } from "../../../actions/metrics";
import { USD_DECIMALS } from "../../../constants/currency";
import SelectCoin from "./SelectCoin";
import { WHITE } from "../../../constants/colors";

const CreateAskContent = ({
  index,
  coin,
  lastPrice,
  volume,
  volumeInUSD,
  price,
  formattedPrice,
  formattedVolume,
  total,
  width,
  lat,
  lng,
  setAskPrice,
  setAskVolume,
  handleDrag,
  useCurrentLocation,
  handleToggle,
  contactInfo,
  setAskContactInfo,
  setAskVolumeInUSD,
  currentLocation,
  isDarkMode
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
            onChange={({ target }) => setAskPrice(target.value)}
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
        <FormControl margin="dense" fullWidth={true}>
          <Grid container direction="column">
            <Grid item>
              <TextValidator
                id="volume"
                name="volume"
                value={volume}
                onChange={({ target }) => {
                  const totalInUSD = (price * target.value).toFixed(2);
                  setAskVolume(target.value);
                  setAskVolumeInUSD(totalInUSD);
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
                  const total = (target.value / price).toFixed(6);
                  setAskVolumeInUSD(target.value);
                  setAskVolume(total);
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
                inputProps={{
                  style: {
                    color: isDarkMode ? WHITE : undefined
                  }
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
              isDarkMode={isDarkMode}
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
            onChange={({ target }) => setAskContactInfo(target.value)}
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
    case 5:
      return (
        <Grid container direction="column">
          <Typography color={isDarkMode ? "textSecondary" : undefined}>
            Type: {coin}
          </Typography>
          <Typography color={isDarkMode ? "textSecondary" : undefined}>
            Amount: {volume}
          </Typography>
          <Typography color={isDarkMode ? "textSecondary" : undefined}>
            Price: {formattedPrice}
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
  coin: selectAskFormCoin,
  coins: selectCurrencyItems,
  volume: selectAskFormVolume,
  price: selectAskFormPrice,
  formattedPrice: selectFormattedAskFormPrice,
  formattedVolume: selectFormattedAskFormVolume,
  total: selectAskFormTotal,
  contactInfo: selectAskFormContactInfo,
  lat: selectAskLatitude,
  lng: selectAskLongitude,
  width: selectWindowWidth,
  useCurrentLocation: selectAskUseCurrentLocation,
  currentLocation: selectCurrentLocation,
  volumeInUSD: selectAskFormVolumeInUSD,
  lastPrice: selectLastPrice,
  isDarkMode: selectIsDarkMode
};

const actionMap = {
  setAskCoin: setAskCoinAction,
  setAskVolume: setAskVolumeAction,
  setAskPrice: setAskPriceAction,
  setAskLatitude: setAskLatitudeAction,
  setAskLongitude: setAskLongitudeAction,
  setUseCurrentLocation: setAskUseCurrentLocationAction,
  setAskContactInfo,
  setAskVolumeInUSD,
  loadLastPrice
};

export default compose(
  mapper(propMap, actionMap),
  withHandlers({
    handleToggle: ({
      useCurrentLocation,
      setUseCurrentLocation,
      setAskLatitude,
      setAskLongitude,
      currentLocation
    }) => () => {
      setUseCurrentLocation(!useCurrentLocation);
      setAskLatitude(currentLocation.lat);
      setAskLongitude(currentLocation.lng);
    },
    handleDrag: ({ setAskLatitude, setAskLongitude }) => item => {
      setAskLatitude(item.latLng.lat());
      setAskLongitude(item.latLng.lng());
    }
  })
)(CreateAskContent);
