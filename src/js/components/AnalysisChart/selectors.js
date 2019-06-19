import { createSelector } from "reselect";
import numeral from "numeral";

import {
  selectAsks,
  selectBids,
  selectFilter,
  selectFilterCoin,
  selectFilterPrice,
  selectIsWithinRange
} from "../../selectors";
import compose from "lodash/fp/compose";
import fpMap from "lodash/fp/map";
import last from "lodash/last";
import head from "lodash/head";
import orderBy from "lodash/fp/orderBy";
import filter from "lodash/fp/filter";
import concat from "lodash/fp/concat";
import reduce from "lodash/fp/reduce";
import maxBy from "lodash/fp/maxBy";
import minBy from "lodash/fp/minBy";
import meanBy from "lodash/fp/meanBy";
import getOr from "lodash/fp/getOr";
import { USD } from "../../constants/currency";

const NUMBER_OF_BINS = 100;

export const selectFilteredBids = createSelector(
  selectBids,
  selectFilter,
  selectIsWithinRange,
  (bids, filters, withinRange) =>
    compose(
      filter(withinRange),
      filter(bid => bid.coin === filters.coin),
      filter(() => filters.type === "BID" || filters.type === "ALL"),
      filter(bid => bid.reputation >= filters.reputation)
    )(bids)
);

export const selectFilteredAsks = createSelector(
  selectAsks,
  selectFilter,
  selectIsWithinRange,
  (asks, filters, withinRange) =>
    compose(
      filter(withinRange),
      filter(ask => ask.coin === filters.coin),
      filter(() => filters.type === "ASK" || filters.type === "ALL"),
      filter(bid => bid.reputation >= filters.reputation)
    )(asks)
);

export const selectHasBids = createSelector(
  selectFilteredBids,
  bids => bids.length > 0
);

export const selectHasAsks = createSelector(
  selectFilteredAsks,
  asks => asks.length > 0
);

export const selectHasData = createSelector(
  selectHasBids,
  selectHasAsks,
  (hasBids, hasAsks) => hasBids || hasAsks
);

export const selectPriceRange = createSelector(
  selectHasData,
  selectFilteredBids,
  selectFilteredAsks,
  (hasData, bids, asks) => {
    if (!hasData) return [];
    const data = compose(
      fpMap(item => item.price),
      orderBy("price", "asc"),
      concat(asks)
    )(bids);
    return { start: head(data) - 10, end: last(data) + 10 };
  }
);

export const selectRange = createSelector(selectPriceRange, range => {
  const { start, end } = range;
  const step = (end - start) / NUMBER_OF_BINS;
  let bins = [];
  for (let i = start; i <= end; i += step) {
    bins.push(i);
  }
  return bins;
});

export const selectFullBins = createSelector(
  selectRange,
  selectFilteredBids,
  selectFilteredAsks,
  (range, bids, asks) => {
    let bidsInBin,
      asksInBin,
      bidVolume,
      askVolume,
      bidCount,
      askCount,
      datum,
      data = [];
    range.forEach(price => {
      bidsInBin = filter(item => item.price >= price)(bids);
      bidCount = bidsInBin.length;
      bidVolume = reduce((total, bid) => total + bid.volume, 0)(bidsInBin);

      asksInBin = filter(item => item.price <= price)(asks);
      askCount = asksInBin.length;
      askVolume = reduce((total, ask) => total + ask.volume, 0)(asksInBin);

      datum = {
        price,
        bidsInBin,
        bidCount,
        bidVolume,
        asksInBin,
        askCount,
        askVolume,
        totalVolume: askVolume + bidVolume
      };

      data.push(datum);
    });

    return data;
  }
);

export const selectChartBids = createSelector(
  selectBids,
  selectFilterPrice,
  selectFilterCoin,
  (bids, price, coin) =>
    compose(
      filter(bid => bid.price >= price),
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

export const selectMidMarketPrice = createSelector(
  selectFilteredBids,
  selectFilteredAsks,
  (bids, asks) => {
    if (asks.length === 0) {
      const average = meanBy(item => item.price)(bids);
      return numeral(average).format(USD);
    }
    if (bids.length === 0) {
      const average = meanBy(item => item.price)(asks);
      return numeral(average).format(USD);
    }
    const min = compose(
      getOr(0, "price"),
      maxBy(item => item.price)
    )(bids);
    const max = compose(
      getOr(0, "price"),
      minBy(item => item.price)
    )(asks);
    return numeral((max + min) / 2).format(USD);
  }
);
