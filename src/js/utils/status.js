import React from 'react';
import theme from "../../theme";
import CheckIcon from '@material-ui/icons/CheckCircleOutline';


export const getStatusColor = status => {
  if (status === "DECLINED") {
    return theme.palette.statusError;
  } else if (status === "ACCEPTED") {
    return theme.palette.statusOK;
  }
};

export const getStatusIcon = status => {
  if(status === "ACCEPTED") return <CheckIcon style={theme.palette.statusOK} />;
};
