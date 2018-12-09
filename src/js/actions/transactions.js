import {
  LOAD_TRANSACTIONS,
  UNLOAD_TRANSACTIONS,
  LOAD_TRANSACTION,
  UNLOAD_TRANSACTION,
  CREATE_TRANSACTION,
  COMPLETE_TRANSACTION,
  CANCEL_TRANSACTION
} from "./index";
import { wrappedFetch, wrappedFetchWithParams } from "../api/utils";

export const loadTransactions = userId => dispatch =>
  wrappedFetchWithParams("transactions", undefined, "GET", `/${userId}`).then(
    response => {
      dispatch({ type: LOAD_TRANSACTIONS, data: response });
    }
  );

export const unloadTransactions = () => dispatch =>
  dispatch({ type: UNLOAD_TRANSACTIONS });

export const loadTransaction = id => dispatch =>
  wrappedFetchWithParams("transaction", undefined, "GET", `/${id}`).then(
    response => {
      dispatch({ type: LOAD_TRANSACTION, data: response });
    }
  );

export const unloadTransaction = () => dispatch =>
  dispatch({ type: UNLOAD_TRANSACTION });

export const createTransaction = (offerId, owner) => dispatch =>
  wrappedFetch("transaction", { offerId, owner }, "POST").then(response => {
    dispatch({ type: CREATE_TRANSACTION });
  });

export const completeTransaction = (id, userId) => dispatch =>
  wrappedFetch("transaction_complete", { id, userId }, "POST").then(
    response => {
      dispatch({ type: COMPLETE_TRANSACTION });
    }
  );

export const cancelTransaction = id => dispatch =>
  wrappedFetch("transaction_cancelled", { id }, "POST").then(response => {
    dispatch({ type: CANCEL_TRANSACTION });
  });
