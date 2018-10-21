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
	posts => posts.map(post => (
		{ lat: post.lat, lng: post.lng, id: post._id })
	)
);

// POST
export const selectPost = state => state.posts.post;
export const selectId = state => state.posts.post._id;
export const selectAmount = state => state.posts.post.amount;
export const selectContactInfo = state => state.posts.post.contact;
export const selectLocation = state => state.posts.post.location;
export const selectMessage = state => state.posts.post.message;
export const selectTimestamp = state => state.posts.post.timestamp;

// TEMPORARY POST
export const selectPostCoin = state => state.post.coin;
export const selectPostVolume = state => state.post.volume;
export const selectPostPrice = state => state.post.price;


// LAYERS
export const selectLayer = state => state.layers.layer;
export const selectLayerOpen = state => state.layers.open;

// SESSION
export const selectIsLoggedIn = state => state.session.loggedIn;
export const selectSessionLoaded = state => state.session.sessionLoaded;
export const selectUsername = state => state.session.username;

// APP
export const selectNavHeight = state => state.app.navigationBarHeight;
export const selectHeaderHeight = state => state.app.headerHeight;
export const selectWindowHeight = state => state.app.windowHeight;
export const selectWindowWidth = state => state.app.windowWidth;

// FILTERS
export const selectFilterDistance = state => state.filters.distanceAway;
export const selectFilterCoin = state => state.filters.coin;
export const selectFilter = state => state.filters.filter;