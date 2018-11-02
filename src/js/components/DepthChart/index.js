import React from "react";
import { compose, withHandlers } from "recompose";
import numeral from "numeral";

import PropTypes from "prop-types";
import { Area, AreaChart, Line, Tooltip, XAxis, YAxis } from "recharts";
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

const DepthChart = ({ height, width, data, handleTouch }) => (
  <div style={{ zIndex: 500 }}>
    <AreaChart
      width={width}
      height={height}
      data={data}
      onMouseMove={handleTouch}
    >
      <XAxis
        dataKey="price"
        interval="preserveStartEnd"
        tickMargin={20}
        minTickGap={9}
        tick={<XTick />}
      />
      <YAxis
        mirror={true}
        tickMargin={15}
        orientation="left"
        yAxisId="left"
        tick={<YTick />}
      />
      <YAxis
        mirror={true}
        tickMargin={15}
        orientation="right"
        yAxisId="right"
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
        yAxisId="left"
        type="linear"
        dataKey="bid"
        stroke={BID_COLOR}
        fillOpacity={1}
        strokeWidth={2}
        fill="url(#bidId)"
        isAnimationActive={false}
      />
      <Area
        yAxisId="right"
        type="linear"
        dataKey="ask"
        stroke={ASK_COLOR}
        strokeWidth={1}
        fillOpacity={1}
        fill="url(#askId)"
        isAnimationActive={false}
      />
    </AreaChart>
  </div>
);

DepthChart.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  handleTouch: PropTypes.func
};

export default compose()(DepthChart);
