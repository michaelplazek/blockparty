import React from "react";
import { compose, lifecycle } from "recompose";

import withStyles from "@material-ui/core/styles/withStyles";
import Chip from "@material-ui/core/Chip/Chip";

import { setLayerOpen as setLayerOpenAction } from "../../actions/layers";
import { selectFilter } from "../../selectors";
import mapper from "../../utils/connect";
import IconButton from "@material-ui/core/IconButton/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import Grid from "@material-ui/core/Grid/Grid";

const styles = theme => ({
  root: {
    height: "50px",
    borderBottom: "1px #CCC solid",
  },
  chip: {
    margin: "8px 3px 8px 3px"
  },
	menuButton: {
		marginRight: 8
	},
  filterButton: {

  }
});

const Subheader = ({ classes, filter, setLayerOpen }) => (
  <div className={classes.root}>
    <Grid container justify='space-between'>
      <Grid item>
      <Chip
        color="primary"
        clickable={true}
        onClick={() => setLayerOpen(true)}
        label={`Type: ${filter.type}`}
        className={classes.chip}
        variant="outlined"
      />
      <Chip
        color="primary"
        clickable={true}
        onClick={() => setLayerOpen(true)}
        label={`Coin: ${filter.coin}`}
        className={classes.chip}
        variant="outlined"
      />
      <Chip
        color="primary"
        clickable={true}
        onClick={() => setLayerOpen(true)}
        label={`Distance: ${filter.distanceAway}`}
        className={classes.chip}
        variant="outlined"
      />
      </Grid>
      <Grid item className={classes.filterButton}>
        <IconButton
          onClick={() => setLayerOpen(true)}
          className={classes.menuButton}
          color="primary"
          aria-label="Menu"
        >
          <FilterListIcon />
        </IconButton>
      </Grid>
    </Grid>
  </div>
);

const propMap = {
  filter: selectFilter
};

const actionMap = {
  setLayerOpen: setLayerOpenAction
};

export default compose(
  withStyles(styles),
  mapper(propMap, actionMap)
)(Subheader);
