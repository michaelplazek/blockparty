import React from 'react';
import { compose } from "recompose";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faTimes} from "@fortawesome/free-solid-svg-icons";
import Paper from "@material-ui/core/Paper";
import withDimensions from "../../HOCs/withDimensions";
import mapper from "../../utils/connect";
import {selectListOpen, selectNavHeight} from "../../selectors";

const ListIcon = ({
  openList,
  windowHeight,
  navHeight,
  height,
  open
}) => (
  <Paper
    style={{
      position: 'absolute',
      right: '0.75em',
      top: `${windowHeight - navHeight - height + 15}px`,
      zIndex: 50,
      color: '#666666',
      cursor: 'pointer',
      padding: `0.5em`
    }}
  >
    <FontAwesomeIcon
      size='lg'
      icon={!open? faList : faTimes}
      onClick={openList}
    />
  </Paper>
);

const propMap = {
  navHeight: selectNavHeight,
  open: selectListOpen
};

export default compose(
  mapper(propMap, {}),
  withDimensions,
)(ListIcon);