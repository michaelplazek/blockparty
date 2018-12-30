import { stateReducer } from "./utils";
import {
  LOAD_NAV_HEIGHT,
  LOAD_HEADER_HEIGHT,
  LOAD_WINDOW_HEIGHT,
  LOAD_WINDOW_WIDTH,
  SET_MARKET_VIEW,
    LOAD_LOCATION
} from "../actions";
import { MAP } from "../constants/app";

const initialState = {
  navigationBarHeight: 0,
  headerHeight: 0,
  windowHeight: 0,
  windowWidth: 0,
  location: {
    lat: 40.564714,
    lng: -105.09065
  },
  marketView: MAP
};

const handlers = {
  [LOAD_NAV_HEIGHT]: (_, action) => ({
    navigationBarHeight: action.data
  }),
  [LOAD_HEADER_HEIGHT]: (_, action) => ({
    headerHeight: action.data
  }),
  [LOAD_WINDOW_HEIGHT]: (_, action) => ({
    windowHeight: action.data
  }),
  [LOAD_WINDOW_WIDTH]: (_, action) => ({
    windowWidth: action.data
  }),
  [LOAD_LOCATION]: (_, action) => ({
    location: {
      lat: action.data.lat,
      lng: action.data.lng
    }
  }),
  [SET_MARKET_VIEW]: (_, action) => ({
    marketView: action.data
  })
};

export default stateReducer(initialState, handlers);
