import React from "react";
import { compose, withHandlers, lifecycle } from 'recompose';
import { withRouter } from "react-router";
import mapper from "../utils/connect";

import PageHeader from "../components/PageHeader";
import withAuthentification from "../HOCs/withAuthentification";
import {
  selectAsksForDisplay,
  selectBidsForDisplay, selectChartData, selectFilterType, selectHasData,
  selectHeaderHeight,
  selectMapMarkers, selectMarketLoaded, selectMidPoint,
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
import PriceMarker from "../components/DepthChart/PriceMarker";
import Placeholder from "../components/DepthChart/Placeholder";
import withDimensions from "../HOCs/withDimensions";

const Analysis = ({
  handleMarketView,
  chartData,
  headerHeight,
  navHeight,
  windowWidth,
  windowHeight,
  midMarketPrice,
  hasData,
}) => (
  <div>
    <PageHeader
      leftHandButton='Go to map view'
      leftHandAction={handleMarketView}
      showSubheader={true}
      subheader={<ChartHeader />}
    />
    {hasData &&
    <div>
      <PriceMarker
        price={midMarketPrice}
        top={headerHeight + 50}
      />
      <DepthChart
        data={chartData}
        height={windowHeight - navHeight - headerHeight}
        width={windowWidth}
      />
    </div>
    }
    {!hasData &&
      <Placeholder
        label='No Data'
        top={headerHeight + 50}
      />
    }

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
  chartData: selectChartData,
  midMarketPrice: selectMidPoint,
  hasData: selectHasData,
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
  withDimensions,
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
