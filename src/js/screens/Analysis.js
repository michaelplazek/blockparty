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
  selectChartListType,
  selectFilterCoin,
  selectFilterType,
  selectFormattedFilterPrice,
  selectHasData,
  selectHeaderHeight,
  selectLayer,
  selectMapMarkers,
  selectMarketLoaded,
  selectMidPoint,
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
import BarChart from "../components/BarChart";
import ChartHeader from "../components/ChartHeader";
import PriceMarker from "../components/BarChart/PriceMarker";
import Placeholder from "../components/BarChart/Placeholder";
import withDimensions from "../HOCs/withDimensions";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Grow from "@material-ui/core/Grow/Grow";
import { setFilterPrice } from "../actions/filters";
import BidChartList from "../components/Flyout/BidChartList";
import AskChartList from "../components/Flyout/AskChartList";
import { selectFullBins } from "../components/BarChart/selectors";

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
    {layer === "LIST_BIDS" && <BidChartList />}
    {layer === "LIST_ASKS" && <AskChartList />}
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
        <BarChart
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
  chartData: selectFullBins,
  midMarketPrice: selectMidPoint,
  hasData: selectHasData,
  price: selectFormattedFilterPrice,
  coin: selectFilterCoin,
  layer: selectLayer,
  selectedType: selectChartListType
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
  withState("askInfo", "setAskInfo", ""),
  withState("bidInfo", "setBidInfo", ""),

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
      const { count } = payload;

      if (count > 0) {
        const { price } = payload;
        const type = !payload.bid ? "asks" : "bids";
        const total = !payload.bid ? payload.ask : payload.bid;
        const message = `${total} ${coin} available in ${count} ${type}`;
        setFilterPrice(price);
        setSubheading(message);
        setTouched(true);
      } else {
        setTouched(false);
        setSubheading("Mid Market Price");
      }
    },
    handleSelect: ({ setTouched, setSubheading }) => () => {
      setTouched(false);
      setSubheading("Mid Market Price");
    },
    handleButtonClick: ({ setLayer, setLayerOpen, selectedType }) => () => {
      if (selectedType === "ASK") {
        setLayer("LIST_ASKS");
      } else {
        setLayer("LIST_BIDS");
      }
      setLayerOpen(true);
    }
  })
)(Analysis);
