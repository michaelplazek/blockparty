import React from "react";
import { compose, withHandlers } from "recompose";
import { withRouter } from "react-router";

import mapper from "../../utils/connect";

import withStyles from "@material-ui/core/styles/withStyles";
import { Typography, Grid, ListItem, ListItemText } from "@material-ui/core";

import {
  selectAskList,
  selectBidList,
  selectFilterCoin
} from "../../selectors";

const styles = () => ({
  root: {},
  list: {
    marginRight: "0.5em",
  },
  item: {
    marginRight: "0.5em"
  },
  link: {
    cursor: "pointer"
  }
});

const ListItemBase = ({ item, classes, isBid, onClick }) => (
  <ListItem button={true} dense={true} divider={true}>
    <Grid
      container
      justify="space-between"
      onClick={onClick}
      className={classes.link}
    >
      <Grid item>
        <ListItemText
          disableTypography
          primary={<Typography>{item.volume}</Typography>}
        />
      </Grid>
      <Grid item>
        <ListItemText
          primary={
            <Typography style={{ color: isBid ? "#4caf50" : "#f44336" }}>
              {item.price}
            </Typography>
          }
        />
      </Grid>
    </Grid>
  </ListItem>
);

const ListHeaderBase = () => (
  <ListItem dense={true} divider={true}>
    <Grid container justify="space-between">
      <Grid item>
        <ListItemText
          disableTypography
          primary={<Typography variant="caption">Volume</Typography>}
        />
      </Grid>
      <Grid item>
        <ListItemText
          disableTypography
          primary={<Typography variant="caption">Price</Typography>}
        />
      </Grid>
    </Grid>
  </ListItem>
);

const ListTitleBase = ({ title }) => (
  <ListItem dense={true} divider={false}>
    <Grid container justify="center">
      <Grid item>
        <ListItemText
          disableTypography
          primary={<Typography variant="subtitle2">{title}</Typography>}
        />
      </Grid>
    </Grid>
  </ListItem>
);

const OrderListHeader = compose(withStyles(styles))(ListHeaderBase);
const OrderListItem = compose(withStyles(styles))(ListItemBase);
const OrderListTitle = compose(withStyles(styles))(ListTitleBase);

const OrderList = ({ classes, bids, asks, handleClick }) => (
  <Grid container direction="row" className={classes.root}>
    <Grid item className={classes.list}>
      <Grid container direction="column">
        <OrderListTitle title="Bids" />
        <OrderListHeader />
        {bids.map(item => (
          <OrderListItem
            onClick={() => handleClick(item)}
            item={item}
            isBid={true}
          />
        ))}
      </Grid>
    </Grid>
    <Grid item>
      <Grid container direction="column">
        <OrderListTitle title="Asks" />
        <OrderListHeader />
        {asks.map(item => (
          <OrderListItem
            onClick={() => handleClick(item)}
            item={item}
            isBid={false}
          />
        ))}
      </Grid>
    </Grid>
  </Grid>
);

const propMap = {
  bids: selectBidList,
  asks: selectAskList,
  coin: selectFilterCoin
};

const actionMap = {};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withRouter,
  withHandlers({
    handleClick: ({ history }) => item => {
      const { id, isBid } = item;
      const url = !isBid ? "/ask" : "/bid";
      history.push(`${url}?${id}`);
    }
  }),
  withHandlers({})
)(OrderList);
