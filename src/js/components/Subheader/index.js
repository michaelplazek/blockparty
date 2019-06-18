import React from "react";
import { compose, withHandlers } from "recompose";

import withStyles from "@material-ui/core/styles/withStyles";
import Chip from "@material-ui/core/Chip/Chip";

import {
  setLayerOpen as setLayerOpenAction,
  setLayer as setLayerAction
} from "../../actions/layers";
import {
  selectFilter,
  selectFilterCoin,
  selectFilterDistance,
  selectFilterType
} from "../../selectors";
import mapper from "../../utils/connect";
import IconButton from "@material-ui/core/IconButton/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import Grid from "@material-ui/core/Grid/Grid";
import {
  setFilterItems,
  setFocusField as setFocusFieldAction
} from "../../actions/filters";
import {Typography} from "@material-ui/core";

const styles = () => ({
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

const Subheader = ({ classes, filter, handleOpen }) => (
  <div className={classes.root}>
    <Grid container justify="space-between">
      <Grid item>
        <Chip
          clickable={true}
          onClick={() => handleOpen("type")}
          label={
            <Typography variant='caption'>
              {`${filter.type}`}
            </Typography>
          }
          className={classes.chip}
        />
        <Chip
          clickable={true}
          onClick={() => handleOpen("coin")}
          label={
            <Typography variant='caption'>
              {`${filter.coin}`}
            </Typography>
          }
          className={classes.chip}
        />
        <Chip
          clickable={true}
          onClick={() => handleOpen("distance")}
          label={
            <Typography variant='caption'>
              {`${filter.distanceAway || 0} mi`}
            </Typography>
          }
          className={classes.chip}
        />
      </Grid>
      <Grid item className={classes.filterButton}>
        <IconButton
          onClick={() => handleOpen("")}
          className={`${classes.menuButton} filters`}
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
  filter: selectFilter
};

const actionMap = {
  setLayerOpen: setLayerOpenAction,
  setLayer: setLayerAction,
  setFilterItems,
  setFocusField: setFocusFieldAction
};

export default compose(
  withStyles(styles),
  mapper(propMap, actionMap),
  withHandlers({
    handleOpen: ({
      setFilterItems,
      setLayerOpen,
      setLayer,
      setFocusField
    }) => field => {
      setFilterItems();
      setFocusField(field);
      setLayer("FILTER_MAP");
      setLayerOpen(true);
    }
  })
)(Subheader);
