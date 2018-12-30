import React, { Component } from "react";
import { compose, lifecycle, withHandlers } from "recompose";
import { withRouter } from "react-router";
import mapper from "../utils/connect";

import {
  selectHeaderHeight,
  selectMapMarkers,
  selectNavHeight,
  selectAsksForDisplay,
  selectBidsForDisplay,
  selectFilterType,
  selectMarketLoaded
} from "../selectors";
import { loadAsks as loadAsksAction } from "../actions/asks";
import { loadBids as loadBidsAction } from "../actions/bids";
import { loadCurrentLocation as loadCurrentLocationAction } from "../actions/session";
import { setLayerOpen as setLayerOpenAction } from "../actions/layers";

import Subheader from "../components/Subheader";
import GoogleMapsWrapper from "../components/GoogleMaps/GoogleMapsWrapper";
import PageHeader from "../components/PageHeader";
import FilterMap from "../components/Flyout/FilterMap/index";
import withDimensions from "../HOCs/withDimensions";
import withLoader from "../HOCs/withLoader";
import { setMarketView as setMarketViewAction } from "../actions/app";
import { CHART } from "../constants/app";
import withLocation from "../HOCs/withLocation";

class Market extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      markers,
      navHeight,
      headerHeight,
      windowHeight,
      handleMarkerClick,
      handleMarketView,
      currentLocation
    } = this.props;

    return (
      <div>
        <FilterMap />
        <PageHeader
          leftHandAction={() => this.props.setLayerOpen(true)}
          rightHandAction={handleMarketView}
          rightHandButton="Go to chart view"
          showSubheader={true}
          subheader={<Subheader />}
        />
        <GoogleMapsWrapper
            currentLocation={currentLocation}
          showLabels={true}
          markers={markers}
          onMarkerClick={handleMarkerClick}
          height={windowHeight - navHeight - headerHeight}
        />
      </div>
    );
  }
}

const propMap = {
  asks: selectAsksForDisplay,
  bids: selectBidsForDisplay,
  markers: selectMapMarkers,
  navHeight: selectNavHeight,
  headerHeight: selectHeaderHeight,
  type: selectFilterType,
  loaded: selectMarketLoaded // for withLoader
};

const actionMap = {
  loadAsks: loadAsksAction,
  loadBids: loadBidsAction,
  setLayerOpen: setLayerOpenAction,
  setMarketView: setMarketViewAction
};

export default compose(
  mapper(propMap, actionMap),
  withRouter,
  withDimensions,
  withHandlers({
    handleMarkerClick: ({ history, type }) => marker => {
      const { id } = marker;
      const url = type === "ASK" ? "/ask" : "/bid";
      history.push(`${url}?${id}`);
    },
    handleMarketView: ({ history, setMarketView }) => () => {
      setMarketView(CHART);
      history.push("/analysis");
    }
  }),
  lifecycle({
    componentWillMount() {
      const { loadAsks, loadBids } = this.props;
      loadAsks();
      loadBids();
    }
  }),
    withLocation,
  withLoader,

)(Market);
