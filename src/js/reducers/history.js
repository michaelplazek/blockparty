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
    navigationBarHeight: action.data
  }),
};

export default stateReducer(initialState, handlers);