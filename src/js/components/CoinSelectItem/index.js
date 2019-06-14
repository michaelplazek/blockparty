import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {getCoinIcon} from "../List/utils";


const CoinSelectItem = ({
  coin,
}) => (
  <ListItem>
    <ListItemIcon>
      {getCoinIcon(coin)}
    </ListItemIcon>
    <ListItemText
      primary={coin}
      // secondary={secondary ? 'Secondary text' : null}
    />
  </ListItem>
);

export default CoinSelectItem;