import {
  LOAD_TRANSACTION_HISTORY
} from "./index";
import { wrappedFetch } from "../api/utils";

export const loadAsks = () => dispatch =>
  wrappedFetch("history").then(response => {
    dispatch({ type: LOAD_TRANSACTION_HISTORY, data: response });
  });
