import { LOAD_USER, UNLOAD_USER } from "./index";
import { wrappedFetchWithParams } from "../api/utils";

export const loadUser = userId => dispatch =>
  wrappedFetchWithParams("user", undefined, "GET", `/${userId}`).then(
    response => {
      dispatch({ type: LOAD_USER, data: response });
    }
  );

export const unloadUser = () => dispatch => dispatch({ type: UNLOAD_USER });
