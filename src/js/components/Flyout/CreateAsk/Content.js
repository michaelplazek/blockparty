import React from "react";
import { compose, withHandlers } from "recompose";

import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import coins from "../../../constants/coins";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import {
  selectAskFormCoin,
  selectAskLatitude,
  selectAskLongitude,
  selectAskUseCurrentLocation,
  selectAskFormVolume,
  selectFormattedAskPrice,
  selectWindowWidth,
  selectAskFormTotal, selectAskFormContactInfo
} from "../../../selectors";
import mapper from "../../../utils/connect";
import {
  setAskCoin as setAskCoinAction,
  setAskPrice as setAskPriceAction,
  setAskVolume as setAskVolumeAction,
  setAskLatitude as setAskLatitudeAction,
  setAskLongitude as setAskLongitudeAction,
  setAskUseCurrentLocation as setAskUseCurrentLocationAction, setAskContactInfo
} from "../../../actions/createAsk";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
import LocationSelector from "../../LocationSelector";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";

const CreateAskContent = ({
  index,
  checked,
  toggle,
  coin,
  volume,
  price,
  total,
  width,
  lat,
  lng,
  setAskCoin,
  setAskPrice,
  setAskVolume,
  handleDrag,
  useCurrentLocation,
  handleToggle,
  contactInfo,
  setAskContactInfo,
}) => {
  switch (index) {
    case 0:
      return (
        <FormControl margin="dense" fullWidth={true}>
          <Select
            variant="outlined"
            native
            value={coin}
            onChange={({ target }) => setAskCoin(target.value)}
          >
            {coins.map(coin => (
              <option key={coin} value={coin}>
                {coin}
              </option>
            ))}
          </Select>
        </FormControl>
      );
    case 1:
      return (
        <FormControl margin="dense" fullWidth={true}>
          <TextField
            id="volume"
            value={volume}
            onChange={({ target }) => setAskVolume(target.value || 0)}
            margin="dense"
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">{coin}</InputAdornment>
              )
            }}
          />
        </FormControl>
      );
    case 2:
      return (
        <FormControl margin="dense" fullWidth={true}>
          <TextField
            id="price"
            value={price}
            onChange={({ target }) => setAskPrice(target.value)}
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
              width={`${width - width / 9}px`}
              position="relative"
              onDrag={coords => handleDrag(coords)}
            />
          )}
        </div>
      );
    case 4:
      return (
        <FormControl margin="dense" fullWidth={true}>
          <TextField
            id="contactInfo"
            value={contactInfo}
            onChange={({ target }) => setAskContactInfo(target.value)}
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
          <Typography>Volume: {volume}</Typography>
          <Typography>Price: {price}</Typography>
          <Typography variant="subheading">Total: {total}</Typography>
        </Grid>
      );
  }
};

const propMap = {
  coin: selectAskFormCoin,
  volume: selectAskFormVolume,
  price: selectFormattedAskPrice,
  total: selectAskFormTotal,
  contactInfo: selectAskFormContactInfo,
  lat: selectAskLatitude,
  lng: selectAskLongitude,
  width: selectWindowWidth,
  useCurrentLocation: selectAskUseCurrentLocation
};

const actionMap = {
  setAskCoin: setAskCoinAction,
  setAskVolume: setAskVolumeAction,
  setAskPrice: setAskPriceAction,
  setAskLatitude: setAskLatitudeAction,
  setAskLongitude: setAskLongitudeAction,
  setUseCurrentLocation: setAskUseCurrentLocationAction,
  setAskContactInfo
};

export default compose(
  mapper(propMap, actionMap),
  withHandlers({
    handleToggle: ({
      useCurrentLocation,
      setUseCurrentLocation,
      setAskLatitude,
      setAskLongitude
    }) => () => {
      setUseCurrentLocation(!useCurrentLocation);
      if (navigator && navigator.geolocation && !useCurrentLocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          setAskLatitude(coords.latitude);
          setAskLongitude(coords.longitude);
        });
      }
    },
    handleDrag: ({ setAskLatitude, setAskLongitude }) => item => {
      setAskLatitude(item.latLng.lat());
      setAskLongitude(item.latLng.lng());
    }
  })
)(CreateAskContent);
