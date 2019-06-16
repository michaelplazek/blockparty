import React from "react";
import { compose } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import Modal from "../index";
import theme from "../../../../theme";

import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = () => ({
  container: {
    padding: "2em 2em 1em 2em"
  },
  buttons: {
    marginTop: "1em"
  },
  items: {
    marginTop: "1em",
    marginBottom: "1em"
  }
});

const ConfirmCancel = ({ classes, handleCancel }) => (
  <Modal title="Are you sure?">
    <Grid container direction="column" className={classes.container}>
      <Grid item className={classes.items}>
        <Typography>
          Cancelling this transaction will have a negative impact on your
          reputation.
        </Typography>
      </Grid>
      <Grid
        classNames={classes.buttons}
        item
        container
        justify="center"
        direction="row"
      >
        <Button onClick={handleCancel} style={theme.palette.errorButton}>
          Cancel Transaction
        </Button>
      </Grid>
    </Grid>
  </Modal>
);

export default compose(withStyles(styles))(ConfirmCancel);
