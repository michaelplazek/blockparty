import React from "react";
import * as Icon from "react-cryptocoins";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const convertToLowercase = string => {
  return string.replace(/\w\S*/g, function(word) {
    return word.charAt(0) + word.slice(1).toLowerCase();
  });
};

export const getCoinIcon = (coin, size = 24) => {
  const Component = Icon[convertToLowercase(coin)];
  console.log(coin);
  return Component ? (
    <Component size={size} />
  ) : (
    <FontAwesomeIcon icon={faFileInvoiceDollar} />
  );
};
