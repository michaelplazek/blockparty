import React from "react";
import PropTypes from "prop-types";

import { compose, withState } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";

const styles = () => ({
  root: {
    margin: "30px 30px 30px 30px",
    padding: "20px",
  }
});

const Tile = ({
  classes,
  title,
  count,
  onClick,
  children,
  color,
  textColor
}) => (
  <Grid>
    <Paper style={{ background: color }} className={classes.root} elevation={1}>
      <Grid
        container
        justify="space-between"
        direction="row"
        onClick={() => {}}
      >
        <Grid item>
          <Typography color={textColor} variant="title">{title}</Typography>
        </Grid>
        <Grid item>
          <Typography color={textColor} variant="subheading">
            {count}
          </Typography>
        </Grid>
      </Grid>
      {children}
    </Paper>
  </Grid>
);

Tile.propTypes = {
  title: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  count: PropTypes.number,
  onClick: PropTypes.func
};

Tile.defaultProp = {
  count: 0,
  textColor: "#000000"
};

export default compose(
  withStyles(styles),
  withState("clicked", "setClicked", false)
)(Tile);
