import React from "react";
import { createSelector } from "reselect";
import {
  intoArray,
  selectTransactionCoin,
  selectTransactionVolume,
  selectTransactionType,
  selectTransactionFormattedTotal,
  selectTransactionBuyerUsername,
  selectTransactionSellerUsername,
  selectUsername,
  selectUserIsBuyer,
  selectUserIsSeller,
  selectTransactionCompletedByBuyer,
  selectTransactionCompletedBySeller,
  selectTransactionDisplayPrice,
  selectTransactionSellerContactInfo,
  selectTransactionBuyerContactInfo
} from "../../../selectors";

export const selectTypeDetail = createSelector(selectTransactionType, type => ({
  name: "Type",
  value: type,
  onClick: undefined
}));

export const selectCoinDetail = createSelector(selectTransactionCoin, coin => ({
  name: "Coin",
  value: coin,
  onClick: undefined
}));

export const selectVolumeDetail = createSelector(
  selectTransactionVolume,
  volume => ({
    name: "Volume",
    value: volume,
    onClick: undefined
  })
);

export const selectPriceDetail = createSelector(
  selectTransactionDisplayPrice,
  price => ({
    name: "Price",
    value: price,
    onClick: undefined
  })
);

export const selectTotalDetail = createSelector(
  selectTransactionFormattedTotal,
  total => ({
    name: "Total",
    value: total,
    onClick: undefined
  })
);

const selectContactInfo = createSelector(
  selectUserIsBuyer,
  selectUserIsSeller,
  selectTransactionSellerContactInfo,
  selectTransactionBuyerContactInfo,
  (isBuyer, isSeller, sellerInfo, buyerInfo) => {
    if (isBuyer) return sellerInfo;
    else return buyerInfo;
  }
);

export const selectContactDetail = createSelector(
  selectContactInfo,
  selectTransactionBuyerUsername,
  selectTransactionSellerUsername,
  selectUsername,
  (contactInfo, buyer, seller, username) => ({
    name: username === buyer ? "Seller" : "Buyer",
    value: username === buyer ? seller : buyer,
    onClick: undefined,
    contact: contactInfo
  })
);

export const selectTransactionDetails = createSelector(
  selectTypeDetail,
  selectCoinDetail,
  selectVolumeDetail,
  selectPriceDetail,
  selectTotalDetail,
  selectContactDetail,
  intoArray
);

export const selectCompleteButtonIsDisabled = createSelector(
  selectUserIsBuyer,
  selectUserIsSeller,
  selectTransactionCompletedByBuyer,
  selectTransactionCompletedBySeller,
  (userIsBuyer, userIsSeller, completedByBuyer, completedBySeller) => {
    if (userIsBuyer) return completedByBuyer;
    else if (userIsSeller) return completedBySeller;
  }
);
