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
export const selectMapMarkers = createSelector(
	selectPosts,
	posts => posts.map(post => ({ lat: post.lat, lng: post.lng }))
);

// POST
export const selectPost = state => state.posts.post;
export const selectId = state => state.posts.post._id;
export const selectAmount = state => state.posts.post.amount;
export const selectContactInfo = state => state.posts.post.contact;
export const selectLocation = state => state.posts.post.location;
export const selectMessage = state => state.posts.post.message;
export const selectTimestamp = state => state.posts.post.timestamp;


// LAYERS
export const selectLayer = state => state.layers.layer;

// SESSION
export const selectIsLoggedIn = state => state.session.loggedIn;
export const selectSessionLoaded = state => state.session.sessionLoaded;

// APP
export const selectNavHeight = state => state.app.navigationBarHeight;
export const selectHeaderHeight = state => state.app.headerHeight;