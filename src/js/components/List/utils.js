import React from "react";
import * as Icon from "react-cryptocoins";

const convertToLowercase = string => {
  return string.replace(/\w\S*/g, function(word) {
    return word.charAt(0) + word.slice(1).toLowerCase();
  });
};

export const getCoinIcon = coin => {
  const Component = Icon[convertToLowercase(coin)];
  return <Component />;
};
