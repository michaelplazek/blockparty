import React from "react";
import { compose } from "recompose";

import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List/List";
import Paper from "@material-ui/core/Paper/Paper";
import DetailListItem from "./DetailListItem";

const styles = () => ({
  paper: {
    margin: "0px 20px 0px 20px"
  }
});

const DetailList = ({
  items,
  classes
}) => (
  <Paper className={classes.paper}>
    <List>
      {items.map((item, index) => (
        <DetailListItem
          key={`${item.name}-${index}`}
          name={item.name}
          value={item.value}
          onClick={item.onClick}
          isLast={index === items.length - 1}
        />
      ))}
    </List>
  </Paper>
);

export default compose(
  withStyles(styles),
)(DetailList);