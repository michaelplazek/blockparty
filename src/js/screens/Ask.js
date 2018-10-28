import React from "react";
import { compose, lifecycle } from "recompose";
import { withRouter } from "react-router";
import mapper from "../utils/connect";
import {
  selectAsk,
  selectAskLoaded,
  selectNavHeight,
  selectWindowHeight,
  selectWindowWidth
} from "../selectors";
import { loadAsk as loadAskAction } from "../actions/asks";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import GoogleMapsWrapper from "../components/GoogleMaps/GoogleMapsWrapper";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import coins from "../constants/coins";
import TextField from "@material-ui/core/TextField/TextField";
import Slider from "@material-ui/lab/Slider";

import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import GoogleMapDetails from "../components/GoogleMaps/GoogleMapDetails";

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
    position: "absolute",
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
  loaded
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
            {/*<div className={classes.slider}>*/}
            {/*<Slider*/}
            {/*value={10}*/}
            {/*aria-labelledby="label"*/}
            {/*vertical={false}*/}
            {/*min={0}*/}
            {/*max={100}*/}
            {/*/>*/}
            {/*</div>*/}
            <br />
            <List>
              <ListItem divider={true}>
								<Grid container justify='space-between'>
                  <Grid item>
                    <ListItemText>Location</ListItemText>
                  </Grid>
                  <Grid item>
                    <ListItemText>
                      {ask.lat.toFixed(6)},{ask.lng.toFixed(6)}
                    </ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={true}>
								<Grid container justify='space-between'>
                  <Grid item>
                    <ListItemText>Price</ListItemText>
                  </Grid>
                  <Grid item>
                    <ListItemText>{ask.price}</ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={true}>
								<Grid container justify='space-between'>
                  <Grid item>
                    <ListItemText>Seller</ListItemText>
                  </Grid>
                  <Grid item>
                    <ListItemText>{ask._id}</ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={true}>
								<Grid container justify='space-between'>
                  <Grid item>
                    <ListItemText>Last Updated</ListItemText>
                  </Grid>
                  <Grid item>
                    <ListItemText>{ask.timestamp}</ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </div>
          {/*<GoogleMapDetails*/}
          {/*marker={{ id: ask._id, lat: ask.lat, lng: ask.lng }}*/}
          {/*height={`${windowHeight/4}px`}*/}
          {/*locationFromBottom={footerHeight}*/}
          {/*zoomable={false}*/}
          {/*/>*/}
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
