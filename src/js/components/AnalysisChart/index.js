import React from "react";
import { compose } from "recompose";
import numeral from "numeral";

import {Tooltip, XAxis, YAxis, AreaChart, Area} from "recharts";
import { ASK_COLOR, BID_COLOR } from "../../constants/colors";
import { USD } from "../../constants/currency";
import ToolTip from "./ToolTip";

const XTick = ({ payload, x, y, fill }) => {
  return (
    <text
      x={x}
      y={y}
      fontSize="11"
      fontFamily="sans-serif"
      fill={fill}
      textAnchor="middle"
    >
      {numeral(payload.value).format(USD)}
    </text>
  );
};

const YTick = ({ payload, x, y, fill }) => {
  return (
    <text
      style={{ position: "relative", zIndex: 1000 }}
      x={x}
      y={y}
      fontSize="11"
      fontFamily="sans-serif"
      fill={fill}
      textAnchor="middle"
    >
      {payload.value}
    </text>
  );
};

const AnalysisChartBase = ({ height, width, data, handleTouch }) => (
  <div>
    <AreaChart
      width={width}
      height={height}
      data={data}
      onMouseMove={(payload) => payload && handleTouch(payload)}
    >
      <XAxis
        dataKey="price"
        interval="preserveStartEnd"
        tickMargin={20}
        tick={<XTick />}
      />
      <YAxis
        mirror={true}
        tickMargin={15}
        orientation="left"
        tick={<YTick />}
      />
      <Tooltip content={<ToolTip />} />

      <defs>
        <linearGradient id="bidId" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={BID_COLOR} stopOpacity={0.8} />
          <stop offset="95%" stopColor={BID_COLOR} stopOpacity={0.6} />
        </linearGradient>
        <linearGradient id="askId" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={ASK_COLOR} stopOpacity={0.8} />
          <stop offset="95%" stopColor={ASK_COLOR} stopOpacity={0.4} />
        </linearGradient>
      </defs>
      <Area
        type="linear"
        dataKey="bidVolume"
        stroke={BID_COLOR}
        fillOpacity={1}
        strokeWidth={2}
        fill="url(#bidId)"
        isAnimationActive={false}
      />
      <Area
        type="linear"
        dataKey="askVolume"
        stroke={ASK_COLOR}
        strokeWidth={1}
        fillOpacity={1}
        fill="url(#askId)"
        isAnimationActive={false}
      />
    </AreaChart>
  </div>
);

export default compose()(AnalysisChartBase);