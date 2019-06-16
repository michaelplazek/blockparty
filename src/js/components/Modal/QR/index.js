import React from "react";
import { compose } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";
import Modal from "../index";

import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper";
import { selectQR } from "../../../selectors";

import btcqr from "./bitcoinqr.png";
import xmrqr from "./monero_qr.png";

const styles = () => ({
  items: {
    marginTop: "2.2em",
    marginBottom: "1em"
  },
  paper: {
    margin: "0px 20px 0px 20px"
  },
  secondary: {
    marginTop: "5px"
  }
});

const QR = ({ qr, classes }) => (
  <Modal title={qr === "BTC" ? "Bitcoin" : "Monero"}>
    <Grid container direction="column">
      <Grid item className={classes.items}>
        <Paper elevation={0} className={classes.paper}>
          {qr === "BTC" ? (
            <img
              src={btcqr}
              alt="BTC wallet QR code"
              height={160}
              width={160}
            />
          ) : (
            <img
              src={xmrqr}
              alt="XMR wallet QR code"
              height={160}
              width={160}
            />
          )}
        </Paper>
      </Grid>
    </Grid>
  </Modal>
);

const propMap = {
  qr: selectQR
};

const actionMap = {};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles)
)(QR);
