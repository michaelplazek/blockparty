import React from "react";
import { compose, withState } from "recompose";
import deburr from "lodash/deburr";
import fpFind from "lodash/fp/find";
import defaultTo from "lodash/fp/defaultTo";
import get from "lodash/fp/get";
import fpCompose from "lodash/fp/compose";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Downshift from "downshift";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
import {GOLD, WHITE} from "../../constants/colors";
import mapper from "../../utils/connect";
import { selectIsDarkMode } from "../../selectors";

function renderInput(inputProps, isDarkMode) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
        style: {
          color: isDarkMode ? WHITE : undefined
        }
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestionProps) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      disabled={suggestion.disabled}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}

function getSuggestions(value, { showEmpty = false } = {}, suggestions) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 && !showEmpty
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

const styles = () => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: "0.5em",
    left: 0,
    right: 0
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  inputInput: {
    width: "auto",
    flexGrow: 1
  },
  divider: {
    height: "1em"
  },
  focused: {
    color: `${GOLD} !important`
  }
});

const SearchableSelect = ({
  classes,
  suggestions,
  onSelect,
  value,
  isDarkMode
}) => (
  <Downshift
    id="downshift-options"
    onChange={item => {
      const value = fpCompose(
        defaultTo(""),
        get("value"),
        fpFind(suggestion => suggestion.label === item)
      )(suggestions);
      if (value !== "") {
        onSelect(value);
      }
    }}
    initialInputValue={fpCompose(
      defaultTo(""),
      get("label"),
      fpFind(suggestion => suggestion.value === value)
    )(suggestions)}
  >
    {({
      clearSelection,
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      highlightedIndex,
      inputValue,
      isOpen,
      openMenu,
      selectedItem
    }) => {
      const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
        onChange: event => {
          if (event.target.value === "") {
            clearSelection();
          }
        },
        onFocus: openMenu,
        placeholder: "Select a coin..."
      });

      return (
        <div className={classes.container}>
          {renderInput(
            {
              fullWidth: true,
              classes,
              label: "Coin",
              InputLabelProps: getLabelProps({
                shrink: true,
                classes: { focused: isDarkMode ? classes.focused : {} }
              }),
              InputProps: { onBlur, onChange, onFocus },
              inputProps
            },
            isDarkMode
          )}

          <div {...getMenuProps()}>
            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(
                  inputValue,
                  { showEmpty: true },
                  suggestions
                ).map((suggestion, index) =>
                  renderSuggestion({
                    disabled: suggestion.disabled,
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.label }),
                    highlightedIndex,
                    selectedItem
                  })
                )}
              </Paper>
            ) : null}
          </div>
        </div>
      );
    }}
  </Downshift>
);

const propMap = {
  isDarkMode: selectIsDarkMode
};

export default compose(
  withStyles(styles),
  withState("inputValue", "setInputValue", ""),
  mapper(propMap, {})
)(SearchableSelect);
