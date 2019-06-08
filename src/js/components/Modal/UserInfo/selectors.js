import React from "react";
import { createSelector } from "reselect";
import {
  selectUser,
  intoArray,
} from "../../../selectors";
import StarRating from "react-star-ratings";
import moment from "moment";

const selectUserReputation = createSelector(
  selectUser,
  ({ completedTransactions, cancelledTransactions }) => {
    const total = completedTransactions + cancelledTransactions;
    return total > 0 ? (completedTransactions / total) * 5 : 0;
  }
);

export const selectUsername = createSelector(
  selectUser,
  user => ({
    name: "Username",
    value: user.username,
    onClick: undefined
  })
);

export const selectStarRating = createSelector(
  selectUserReputation,
  reputation => (
    <StarRating
      rating={reputation}
      starRatedColor="#ffc107"
      numberOfStars={5}
      starDimension="1em"
      starSpacing="0.1em"
      name="rating"
    />
  )
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
  selectUser,
  user => ({
    name: "Completed transactions",
    value: user.completedTransactions,
    onClick: undefined
  })
);

export const selectCancelledTransactionDetail = createSelector(
  selectUser,
  user => ({
    name: "Cancelled transactions",
    value: user.cancelledTransactions,
    onClick: undefined
  })
);

export const selectMemberSince = createSelector(
  selectUser,
  user => ({
    name: "Member Since",
    value: moment(user.created).calendar(),
    onClick: undefined
  })
);

export const selectUserDetails = createSelector(
  selectUsername,
  selectReputationDetail,
  selectCompletedTransactionDetail,
  selectCancelledTransactionDetail,
  selectMemberSince,
  intoArray
);