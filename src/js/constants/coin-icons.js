import React from 'react';
import { Btc, Eth, Ltc } from 'react-cryptocoins';

const ICON_SIZE = 30;
export const iconMap = {
    'BTC': <Btc size={ICON_SIZE} />,
    'ETH': <Eth size={ICON_SIZE} />,
    'LTC': <Ltc size={ICON_SIZE} />
};