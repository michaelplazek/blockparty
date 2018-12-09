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
  selectFilterCoin,
  selectFilterType,
  selectFormattedFilterPrice,
  selectHeaderHeight,
  selectLayer,
  selectMarketLoaded,
  selectNavHeight,
  selectWindowHeight,
  selectWindowWidth
} from "../selectors";
import { loadAsks as loadAsksAction } from "../actions/asks";
import { loadBids as loadBidsAction } from "../actions/bids";
import {
  setLayer,
  setLayerOpen as setLayerOpenAction
} from "../actions/layers";
import { loadCurrentLocation as loadCurrentLocationAction } from "../actions/session";
import { setMarketView as setMarketViewAction } from "../actions/app";
import { MAP } from "../constants/app";
import AnalysisChart from "../components/AnalysisChart";
import ChartHeader from "../components/ChartHeader";
import PriceMarker from "../components/AnalysisChart/PriceMarker";
import Placeholder from "../components/DepthChart/Placeholder";
import withDimensions from "../HOCs/withDimensions";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Grow from "@material-ui/core/Grow/Grow";
import { setFilterPrice } from "../actions/filters";
import ChartList from "../components/Flyout/ChartList";
import {
  selectFullBins,
  selectMidMarketPrice,
  selectHasData
} from "../components/AnalysisChart/selectors";

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
  layer,
  askInfo,
  bidInfo
}) => (
  <div>
    {layer === "CHART_LIST" && <ChartList />}
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
          askInfo={askInfo}
          bidInfo={bidInfo}
          top={headerHeight + 50}
        />
        <AnalysisChart
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
  navHeight: selectNavHeight,
  headerHeight: selectHeaderHeight,
  windowHeight: selectWindowHeight,
  windowWidth: selectWindowWidth,
  type: selectFilterType,
  loaded: selectMarketLoaded, // for withLoader
  chartData: selectFullBins,
  midMarketPrice: selectMidMarketPrice,
  hasData: selectHasData,
  price: selectFormattedFilterPrice,
  coin: selectFilterCoin,
  layer: selectLayer
};

const actionMap = {
  loadAsks: loadAsksAction,
  loadBids: loadBidsAction,
  setLayerOpen: setLayerOpenAction,
  loadCurrentLocation: loadCurrentLocationAction,
  setMarketView: setMarketViewAction,
  setFilterPrice,
  setLayer
};

export default compose(
  mapper(propMap, actionMap),
  withAuthentification,
  withDimensions,
  withRouter,
  withStyles(styles),
  withState("touched", "setTouched", false),
  withState("askInfo", "setAskInfo", undefined),
  withState("bidInfo", "setBidInfo", undefined),
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
    handleTouch: ({
      setTouched,
      setFilterPrice,
      setAskInfo,
      setBidInfo,
      coin
    }) => ({ activePayload }) => {
      if (!activePayload) return;
      const payload = get("payload")(activePayload[0]);
      const { totalVolume } = payload;

      if (totalVolume === 0) {
        setTouched(false);
        setAskInfo("Mid Market Price");
        setBidInfo(undefined);
      } else {
        const { price, askVolume, bidVolume, askCount, bidCount } = payload;
        const askInfo =
          askVolume > 0
            ? `${askVolume} ${coin} available in ${askCount} asks`
            : undefined;
        const bidInfo =
          bidVolume > 0
            ? `${bidVolume} ${coin} available in ${bidCount} bids`
            : undefined;
        setFilterPrice(price);
        setAskInfo(askInfo);
        setBidInfo(bidInfo);
        setTouched(true);
      }
    },
    handleSelect: ({ setTouched, setAskInfo, setBidInfo }) => () => {
      setTouched(false);
      setAskInfo("Mid Market Price");
      setBidInfo(undefined);
    },
    handleButtonClick: ({ setLayer, setLayerOpen }) => () => {
      setLayer("CHART_LIST");
      setLayerOpen(true);
    }
  })
)(Analysis);
