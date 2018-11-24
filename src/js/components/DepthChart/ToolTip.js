import React from "react";
import get from "lodash/fp/get";
import Grid from "@material-ui/core/Grid/Grid";

const ToolTip = ({ payload }) => {
  const data = get("payload")(payload[0]);
  if (data) {
    return (
      <Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default ToolTip;
