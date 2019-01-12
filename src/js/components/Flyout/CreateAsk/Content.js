import React from "react";
import { compose, lifecycle, withHandlers } from "recompose";

import { TextValidator } from "react-material-ui-form-validator";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import coins from "../../../constants/coins";
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
  selectCurrentLocation
} from "../../../selectors";
import mapper from "../../../utils/connect";
import {
  setAskCoin as setAskCoinAction,
  setAskPrice as setAskPriceAction,
  setAskVolume as setAskVolumeAction,
  setAskLatitude as setAskLatitudeAction,
  setAskLongitude as setAskLongitudeAction,
  setAskUseCurrentLocation as setAskUseCurrentLocationAction,
  setAskContactInfo
} from "../../../actions/createAsk";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
import LocationSelector from "../../LocationSelector";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import { getMinimalUnit } from "../../../utils/validate";

const CreateAskContent = ({
  index,
  checked,
  toggle,
  coin,
  volume,
  price,
  formattedPrice,
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
  currentLocation
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
                onChange={({ target }) => setAskVolume(target.value)}
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
                id="volume"
                name="volume"
                value={volume}
                onChange={({ target }) => setAskVolume(target.value)}
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
            onChange={({ target }) => setAskContactInfo(target.value)}
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
          <Typography>Volume: {volume}</Typography>
          <Typography>Price: {formattedPrice}</Typography>
          <Typography variant="subheading">Total: {total}</Typography>
        </Grid>
      );
  }
};

const propMap = {
  coin: selectAskFormCoin,
  volume: selectAskFormVolume,
  price: selectAskFormPrice,
  formattedPrice: selectFormattedAskFormPrice,
  total: selectAskFormTotal,
  contactInfo: selectAskFormContactInfo,
  lat: selectAskLatitude,
  lng: selectAskLongitude,
  width: selectWindowWidth,
  useCurrentLocation: selectAskUseCurrentLocation,
  currentLocation: selectCurrentLocation
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
  }),
  lifecycle({
    componentDidMount() {
      this.props.setAskLatitude(this.props.currentLocation.lat);
      this.props.setAskLongitude(this.props.currentLocation.lng);
    }
  })
)(CreateAskContent);
