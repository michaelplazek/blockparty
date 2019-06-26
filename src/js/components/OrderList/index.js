import React from "react";
import { compose, withHandlers } from "recompose";
import { withRouter } from "react-router";

import mapper from "../../utils/connect";

import withStyles from "@material-ui/core/styles/withStyles";
import { Typography, Grid, ListItem, ListItemText } from "@material-ui/core";

import {
  selectAskList,
  selectBidList,
  selectFilterCoin,
  selectIsDarkMode
} from "../../selectors";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {DARK_GREY, WHITE} from "../../constants/colors";

const styles = () => ({
  list: {
    marginLeft: "0.2em"
  },
  closeButton: {
    textAlign: "right",
    position: "relative",
    right: "1.5em",
    cursor: "pointer"
  },
  link: {
    cursor: "pointer"
  }
});

const ListItemBase = ({ item, classes, isBid, onClick, isDarkMode }) => (
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
          primary={
            <Typography color={isDarkMode ? "textSecondary" : undefined}>
              {item.volume}
            </Typography>
          }
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

const ListTitleBase = ({ title, isDarkMode }) => (
  <ListItem dense={true} divider={false}>
    <Grid container justify="center">
      <Grid item>
        <ListItemText
          disableTypography
          primary={
            <Typography
              variant="subtitle2"
              color={isDarkMode ? 'textSecondary' : undefined}
            >
              {title}
            </Typography>
          }
        />
      </Grid>
    </Grid>
  </ListItem>
);

const OrderListHeader = compose(withStyles(styles))(ListHeaderBase);
const OrderListItem = compose(withStyles(styles))(ListItemBase);
const OrderListTitle = compose(withStyles(styles))(ListTitleBase);

const OrderList = ({
  classes,
  bids,
  asks,
  handleClick,
  isDarkMode,
  openList
  }) => (
  <Grid container direction='column'>
    <Grid item>
      <div
        className={classes.closeButton}
        onClick={openList}
      >
        <FontAwesomeIcon color={isDarkMode ? WHITE : DARK_GREY} icon={faTimes} />
      </div>
    </Grid>
    <Grid item>
      <Grid container direction="row" justify='center'>
        <Grid item>
          <Grid container direction="column">
            <OrderListTitle isDarkMode={isDarkMode} title="Bids" />
            <OrderListHeader />
            {bids.map(item => (
              <OrderListItem
                isDarkMode={isDarkMode}
                key={`${item.volume}-${item.price}`}
                onClick={() => handleClick(item)}
                item={item}
                isBid={true}
              />
            ))}
          </Grid>
        </Grid>
        <Grid item className={classes.list}>
          <Grid container direction="column">
            <OrderListTitle isDarkMode={isDarkMode} title="Asks" />
            <OrderListHeader />
            {asks.map(item => (
              <OrderListItem
                isDarkMode={isDarkMode}
                key={`${item.volume}-${item.price}`}
                onClick={() => handleClick(item)}
                item={item}
                isBid={false}
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

const propMap = {
  bids: selectBidList,
  asks: selectAskList,
  coin: selectFilterCoin,
  isDarkMode: selectIsDarkMode
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
