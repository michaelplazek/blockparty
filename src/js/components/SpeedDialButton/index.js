import React from "react";
import { compose, withState, withHandlers } from "recompose";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import CloseIcon from "@material-ui/icons/Close";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { GOLD, COLBALT } from "../../constants/colors";

const SpeedDialButton = ({
  actions,
  handleClick,
  handleOpen,
  handleClose,
  open,
  className,
  isDarkMode
}) => (
  <SpeedDial
    ariaLabel="Create"
    className={className}
    icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
    onClick={handleClick}
    open={open}
    ButtonProps={{
      color: isDarkMode ? "secondary" : "primary"
    }}
  >
    /* * NOTE: this behavior will not work for touch devices * due issue:
    https://github.com/mui-org/material-ui/issues/13006 * */
    {actions.map(action => (
      <SpeedDialAction
        key={action.name}
        icon={action.icon}
        tooltipTitle={action.name}
        tooltipOpen
        ButtonProps={{
          onClick: () => {
            handleClick();
            action.onClick();
          },
          style: {
            color: isDarkMode ? GOLD : undefined,
            background: isDarkMode ? COLBALT : undefined
          },
        }}
        // Bandaid: check if we're in mobile to get around the above issue
        onClick={
          typeof window.orientation === 'undefined' ?
            () => {
              handleClick();
              action.onClick();
            } : undefined
        }
      />
    ))}
  </SpeedDial>
)


export default compose(
  withState("open", "setOpen", false),
  withHandlers({
    handleClick: ({ setOpen, open }) => () => {
      setOpen(!open);
    },
    handleClose: ({ setOpen }) => () => {
      setOpen(false);
    },
    handleOpen: ({ setOpen }) => () => {
      setOpen(true);
    }
  })
)(SpeedDialButton);
