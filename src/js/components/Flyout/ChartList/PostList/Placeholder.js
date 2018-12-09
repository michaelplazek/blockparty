import React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  root: {
    padding: "10px",
    alignContent: "center"
  }
});

const Placeholder = ({ classes }) => (
  <div className={classes.root}>
    <Typography>No results</Typography>
  </div>
);

export default withStyles(styles)(Placeholder);
