import React from "react";
import PropTypes from "prop-types";
import { compose, withHandlers } from "recompose";
import { withRouter } from "react-router";

import ListItem from "./ListItem";
import Placeholder from "./Placeholder";
import List from "@material-ui/core/List/List";
import mapper from "../../utils/connect";

const ListBase = ({ items, type, handleClick }) => (
  <div>
    {items.length > 0 && (
      <List>
        {items.map(item => (
          <ListItem
            item={item}
            onClick={() => handleClick(item)}
            key={item._id}
          />
        ))}
      </List>
    )}
    {items.length < 1 && <Placeholder />}
  </div>
);

ListBase.propTypes = {
  items: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};

const propMap = {};

const actionMap = {};

export default compose(
  mapper(propMap, actionMap),
  withRouter,
  withHandlers({
    handleClick: ({ history, type }) => item => {
      const { _id } = item;
      const url = type === "ASK" ? "/ask" : "/bid";
      history.push(`${url}?${_id}`);
    },
  }),
)(ListBase);
