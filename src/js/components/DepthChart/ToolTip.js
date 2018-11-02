import React from "react";
import { compose } from "recompose";
import numeral from 'numeral';
import get from 'lodash/fp/get';

import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import {USD} from "../../constants/currency";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  root: {
    // background: 'white',
    // padding: '1em',
    // border: '#CCC solid 1px',
    // zIndex: 3000
  }
});

const ToolTip = ({ payload, classes }) => {
  const data = get('payload')(payload[0]);
  if (data) {
    const type = (!data.bid) ? 'asks' : 'bids';
    const total = (!data.bid) ? data.ask : data.bid;
    return (
      <Grid className={classes.root}>
        {/*<Typography variant='title'>{numeral(data.price).format(USD)}</Typography>*/}
        {/*<Typography variant='subheading'>{total} {type} available</Typography>*/}
        {/*<Button*/}
          {/*onClick={() => console.log('HELOO')}*/}
          {/*variant='raised'*/}
          {/*fullWidth*/}
        {/*>*/}
          {/*View*/}
        {/*</Button>*/}
      </Grid>
    )
  } else {
    return null;
  }

};

export default compose(
  withStyles(styles),
)(ToolTip);
