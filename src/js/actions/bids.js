import {
  LOAD_BIDS,
  LOAD_BID,
  UNLOAD_BIDS,
  UNLOAD_BID,
  CREATE_BID,
  LOAD_MY_BIDS,
  DELETE_BID
} from "./index";
import { wrappedFetch, wrappedFetchWithParams } from "../api/utils";

export const loadBids = () => dispatch =>
  wrappedFetch("bids").then(response => {
    dispatch({ type: LOAD_BIDS, data: response });
  });

export const loadMyBids = userId => dispatch =>
  wrappedFetchWithParams("bids", undefined, "GET", `/${userId}`).then(
    response => {
      dispatch({ type: LOAD_MY_BIDS, data: response });
    }
  );

export const unloadBids = () => dispatch => dispatch({ type: UNLOAD_BIDS });

export const loadBid = id => dispatch =>
  wrappedFetchWithParams("bid", undefined, "GET", `?id=${id}`).then(
    response => {
      if (response) dispatch({ type: LOAD_BID, data: response });
    }
  );

export const unloadBid = () => dispatch => dispatch({ type: UNLOAD_BID });

export const createBid = bid => dispatch =>
  wrappedFetch("bids", bid, "POST").then(response => {
    dispatch({ type: CREATE_BID, data: response });
  });

export const deleteBid = id => dispatch =>
  wrappedFetchWithParams("bid", undefined, "DELETE", `/${id}`).then(() => {
    dispatch({ type: DELETE_BID });
  });
