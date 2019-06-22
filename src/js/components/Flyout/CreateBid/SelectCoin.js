import React from "react";
import { compose, lifecycle } from "recompose";
import mapper from "../../../utils/connect";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import numeral from "numeral";
import { COST } from "../../../constants/currency";
import {
  selectBidFormCoin,
  selectBidCurrencyItems,
  selectCurrentLocation
} from "../../../selectors";
import {
  setBidCoin as setBidCoinAction,
  setBidLatitude as setBidLatitudeAction,
  setBidLongitude as setBidLongitudeAction,
  setBidPrice as setBidPriceAction
} from "../../../actions/createBid";
import { loadLastPrice as loadLastPriceAction } from "../../../actions/metrics";
import SearchableSelect from "../../SearchableSelect";
import find from "lodash/find";

const SelectCoin = ({
  coins,
  coin,
  loadLastPrice,
  setBidPrice,
  setBidCoin
}) => (
  <FormControl margin="dense" fullWidth={true}>
    <SearchableSelect
      suggestions={coins}
      selectedItem={find(coins, item => item.label === coin)}
      onSelect={item => {
        loadLastPrice(item).then(response => {
          setBidPrice(numeral(response.data).format(COST));
        });
        setBidCoin(item);
      }}
      value={coin}
    />
  </FormControl>
);

const propMap = {
  coins: selectBidCurrencyItems,
  coin: selectBidFormCoin,
  currentLocation: selectCurrentLocation
};

const actionMap = {
  setBidCoin: setBidCoinAction,
  loadLastPrice: loadLastPriceAction,
  setBidPrice: setBidPriceAction,
  setBidLatitude: setBidLatitudeAction,
  setBidLongitude: setBidLongitudeAction
};

export default compose(
  mapper(propMap, actionMap),
  lifecycle({
    componentDidMount() {
      this.props.setBidLatitude(this.props.currentLocation.lat);
      this.props.setBidLongitude(this.props.currentLocation.lng);
    }
  })
)(SelectCoin);
