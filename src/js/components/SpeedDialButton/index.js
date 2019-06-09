import React from "react";
import { compose, withState, withHandlers } from "recompose";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import CloseIcon from "@material-ui/icons/Close";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

const SpeedDialButton = ({
  actions,
  handleClick,
  handleOpen,
  handleClose,
  open,
  className,
}) => (
  <SpeedDial
    ariaLabel="Create"
    className={className}
    icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
    // onBlur={handleClose}
    onClick={handleClick}
    // onClose={handleClose}
    // onFocus={handleOpen}
    // onMouseEnter={handleOpen}
    // onMouseLeave={handleClose}
    open={open}
  >
    /* * NOTE: this behavior will not work for touch devices * due issue:
    https://github.com/mui-org/material-ui/issues/13006 * */
    {actions.map(action => (
      <SpeedDialAction
        key={action.name}
        icon={action.icon}
        tooltipTitle={action.name}
        tooltipOpen
        // onClick={() => {
        //   action.onClick();
        //   handleClick();
        // }}
        ButtonProps={{
          onClick: () => {
            handleClick();
            action.onClick();
          }
        }}
      />
    ))}
  </SpeedDial>
);

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
