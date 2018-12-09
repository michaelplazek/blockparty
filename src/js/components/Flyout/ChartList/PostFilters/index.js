import React from "react";
import { compose } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";

import { selectFilterType } from "../../../../selectors";
import mapper from "../../../../utils/connect";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import { types } from "../../../../constants/filters";
import FormControl from "@material-ui/core/FormControl/FormControl";
import { setFilterType } from "../../../../actions/filters";

const styles = () => ({
  root: {
    margin: "1em 0em 1em 0em",
    borderTop: "1px #CCC solid",
    borderBottom: "1px #CCC solid",
    padding: "0.25em"
  },
  form: {
    width: "8em",
    marginLeft: "1em"
  }
});

const PostFilters = ({ classes, setFilterType, type }) => (
  <div className={classes.root}>
    <FormControl margin="dense" className={classes.form} variant="standard">
      <InputLabel>Type</InputLabel>
      <Select
        variant="outlined"
        value={type}
        native
        onChange={({ target }) => setFilterType(target.value)}
      >
        {types.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
    </FormControl>
  </div>
);

const propMap = {
  type: selectFilterType
};

const actionMap = {
  setFilterType
};

export default compose(
  withStyles(styles),
  mapper(propMap, actionMap)
)(PostFilters);
