import React from "react";
import { Btc, Eth, Ltc } from "react-cryptocoins";

const ICON_SIZE = 30;
export const iconMap = {
  BTC: <Btc size={ICON_SIZE} />,
  ETH: <Eth size={ICON_SIZE} />,
  LTC: <Ltc size={ICON_SIZE} />
};

const SMALL_ICON_SIZE = 15;
export const smallIconMap = {
  BTC: <Btc size={SMALL_ICON_SIZE} />,
  ETH: <Eth size={SMALL_ICON_SIZE} />,
  LTC: <Ltc size={SMALL_ICON_SIZE} />
};
