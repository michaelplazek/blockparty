import md5 from "md5";
import { fetchToken, wrappedFetch, wrappedFetchWithParams } from "../api/utils";
import {
  LOG_IN,
  LOG_OUT,
  REGISTER_USER,
  USER_FROM_TOKEN,
  SESSION_LOAD,
  CURRENT_LOCATION_LOAD,
  UPDATE_USER,
  DELETE_USER,
  SET_CURRENT_LOCATION, SET_POST_LOGIN_PATH, CLEAR_POST_LOGIN_PATH
} from "./index";
import { getIndexFromPath } from "../utils/location";

const setSession = token => window.sessionStorage.setItem("session", token);

export const getSession = () => window.sessionStorage.getItem("session");

const removeSession = () => window.sessionStorage.removeItem("session");

export const logInUser = (
  username,
  password,
  history,
  setNavIndex,
) => dispatch => {
  const user = {
    username,
    password: md5(md5(password))
  };
  wrappedFetch("users/login", user, "POST")
    .then(response => {
      setSession(response.token);
      dispatch({ type: LOG_IN, data: response });
    })
    .then(() => dispatch({ type: SESSION_LOAD }))
    .then(() => {
      setNavIndex(getIndexFromPath("/"));
      history.push("/");
    });
};

export const registerUser = (username, password, history) => dispatch => {
  const user = {
    username,
    password: md5(md5(password))
  };
  wrappedFetch("users/signup", user, "POST")
    .then(response => {
      setSession(response.token);
      dispatch({ type: REGISTER_USER, data: response });
    })
    .then(() => dispatch({ type: SESSION_LOAD }))
    .then(() => history.push("/"));
};

export const loadUserFromToken = () => dispatch => {
  let token = getSession();
  if (!token || token === "") return 0;

  // fetch user from token
  fetchToken(token)
    .then(response => {
      if (response) {
        setSession(response.token);
        dispatch({ type: USER_FROM_TOKEN, data: response });
      } else {
        removeSession();
      }
    })
    .then(() => dispatch({ type: SESSION_LOAD }));
};

export const loadCurrentLocation = () => dispatch =>
  navigator.geolocation.getCurrentPosition(pos => {
    dispatch({ type: CURRENT_LOCATION_LOAD, data: pos.coords });
  });

export const setCurrentLocation = coords => dispatch =>
  dispatch({ type: SET_CURRENT_LOCATION, data: coords });

export const logOutUser = () => dispatch => {
  wrappedFetch("users/logout", undefined, "POST").then(() => {
    removeSession();
    dispatch({ type: LOG_OUT });
  });
};

export const deleteUser = id => dispatch => {
  wrappedFetchWithParams("user", undefined, "DELETE", `/${id}`).then(() => {
    removeSession();
    dispatch({ type: DELETE_USER });
  });
};

export const updateUser = data => dispatch => {
  wrappedFetch("user", data, "PUT").then(response => {
    dispatch({ type: UPDATE_USER, data: response });
  });
};

export const setPostLoginPath = path => dispatch =>
  dispatch({ type: SET_POST_LOGIN_PATH, data: path });

export const clearPostLoginPath = () => dispatch =>
  dispatch({ type: CLEAR_POST_LOGIN_PATH });