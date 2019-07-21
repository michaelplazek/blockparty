import {createSelector} from "reselect";
import {selectUserId} from "../../selectors";

export const selectInfoText = createSelector(
  selectUserId,
  (_, props) => (props.item),
  (userId, history) => {
    return userId === history.sellerId ? "Sold" : "Bought"
  }
);