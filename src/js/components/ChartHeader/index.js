import React from "react";
import { compose, lifecycle } from "recompose";

import withStyles from "@material-ui/core/styles/withStyles";
import Chip from "@material-ui/core/Chip/Chip";

import { setLayerOpen as setLayerOpenAction } from "../../actions/layers";
import {selectFilter, selectFilterCoin} from "../../selectors";
import mapper from "../../utils/connect";
import IconButton from "@material-ui/core/IconButton/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import Grid from "@material-ui/core/Grid/Grid";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import {types} from "../../constants/filters";
import coins from "../../constants/coins";

import FormControl from "@material-ui/core/FormControl/FormControl";

const styles = theme => ({
  root: {
    height: "60px",
    borderBottom: "1px #CCC solid",
  },
  form: {
    width: '8em',
    marginLeft: '10px'
  }
});

const ChartHeader = ({ classes, coin, setLayerOpen }) => (
  <div className={classes.root}>
    <FormControl
      margin='dense'
      className={classes.form}
      variant="standard"
    >
      <InputLabel>Select coin</InputLabel>
      <Select
        native
        value={coin}
        onChange={({ target }) => {}}
      >
        {coins.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
    </FormControl>
  </div>
);

const propMap = {
  coin: selectFilterCoin
};

const actionMap = {
  setLayerOpen: setLayerOpenAction
};

export default compose(
  withStyles(styles),
  mapper(propMap, actionMap)
)(ChartHeader);
