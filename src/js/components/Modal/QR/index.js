import React from "react";
import { compose } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";
import Modal from "../index";

import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper";
import {selectQR} from "../../../selectors";
import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";

const styles = () => ({
  items: {
    marginTop: "2.2em",
    marginBottom: "1em"
  },
  paper: {
    margin: "0px 20px 0px 20px"
  },
  secondary: {
    marginTop: "5px",
  },
});

const QR = ({ setLayerOpen, qr, classes }) => (
  <Modal
    onClose={() => {
      setLayerOpen(false);
    }}
    open={open}
    title=""
  >
    <Grid container direction="column">
      <Grid item className={classes.items}>
        <Paper elevation={0} className={classes.paper}>
          {qr === 'BTC' ? (
            <img src="./bitcoinqr.PNG" alt="BTC wallet QR code" height={48} width={48}/>
          ) : (
            <img src="./monero_qr.png" alt="XMR wallet QR code" height={48} width={48}/>
            )
          }
        </Paper>
      </Grid>
    </Grid>
  </Modal>
);

const propMap = {
  qr: selectQR
};

const actionMap = {
  setLayerOpen: setLayerOpenAction,
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
)(QR);
