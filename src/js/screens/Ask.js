import React from "react";
import { compose, lifecycle } from "recompose";
import { withRouter } from "react-router";
import mapper from "../utils/connect";
import {
  selectAsk, selectAskCity, selectAskDisplayPrice,
  selectAskLoaded, selectAskOwner, selectAskPostTime, selectAskState,
  selectNavHeight,
  selectWindowHeight,
  selectWindowWidth
} from "../selectors";
import { loadAsk as loadAskAction } from "../actions/asks";
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

const Ask = ({
  ask,
  history,
  windowHeight,
  windowWidth,
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
                {ask.volume} {ask.coin}
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
                      primary={
                        <Typography type="subheading">Seller</Typography>
                      }
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
            Contact seller
          </Button>
        </Grid>
        <Grid />
      </div>
    )}
  </div>
);

const propMap = {
  ask: selectAsk,
  city: selectAskCity,
  state: selectAskState,
  price: selectAskDisplayPrice,
  date: selectAskPostTime,
  owner: selectAskOwner,
  windowHeight: selectWindowHeight,
  width: selectWindowWidth,
  footerHeight: selectNavHeight,
  loaded: selectAskLoaded
};

const actionMap = {
  loadAsk: loadAskAction
};

export default compose(
  withRouter,
  withStyles(styles),
  mapper(propMap, actionMap),
  lifecycle({
    componentDidMount() {
      const { search } = this.props.location;
      const id = search.substr(1);
      this.props.loadAsk(id);
    }
  })
)(Ask);
