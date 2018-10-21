import { LOAD_POSTS, LOAD_POST_DETAILS, CREATE_POST } from "./index";
import { sendData } from '../api/utils'

export const loadPosts = () => dispatch =>
    sendData('posts').then(response => {
        dispatch({ type: LOAD_POSTS, data: response })
    });

export const loadPostDetails = id => dispatch =>
    dispatch({ type: LOAD_POST_DETAILS, id });

export const createPost = post => dispatch =>
	sendData('posts', post, 'POST').then(response => {
		dispatch({ type: CREATE_POST, data: response });
	});