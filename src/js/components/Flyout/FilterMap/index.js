import React from "react";
import { compose, withHandlers } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";

import {
  selectFilter,
  selectFilterCoin,
  selectFilterDistance
} from "../../../selectors/index";
import {
  setFilterDistance as setFilterDistanceAction,
  setFilterCoin as setFilterCoinAction,
  setFilterType as setFilterTypeAction,
  setFilter as setFilterAction
} from "../../../actions/filters";
import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { types } from "../../../constants/filters";
import Flyout from "../index";

import Grid from "@material-ui/core/Grid/Grid";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import {selectCurrencyItems, selectFilterType} from "../../../selectors";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Button from "@material-ui/core/Button/Button";
import { cleanInputs, DISTANCE } from "../../../constants/validation";

const styles = () => ({
  root: {
    margin: "30px"
  }
});

const FilterMap = ({
  classes,
  distance,
  coin,
  setLayerOpen,
  setFilterDistance,
  setFilterCoin,
  setFilter,
  setFilterType,
  handleSubmit,
  handleSetDistance,
  coins,
  type
}) => (
  <Flyout
    size={3}
    onClose={() => setLayerOpen(false)}
  >
    <Grid className={classes.root}>
      <ValidatorForm autoComplete="on" onSubmit={handleSubmit}>
        <FormControl margin="dense" fullWidth={true}>
          <InputLabel>Type</InputLabel>
          <Select
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
        <br />
        <FormControl margin="dense" fullWidth={true}>
          <InputLabel>Coin</InputLabel>
          <Select
            variant="outlined"
            native
            value={coin}
            onChange={({ target }) => setFilterCoin(target.value)}
          >
            {coins.map(item => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
          <br />
          <TextValidator
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
          <Button variant="raised" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </ValidatorForm>
    </Grid>
  </Flyout>
);

const propMap = {
  distance: selectFilterDistance,
  coin: selectFilterCoin,
  coins: selectCurrencyItems,
  type: selectFilterType,
  filter: selectFilter
};

const actionMap = {
  setFilterDistance: setFilterDistanceAction,
  setFilterCoin: setFilterCoinAction,
  setFilterType: setFilterTypeAction,
  setFilter: setFilterAction,
  setLayerOpen: setLayerOpenAction
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withHandlers({
    handleSetDistance: ({ setFilterDistance }) => distance => {
      const inputs = cleanInputs(distance);
      setFilterDistance(inputs[distance]);
    },
    handleSubmit: ({ setFilter, setLayerOpen }) => () => {
      setFilter();
      setLayerOpen(false);
    }
  })
)(FilterMap);
