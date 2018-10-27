import React, { Component } from "react";
import { compose, lifecycle, withHandlers } from "recompose";
import { withRouter } from "react-router";
import mapper from "../utils/connect";

import {
	selectHeaderHeight,
	selectMapMarkers,
	selectNavHeight,
	selectAsksForDisplay,
	selectBidsForDisplay, selectFilterType
} from "../selectors";
import {
  loadAsks as loadAsksAction,
} from "../actions/asks";
import {
  loadBids as loadBidsAction
} from '../actions/bids';
import { setLayerOpen as setLayerOpenAction } from "../actions/layers";

import FilterListIcon from "@material-ui/icons/FilterList";

import Subheader from "../components/Subheader";
import GoogleMapsWrapper from "../components/GoogleMaps/GoogleMapsWrapper";
import PageHeader from "../components/PageHeader";
import FilterMap from "../components/Flyout/FilterMap/index";
import withDimensions from "../HOCs/withDimensions";

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
      handleMarkerClick
    } = this.props;

    return (
      <div>
        <FilterMap />
        <PageHeader
          leftHandAction={() => this.props.setLayerOpen(true)}
          leftHandIcon={<FilterListIcon />}
          rightHandButton="Go to chart view"
          showSubheader={true}
          subheader={<Subheader />}
        />
        <GoogleMapsWrapper
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
};

const actionMap = {
  loadAsks: loadAsksAction,
	loadBids: loadBidsAction,
	setLayerOpen: setLayerOpenAction,
};

export default compose(
  mapper(propMap, actionMap),
  withRouter,
  withDimensions,
  withHandlers({
    handleMarkerClick: ({ history, type }) => marker => {
      const { id } = marker;
      const url = type === 'ASK' ? '/ask' : '/bid';
      history.push(`${url}?${id}`);
    }
  }),
  lifecycle({
    componentWillMount() {
      const { loadAsks, loadBids } = this.props;
      loadAsks();
      loadBids();
    }
  })
)(Market);
