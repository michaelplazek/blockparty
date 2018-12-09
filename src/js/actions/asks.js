import {
  LOAD_ASKS,
  LOAD_MY_ASKS,
  CREATE_ASK,
  LOAD_ASK,
  UNLOAD_ASK,
  UNLOAD_ASKS,
  DELETE_ASK
} from "./index";
import { wrappedFetch, wrappedFetchWithParams } from "../api/utils";

export const loadAsks = () => dispatch =>
  wrappedFetch("asks").then(response => {
    dispatch({ type: LOAD_ASKS, data: response });
  });

export const loadMyAsks = userId => dispatch =>
  wrappedFetchWithParams("asks", undefined, "GET", `/${userId}`).then(
    response => {
      dispatch({ type: LOAD_MY_ASKS, data: response });
    }
  );

export const unloadAsks = () => dispatch => dispatch({ type: UNLOAD_ASKS });

export const loadAsk = id => dispatch =>
  wrappedFetchWithParams("ask", undefined, "GET", `?id=${id}`).then(
    response => {
      dispatch({ type: LOAD_ASK, data: response });
    }
  );

export const unloadAsk = () => dispatch => dispatch({ type: UNLOAD_ASK });

export const createAsk = ask => dispatch =>
  wrappedFetch("asks", ask, "POST").then(response => {
    dispatch({ type: CREATE_ASK, data: response });
  });

export const deleteAsk = id => dispatch =>
  wrappedFetchWithParams("ask", undefined, "DELETE", `/${id}`).then(() => {
    dispatch({ type: DELETE_ASK });
  });
