import { createSelector } from 'reselect';
import moment from 'moment';

// POSTS
export const selectPosts = state => state.posts.posts;
export const selectPostsForDisplay = createSelector(
    selectPosts,
    posts => posts.map(item => ({
        ...item,
        timestamp: moment(item.timestamp).format('MMM D'),
    }))
);

// LAYERS
export const selectLayer = state => state.layers.layer;