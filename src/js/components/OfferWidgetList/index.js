import React from "react";
import PropTypes from "prop-types";
import moment from 'moment';

import OfferWidget from "../OfferWidget/index";
import { getTotal } from "../Flyout/AskDetails/utils";
import Grid from "@material-ui/core/Grid/Grid";
import Tile from "../Tile";
const OfferWidgetList = ({ offers, post }) => (
  <Tile color="#f2f2f2" title="Offers" count={offers.length}>
    <Grid container direction="column">
      {offers.map((item, index) => (
        <OfferWidget
          key={`${item.volume}-${index}`}
          total={getTotal(post.price, item.volume)}
          volume={item.volume}
          price={post.price}
          coin={post.coin}
          time={moment(item.timestamp).fromNow()}
          onClick={() => {}}
        />
      ))}
    </Grid>
  </Tile>
);

OfferWidgetList.propTypes = {
  offers: PropTypes.array.isRequired
};

export default OfferWidgetList;
