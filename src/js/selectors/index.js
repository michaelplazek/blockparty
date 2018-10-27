import { createSelector } from "reselect";
import compose from "lodash/fp/compose";
import fpMap from "lodash/fp/map";
import filter from "lodash/fp/filter";
import moment from "moment";

// FILTERS
export const selectFilterDistance = state => state.filters.distanceAway;
export const selectFilterCoin = state => state.filters.coin;
export const selectFilterType = state => state.filters.type;
export const selectFilter = state => state.filters.filter;

// ASKS
export const selectAsks = state => state.asks.asks;
export const selectMyAsks = state => state.asks.myAsks;
export const selectMyAsksLoaded = state => state.asks.myAsksLoaded;
export const selectNumberOfMyAsks = createSelector(
  selectMyAsksLoaded,
  selectMyAsks,
  (loaded, asks) => (loaded ? asks.length : 0)
);
export const selectAsksForDisplay = createSelector(selectAsks, asks =>
  asks.map(item => ({
    ...item,
    timestamp: moment(item.timestamp).format("MMM D")
  }))
);

// BIDS
export const selectBids = state => state.bids.bids;
export const selectMyBids = state => state.bids.myBids;
export const selectMyBidsLoaded = state => state.bids.myBidsLoaded;
export const selectNumberOfMyBids = createSelector(
  selectMyBidsLoaded,
  selectMyBids,
  (loaded, bids) => (loaded ? bids.length : 0)
);
export const selectBidsForDisplay = createSelector(selectBids, bids =>
  bids.map(item => ({
    ...item,
    timestamp: moment(item.timestamp).format("MMM D")
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
export const selectAskLatitude = state => state.ask.lat;
export const selectAskLongitude = state => state.ask.lng;
export const selectAskUseCurrentLocation = state =>
  state.ask.useCurrentLocation;

// TEMPORARY BID
export const selectBidCoin = state => state.bid.coin;
export const selectBidVolume = state => state.bid.volume;
export const selectBidPrice = state => state.bid.price;
export const selectBidLatitude = state => state.bid.lat;
export const selectBidLongitude = state => state.bid.lng;
export const selectBidUseCurrentLocation = state =>
  state.bid.useCurrentLocation;

// LAYERS
export const selectLayer = state => state.layers.layer;
export const selectLayerOpen = state => state.layers.open;

// SESSION
export const selectIsLoggedIn = state => state.session.loggedIn;
export const selectSessionLoaded = state => state.session.sessionLoaded;
export const selectUsername = state => state.session.username;
export const selectUserId = state => state.session.userId;

// APP
export const selectNavHeight = state => state.app.navigationBarHeight;
export const selectHeaderHeight = state => state.app.headerHeight;
export const selectWindowHeight = state => state.app.windowHeight;
export const selectWindowWidth = state => state.app.windowWidth;

// MISC
export const selectMapMarkers = createSelector(
  selectAsks,
  selectBids,
  selectFilterType,
  (asks, bids, type) => {
    const items = type === "ASK" ? asks : bids;
    return fpMap(ask => ({ lat: ask.lat, lng: ask.lng, id: ask._id }))(items);
  }
);
