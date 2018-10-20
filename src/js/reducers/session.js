import { stateReducer } from "./utils";
import {
    LOG_IN,
    LOG_OUT,
    REGISTER_USER,
    USER_FROM_TOKEN,
    SESSION_LOAD,
} from "../actions";

const initialState = {
    loggedIn: false,
    email: '',
    error: '',
    sessionLoaded: false,
};

const handlers = {
    [LOG_IN]: (state, action) => ({
        email: action.data.user.email,
        error: '',
        loggedIn: true,
    }),
    [REGISTER_USER]: (state, action) => ({
        email: action.data.user.email,
        error: '',
        loggedIn: true,
    }),
    [USER_FROM_TOKEN]: (state, action) => ({
        email: action.data.user.email,
        error: '',
        loggedIn: true,
    }),
    [SESSION_LOAD]: () => ({
        sessionLoaded: true,
    }),
    [LOG_OUT]: () => ({ ...initialState }),
};

export default stateReducer(initialState, handlers);