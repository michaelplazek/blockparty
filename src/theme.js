import { createMuiTheme } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import { COLBALT, GOLD, WHITE } from "./js/constants/colors";

export const light = createMuiTheme({
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
      color: "#f2f2f2"
    },
    submitButton: {
      background: "#357a38",
      color: "#f2f2f2"
    },
    createButton: {
      background: "#fff",
      color: indigo[500]
    },
    disabledErrorButton: {
      background: "#E57373",
      color: "#f2f2f2"
    },
    disabledSubmitButton: {
      background: "#A5D6A7",
      color: "#f2f2f2"
    }
  },
  typography: {
    display1: {
      color: "rgba(0, 0, 0, 0.82)"
    }
  },
});

export const dark = createMuiTheme({
  palette: {
    primary: {
      main: COLBALT
    },
    secondary: {
      main: GOLD
    },
    text: {
      secondary: WHITE
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
      background: COLBALT,
      color: GOLD
    },
    errorButton: {
      background: "#C62828",
      color: "#f2f2f2"
    },
    submitButton: {
      background: "#357a38",
      color: "#f2f2f2"
    },
    createButton: {
      background: "#fff",
      color: indigo[500]
    },
    disabledErrorButton: {
      background: "#E57373",
      color: "#f2f2f2"
    },
    disabledSubmitButton: {
      background: "#A5D6A7",
      color: "#f2f2f2"
    }
  },
  typography: {
    display1: {
      color: "rgba(0, 0, 0, 0.82)"
    }
  }
});
