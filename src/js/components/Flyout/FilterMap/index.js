import React from "react";
import { compose, withHandlers } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";

import {
  selectFilter,
  selectFilterCoin,
  selectFilterDistance,
  selectFocusField
} from "../../../selectors/index";
import {
  setFilterDistance as setFilterDistanceAction,
  setFilterCoin as setFilterCoinAction,
  setFilterType as setFilterTypeAction,
  setFilter as setFilterAction,
  setFilterPrice as setFilterPriceAction,
  setFilterReputation as setFilterReputationAction
} from "../../../actions/filters";
import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { types } from "../../../constants/filters";
import Flyout from "../index";

import Grid from "@material-ui/core/Grid/Grid";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import {selectCurrencyItems, selectFilterReputation, selectFilterType} from "../../../selectors";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Button from "@material-ui/core/Button/Button";
import { cleanInputs, DISTANCE } from "../../../constants/validation";
import {
  setAskInfo as setAskInfoAction,
  setBidInfo as setBidInfoAction,
  setTouched as setTouchedAction
} from "../../../actions/app";
import StarRating from "react-star-ratings";
import {Typography} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

const styles = () => ({
  root: {
    margin: "30px"
  }
});

const FilterMap = ({
  classes,
  distance,
  coin,
  reputation,
  setFilterReputation,
  setFilterCoin,
  setFilterType,
  handleSubmit,
  handleSetDistance,
  coins,
  type,
  focusField
}) => (
  <Flyout size={5}>
    <Grid className={classes.root}>
      <ValidatorForm autoComplete="on" onSubmit={handleSubmit}>
        <FormControl margin="dense" fullWidth={true}>
          <InputLabel>Type</InputLabel>
          <Select
            inputProps={{
              autoFocus: focusField === "type"
            }}
            variant="outlined"
            native
            value={type}
            onChange={({ target }) => setFilterType(target.value)}
          >
            {types.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl margin="dense" fullWidth={true}>
          <InputLabel>Coin</InputLabel>
          <Select
            inputProps={{
              autoFocus: focusField === "coin"
            }}
            variant="outlined"
            native
            value={coin}
            onChange={({ target }) => {
              setFilterCoin(target.value);
            }}
          >
            {coins.map(item => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl margin="dense" fullWidth={true}>
          <InputLabel>User Reputation</InputLabel>
          <Select
            inputProps={{
              autoFocus: focusField === "reputation"
            }}
            variant="outlined"
            value={reputation}
            onChange={({ target }) => setFilterReputation(target.value)}
          >
            {[1, 2, 3, 4].map(item => (
              <MenuItem value={item} label={item}>
                <Grid
                  container
                  direction='row'
                >
                  <Grid item style={{ marginRight: '0.5em' }}>
                    <StarRating
                      rating={item}
                      starRatedColor="#ffc107"
                      numberOfStars={5}
                      starDimension="1em"
                      starSpacing="0.1em"
                      name="rating"
                    />
                  </Grid>
                  <Grid item>
                    <Typography>
                      & up
                    </Typography>
                  </Grid>
                </Grid>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl margin="dense" fullWidth={true}>
          <TextValidator
            inputProps={{
              autoFocus: focusField === "distance"
            }}
            id="distance"
            name="distance"
            label="Distance Away"
            value={distance}
            onChange={({ target }) => handleSetDistance(target.value)}
            validators={DISTANCE.VALIDATORS}
            errorMessages={DISTANCE.MESSAGES}
            margin="dense"
            variant="standard"
            InputProps={{
              endAdornment: <InputAdornment position="start">mi</InputAdornment>
            }}
          />
          <br />
        </FormControl>
        <Grid container justify="center">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </ValidatorForm>
    </Grid>
  </Flyout>
);

const propMap = {
  distance: selectFilterDistance,
  reputation: selectFilterReputation,
  coin: selectFilterCoin,
  coins: selectCurrencyItems,
  type: selectFilterType,
  filter: selectFilter,
  focusField: selectFocusField
};

const actionMap = {
  setFilterDistance: setFilterDistanceAction,
  setFilterReputation: setFilterReputationAction,
  setFilterCoin: setFilterCoinAction,
  setFilterType: setFilterTypeAction,
  setFilterPrice: setFilterPriceAction,
  setFilter: setFilterAction,
  setLayerOpen: setLayerOpenAction,
  setTouched: setTouchedAction,
  setAskInfo: setAskInfoAction,
  setBidInfo: setBidInfoAction
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withHandlers({
    handleSetDistance: ({ setFilterDistance }) => distance => {
      const inputs = cleanInputs(distance);
      setFilterDistance(inputs[distance]);
    },
    handleSubmit: ({
      setFilter,
      setLayerOpen,
      setFilterPrice,
      setTouched,
      setAskInfo,
      setBidInfo
    }) => () => {
      setFilterPrice(undefined);
      setFilter();
      setTouched(false);
      setAskInfo("Mid Market Price");
      setBidInfo(undefined);
      setLayerOpen(false);
    }
  })
)(FilterMap);
