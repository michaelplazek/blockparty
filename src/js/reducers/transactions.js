import { stateReducer } from "./utils";
import {
  LOAD_TRANSACTIONS,
  UNLOAD_TRANSACTIONS,
  LOAD_TRANSACTION,
  UNLOAD_TRANSACTION
} from "../actions";

const initialState = {
  transactions: [],
  transactionsLoaded: false,
  transaction: {},
  transactionLoaded: false
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
  [LOAD_TRANSACTION]: (state, action) => ({
    transaction: action.data,
    transactionLoaded: true
  }),
  [UNLOAD_TRANSACTION]: () => ({
    transaction: initialState.asks,
    transactionLoaded: false
  })
};

export default stateReducer(initialState, handlers);
