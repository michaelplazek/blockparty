import React from "react";
import PropTypes from "prop-types";

import { compose, lifecycle } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";

const styles = () => ({
  root: {
    margin: "30px 60px 30px 60px",
    padding: "20px",
    cursor: "pointer"
  }
});

const Tile = ({ classes, title, count, onClick }) => (
  <div onClick={onClick}>
    <Paper className={classes.root} elevation={1}>
      <Grid
        container
        justify="space-between"
        direction="row"
        onClick={() => {}}
      >
        <Grid item>
          <Typography variant="title">{title}</Typography>
        </Grid>
        <Grid item>
          <Typography color="textSecondary" variant="subheading">
            {count}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  </div>
);

Tile.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
  onClick: PropTypes.func
};

Tile.defaultProp = {
  count: 0,
  onClick: () => {}
};

export default compose(withStyles(styles))(Tile);
