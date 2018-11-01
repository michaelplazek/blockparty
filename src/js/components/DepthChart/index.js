import React from "react";
import { compose, withHandlers } from 'recompose';

import PropTypes from "prop-types";
import {Area, AreaChart, XAxis, YAxis} from "recharts";
import {ASK_COLOR, BID_COLOR} from "../../constants/colors";


const DepthChart = ({
  height,
  width,
  data,
}) => (
  <div>
    <AreaChart width={width} height={height} data={data}>
      <XAxis
        dataKey='price'
        interval='preserveStartEnd'
        tickMargin={10}
      />
      <YAxis
        mirror={true}
        orientation='left'
        yAxisId='left'
      />
      <YAxis
        mirror={true}
        orientation='right'
        yAxisId='right'
      />
      <defs>
        <linearGradient id="bidId" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={BID_COLOR} stopOpacity={0.8}/>
          <stop offset="95%" stopColor={BID_COLOR} stopOpacity={0.6}/>
        </linearGradient>
        <linearGradient id="askId" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={ASK_COLOR} stopOpacity={0.8}/>
          <stop offset="95%" stopColor={ASK_COLOR} stopOpacity={0.4}/>
        </linearGradient>
      </defs>
      <Area
        yAxisId="left"
        type="linear"
        dataKey="bid"
        stroke={BID_COLOR}
        fillOpacity={1}
        fill="url(#bidId)"
        isAnimationActive={false}
      />
      <Area
        yAxisId="right"
        type="linear"
        dataKey="ask"
        stroke={ASK_COLOR}
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
  height: PropTypes.number
};

export default compose(
  withHandlers({
    handleMarketView: ({}) => () => {
    },
  }),
)(DepthChart);