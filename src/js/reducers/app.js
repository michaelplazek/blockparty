import { stateReducer } from "./utils";
import { LOAD_NAV_HEIGHT } from "../actions";

const initialState = {
	navigationBarHeight: 0,
};

const handlers = {
	[LOAD_NAV_HEIGHT]: (_, action) => ({
		navigationBarHeight: action.data,
	}),
};

export default stateReducer(initialState, handlers);