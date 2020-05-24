import React from "react";
import { compose, withHandlers } from "recompose";
import { withRouter } from "react-router";

import mapper from "../../utils/connect";

import withStyles from "@material-ui/core/styles/withStyles";
import { Typography, Grid, ListItem, ListItemText } from "@material-ui/core";

import {
  selectAskList,
  selectBidList, selectFilter,
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

const ListItemBase = ({ item, classes, isBid, onClick }) => (
  <ListItem
    style={{
      cursor: "pointer",
      background: isBid ? "#dcefdc" : "#fcd2cf",
      padding: "4px",
      borderRadius: "2px",
      margin: '1px'
    }}
    button={true}
    dense={true}
    divider={false}
  >
    <Grid
      container
      justify="space-between"
      onClick={onClick}
    >
      <Grid item>
        <ListItemText
          disableTypography
          primary={
            <Typography>
              {item.volume}
            </Typography>
          }
        />
      </Grid>
      <Grid item>
        <ListItemText
          primary={
            <Typography style={{ color: isBid ? "#3e8e41" : "#c2160a" }}>
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

const ListTitleBase = ({ title, subTitle, isDarkMode }) => (
  <ListItem dense={true} divider={false}>
    <Grid container justify="center">
      <Grid item>
        <ListItemText
          disableTypography
          primary={
            <Grid container direction='column' alignItems='center'>
              <Grid item>
              <Typography
                variant="subheading"
                color={isDarkMode ? 'textSecondary' : undefined}
              >
                {title}
              </Typography>
              </Grid>
              <Grid item>
              <Typography
                variant="caption"
                color={isDarkMode ? 'textSecondary' : undefined}
              >
                {subTitle}
              </Typography>
              </Grid>
            </Grid>
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
  openList,
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
    <Grid className={classes.listItems} item>
      <Grid container direction="row" justify='center'>
        {
          bids.length > 0 && (
            <Grid item>
              <Grid container direction="column">
                <OrderListTitle
                  isDarkMode={isDarkMode}
                  title="Bids"
                  subTitle="Looking to buy"
                />
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
          )
        }
        {
          asks.length > 0 && (
            <Grid item className={classes.list}>
              <Grid container direction="column">
                <OrderListTitle
                  isDarkMode={isDarkMode}
                  title="Asks"
                  subTitle="Looking to sell"
                />
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
          )
        }
      </Grid>
    </Grid>
  </Grid>
);

const propMap = {
  bids: selectBidList,
  asks: selectAskList,
  coin: selectFilterCoin,
  isDarkMode: selectIsDarkMode,
  orderType: selectFilter
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
