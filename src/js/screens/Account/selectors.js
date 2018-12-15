import React from 'react';
import StarRating from "react-star-ratings";

import {createSelector} from "reselect";
import {
  intoArray,
  selectUserCancelledTransactions,
  selectUserCompletedTransactions,
  selectUserReputation
} from "../../selectors";

export const selectStarRating = createSelector(
  selectUserReputation,
  reputation => <StarRating
    rating={reputation}
    starRatedColor="blue"
    numberOfStars={5}
    starDimension="1em"
    starSpacing="0.1em"
    name='rating'
  />
);

export const selectReputationDetail = createSelector(
  selectStarRating,
  count => ({
    name: "Reputation",
    value: count,
    onClick: undefined
  })
);

export const selectCompletedTransactionDetail = createSelector(
  selectUserCompletedTransactions,
  count => ({
    name: "Completed transactions",
    value: count,
    onClick: undefined
  })
);

export const selectCancelledTransactionDetail = createSelector(
  selectUserCancelledTransactions,
  count => ({
    name: "Cancelled transactions",
    value: count,
    onClick: undefined
  })
);

export const selectUserDetails = createSelector(
  selectReputationDetail,
  selectCompletedTransactionDetail,
  selectCancelledTransactionDetail,
  intoArray
);