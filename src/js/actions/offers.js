import {
  CREATE_ASK,
  LOAD_OFFER,
  LOAD_OFFERS_BY_USER,
  LOAD_OFFERS_BY_ASK,
  UNLOAD_OFFERS
} from "./index";
import {wrappedFetch, wrappedFetchWithParams} from "../api/utils";

export const loadOffersByUser = id => dispatch =>
  wrappedFetchWithParams("offers_by_user", undefined, "GET", `/${id}`).then(response => {
    dispatch({ type: LOAD_OFFERS_BY_USER, data: response });
  });

export const loadOffer = id => dispatch =>
  wrappedFetchWithParams("offer", undefined, "GET", `?id=${id}`).then(
    response => {
      dispatch({ type: LOAD_OFFER, data: response });
    }
  );

export const unloadOffers = () => dispatch =>
      dispatch({ type: UNLOAD_OFFERS });

export const loadOffersByAsk = id => dispatch =>
  wrappedFetchWithParams("offers_by_ask", undefined, "GET", `/${id}`).then(response => {
    dispatch({ type: LOAD_OFFERS_BY_ASK, data: response });
  });

export const createAskOffer = offer =>
  wrappedFetch("ask_offers", offer, "POST");

export const createBidOffer = offer =>
  wrappedFetch("bid_offers", offer, "POST");