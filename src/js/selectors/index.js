import { createSelector } from "reselect";
import compose from "lodash/fp/compose";
import fpMap from "lodash/fp/map";
import filter from "lodash/fp/filter";
import moment from "moment";
import numeral from "numeral";
import { USD } from "../constants/currency";
import { getDistance } from "geolib";
import { getMilesFromMeters } from "../utils/location";

// FILTERS
export const selectFilterDistance = state => state.filters.distanceAway;
export const selectFilterCoin = state => state.filters.coin;
export const selectFilterType = state => state.filters.type;
export const selectFilter = state => state.filters.filter;

// ASKS
export const selectAsks = state => state.asks.asks;
export const selectAskLoaded = state => state.asks.askLoaded;
export const selectMyAsks = state => state.asks.myAsks;
export const selectAsksLoaded = state => state.asks.asksLoaded;
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
export const selectBidLoaded = state => state.bids.bidLoaded;
export const selectMyBids = state => state.bids.myBids;
export const selectBidsLoaded = state => state.bids.bidsLoaded;
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
export const selectFormattedAskPrice = createSelector(selectAskPrice, price =>
  numeral(price).format(USD)
);
export const selectAskLatitude = state => state.ask.lat;
export const selectAskLongitude = state => state.ask.lng;
export const selectAskUseCurrentLocation = state =>
  state.ask.useCurrentLocation;

// TEMPORARY BID
export const selectBidCoin = state => state.bid.coin;
export const selectBidVolume = state => state.bid.volume;
export const selectBidPrice = state => state.bid.price;
export const selectFormattedBidPrice = createSelector(selectBidPrice, price =>
  numeral(price).format(USD)
);
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
export const selectCurrentLocation = state => state.session.location;

// APP
export const selectNavHeight = state => state.app.navigationBarHeight;
export const selectHeaderHeight = state => state.app.headerHeight;
export const selectWindowHeight = state => state.app.windowHeight;
export const selectWindowWidth = state => state.app.windowWidth;
export const selectMarketView = state => state.app.marketView;

// MISC
export const selectMapMarkers = createSelector(
  selectAsks,
  selectBids,
  selectFilterType,
  selectFilterCoin,
  selectFilterDistance,
  selectCurrentLocation,
  (asks, bids, type, coin, filterDistance, currentLocation) => {
    const items = type === "ASK" ? asks : bids;
    return compose(
      fpMap(ask => ({ lat: ask.lat, lng: ask.lng, id: ask._id })),
      filter(ask => {
        const distance = getDistance(
          { latitude: ask.lat, longitude: ask.lng },
          { latitude: currentLocation.lat, longitude: currentLocation.lng }
        );
        const distanceInMiles = getMilesFromMeters(distance);
        return distanceInMiles < filterDistance;
      }),
      filter(ask => ask.coin === coin)
    )(items);
  }
);
export const selectMarketLoaded = createSelector(
  selectAsksLoaded,
  selectBidsLoaded,
  selectFilterType,
  (asksLoaded, bidsLoaded, type) =>
		(asksLoaded && type === "ASK") || (bidsLoaded && type === "BID")
);

export const selectDashboardLoaded = createSelector(
	selectMyAsksLoaded,
	selectMyBidsLoaded,
	(asksLoaded, bidsLoaded) => asksLoaded && bidsLoaded
);
