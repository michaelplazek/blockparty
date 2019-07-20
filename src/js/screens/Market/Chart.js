import React from "react";
import { compose, withHandlers } from "recompose";
import { withRouter } from "react-router";
import get from "lodash/fp/get";
import mapper from "../../utils/connect";

import {
  selectAskInfo,
  selectAsksForDisplay,
  selectBidInfo,
  selectBidsForDisplay,
  selectFilterCoin,
  selectFilterType,
  selectFormattedFilterPrice,
  selectHeaderHeight, selectIsDarkMode,
  selectLayer,
  selectMarketLoaded,
  selectNavHeight,
  selectTouched,
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
  setNavIndex as setNavIndexAction,
  setTouched as setTouchedAction
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
import Grid from "@material-ui/core/Grid";

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
  setNavIndex,
  touched,
  price,
  askInfo,
  bidInfo,
  height,
  width,
  markerLocation,
  isDarkMode,
  history
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
    {!hasData && (
      <Grid
        justify='center'
        align='center'
        style={{ margin: '20px' }}
      >
          <Placeholder
            label="There are no posts in your area. Go to the Dashboard to create a new post."
            top={40}
            action={() => {
              setNavIndex(1);
              history.push('dashboard');
            }}
            isDarkMode={isDarkMode}
            buttonLabel="Go to Dashboard"
          />
      </Grid>
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
  layer: selectLayer,
  touched: selectTouched,
  askInfo: selectAskInfo,
  bidInfo: selectBidInfo,
  isDarkMode: selectIsDarkMode
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
  setNavIndex: setNavIndexAction
};

export default compose(
  mapper(propMap, actionMap),
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
    }
  })
)(Chart);
