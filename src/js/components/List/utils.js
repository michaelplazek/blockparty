import React from "react";
import * as Icon from "react-cryptocoins";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {GOLD} from "../../constants/colors";

const convertToLowercase = string => {
  return string.replace(/\w\S*/g, function(word) {
    return word.charAt(0) + word.slice(1).toLowerCase();
  });
};

export const getCoinIcon = (coin, isDarkMode, size = 24) => {
  const Component = Icon[convertToLowercase(coin)];
  return Component ? (
    <Component color={isDarkMode ? GOLD : undefined} size={size} />
  ) : (
    <FontAwesomeIcon color={isDarkMode ? GOLD : undefined} icon={faFileInvoiceDollar} />
  );
};
