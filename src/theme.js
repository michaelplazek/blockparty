import {createMuiTheme} from "@material-ui/core";
import {indigo} from "@material-ui/core/colors";

export default createMuiTheme({
  palette: {
    secondary: {
      main: "#ffc107"
    },
    statusOK: {
      color: "#357a38"
    },
    statusError: {
      color: "#C62828"
    },
    statusPending: {
      color: "#F7E463"
    },
    inverse: {
      background: indigo[500],
      color: "#f2f2f2"
    },
    errorButton: {
      background: "#C62828",
      color: "#f2f2f2",
    },
    submitButton: {
      background: "#357a38",
      color: "#f2f2f2"
    },
    disabledErrorButton: {
      background: "#E57373",
      color: "#f2f2f2",
    },
    disabledSubmitButton: {
      background: "#A5D6A7",
      color: "#f2f2f2",
    }
  },
  typography: {
    display1: {
      color: "rgba(0, 0, 0, 0.82)"
    }
  }
});