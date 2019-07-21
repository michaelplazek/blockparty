import {createSelector} from "reselect";
import {selectUserId} from "../../selectors";

export const selectInfoText = createSelector(
  selectUserId,
  (_, props) => (props.item),
  (userId, history) => {
    if(!history.completed) return "Cancelled";
    return userId === history.sellerId ? "Sold" : "Bought"
  }
);