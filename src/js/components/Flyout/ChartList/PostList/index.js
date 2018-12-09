import React from "react";
import PropTypes from "prop-types";
import { compose, withHandlers } from "recompose";
import { withRouter } from "react-router";

import ListItem from "./ListItem";
import Placeholder from "./Placeholder";
import List from "@material-ui/core/List/List";
import mapper from "../../../../utils/connect";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  root: {
    margin: "0em 1em 1em 1em"
  }
});

const ListBase = ({ items, type, handleClick, classes }) => (
  <div className={classes.root}>
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
  withStyles(styles),
  withRouter,
  withHandlers({
    handleClick: ({ history, type }) => item => {
      const { _id } = item;
      const url = type === "ASK" ? "/ask" : "/bid";
      history.push(`${url}?${_id}`);
    }
  })
)(ListBase);
