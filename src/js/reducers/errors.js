import { stateReducer } from "./utils";
import { SET_ERROR, SET_ERROR_MESSAGE } from "../actions";

const initialState = {
  error: false,
  message: ""
};

const handlers = {
  [SET_ERROR]: (_, action) => ({
    error: action.data
  }),
  [SET_ERROR_MESSAGE]: (_, action) => ({
    message: action.data
  })
};

export default stateReducer(initialState, handlers);
