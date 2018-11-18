import numeral from 'numeral';
import {USD} from "../../../constants/currency";

export const getTotal = (price, volume) =>
  numeral(price * volume).format(USD);