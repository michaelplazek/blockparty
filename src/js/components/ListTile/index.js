import React from "react";
import PropTypes from "prop-types";

import Badge from "@material-ui/core/Badge/Badge";
import ListTile from "./ListTile";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: "stretch"
  },
  badge: {
    top: 4,
    right: 1,
  }
});

const ListTileWithBadge = ({ classes, onClick, item }) => {
  return item.offers.length > 0 ?
    (
      <div className={classes.root}>
          <Badge classes={{ badge: classes.badge }} badgeContent={item.offers.length} color="primary">
            <ListTile
              onClick={onClick}
              item={item}
            />
          </Badge>
      </div>
    ) :
    (
      <ListTile
        onClick={onClick}
        item={item}
      />
    )
};

ListTileWithBadge.propTypes = {
  onClick: PropTypes.func.isRequired
};

ListTileWithBadge.defaultProp = {};

export default withStyles(styles)(ListTileWithBadge);