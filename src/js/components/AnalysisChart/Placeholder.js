import React from "react";
import { compose } from "recompose";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";

const Placeholder = ({ label, top }) => (
  <Grid
    container
    justify="center"
    style={{
      position: "relative",
      top: `${top}px`,
      zIndex: 1000,
    }}
  >
    <Grid item>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="subheading">{label}</Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default compose()(Placeholder);
