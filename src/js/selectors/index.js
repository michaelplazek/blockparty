import { createSelector } from "reselect";
import compose from "lodash/fp/compose";
import fpMap from "lodash/fp/map";
import get from "lodash/fp/get";
import find from "lodash/fp/find";
import filter from "lodash/fp/filter";
import moment from "moment";
import numeral from "numeral";
import { USD } from "../constants/currency";
import { getDistance } from "geolib";
import { getMilesFromMeters } from "../utils/location";
import orderBy from "lodash/fp/orderBy";
import head from "lodash/head";
import last from "lodash/last";
import { binify } from "./utils";
import { ADMIN_1, LOCALITY, POLITICAL } from "../constants/maps";

const NUMBER_OF_BINS = 100;

// FILTERS
export const selectFilterDistance = state => state.filters.distanceAway;
export const selectFilterCoin = state => state.filters.coin;
export const selectFilterType = state => state.filters.type;
export const selectFilterPrice = state => state.filters.price;
export const selectFilter = state => state.filters.filter;
export const selectFormattedFilterPrice = createSelector(
  selectFilterPrice,
  price => numeral(price).format(USD)
);

// OFFERS
export const selectMyOffers = state => state.offers.myOffers;
export const selectMyOffersLoaded = state => state.offers.myOffersLoaded;
export const selectNumberOfMyOffers = createSelector(
  selectMyOffers,
  selectMyOffersLoaded,
  (offers, loaded) => (loaded ? offers.length : 0)
);

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
export const selectBidOwner = state => state.bids.bid.owner;
export const selectBidLocation = state => state.bids.bid.location;
export const selectBidTimestamp = state => state.bids.bid.timestamp;
export const selectBidPostTime = createSelector(selectBidTimestamp, timestamp =>
  moment(timestamp).fromNow()
);
export const selectBidCity = createSelector(
  selectBidLocation,
  compose(
    get("long_name"),
    find(
      item => item.types.includes(LOCALITY) && item.types.includes(POLITICAL)
    )
  )
);
export const selectBidState = createSelector(
  selectBidLocation,
  compose(
    get("short_name"),
    find(item => item.types.includes(ADMIN_1) && item.types.includes(POLITICAL))
  )
);
export const selectBidDisplayPrice = createSelector(selectBid, bid =>
  numeral(bid.price).format(USD)
);

// ASK
export const selectAsk = state => state.asks.ask;
export const selectAskId = state => state.asks.ask._id;
export const selectAskTimestamp = state => state.asks.ask.timestamp;
export const selectAskLocation = state => state.asks.ask.location;
export const selectAskOwner = state => state.asks.ask.owner;
export const selectAskPostTime = createSelector(selectAskTimestamp, timestamp =>
  moment(timestamp).fromNow()
);
export const selectAskCity = createSelector(
  selectAskLocation,
  compose(
    get("long_name"),
    find(
      item => item.types.includes(LOCALITY) && item.types.includes(POLITICAL)
    )
  )
);
export const selectAskState = createSelector(
  selectAskLocation,
  compose(
    get("short_name"),
    find(item => item.types.includes(ADMIN_1) && item.types.includes(POLITICAL))
  )
);
export const selectAskDisplayPrice = createSelector(selectAsk, ask =>
  numeral(ask.price).format(USD)
);

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
      fpMap(ask => ({
        lat: ask.lat,
        lng: ask.lng,
        id: ask._id,
        price: ask.price,
        volume: ask.volume,
        coin: ask.coin
      })),
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
  orderBy("price", "desc")
);

export const selectOrderedAsks = createSelector(
  selectAsks,
  orderBy("price", "desc")
);

export const selectPriceAscOrderedBids = createSelector(
  selectBids,
  selectFilterCoin,
  (bids, coin) =>
    compose(
      fpMap(item => item.price),
      orderBy("price", "asc"),
      filter(item => item.coin === coin)
    )(bids)
);

export const selectPriceAscOrderedAsks = createSelector(
  selectAsks,
  selectFilterCoin,
  (asks, coin) =>
    compose(
      fpMap(item => item.price),
      orderBy("price", "asc"),
      filter(item => item.coin === coin)
    )(asks)
);

export const selectHasData = createSelector(
  selectPriceAscOrderedBids,
  selectPriceAscOrderedAsks,
  (bids, asks) => bids.length > 0 && asks.length > 0
);

export const selectPriceDescOrderedBids = createSelector(
  selectBids,
  selectFilterCoin,
  (bids, coin) =>
    compose(
      fpMap(item => item.price),
      orderBy("price", "desc"),
      filter(item => item.coin === coin)
    )(bids)
);

export const selectPriceDescOrderedAsks = createSelector(
  selectAsks,
  selectFilterCoin,
  (asks, coin) =>
    compose(
      fpMap(item => item.price),
      orderBy("price", "desc"),
      filter(item => item.coin === coin)
    )(asks)
);

// Divide the asks and bids into equal number of bins, so that the
// center remains in the center of the chart
// TODO: find a better way to handle edge cases than hasData
const selectBidPriceRange = createSelector(
  selectPriceAscOrderedBids,
  selectHasData,
  (bids, hasData) => {
    if (!hasData) return [];

    const low = Math.floor(head(bids));
    let high = Math.floor(last(bids));
    const difference = high - low;
    const step =
      difference > 0 ? difference / NUMBER_OF_BINS : 1 / NUMBER_OF_BINS;
    high = difference > 0 ? high : low + 1;

    let range = [];
    let price = low;

    while (price <= high) {
      range.push({ price: Math.floor(price) });
      price += step;
    }

    range.push({ price: Math.floor(price) });
    return range;
  }
);

const selectAskPriceRange = createSelector(
  selectPriceAscOrderedAsks,
  selectHasData,
  (asks, hasData) => {
    if (!hasData) return [];

    const low = Math.floor(head(asks));
    let high = Math.floor(last(asks));
    const difference = high - low;
    const step =
      difference > 0 ? difference / NUMBER_OF_BINS : 1 / NUMBER_OF_BINS;
    high = difference > 0 ? high : low + 1;

    let range = [];
    let price = low;
    while (price <= high) {
      range.push({ price: Math.floor(price) });
      price += step;
    }

    range.push({ price: Math.floor(price) });
    return range;
  }
);

export const selectDescAskPriceRange = createSelector(
  selectAskPriceRange,
  orderBy("price", "desc")
);

export const selectDescBidPriceRange = createSelector(
  selectBidPriceRange,
  orderBy("price", "desc")
);

export const selectMidPoint = createSelector(
  selectBidPriceRange,
  selectAskPriceRange,
  (bids, asks) => {
    const highBid = get("price")(last(bids));
    const lowAsk = get("price")(head(asks));
    return ((lowAsk + highBid) / 2).toFixed(3);
  }
);

const selectRoundedMidPoint = createSelector(selectMidPoint, point =>
  Math.floor(point)
);

// Do the actual mapping into the needed object
const selectBidData = createSelector(
  selectPriceAscOrderedBids,
  selectDescBidPriceRange,
  selectBids,
  (prices, range, bids) => {
    let data = [];
    let total = 0;
    let count = 0;
    const difference = head(prices) - last(prices);

    range.map((item, index) => {
      if (index === range.length - 1) return;

      const high = item.price;
      const low = range[index + 1].price;

      if (difference !== 0) {
        const obj = binify(low, high, bids);
        total += obj.total;
        count += obj.count;
      } else {
        const obj = binify(low, high, bids);
        total = obj.total;
        count = obj.count;
      }

      data.push({
        price: high,
        bid: total,
        ask: null,
        count
      });
    });

    return orderBy("price", "asc")(data);
  }
);

const selectAskData = createSelector(
  selectPriceAscOrderedAsks,
  selectAskPriceRange,
  selectAsks,
  (prices, range, asks) => {
    let data = [];
    let total = 0;
    let count = 0;
    const difference = head(prices) - last(prices);
    range.map((item, index) => {
      if (index === range.length - 1) return;

      const low = item.price;
      const high = range[index + 1].price;

      if (difference !== 0) {
        const obj = binify(low, high, asks);
        total += obj.total;
        count += obj.count;
      } else {
        const obj = binify(low, high, asks);
        total = obj.total;
        count = obj.count;
      }

      data.push({
        price: high,
        bid: null,
        ask: total,
        count
      });
    });

    return orderBy("price", "asc")(data);
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

export const selectChartListType = createSelector(
  selectMidPoint,
  selectFilterPrice,
  (mid, price) => (price > mid ? "ASK" : "BID")
);

export const selectChartBids = createSelector(
  selectBids,
  selectFilterPrice,
  selectFilterCoin,
  (bids, price, coin) =>
    compose(
      filter(bid => bid.price <= price),
      filter(bid => bid.coin === coin)
    )(bids)
);

export const selectChartAsks = createSelector(
  selectAsks,
  selectFilterPrice,
  selectFilterCoin,
  (asks, price, coin) =>
    compose(
      filter(ask => ask.price <= price),
      filter(ask => ask.coin === coin)
    )(asks)
);
