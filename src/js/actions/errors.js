import {
  SET_ERROR,
  SET_ERROR_MESSAGE
} from "./";

export const setError = data => dispatch =>
  dispatch({ type: SET_ERROR, data });

export const setErrorMessage = data => dispatch =>
  dispatch({ type: SET_ERROR_MESSAGE, data });

