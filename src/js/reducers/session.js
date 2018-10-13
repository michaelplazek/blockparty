import { stateReducer } from "./utils";
import { LOG_IN, LOG_OUT } from "../actions";

const initialState = {
    email: ''
};

const handlers = {
    [LOG_IN]: (state, action) => ({
        email: action.data,
    }),
    [LOG_OUT]: () => ({
        email: initialState.email,
    }),
};

export default stateReducer(initialState, handlers);