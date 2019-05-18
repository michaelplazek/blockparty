import React from 'react';
import { compose, lifecycle } from "recompose";
import mapper from "../../../utils/connect";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import numeral from "numeral";
import {COST} from "../../../constants/currency";
import {selectBidFormCoin, selectCurrencyItems, selectCurrentLocation} from "../../../selectors";
import {
  setBidCoin as setBidCoinAction,
  setBidLatitude as setBidLatitudeAction,
  setBidLongitude as setBidLongitudeAction,
  setBidPrice as setBidPriceAction
} from "../../../actions/createBid";
import {loadLastPrice as loadLastPriceAction} from "../../../actions/metrics";

const SelectCoin = ({
  coins,
  coin,
  loadLastPrice,
  setBidPrice,
  setBidCoin,
}) => (
  <FormControl margin="dense" fullWidth={true}>
    <Select
      variant="outlined"
      native
      value={coin}
      onChange={({ target }) => {
        loadLastPrice(target.value).then(response => {
          setBidPrice(numeral(response.data).format(COST));
        });
        setBidCoin(target.value);
      }}
    >
      {coins.map(coin => (
        <option key={coin.value} value={coin.value}>
          {coin.label}
        </option>
      ))}
    </Select>
  </FormControl>
);

const propMap = {
  coins: selectCurrencyItems,
  coin: selectBidFormCoin,
  currentLocation: selectCurrentLocation,
};

const actionMap = {
  setBidCoin: setBidCoinAction,
  loadLastPrice: loadLastPriceAction,
  setBidPrice: setBidPriceAction,
  setBidLatitude: setBidLatitudeAction,
  setBidLongitude: setBidLongitudeAction,
};

export default compose(
  mapper(propMap, actionMap),
  lifecycle({
    componentDidMount() {
      this.props.setBidLatitude(this.props.currentLocation.lat);
      this.props.setBidLongitude(this.props.currentLocation.lng);
    }
  }),
)(SelectCoin)