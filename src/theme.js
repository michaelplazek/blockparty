import {createMuiTheme} from "@material-ui/core";
import {indigo} from "@material-ui/core/colors";

export default createMuiTheme({
  palette: {
    secondary: {
      main: "#ffc107"
    },
    statusOK: {
      color: "#7CD992"
    },
    statusError: {
      color: "#EB6060"
    },
    statusPending: {
      color: "#F7E463"
    },
    inverse: {
      background: indigo[500],
      color: "#f2f2f2"
    }
  },
});