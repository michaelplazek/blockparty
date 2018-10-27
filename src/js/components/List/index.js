import React from "react";
import PropTypes from "prop-types";
import { compose, withHandlers } from "recompose";

import ListItem from "./ListItem";
import Placeholder from "./Placeholder";
import List from "@material-ui/core/List/List";
// import { loadAskFromAsks } from "../../actions/asks";
import mapper from "../../utils/connect";

const ListBase = ({ items, loadAskFromAsks }) => (
  <div>
    {items.length > 0 && (
      <List>
        {items.map(item => (
          <ListItem
            item={item}
            // onClick={loadAskFromAsks}
            path="/details"
            key={item._id}
          />
        ))}
      </List>
    )}
    {items.length < 1 && <Placeholder />}
  </div>
);

ListBase.propTypes = {
  items: PropTypes.array.isRequired
};

const propMap = {};

const actionMap = {
  // loadAskFromAsks: loadAskFromAsks
};

export default compose(mapper(propMap, actionMap))(ListBase);
