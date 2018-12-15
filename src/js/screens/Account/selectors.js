import {createSelector} from "reselect";
import {
  intoArray,
  selectUserCancelledTransactions,
  selectUserCompletedTransactions,
  selectUserReputation
} from "../../selectors";


export const selectReputationDetail = createSelector(
  selectUserReputation,
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