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
            <Typography variant='subheading'>
              {item.volume}
            </Typography>
          }
        />
      </Grid>
      <Grid item>
        <ListItemText
          primary={
            <Typography
              variant='subheading'
              style={{ color: isBid ? "#3e8e41" : "#c2160a" }}
            >
              {item.price}
            </Typography>
          }
        />
      </Grid>
    </Grid>
  </ListItem>
);

const ListHeaderBase = ({ isDarkMode }) => (
  <ListItem dense={true} divider={true}>
    <Grid container justify="space-between">
      <Grid item>
        <ListItemText
          disableTypography
          primary={
            <Typography
              variant="subheading"
              color={isDarkMode ? 'textSecondary' : undefined}
            >
              Volume
            </Typography>
          }
        />
      </Grid>
      <Grid item>
        <ListItemText
          disableTypography
          primary={
            <Typography
              variant="subheading"
              color={isDarkMode ? 'textSecondary' : undefined}
            >
              Price
            </Typography>
          }
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
                variant="headline"
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
    <Grid item>
      <Grid container direction="row" justify='center'>
        {
          bids.length === 0 && asks.length === 0 && (
            <Grid container justify='center' style={{ marginTop: "20px" }}>
              <Grid item>
                <Typography
                  color={isDarkMode ? 'textSecondary' : undefined}
                  variant="subheading"
                >
                  No items
                </Typography>
              </Grid>
            </Grid>
          )
        }
        {
          bids.length > 0 && (
            <Grid item>
              <Grid container direction="column">
                <OrderListTitle
                  isDarkMode={isDarkMode}
                  title="Bids"
                  subTitle="Looking to buy"
                />
                <OrderListHeader isDarkMode={isDarkMode} />
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
                <OrderListHeader isDarkMode={isDarkMode} />
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
