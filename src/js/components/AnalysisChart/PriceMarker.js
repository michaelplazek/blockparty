import React from "react";
import { compose } from "recompose";
import numeral from "numeral";
import Typography from "@material-ui/core/Typography/Typography";
import { USD } from "../../constants/currency";
import Grid from "@material-ui/core/Grid/Grid";
import mapper from "../../utils/connect";
import {selectIsDarkMode} from "../../selectors";

const PriceMarker = ({ price, askInfo, bidInfo, top, isDarkMode }) => (
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
          <Typography
            color={isDarkMode ? 'textSecondary' : undefined}
            variant="title"
          >
            {numeral(price).format(USD)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            color={isDarkMode ? 'textSecondary' : undefined}
            variant="body1"
          >
            {askInfo}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            color={isDarkMode ? 'textSecondary' : undefined}
            variant="body1"
          >
            {bidInfo}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

const propMap = {
  isDarkMode: selectIsDarkMode
};

export default compose(
  mapper(propMap, {})
)(PriceMarker);
