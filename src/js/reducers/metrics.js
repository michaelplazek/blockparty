import { stateReducer } from "./utils";
import { CURRENCY_NAMES_LOAD, LAST_PRICE_LOAD } from "../actions";

const initialState = {
  currencies: [],
  currenciesLoaded: false,
  lastPrice: ""
};

const handlers = {
  [CURRENCY_NAMES_LOAD]: (state, action) => ({
    currencies: action.data,
    currenciesLoaded: true
  }),
  [LAST_PRICE_LOAD]: (state, action) => ({
    lastPrice: action.data
  })
};

export default stateReducer(initialState, handlers);
