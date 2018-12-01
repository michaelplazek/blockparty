import {
  LOAD_TRANSACTIONS,
  UNLOAD_TRANSACTIONS
} from "./index";
import { wrappedFetch, wrappedFetchWithParams } from "../api/utils";

export const loadTransactions = userId => dispatch =>
  wrappedFetchWithParams("transactions", undefined, "GET", `/${userId}`).then(
    response => {
      dispatch({ type: LOAD_TRANSACTIONS, data: response });
    }
  );

export const unloadAsks = () => dispatch => dispatch({ type: UNLOAD_TRANSACTIONS });

export const createTransaction = (offerId, owner) =>
  wrappedFetch("transaction", { offerId, owner }, "POST");
