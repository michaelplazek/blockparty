import React from "react";
import { compose } from "recompose";
import numeral from "numeral";
import Typography from "@material-ui/core/Typography/Typography";
import { USD } from "../../constants/currency";
import Grid from "@material-ui/core/Grid/Grid";

const PriceMarker = ({ price, askInfo, bidInfo, top }) => (
  <Grid
    container
    justify="center"
    style={{
      position: "absolute",
      top: `${top}px`,
      zIndex: 50
    }}
  >
    <Grid item>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="title">
            {numeral(price).format(USD)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">{askInfo}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">{bidInfo}</Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default compose()(PriceMarker);
