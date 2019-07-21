import { stateReducer } from "./utils";
import {
  LOAD_TRANSACTION_HISTORY
} from "../actions";

const initialState = {
  transactionHistory: [],
  transactionHistoryLoaded: false,
};

const handlers = {
  [LOAD_TRANSACTION_HISTORY]: (_, action) => ({
    transactionHistory: action.data,
    transactionHistoryLoaded: true,
  }),
};

export default stateReducer(initialState, handlers);