import React from "react";
import { compose, lifecycle } from "recompose";
import { withRouter } from "react-router";
import mapper from "../utils/connect";
import { selectAsk, selectNavHeight, selectWindowHeight } from "../selectors";
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

const styles = () => ({
  root: {
    textAlign: "center",
    marginTop: "60px"
  },
  body: {
    marginTop: "10px"
  },
  slider: {
    alignContent: "center",
    margin: "20px 60px 20px 60px"
  }
});

const Ask = ({ ask, history, windowHeight, footerHeight, classes }) => (
  <div>
    <Grid>
      <Button onClick={() => history.goBack()}>Go Back</Button>
      <div className={classes.root}>
        <Grid item className={classes.body}>
          <Typography variant="display2">
            {ask.volume} {ask.coin}
          </Typography>
        </Grid>
        <div className={classes.slider}>
          <Slider
            value={10}
            aria-labelledby="label"
            vertical={false}
            min={0}
            max={100}
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: `${windowHeight / 2}px`,
          left: "10px",
          zIndex: 100
        }}
      >
        <Typography variant="display1">Fort Collins</Typography>
      </div>
      <GoogleMapsWrapper
        markers={[{ id: ask._id, lat: ask.lat, lng: ask.lng }]}
        height={windowHeight / 2 - footerHeight}
        initialCenter={{ lat: ask.lat, lng: ask.lng }}
        movable="none"
        zoomable={false}
        draggable={false}
        markersClickable={false}
        zoom={13}
        locationFromBottom={footerHeight}
        border="1px #ccc solid"
      />
    </Grid>
    <Grid />
  </div>
);

const propMap = {
  ask: selectAsk,
  windowHeight: selectWindowHeight,
  footerHeight: selectNavHeight
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
      console.log(id);
      this.props.loadAsk(id);
    }
  })
)(Ask);
