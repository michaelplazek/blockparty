import {createSelector} from "reselect";
import {selectFilterType} from "../../../selectors";
import {selectChartAsks, selectChartBids} from "../../AnalysisChart/selectors";

export const selectListItems = createSelector(
  selectFilterType,
  selectChartAsks,
  selectChartBids,
  (type, asks, bids) => type === "ASK" ? asks : bids
);