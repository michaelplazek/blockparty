import { stateReducer } from "./utils";
import { LOG_IN, LOG_OUT } from "../actions";

const initialState = {
    sessionId: '',
    loggedIn: false,
};

const handlers = {
    [LOG_IN]: (state, action) => ({
        sessionId: action.session,
        loggedIn: true,
    }),
    [LOG_OUT]: () => ({
        sessionId: initialState.sessionId,
        loggedIn: false
    }),
};

export default stateReducer(initialState, handlers);