import { stateReducer } from "./utils";
import { CURRENCY_NAMES_LOAD, LAST_PRICE_LOAD, SET_QR } from "../actions";

const initialState = {
  currencies: [],
  currenciesLoaded: false,
  lastPrice: "",
  QR: "",
};

const handlers = {
  [CURRENCY_NAMES_LOAD]: (state, action) => ({
    currencies: action.data,
    currenciesLoaded: true
  }),
  [LAST_PRICE_LOAD]: (state, action) => ({
    lastPrice: action.data
  }),
  [SET_QR]: (state, action) => ({
    QR: action.data
  })
};

export default stateReducer(initialState, handlers);
