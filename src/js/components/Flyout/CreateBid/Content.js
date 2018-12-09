import React from "react";
import { compose, withHandlers } from "recompose";

import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import coins from "../../../constants/coins";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import {
  selectBidLatitude,
  selectBidLongitude,
  selectBidUseCurrentLocation,
  selectBidFormVolume,
  selectFormattedBidFormPrice,
  selectWindowWidth,
  selectBidCoin,
  selectBidFormTotal, selectBidFormContactInfo, selectBidFormCoin
} from "../../../selectors";
import mapper from "../../../utils/connect";
import {
  setBidCoin as setBidCoinAction, setBidContactInfo,
  setBidLatitude as setBidLatitudeAction,
  setBidLongitude as setBidLongitudeAction,
  setBidPrice as setBidPriceAction,
  setBidUseCurrentLocation as setBidUseCurrentLocationAction,
  setBidVolume as setBidVolumeAction
} from "../../../actions/createBid";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
import LocationSelector from "../../LocationSelector";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";

const CreateBidContent = ({
  index,
  coin,
  volume,
  price,
  total,
  contactInfo,
  lat,
  lng,
  width,
  useCurrentLocation,
  handleDrag,
  handleToggle,
  setBidCoin,
  setBidPrice,
  setBidVolume,
  setBidContactInfo
}) => {
  switch (index) {
    case 0:
      return (
        <FormControl margin="dense" fullWidth={true}>
          <Select
            variant="outlined"
            native
            value={coin}
            onChange={({ target }) => setBidCoin(target.value)}
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
            onChange={({ target }) => setBidVolume(target.value || 0)}
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
            onChange={({ target }) => setBidPrice(target.value)}
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
            onChange={({ target }) => setBidContactInfo(target.value)}
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
  coin: selectBidFormCoin,
  volume: selectBidFormVolume,
  price: selectFormattedBidFormPrice,
  total: selectBidFormTotal,
  contactInfo: selectBidFormContactInfo,
  lat: selectBidLatitude,
  lng: selectBidLongitude,
  useCurrentLocation: selectBidUseCurrentLocation,
  width: selectWindowWidth
};

const actionMap = {
  setBidCoin: setBidCoinAction,
  setBidVolume: setBidVolumeAction,
  setBidPrice: setBidPriceAction,
  setBidLatitude: setBidLatitudeAction,
  setBidLongitude: setBidLongitudeAction,
  setUseCurrentLocation: setBidUseCurrentLocationAction,
  setBidContactInfo
};

export default compose(
  mapper(propMap, actionMap),
  withHandlers({
    handleToggle: ({
      useCurrentLocation,
      setUseCurrentLocation,
      setBidLatitude,
      setBidLongitude
    }) => () => {
      setUseCurrentLocation(!useCurrentLocation);
      if (navigator && navigator.geolocation && !useCurrentLocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          setBidLatitude(coords.latitude);
          setBidLongitude(coords.longitude);
        });
      }
    },
    handleDrag: ({ setBidLatitude, setBidLongitude }) => item => {
      setBidLatitude(item.latLng.lat());
      setBidLongitude(item.latLng.lng());
    }
  })
)(CreateBidContent);
