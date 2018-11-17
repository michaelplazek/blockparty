import React from "react";
import { createSelector } from "reselect";
import {
  selectBidCity,
  selectBidOwner,
  selectBidPostTime,
  selectFormattedBidPrice,
  selectBidState,
  intoArray,
} from "../../selectors";

export const selectPriceDetail = createSelector(
  selectFormattedBidPrice,
  price => ({
    name: "Price",
    value: price,
    onClick: undefined
  })
);

export const selectLocationDetail = createSelector(
  selectBidCity,
  selectBidState,
  (city, state) => ({
    name: "Location",
    value: `${city}, ${state}`,
    onClick: undefined
  })
);

export const selectSellerDetail = createSelector(
  selectBidOwner,
  owner => ({
    name: "Buyer",
    value: owner,
    onClick: undefined
  })
);

export const selectLastUpdatedDetail = createSelector(
  selectBidPostTime,
  time => ({
    name: "Last Updated",
    value: time,
    onClick: undefined
  })
);

export const selectBidDetails = createSelector(
  selectPriceDetail,
  selectLocationDetail,
  selectSellerDetail,
  selectLastUpdatedDetail,
  intoArray
);