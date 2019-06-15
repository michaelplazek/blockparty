import React from "react";
import { compose, withHandlers, withState } from "recompose";
import { withRouter } from "react-router";
import get from "lodash/fp/get";
import mapper from "../../utils/connect";

import withAuthentification from "../../HOCs/withAuthentification";
import {
  selectAskInfo,
  selectAsksForDisplay, selectBidInfo,
  selectBidsForDisplay,
  selectFilterCoin,
  selectFilterType,
  selectFormattedFilterPrice,
  selectHeaderHeight,
  selectLayer,
  selectMarketLoaded,
  selectNavHeight, selectTouched,
  selectWindowHeight,
  selectWindowWidth
} from "../../selectors";
import { loadAsks as loadAsksAction } from "../../actions/asks";
import { loadBids as loadBidsAction } from "../../actions/bids";
import {
  setLayer,
  setLayerOpen as setLayerOpenAction
} from "../../actions/layers";
import { loadCurrentLocation as loadCurrentLocationAction } from "../../actions/session";
import {
  setAskInfo as setAskInfoAction,
  setBidInfo as setBidInfoAction,
  setMarketView as setMarketViewAction,
  setTouched as setTouchedAction,
} from "../../actions/app";
import AnalysisChart from "../../components/AnalysisChart";
import PriceMarker from "../../components/AnalysisChart/PriceMarker";
import Placeholder from "../../components/AnalysisChart/Placeholder";
import withStyles from "@material-ui/core/styles/withStyles";
import { setFilterPrice } from "../../actions/filters";
import {
  selectFullBins,
  selectMidMarketPrice,
  selectHasData
} from "../../components/AnalysisChart/selectors";

const styles = () => ({
  actionButton: {
    position: "fixed"
  }
});

const Chart = ({
  chartData,
  headerHeight,
  midMarketPrice,
  hasData,
  handleTouch,
  touched,
  price,
  askInfo,
  bidInfo,
  height,
  width,
  markerLocation
}) => (
  <div
    style={{
      height,
      width,
      borderBottom: "solid #CCC 1px"
    }}
  >
    {hasData && (
      <div>
        <PriceMarker
          price={touched ? price : midMarketPrice}
          askInfo={askInfo}
          bidInfo={bidInfo}
          top={markerLocation + 50}
        />
        <AnalysisChart
          data={chartData}
          height={height}
          width={width}
          handleTouch={handleTouch}
        />
      </div>
    )}
    {!hasData && <Placeholder label="No Available Sales" top={headerHeight} />}
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
  layer: selectLayer,
  touched: selectTouched,
  askInfo: selectAskInfo,
  bidInfo: selectBidInfo,
};

const actionMap = {
  loadAsks: loadAsksAction,
  loadBids: loadBidsAction,
  setLayerOpen: setLayerOpenAction,
  loadCurrentLocation: loadCurrentLocationAction,
  setMarketView: setMarketViewAction,
  setFilterPrice,
  setLayer,
  setTouched: setTouchedAction,
  setAskInfo: setAskInfoAction,
  setBidInfo: setBidInfoAction,
};

export default compose(
  mapper(propMap, actionMap),
  withAuthentification,
  withRouter,
  withStyles(styles),
  withHandlers({
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
        setFilterPrice(undefined);
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
  })
)(Chart);
