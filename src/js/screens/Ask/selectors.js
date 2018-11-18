import React from "react";
import { createSelector } from "reselect";
import {
  selectAskCity,
  selectAskOwner,
  selectAskPostTime,
  selectAskDisplayPrice,
  selectAskState,
  intoArray
} from "../../selectors";

export const selectPriceDetail = createSelector(
  selectAskDisplayPrice,
  price => ({
    name: "Price",
    value: price,
    onClick: undefined
  })
);

export const selectLocationDetail = createSelector(
  selectAskCity,
  selectAskState,
  (city, state) => ({
    name: "Location",
    value: `${city}, ${state}`,
    onClick: undefined
  })
);

export const selectSellerDetail = createSelector(selectAskOwner, owner => ({
  name: "Seller",
  value: owner,
  onClick: undefined
}));

export const selectLastUpdatedDetail = createSelector(
  selectAskPostTime,
  time => ({
    name: "Created",
    value: time,
    onClick: undefined
  })
);

export const selectAskDetails = createSelector(
  selectPriceDetail,
  selectLocationDetail,
  selectSellerDetail,
  selectLastUpdatedDetail,
  intoArray
);
