import React from "react";
import { compose, lifecycle } from "recompose";

import withStyles from "@material-ui/core/styles/withStyles";
import Chip from "@material-ui/core/Chip/Chip";

import { setLayerOpen as setLayerOpenAction } from "../../actions/layers";
import {selectFilter, selectFilterCoin, selectFilterDistance, selectFilterType} from "../../selectors";
import mapper from "../../utils/connect";
import IconButton from "@material-ui/core/IconButton/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import Grid from "@material-ui/core/Grid/Grid";

const styles = theme => ({
  root: {
    height: "50px",
    borderBottom: "1px #CCC solid"
  },
  chip: {
    margin: "8px 3px 8px 3px"
  },
  menuButton: {
    marginRight: 8
  },
  filterButton: {}
});

const Subheader = ({
  classes,
  distanceAway,
  setLayerOpen,
  type,
  coin
}) => (
  <div className={classes.root}>
    <Grid container justify="space-between">
      <Grid item>
        <Chip
          clickable={true}
          onClick={() => setLayerOpen(true)}
          label={`Type: ${type}`}
          className={classes.chip}
          variant="outlined"
        />
        <Chip
          clickable={true}
          onClick={() => setLayerOpen(true)}
          label={`Coin: ${coin}`}
          className={classes.chip}
          variant="outlined"
        />
        <Chip
          clickable={true}
          onClick={() => setLayerOpen(true)}
          label={`Distance: ${distanceAway || 0}`}
          className={classes.chip}
          variant="outlined"
        />
      </Grid>
      <Grid item className={classes.filterButton}>
        <IconButton
          onClick={() => setLayerOpen(true)}
          className={classes.menuButton}
          aria-label="Menu"
        >
          <FilterListIcon />
        </IconButton>
      </Grid>
    </Grid>
  </div>
);

const propMap = {
  type: selectFilterType,
  coin: selectFilterCoin,
  distanceAway: selectFilterDistance,
};

const actionMap = {
  setLayerOpen: setLayerOpenAction
};

export default compose(
  withStyles(styles),
  mapper(propMap, actionMap)
)(Subheader);
