import React from "react";
import { compose, lifecycle } from "recompose";
import { withRouter } from "react-router";
import mapper from "../utils/connect";
import {selectBid, selectNavHeight, selectWindowHeight} from "../selectors";
import { loadBid as loadBidAction } from "../actions/bids";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import GoogleMapsWrapper from "../components/GoogleMaps/GoogleMapsWrapper";
import Typography from "@material-ui/core/Typography/Typography";
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

const Bid = ({ bid, history, windowHeight, footerHeight, classes }) => (
  <div>
    <Grid>
      <Button onClick={() => history.goBack()}>Go Back</Button>
      <div className={classes.root}>
        <Grid item className={classes.body}>
          <Typography variant="display2">
            {bid.volume} {bid.coin}
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
        markers={[{ id: bid._id, lat: bid.lat, lng: bid.lng }]}
        height={windowHeight / 2 - footerHeight}
        initialCenter={{ lat: bid.lat, lng: bid.lng }}
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
	bid: selectBid,
  windowHeight: selectWindowHeight,
  footerHeight: selectNavHeight
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
      console.log(this.props);
      const { search } = this.props.location;
      const id = search.substr(1);
      console.log(id);
      this.props.loadBid(id);
    }
  })
)(Bid);
