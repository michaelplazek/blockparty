import { stateReducer } from "./utils";
import find from 'lodash/find';
import { LOAD_POSTS, LOAD_POST_DETAILS } from "../actions";
import { DEFAULT_POST } from "../constants/posts";

const initialState = {
    posts: [],
    post: DEFAULT_POST,
    postsLoaded: false,
    postLoaded: false,
};

const handlers = {
    [LOAD_SESSION]: (state, action) => ({
        posts: action.data,
    }),
    [UNLOAD_SESSION]: (state, action) => ({
        post: state.posts.find(x => x._id === action.id),
    }),
};

export default stateReducer(initialState, handlers);