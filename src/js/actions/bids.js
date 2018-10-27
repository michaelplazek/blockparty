import {
  LOAD_BIDS,
  LOAD_BID,
  UNLOAD_BIDS,
  UNLOAD_BID,
  CREATE_BID
} from "./index";
import { wrappedFetch, wrappedFetchWithParams } from "../api/utils";

export const loadBids = () => dispatch =>
  wrappedFetch("bids").then(response => {
    dispatch({ type: LOAD_BIDS, data: response });
  });

export const unloadBids = () => dispatch => dispatch({ type: UNLOAD_BIDS });

export const loadBid = id => dispatch =>
  wrappedFetchWithParams("bid", undefined, "GET", `?id=${id}`).then(response => {
    dispatch({ type: LOAD_BID, data: response });
  });

export const unloadBid = () => dispatch => dispatch({ type: UNLOAD_BID });

export const createBid = bid => dispatch =>
  wrappedFetch("bids", bid, "POST").then(response => {
    dispatch({ type: CREATE_BID, data: response });
  });
