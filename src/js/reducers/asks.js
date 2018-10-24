import { stateReducer } from "./utils";
import {
	LOAD_ASKS,
	LOAD_ASK,
	LOAD_ASK_FROM_ASKS,
	CREATE_ASK,
	UNLOAD_ASK,
	UNLOAD_ASKS,
} from "../actions";
import { DEFAULT_ASK } from "../constants/ask";

const initialState = {
    posts: [],
    ask: DEFAULT_ASK,
    postsLoaded: false,
    postLoaded: false,
};

const handlers = {
	[LOAD_ASKS]: (state, action) => ({
		posts: action.data,
		postsLoaded: true
	}),
	[UNLOAD_ASKS]: () => ({
		posts: initialState.posts,
		postsLoaded: false
	}),
	[LOAD_ASK]: (state, action) => ({
		ask: action.data,
		postLoaded: true
	}),
	[UNLOAD_ASK]: () => ({
		ask: initialState.ask,
		postLoaded: false
	}),
	[LOAD_ASK_FROM_ASKS]: (state, action) => ({
		ask: state.posts.find(x => x._id === action.id),
	}),
	[CREATE_ASK]: (state, action) => ({
		ask: action.data,
		postLoaded: true
	}),
};

export default stateReducer(initialState, handlers);

