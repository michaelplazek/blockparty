import { CURRENCY_NAMES_LOAD } from "./";
import {fetchFromBlocktap} from "../api/utils";

export const loadCurrencyNames = () => dispatch => {
  const query = { query: `query all { currencies(sort: { marketCap: DESC }) { currencyName currencySymbol } }` };
  return fetchFromBlocktap(query)
    .then(response => dispatch({ type: CURRENCY_NAMES_LOAD, data: response.data.currencies }));
};