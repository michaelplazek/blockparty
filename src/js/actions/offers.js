import {
  LOAD_OFFERS_BY_USER,
} from "./index";
import { wrappedFetchWithParams } from "../api/utils";

export const loadOffersByUser = id => dispatch =>
  wrappedFetchWithParams("offers_by_user", undefined, "GET", `/${id}`).then(response => {
    dispatch({ type: LOAD_OFFERS_BY_USER, data: response });
  });
