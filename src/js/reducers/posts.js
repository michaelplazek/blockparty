import { stateReducer } from "./utils";
import find from 'lodash/find';
import { LOAD_POSTS, LOAD_POST_DETAILS } from "../actions";

const initialState = {
    posts: [],
    post: {},
    postsLoaded: false,
    postLoaded: false,
};

const handlers = {
    [LOAD_POSTS]: (state, action) => ({
       posts: action.data,
    }),
    [LOAD_POST_DETAILS]: (state, action) => ({
        post: state.posts.find(x => x._id === action.id),
    }),
};

export default stateReducer(initialState, handlers);

