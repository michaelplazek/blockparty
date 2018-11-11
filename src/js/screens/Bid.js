import React from "react";
import { compose, lifecycle } from "recompose";
import { withRouter } from "react-router";
import mapper from "../utils/connect";
import {
  selectBid,
  selectBidCity,
  selectBidDisplayPrice,
  selectBidLoaded,
  selectBidOwner,
  selectBidPostTime,
  selectBidState,
  selectNavHeight,
  selectWindowHeight
} from "../selectors";
import { loadBid as loadBidAction } from "../actions/bids";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";

import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

const styles = () => ({
  root: {
    textAlign: "center",
    marginTop: "40px"
  },
  body: {
    marginTop: "10px"
  },
  slider: {
    alignContent: "center",
    margin: "20px 60px 20px 60px"
  },
  buttons: {
    position: "fixed",
    bottom: "7em",
    right: "2em"
  }
});

const Bid = ({
  bid,
  history,
  windowHeight,
  footerHeight,
  classes,
  loaded,
  city,
  state,
  price,
  date,
  owner
}) => (
  <div>
    {loaded && (
      <div>
        <Grid>
          <Button onClick={() => history.goBack()}>Go Back</Button>
          <div className={classes.root}>
            <Grid item className={classes.body}>
              <Typography variant="display2">
                {bid.volume} {bid.coin}
              </Typography>
            </Grid>
            <br />
            <List>
              <ListItem divider={true}>
                <Grid container justify="space-between">
                  <Grid item>
                    <ListItemText
                      disableTypography
                      primary={
                        <Typography type="subheading">Location</Typography>
                      }
                    />
                  </Grid>
                  <Grid item>
                    <ListItemText>
                      {city}, {state}
                    </ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={true}>
                <Grid container justify="space-between">
                  <Grid item>
                    <ListItemText
                      disableTypography
                      primary={<Typography type="subheading">Price</Typography>}
                    />
                  </Grid>
                  <Grid item>
                    <ListItemText>{price}</ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={true}>
                <Grid container justify="space-between">
                  <Grid item>
                    <ListItemText
                      disableTypography
                      primary={<Typography type="subheading">Buyer</Typography>}
                    />
                  </Grid>
                  <Grid item>
                    <ListItemText>{owner}</ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={true}>
                <Grid container justify="space-between">
                  <Grid item>
                    <ListItemText
                      disableTypography
                      primary={
                        <Typography type="subheading">Last Updated</Typography>
                      }
                    />
                  </Grid>
                  <Grid item>
                    <ListItemText>{date}</ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </div>
          <Button
            className={classes.buttons}
            variant="extendedFab"
            onClick={() => {}}
          >
            Contact buyer
          </Button>
        </Grid>
        <Grid />
      </div>
    )}
  </div>
);

const propMap = {
  bid: selectBid,
  city: selectBidCity,
  state: selectBidState,
  price: selectBidDisplayPrice,
  date: selectBidPostTime,
  owner: selectBidOwner,
  windowHeight: selectWindowHeight,
  footerHeight: selectNavHeight,
  loaded: selectBidLoaded
};

const actionMap = {
  loadBid: loadBidAction
};

export default compose(
  withRouter,
  withStyles(styles),
  mapper(propMap, actionMap),
  lifecycle({
    componentDidMount() {
      const { search } = this.props.location;
      const id = search.substr(1);
      this.props.loadBid(id);
    }
  })
)(Bid);
