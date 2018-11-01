import { createSelector } from "reselect";
import compose from "lodash/fp/compose";
import fpMap from "lodash/fp/map";
import get from 'lodash/fp/get';
import filter from "lodash/fp/filter";
import moment from "moment";
import numeral from "numeral";
import { USD } from "../constants/currency";
import { getDistance } from "geolib";
import { getMilesFromMeters } from "../utils/location";
import orderBy from 'lodash/fp/orderBy';
import head from 'lodash/head';
import last from 'lodash/last';
import {binify} from "./utils";

const NUMBER_OF_BINS = 100;

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

// DEPTH CHART
export const selectOrderedBids = createSelector(
  selectBids,
  orderBy('price', 'desc')
);

export const selectOrderedAsks = createSelector(
  selectAsks,
  orderBy('price', 'desc')
);

export const selectPriceAscOrderedBids = createSelector(
  selectBids,
  compose(
    fpMap(item => item.price),
    orderBy('price', 'asc')
  )
);

export const selectPriceAscOrderedAsks = createSelector(
  selectAsks,
  compose(
    fpMap(item => item.price),
    orderBy('price', 'asc')
  )
);

export const selectPriceDescOrderedBids = createSelector(
  selectBids,
  compose(
    fpMap(item => item.price),
    orderBy('price', 'desc')
  )
);

export const selectPriceDescOrderedAsks = createSelector(
  selectAsks,
  compose(
    fpMap(item => item.price),
    orderBy('price', 'desc')
  )
);

// Divide the asks and bids into equal number of bins, so that the
// center remains in the center of the chart
const selectBidPriceRange = createSelector(
  selectPriceAscOrderedBids,
  bids => {
    const low = Math.floor(head(bids));
    const high = Math.floor(last(bids));
    const step = (high - low)/NUMBER_OF_BINS;

    let range = [];
    let price = low;
    while(price <= high) {
      price += step;
      range.push({ price: Math.floor(price) });
    }
    return range;
  }
);

const selectAskPriceRange = createSelector(
  selectPriceAscOrderedAsks,
  asks => {
    const low = Math.floor(head(asks));
    const high = Math.floor(last(asks));
    const step = (high - low)/NUMBER_OF_BINS;

    let range = [];
    let price = low;
    while(price <= high) {
      range.push({ price: Math.floor(price) });
      price += step;
    }
    return range;
  }
);

export const selectDescAskPriceRange = createSelector(
  selectAskPriceRange,
  orderBy('price', 'desc')
);

export const selectDescBidPriceRange = createSelector(
  selectBidPriceRange,
  orderBy('price', 'desc')
);

export const selectMidPoint = createSelector(
  selectBidPriceRange,
  selectAskPriceRange,
  (bids, asks) => {
    const highBid = get('price')(last(bids));
    const lowAsk = get('price')(head(asks));
    return ((lowAsk + highBid)/2).toFixed(3);
  }
);

const selectRoundedMidPoint = createSelector(
  selectMidPoint,
  point => Math.floor(point)
);

// Do the actual mapping into the needed object
const selectBidData = createSelector(
  selectDescBidPriceRange,
  selectBids,
  (range, bids) => {
    let data = [];
    let total = 0;
    range.map((item, index) => {
      if (index === range.length - 1) return;

      const high = item.price;
      const low = range[index + 1].price;
      total += binify(low, high, bids);
      data.push({
        price: high,
        bid: total,
        ask: null,
      })
    });

    return orderBy('price', 'asc')(data);
  }
);

const selectAskData = createSelector(
  selectAskPriceRange,
  selectAsks,
  (range, asks) => {
    let data = [];
    let total = 0;
    range.map((item, index) => {
      if (index === range.length - 1) return;

      const low = item.price;
      const high = range[index + 1].price;

      total += binify(low, high, asks);
      data.push({
        price: high,
        bid: null,
        ask: total,
      })
    });

    return orderBy('price', 'asc')(data);
  }
);

export const selectChartData = createSelector(
  selectBidData,
  selectAskData,
  selectRoundedMidPoint,
  (bids, asks, mid) => {
    const midPoint = {
      price: mid,
      bid: 0,
      ask: 0
    };

    return bids.concat(midPoint).concat(asks);
  }
);
