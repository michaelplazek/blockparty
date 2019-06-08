import { stateReducer } from "./utils";
import { LOAD_USER, UNLOAD_USER } from "../actions";

const initialState = {
  user: {}
};

const handlers = {
  [LOAD_USER]: (state, action) => ({ user: action.data }),
  [UNLOAD_USER]: () => ({ ...initialState })
};

export default stateReducer(initialState, handlers);
