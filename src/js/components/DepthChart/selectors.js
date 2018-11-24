import { createSelector } from "reselect";
import {
  selectAsks,
  selectBids,
  selectFilterCoin,
  selectFilterPrice
} from "../../selectors";
import compose from "lodash/fp/compose";
import fpMap from "lodash/fp/map";
import last from "lodash/last";
import head from "lodash/head";
import orderBy from "lodash/fp/orderBy";
import filter from "lodash/fp/filter";
import {binify} from "./utils";

const NUMBER_OF_BINS = 100;

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
