import React from "react";
import { compose, withHandlers, withState, lifecycle } from "recompose";
import { withRouter } from "react-router";
import get from "lodash/fp/get";
import mapper from "../utils/connect";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

import PageHeader from "../components/PageHeader";
import withAuthentification from "../HOCs/withAuthentification";
import {
  selectAsksForDisplay,
  selectBidsForDisplay,
  selectChartData,
  selectFilterCoin,
  selectFilterType,
  selectFormattedFilterPrice,
  selectHasData,
  selectHeaderHeight,
  selectMapMarkers,
  selectMarketLoaded,
  selectMidPoint,
  selectNavHeight,
  selectWindowHeight,
  selectWindowWidth
} from "../selectors";
import { loadAsks as loadAsksAction } from "../actions/asks";
import { loadBids as loadBidsAction } from "../actions/bids";
import { setLayerOpen as setLayerOpenAction } from "../actions/layers";
import { loadCurrentLocation as loadCurrentLocationAction } from "../actions/session";
import { setMarketView as setMarketViewAction } from "../actions/app";
import { MAP } from "../constants/app";
import DepthChart from "../components/DepthChart";
import ChartHeader from "../components/ChartHeader";
import PriceMarker from "../components/DepthChart/PriceMarker";
import Placeholder from "../components/DepthChart/Placeholder";
import withDimensions from "../HOCs/withDimensions";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Grow from "@material-ui/core/Grow/Grow";
import { setFilterPrice } from "../actions/filters";

const styles = () => ({
  actionButton: {
    position: "fixed"
  }
});

const Analysis = ({
  handleMarketView,
  chartData,
  headerHeight,
  navHeight,
  windowWidth,
  windowHeight,
  midMarketPrice,
  hasData,
  handleTouch,
  touched,
  subheading,
  price,
  handleSelect,
  handleButtonClick,
}) => (
  <div>
    <PageHeader
      leftHandButton="Go to map view"
      leftHandAction={handleMarketView}
      showSubheader={true}
      subheader={<ChartHeader onSelect={handleSelect} />}
    />
    {hasData && (
      <div>
        <PriceMarker
          price={touched ? price : midMarketPrice}
          subheading={subheading}
          top={headerHeight + 50}
        />
        <DepthChart
          data={chartData}
          height={windowHeight - navHeight - headerHeight}
          width={windowWidth}
          handleTouch={handleTouch}
        />
      </div>
    )}
    {!hasData && <Placeholder label="No Data" top={headerHeight + 50} />}
    {touched && (
      <Grow in={touched}>
        <div
          style={{
            position: "fixed",
            right: "2em",
            bottom: `${navHeight + 60}px`
          }}
        >
          <Button variant="fab" onClick={handleButtonClick}>
            <FontAwesomeIcon icon={faList} />
          </Button>
        </div>
      </Grow>
    )}
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
  price: selectFormattedFilterPrice,
  coin: selectFilterCoin
};

const actionMap = {
  loadAsks: loadAsksAction,
  loadBids: loadBidsAction,
  setLayerOpen: setLayerOpenAction,
  loadCurrentLocation: loadCurrentLocationAction,
  setMarketView: setMarketViewAction,
  setFilterPrice
};

export default compose(
  mapper(propMap, actionMap),
  withAuthentification,
  withDimensions,
  withRouter,
  withStyles(styles),
  withState("touched", "setTouched", false),
  withState("subheading", "setSubheading", "Mid Market Price"),
  lifecycle({
    componentDidMount() {
      this.props.loadAsks();
      this.props.loadBids();
    }
  }),
  withHandlers({
    handleMarketView: ({ history, setMarketView }) => () => {
      setMarketView(MAP);
      history.push("/");
    },
    handleTouch: ({ setTouched, setFilterPrice, setSubheading, coin }) => ({
      activePayload
    }) => {
      if (!activePayload) return;
      const payload = get("payload")(activePayload[0]);
      const { price } = payload;
      const type = !payload.bid ? "asks" : "bids";
      const total = !payload.bid ? payload.ask : payload.bid;
      const { count } = payload;
      const message = `${total} ${coin} available in ${count} ${type}`;
      setFilterPrice(price);
      setSubheading(message);
      setTouched(true);
    },
    handleSelect: ({ setTouched, setSubheading }) => () => {
      setTouched(false);
      setSubheading("Mid Market Price");
    },
    handleButtonClick: () => () => {

    },
  })
)(Analysis);
