import React from "react";
import { compose, lifecycle } from "recompose";
import mapper from "../../../utils/connect";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import numeral from "numeral";
import { COST } from "../../../constants/currency";
import {
  selectAskFormCoin,
  selectAskCurrencyItems,
  selectCurrentLocation,
} from "../../../selectors";
import {
  setAskCoin as setAskCoinAction,
  setAskLatitude as setAskLatitudeAction,
  setAskLongitude as setAskLongitudeAction,
  setAskPrice as setAskPriceAction
} from "../../../actions/createAsk";
import { loadLastPrice as loadLastPriceAction } from "../../../actions/metrics";

const SelectCoin = ({
  coins,
  coin,
  loadLastPrice,
  setAskPrice,
  setAskCoin
}) => (
  <FormControl margin="dense" fullWidth={true}>
    <Select
      variant="outlined"
      native
      value={coin}
      onChange={({ target }) => {
        loadLastPrice(target.value).then(response => {
          setAskPrice(numeral(response.data).format(COST));
        });
        setAskCoin(target.value);
      }}
    >
      {coins.map(coin => (
        <option disabled={coin.disabled} key={coin.value} value={coin.value}>
          {coin.label}
        </option>
      ))}
    </Select>
  </FormControl>
);

const propMap = {
  coins: selectAskCurrencyItems,
  coin: selectAskFormCoin,
  currentLocation: selectCurrentLocation,
};

const actionMap = {
  setAskCoin: setAskCoinAction,
  loadLastPrice: loadLastPriceAction,
  setAskPrice: setAskPriceAction,
  setAskLatitude: setAskLatitudeAction,
  setAskLongitude: setAskLongitudeAction
};

export default compose(
  mapper(propMap, actionMap),
  lifecycle({
    componentDidMount() {
      this.props.setAskLatitude(this.props.currentLocation.lat);
      this.props.setAskLongitude(this.props.currentLocation.lng);
    }
  })
)(SelectCoin);
