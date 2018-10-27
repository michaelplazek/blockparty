import { createSelector } from 'reselect';
import moment from 'moment';

// ASKS
export const selectAsks = state => state.asks.asks;
export const selectAsksForDisplay = createSelector(
    selectAsks,
    asks => asks.map(item => ({
        ...item,
        timestamp: moment(item.timestamp).format('MMM D'),
    }))
);
export const selectMapMarkers = createSelector(
	selectAsks,
	asks => asks.map(ask => (
		{ lat: ask.lat, lng: ask.lng, id: ask._id })
	)
);

// BIDS
export const selectBids = state => state.bids.bids;
export const selectBidsForDisplay = createSelector(
	selectAsks,
	asks => asks.map(item => ({
		...item,
		timestamp: moment(item.timestamp).format('MMM D'),
	}))
);

// BID
export const selectBid = state => state.bids.bid;
export const selectBidId = state => state.bids.bid._id;
export const selectBidAmount = state => state.bids.bid.amount;
export const selectBidTimestamp = state => state.bids.bid.timestamp;

// ASK
export const selectAsk = state => state.asks.ask;
export const selectAskId = state => state.asks.ask._id;
export const selectAskAmount = state => state.asks.ask.amount;
export const selectAskTimestamp = state => state.asks.ask.timestamp;

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
export const selectFilterType = state => state.filters.type;
export const selectFilter = state => state.filters.filter;
