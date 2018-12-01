import {
  LOAD_TRANSACTIONS,
  UNLOAD_TRANSACTIONS,
  CREATE_TRANSACTION
} from "./index";
import { wrappedFetch, wrappedFetchWithParams } from "../api/utils";

export const loadTransactions = userId => dispatch =>
  wrappedFetchWithParams("transactions", undefined, "GET", `/${userId}`).then(
    response => {
      dispatch({ type: LOAD_TRANSACTIONS, data: response });
    }
  );

export const unloadAsks = () => dispatch => dispatch({ type: UNLOAD_TRANSACTIONS });

export const createTransaction = (offerId, owner) => dispatch =>
  wrappedFetch("transaction", { offerId, owner }, "POST").then(response => {
    dispatch({ type: CREATE_TRANSACTION })
  });
