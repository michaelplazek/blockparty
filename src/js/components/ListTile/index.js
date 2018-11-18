import React from "react";
import PropTypes from "prop-types";

import Badge from "@material-ui/core/Badge/Badge";
import ListTile from "./ListTile";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    zIndex: 1
  },
  badge: {
    top: 2,
    right: -3,
    color: "white"
  }
});

const ListTileWithBadge = ({ classes, onClick, item }) => {
  return item.offers.length > 0 ? (
    <div className={classes.root}>
      <Badge
        classes={{ badge: classes.badge }}
        badgeContent={item.offers.length}
        color="secondary"
      >
        <ListTile onClick={onClick} item={item} />
      </Badge>
    </div>
  ) : (
    <ListTile onClick={onClick} item={item} />
  );
};

ListTileWithBadge.propTypes = {
  onClick: PropTypes.func.isRequired
};

ListTileWithBadge.defaultProp = {};

export default withStyles(styles)(ListTileWithBadge);
