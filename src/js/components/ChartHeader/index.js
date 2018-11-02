import React from "react";
import { compose } from "recompose";

import withStyles from "@material-ui/core/styles/withStyles";

import { selectFilterCoin } from "../../selectors";
import mapper from "../../utils/connect";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import coins from "../../constants/coins";

import FormControl from "@material-ui/core/FormControl/FormControl";
import { setFilterCoin } from "../../actions/filters";

const styles = theme => ({
  root: {
    height: "60px",
    borderBottom: "1px #CCC solid"
  },
  form: {
    width: "8em",
    marginLeft: "10px"
  }
});

const ChartHeader = ({ classes, coin, setFilterCoin, onSelect }) => (
  <div className={classes.root}>
    <FormControl margin="dense" className={classes.form} variant="standard">
      <InputLabel>Select coin</InputLabel>
      <Select
        native
        value={coin}
        onChange={({ target }) => {
          onSelect();
          setFilterCoin(target.value);
        }}
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
  setFilterCoin
};

export default compose(
  withStyles(styles),
  mapper(propMap, actionMap)
)(ChartHeader);
