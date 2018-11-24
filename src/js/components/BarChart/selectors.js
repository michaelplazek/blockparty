import { createSelector } from "reselect";
import { selectAsks, selectBids, selectFilterCoin } from "../../selectors";
import compose from "lodash/fp/compose";
import fpMap from "lodash/fp/map";
import last from "lodash/last";
import head from "lodash/head";
import orderBy from "lodash/fp/orderBy";
import filter from "lodash/fp/filter";
import concat from "lodash/fp/concat";
import reduce from "lodash/fp/reduce";

const NUMBER_OF_BINS = 100;

export const selectHasBids = createSelector(
  selectBids,
  bids => bids.length > 0
);

export const selectHasAsks = createSelector(
  selectAsks,
  asks => asks.length > 0
);

export const selectHasData = createSelector(
  selectHasBids,
  selectHasAsks,
  (hasBids, hasAsks) => hasBids || hasAsks
);

export const selectFilteredBids = createSelector(
  selectBids,
  selectFilterCoin,
  (bids, coin) => filter(item => item.coin === coin)(bids)
);

export const selectFilteredAsks = createSelector(
  selectAsks,
  selectFilterCoin,
  (asks, coin) => filter(item => item.coin === coin)(asks)
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
    console.log(data);
    console.log(asks);
    return { start: head(data) - 2, end: last(data) + 2 };
  }
);

export const selectRange = createSelector(selectPriceRange, range => {
  const { start, end } = range;
  const step = (end - start) / NUMBER_OF_BINS;
  let bins = [];
  for (let i = start; i <= end; i += step) {
    bins.push(i);
  }
  console.log(bins);
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
