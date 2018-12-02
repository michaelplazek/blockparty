import React from "react";
import PropTypes from "prop-types";

import { compose, withState } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";

const styles = () => ({
  root: {
    margin: "10px",
    padding: "10px"
  },
  pipe: {
    position: "relative",
    marginLeft: "5px",
    marginRight: "5px"
  },
  description: {
    position: "relative",
    top: "1px"
  }
});

const Tile = ({
  classes,
  title,
  count,
  onClick,
  children,
  color,
  textColor,
  description
}) => (
  <Grid>
    <Paper style={{ background: color }} className={classes.root} elevation={2}>
      <Grid
        container
        justify="space-between"
        direction="row"
        onClick={() => {}}
      >
        <Grid item>
          <Grid container direction="row">
            <Grid item>
              <Typography color={textColor} variant="title">
                {title}
              </Typography>
            </Grid>
            {description && (
              <Grid item>
                <Grid container direction="row">
                  <Grid item className={classes.pipe}>
                    <Typography color={textColor} variant="title">
                      |
                    </Typography>
                  </Grid>
                  <Grid item className={classes.description}>
                    <Typography color={textColor} variant="subheading">
                      {description}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
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
  description: PropTypes.string,
  textColor: PropTypes.string,
  count: PropTypes.number,
  onClick: PropTypes.func
};

Tile.defaultProp = {
  count: 0,
  textColor: "#000000",
  description: undefined
};

export default compose(
  withStyles(styles),
  withState("clicked", "setClicked", false)
)(Tile);
