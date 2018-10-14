import { stateReducer } from "./utils";
import {
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS,
    USER_FROM_TOKEN_SUCCESS,
    USER_FROM_TOKEN_FAILURE,
} from "../actions";

const initialState = {
    loggedIn: false,
    email: '',
    error: '',
};

const handlers = {
    [LOG_IN_SUCCESS]: (state, action) => ({
        email: action.data.email,
        error: '',
        loggedIn: true,
    }),
    [LOG_IN_FAILURE]: (state, action) => ({
        email: initialState.email,
        error: action.data.error,
        loggedIn: false,
    }),
    [REGISTER_USER_SUCCESS]: (state, action) => ({
        email: action.data.email,
        error: '',
        loggedIn: true,
    }),
    [REGISTER_USER_FAILURE]: (state, action) => ({
        email: initialState.email,
        error: action.data.error,
        loggedIn: false,
    }),
    [USER_FROM_TOKEN_SUCCESS]: (state, action) => ({
        email: action.data.email,
        error: '',
        loggedIn: true,
    }),
    [USER_FROM_TOKEN_FAILURE]: (state, action) => ({
        email: initialState.email,
        error: action.data.error,
        loggedIn: false,
    }),
    [LOG_OUT]: () => ({ ...initialState }),
};

export default stateReducer(initialState, handlers);