import React, { Component } from "react";
import { compose, lifecycle, withHandlers } from "recompose";
import { withRouter } from "react-router";

import Joyride from "react-joyride";

import mapper from "../../utils/connect";

import {
  selectHeaderHeight,
  selectMapMarkers,
  selectNavHeight,
  selectAsksForDisplay,
  selectBidsForDisplay,
  selectFilterType,
  selectMarketLoaded,
  selectRun,
  selectLayer,
  selectInitialLocation,
  selectModal,
  selectListOpen,
  selectUserId,
  selectIsLoggedIn
} from "../../selectors";
import { loadAsks as loadAsksAction } from "../../actions/asks";
import { loadBids as loadBidsAction } from "../../actions/bids";
import {
  setLayerOpen as setLayerOpenAction,
  setLayer as setLayerAction,
  setModalOpen as setModalOpenAction,
  setModal as setModalAction
} from "../../actions/layers";

import Subheader from "../../components/Subheader";
import GoogleMapsWrapper from "../../components/GoogleMaps/GoogleMapsWrapper";
import PageHeader from "../../components/PageHeader";
import FilterMap from "../../components/Flyout/FilterMap";
import withDimensions from "../../HOCs/withDimensions";
import withLoader from "../../HOCs/withLoader";
import {
  setListOpen as setListOpenAction,
  setMarketView as setMarketViewAction,
  setNavIndex as setNavIndexAction,
  setRun as setRunAction
} from "../../actions/app";
import { CHART } from "../../constants/app";
import withLocation from "../../HOCs/withLocation";
import Chart from "./Chart";
import withPolling from "../../HOCs/withPolling";
import withPushNotifications from "../../HOCs/withPushNotifications";
import withVisited from "../../HOCs/withVisited";
import { isVisited, marketSteps, tourStyle } from "../../config/tour";
import Tooltip from "../../components/TourTooltip";
import Welcome from "../../components/Modal/Welcome";
import {
  setCurrentLocation as setCurrentLocationAction,
  setPostLoginPath as setPostLoginPathAction
} from "../../actions/session";
import ListIcon from "./ListIcon";
import Orders from "../../components/Flyout/Orders";
import withNav from "../../HOCs/withNav";
import withMode from "../../HOCs/withMode";
import withDarkMode from "../../HOCs/withDarkMode";

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
      windowWidth,
      handleMarkerClick,
      currentLocation,
      initialLocation,
      handleBoundsChanged,
      setPostLoginPath,
      handleCallback,
      handleOpenList,
      layer,
      run,
      modal,
      isDarkMode,
      history,
      loggedIn,
    } = this.props;

    return (
      <div>
        {modal === "WELCOME" && <Welcome />}
        {layer === "FILTER_MAP" && <FilterMap />}
        <Orders openList={handleOpenList} />
        <PageHeader
          leftHandLabel="Market"
          showSubheader={true}
          subheader={<Subheader />}
          rightHandButton={!loggedIn ? "Sign In" : undefined}
          rightHandAction={() => {
            setPostLoginPath('/');
            history.push('/login');
          }}
        />
        <Chart
          height={(windowHeight - navHeight - headerHeight) * 0.33}
          markerLocation={navHeight}
          width={windowWidth}
        />
        <ListIcon
          height={((windowHeight - navHeight - headerHeight) * 0.66)}
          openList={handleOpenList}
        />
        <GoogleMapsWrapper
          handleBoundsChanged={handleBoundsChanged}
          currentLocation={currentLocation}
          initialLocation={initialLocation}
          showLabels={true}
          showCenterIcon={true}
          markers={markers}
          onMarkerClick={handleMarkerClick}
          height={(windowHeight - navHeight - headerHeight) * 0.66}
          navHeight={navHeight}
          windowHeight={windowHeight}
          isDarkMode={isDarkMode}
        />
        <Joyride
          steps={marketSteps}
          run={run}
          styles={tourStyle(isDarkMode)}
          continuous={true}
          tooltipComponent={Tooltip}
          disableOverlay={true}
          callback={handleCallback}
        />
      </div>
    );
  }
}

const propMap = {
  layer: selectLayer,
  modal: selectModal,
  asks: selectAsksForDisplay,
  bids: selectBidsForDisplay,
  markers: selectMapMarkers,
  navHeight: selectNavHeight,
  headerHeight: selectHeaderHeight,
  type: selectFilterType,
  run: selectRun,
  initialLocation: selectInitialLocation,
  listOpen: selectListOpen,
  userId: selectUserId,
  loggedIn: selectIsLoggedIn,
  loaded: selectMarketLoaded // from withLoader
};

const actionMap = {
  loadAsks: loadAsksAction,
  loadBids: loadBidsAction,
  setLayerOpen: setLayerOpenAction,
  setLayer: setLayerAction,
  setModalOpen: setModalOpenAction,
  setModal: setModalAction,
  setMarketView: setMarketViewAction,
  setRun: setRunAction,
  setNavIndex: setNavIndexAction,
  setCurrentLocation: setCurrentLocationAction,
  setListOpen: setListOpenAction,
  setPostLoginPath: setPostLoginPathAction
};

export default compose(
  mapper(propMap, actionMap),
  withRouter,
  withDimensions,
  withMode,
  withDarkMode,
  withHandlers({
    handleMarkerClick: ({ history }) => marker => {
      const { id, isBid } = marker;
      const url = !isBid ? "/ask" : "/bid";
      history.push(`${url}?${id}`);
    },
    handleBoundsChanged: ({ setCurrentLocation }) => coords => {
      setCurrentLocation(coords);
    },
    handleMarketView: ({ history, setMarketView }) => () => {
      setMarketView(CHART);
      history.push("/analysis");
    },
    handleCallback: ({ history, setRun, setNavIndex }) => stats => {
      if (stats.status === "finished") {
        setRun(false);
        history.push("/dashboard");
        setNavIndex(1);
      }
    },
    handleOpenList: ({ setListOpen, listOpen }) => () => {
      setListOpen(!listOpen);
    }
  }),
  lifecycle({
    componentWillMount() {
      const { loadAsks, loadBids, setModal, setModalOpen, userId, loggedIn } = this.props;
      loadAsks();
      loadBids();

      if (loggedIn) {
        isVisited(userId).then(visited => {
          if (!visited) {
            setModalOpen(true);
            setModal("WELCOME");
          }
        })
      }
    }
  }),
  withLocation,
  withLoader,
  withPolling(({ loadAsks, loadBids }) => {
    loadAsks();
    loadBids();
  }, 5000),
  withPushNotifications,
  withVisited,
  withNav,
)(Market);
