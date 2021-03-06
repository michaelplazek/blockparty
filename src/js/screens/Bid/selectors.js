import React from "react";
import { createSelector } from "reselect";
import {
  selectBidCity,
  selectBidOwner,
  selectBidPostTime,
  selectBidDisplayPrice,
  selectBidState,
  selectBidTotal,
  intoArray
} from "../../selectors";

export const selectPriceDetail = createSelector(
  selectBidDisplayPrice,
  price => ({
    name: "Price",
    value: price,
    onClick: undefined
  })
);

export const selectTotalDetail = createSelector(selectBidTotal, total => ({
  name: "Total",
  value: total,
  onClick: undefined
}));

export const selectLocationDetail = createSelector(
  selectBidCity,
  selectBidState,
  (city, state) => ({
    name: "Location",
    value: `${city}, ${state}`,
    onClick: undefined
  })
);

export const selectSellerDetail = createSelector(selectBidOwner, owner => ({
  name: "Buyer",
  value: owner,
  onClick: undefined
}));

export const selectLastUpdatedDetail = createSelector(
  selectBidPostTime,
  time => ({
    name: "Created",
    value: time,
    onClick: undefined
  })
);

export const selectBidDetails = createSelector(
  selectPriceDetail,
  selectTotalDetail,
  selectLocationDetail,
  selectSellerDetail,
  selectLastUpdatedDetail,
  intoArray
);
