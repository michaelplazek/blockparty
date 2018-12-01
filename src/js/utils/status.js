import theme from "../../theme";

export const getStatusColor = status => {
  if (status === "DECLINED") {
    return theme.palette.statusError;
  } else if (status === "ACCEPTED") {
    return theme.palette.statusOK;
  }
};
