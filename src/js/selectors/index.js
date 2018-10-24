import { createSelector } from 'reselect';
import moment from 'moment';

// ASKS
export const selectAsks = state => state.posts.posts;
export const selectAsksForDisplay = createSelector(
    selectAsks,
    posts => posts.map(item => ({
        ...item,
        timestamp: moment(item.timestamp).format('MMM D'),
    }))
);
export const selectMapMarkers = createSelector(
	selectAsks,
	posts => posts.map(ask => (
		{ lat: ask.lat, lng: ask.lng, id: ask._id })
	)
);

// ASK
export const selectAsk = state => state.posts.ask;
export const selectId = state => state.posts.ask._id;
export const selectAmount = state => state.posts.ask.amount;
export const selectContactInfo = state => state.posts.ask.contact;
export const selectLocation = state => state.posts.ask.location;
export const selectMessage = state => state.posts.ask.message;
export const selectTimestamp = state => state.posts.ask.timestamp;

// TEMPORARY ASK
export const selectAskCoin = state => state.ask.coin;
export const selectAskVolume = state => state.ask.volume;
export const selectAskPrice = state => state.ask.price;


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