import React from "react";
import { compose, withHandlers, lifecycle } from 'recompose';
import { withRouter } from "react-router";
import mapper from "../utils/connect";

import PageHeader from "../components/PageHeader";
import withAuthentification from "../HOCs/withAuthentification";
import {
  selectAsksForDisplay,
  selectBidsForDisplay, selectChartData, selectFilterType,
  selectHeaderHeight,
  selectMapMarkers, selectMarketLoaded,
  selectNavHeight, selectWindowHeight, selectWindowWidth
} from "../selectors";
import {loadAsks as loadAsksAction} from "../actions/asks";
import {loadBids as loadBidsAction} from "../actions/bids";
import {setLayerOpen as setLayerOpenAction} from "../actions/layers";
import {loadCurrentLocation as loadCurrentLocationAction} from "../actions/session";
import {setMarketView as setMarketViewAction} from "../actions/app";
import {MAP} from "../constants/app";
import DepthChart from "../components/DepthChart";
import ChartHeader from "../components/ChartHeader";

const Analysis = ({
  handleMarketView,
  chartData,
  headerHeight,
  navHeight,
  windowWidth,
  windowHeight
}) => (
  <div>
    <PageHeader
      leftHandButton='Go to map view'
      leftHandAction={handleMarketView}
      showSubheader={true}
      subheader={<ChartHeader />}
    />
    <DepthChart
      data={chartData}
      height={windowHeight - navHeight - headerHeight}
      width={windowWidth}
    />

  </div>
);

const propMap = {
  asks: selectAsksForDisplay,
  bids: selectBidsForDisplay,
  markers: selectMapMarkers,
  navHeight: selectNavHeight,
  headerHeight: selectHeaderHeight,
  windowHeight: selectWindowHeight,
  windowWidth: selectWindowWidth,
  type: selectFilterType,
  loaded: selectMarketLoaded, // for withLoader
  chartData: selectChartData
};

const actionMap = {
  loadAsks: loadAsksAction,
  loadBids: loadBidsAction,
  setLayerOpen: setLayerOpenAction,
  loadCurrentLocation: loadCurrentLocationAction,
  setMarketView: setMarketViewAction
};

export default compose(
  mapper(propMap, actionMap),
  withAuthentification,
  withRouter,
  lifecycle({
    componentDidMount() {
      this.props.loadAsks();
      this.props.loadBids();
    }
  }),
  withHandlers({
    handleMarketView: ({ history, setMarketView }) => () => {
      setMarketView(MAP);
      history.push('/');
    },
  }),
)(Analysis);
