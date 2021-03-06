import React from "react";
import CheckIcon from "@material-ui/icons/CheckCircleOutline";

export const getStatusColor = (status, theme) => {
  if (status === "DECLINED") {
    return theme.palette.statusError;
  } else if (status === "ACCEPTED") {
    return theme.palette.statusOK;
  }
};

export const getStatusIcon = (status, theme) => {
  if (status === "ACCEPTED")
    return <CheckIcon style={theme.palette.statusOK} />;
};
