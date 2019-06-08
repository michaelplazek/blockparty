import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faTachometerAlt,
  faUser
} from "@fortawesome/free-solid-svg-icons";

export const footerNavigation = [
  {
    path: "/",
    subpath: undefined,
    label: "Market",
    index: 0,
    className: 'market-nav',
    icon: <FontAwesomeIcon icon={faDollarSign} />
  },
  {
    path: "/dashboard",
    subpath: undefined,
    label: "Dashboard",
    index: 1,
    className: 'dashboard-nav',
    icon: <FontAwesomeIcon icon={faTachometerAlt} />
  },
  {
    path: "/account",
    subpath: "/settings",
    label: "Account",
    index: 2,
    className: 'account-nav',
    icon: <FontAwesomeIcon icon={faUser} />
  }
];
