import { stateReducer } from "./utils";
import { SET_LAYER, OPEN_LAYER } from "../actions";

const initialState = {
    layer: '',
    open: false
};

const handlers = {
	[SET_LAYER]: (_, action) => ({
			layer: action.data,
	}),
	[OPEN_LAYER]: (_, action) => ({
		open: action.data,
	}),
};

export default stateReducer(initialState, handlers);