import { combineReducers } from "redux";

import asks from "./asks";
import layers from "./layers";
import session from "./session";
import app from "./app";
import filters from "./filters";
import ask from "./createAsk";
import bid from "./createBid";
import bids from "./bids";
import offers from "./offers";

export default combineReducers({
  app,
  asks,
  bids,
  layers,
  session,
  filters,
  ask,
  bid,
  offers
});
