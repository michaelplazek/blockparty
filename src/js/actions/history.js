import {
  LOAD_TRANSACTION_HISTORY
} from "./index";
import {wrappedFetchWithParams} from "../api/utils";

export const loadTransactionHistory = userId => dispatch =>
  wrappedFetchWithParams("history", undefined, "GET", `/${userId}`).then(
    response => {
      dispatch({ type: LOAD_TRANSACTION_HISTORY, data: response });
    }
  );