import { stateReducer } from "./utils";
import { LOAD_POSTS, LOAD_POST_DETAILS, CREATE_POST } from "../actions";
import { DEFAULT_POST } from "../constants/posts";

const initialState = {
    posts: [],
    post: DEFAULT_POST,
    postsLoaded: false,
    postLoaded: false,
};

const handlers = {
	[LOAD_POSTS]: (state, action) => ({
		posts: action.data,
		postsLoaded: true
	}),
	[UNLOAD_POSTS]: () => ({
		posts: initialState.posts,
		postsLoaded: false
	}),
	[LOAD_POSTS]: (state, action) => ({
		post: action.data,
		postLoaded: true
	}),
	[UNLOAD_POST]: () => ({
		post: initialState.post,
		postLoaded: false
	}),
	[LOAD_POST_DETAILS]: (state, action) => ({
		post: state.posts.find(x => x._id === action.id),
	}),
	[CREATE_POST]: (state, action) => ({
		post: action.data,
		postLoaded: true
	}),
};

export default stateReducer(initialState, handlers);

