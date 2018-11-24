import React from "react";
import { compose } from "recompose";
import numeral from "numeral";

import PropTypes from "prop-types";
import { Bar, ComposedChart, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import { ASK_COLOR, BID_COLOR } from "../../constants/colors";
import { USD } from "../../constants/currency";

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

const BarChartBase = ({ height, width, data, handleTouch }) => (
  <div>
    <BarChart
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
      <Bar dataKey="bidVolume" stackId="a" fill="#8884d8" />
      <Bar dataKey="askVolume" stackId="a" fill="#82ca9d" />
    </BarChart>
  </div>
);

BarChartBase.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  handleTouch: PropTypes.func
};

export default compose()(BarChartBase);
