import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";

import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List/List";
import Paper from "@material-ui/core/Paper/Paper";
import DetailListItem from "./DetailListItem";

const styles = () => ({
  paper: {
    margin: "0px 20px 0px 20px"
  },
  owner: {
    cursor: "pointer",
    textDecoration: "underline"
  }
});

const DetailList = ({ items, classes, userClick, elevation }) => (
  <Paper elevation={elevation} className={classes.paper}>
    <List>
      {items.map((item, index) => (
        <DetailListItem
          className={
            item.name === "Buyer" || item.name === "Seller"
              ? classes.owner
              : undefined
          }
          key={`${item.name}-${index}`}
          name={item.name}
          value={item.value}
          onClick={
            item.name === "Buyer" || item.name === "Seller"
              ? userClick
              : item.onClick
          }
          isLast={index === items.length - 1}
        />
      ))}
    </List>
  </Paper>
);

DetailList.propTypes = {
  items: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  userClick: PropTypes.func,
  elevation: PropTypes.number
};

DetailList.defaultProps = {
  userClick: () => {},
  elevation: 1
};

export default compose(withStyles(styles))(DetailList);
