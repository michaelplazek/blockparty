import { stateReducer } from "./utils";
import { SET_LAYER } from "../actions";

const initialState = {
    layer: '',
};

const handlers = {
    [SET_LAYER]: (_, action) => ({
        layer: action.data,
    }),
};

export default stateReducer(initialState, handlers);