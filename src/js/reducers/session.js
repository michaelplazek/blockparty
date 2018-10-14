import { stateReducer } from "./utils";
import {
    LOG_IN,
    LOG_OUT,
    REGISTER_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS,
    USER_FROM_TOKEN,
    USER_FROM_TOKEN_SUCCESS,
    USER_FROM_TOKEN_FAILURE,
} from "../actions";

const initialState = {
    loggedIn: false,
    email: '',
    error: '',
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