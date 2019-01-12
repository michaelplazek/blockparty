import { CURRENCY_NAMES_LOAD, LAST_PRICE_LOAD } from "./";
import {fetchFromBlocktap} from "../api/utils";

export const loadCurrencyNames = () => dispatch => {
  const query = { query: `query all { currencies(sort: { marketCap: DESC }) { currencyName currencySymbol } }` };
  return fetchFromBlocktap(query)
    .then(response => dispatch({ type: CURRENCY_NAMES_LOAD, data: response.data.currencies }));
};

export const loadLastPrice = (coin) => dispatch => {
  const query = {
    query: `query market {market(exchangeSymbol:\"binance\", baseSymbol: \"${coin.toLowerCase()}\", quoteSymbol: "usdt") {
      ticker {
        lastPrice
      }
      }}`
  };
  return fetchFromBlocktap(query)
    .then(response => dispatch({ type: LAST_PRICE_LOAD, data: response.data.market.ticker.lastPrice }));
};
