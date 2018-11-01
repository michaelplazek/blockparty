import React from "react";
import { compose, lifecycle } from "recompose";
import numeral from 'numeral';
import Typography from "@material-ui/core/Typography/Typography";
import {USD} from "../../constants/currency";
import Grid from "@material-ui/core/Grid/Grid";


const PriceMarker = ({ classes, price, top }) => (
  <Grid
    container
    justify='center'
    style={{
      position: 'absolute',
      top: `${top}px`,
      zIndex: 1000
    }}
  >
    <Grid item>
      <Grid
        container
        direction='column'
        alignItems='center'
      >
        <Grid item>
          <Typography variant='display1'>
            {numeral(price).format(USD)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='caption'>
            Mid Market Price
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default compose(
)(PriceMarker);
