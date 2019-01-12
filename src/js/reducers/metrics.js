import { stateReducer } from "./utils";
import numeral from 'numeral';
import {
  CURRENCY_NAMES_LOAD,
  LAST_PRICE_LOAD
} from "../actions";
import {USD_DECIMALS} from "../constants/currency";

const initialState = {
  currencies: [],
  currenciesLoaded: false,
  lastPrice: '',
};

const handlers = {
  [CURRENCY_NAMES_LOAD]: (state, action) => ({
    currencies: action.data,
    currenciesLoaded: true
  }),
  [LAST_PRICE_LOAD]: (state, action) => ({
    lastPrice: numeral(action.data).format(USD_DECIMALS),
  })
};

export default stateReducer(initialState, handlers);
