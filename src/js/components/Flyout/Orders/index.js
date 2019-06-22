import React from "react";
import { compose } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";
import ListSlider from "../ListSlider";

import Grid from "@material-ui/core/Grid/Grid";
import OrderList from "../../OrderList";

const styles = () => ({
  root: {
    margin: "1em 0.5em 1em 0em"
  }
});

const Orders = ({ classes, openList }) => (
  <ListSlider>
    <Grid container className={classes.root}>
      <OrderList openList={openList} />
    </Grid>
  </ListSlider>
);

const propMap = {};

const actionMap = {};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles)
)(Orders);
