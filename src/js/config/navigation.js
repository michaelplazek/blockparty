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
    subpath: [],
    label: "Market",
    index: 0,
    className: "market-nav",
    icon: <FontAwesomeIcon icon={faDollarSign} />,
    protected: false,
  },
  {
    path: "/dashboard",
    subpath: [],
    label: "Dashboard",
    index: 1,
    className: "dashboard-nav",
    icon: <FontAwesomeIcon icon={faTachometerAlt} />,
    protected: true,
  },
  {
    path: "/account",
    subpath: ["/settings", "/policy"],
    label: "Account",
    index: 2,
    className: "account-nav",
    icon: <FontAwesomeIcon icon={faUser} />,
    protected: true,
  }
];
