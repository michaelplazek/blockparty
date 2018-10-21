import { stateReducer } from "./utils";
import { SET_FILTER_DISTANCE } from "../actions";

const initialState = {
	distanceAway: 0
};

const handlers = {
	[SET_FILTER_DISTANCE]: (_, action) => ({
		distanceAway: action.data,
	}),
};

export default stateReducer(initialState, handlers);