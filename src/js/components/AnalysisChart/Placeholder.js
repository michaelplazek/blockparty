import React from "react";
import { compose } from "recompose";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button";

const Placeholder = ({ label, buttonLabel, action, top, isDarkMode }) => (
  <Grid
    container
    align='center'
    justify='center'
    style={{
      position: "relative",
      top: `${top}px`,
      zIndex: 50
    }}
  >
    <Grid item>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography
            color={isDarkMode ? 'textSecondary' : undefined}
          >
            {label}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={action}
            color={isDarkMode ? 'secondary' : undefined}
          >
            {buttonLabel}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default compose()(Placeholder);
