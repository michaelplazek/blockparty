import { stateReducer } from "./utils";
import {
  LOAD_TRANSACTIONS,
  UNLOAD_TRANSACTIONS
} from "../actions";

const initialState = {
  transactions: [],
  transactionsLoaded: false,
};

const handlers = {
  [LOAD_TRANSACTIONS]: (state, action) => ({
    transactions: action.data,
    transactionsLoaded: true
  }),
  [UNLOAD_TRANSACTIONS]: () => ({
    transactions: initialState.asks,
    transactionsLoaded: false
  }),
};

export default stateReducer(initialState, handlers);