import React from "react";
import { compose, withHandlers } from "recompose";

import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import coins from "../../../constants/coins";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import {
  selectAskCoin,
  selectAskLatitude,
  selectAskLongitude,
  selectAskUseCurrentLocation,
  selectAskVolume,
  selectFormattedAskPrice,
  selectWindowWidth
} from "../../../selectors";
import mapper from "../../../utils/connect";
import {
  setAskCoin as setAskCoinAction,
  setAskPrice as setAskPriceAction,
  setAskVolume as setAskVolumeAction,
  setAskLatitude as setAskLatitudeAction,
  setAskLongitude as setAskLongitudeAction,
  setAskUseCurrentLocation as setAskUseCurrentLocationAction
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
  width,
  lat,
  lng,
  setAskCoin,
  setAskPrice,
  setAskVolume,
  handleDrag,
  useCurrentLocation,
  handleToggle
}) => {
  switch (index) {
    case 0:
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
        <Grid container direction="column">
          <Typography>Type: {coin}</Typography>
          <Typography>Volume: {volume}</Typography>
          <Typography>Price: {price}</Typography>
        </Grid>
      );
  }
};

const propMap = {
  coin: selectAskCoin,
  volume: selectAskVolume,
  price: selectFormattedAskPrice,
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
  setUseCurrentLocation: setAskUseCurrentLocationAction
};

export default compose(
  mapper(propMap, actionMap),
  withHandlers({
  })
)(CreateAskContent);
