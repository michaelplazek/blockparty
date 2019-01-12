import { stateReducer } from "./utils";
import {
  CURRENCY_NAMES_LOAD
} from "../actions";

const initialState = {
  currencies: [],
  currenciesLoaded: false
};

const handlers = {
  [CURRENCY_NAMES_LOAD]: (state, action) => ({
    currencies: action.data,
    currenciesLoaded: true
  }),
};

export default stateReducer(initialState, handlers);
