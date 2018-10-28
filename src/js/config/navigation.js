import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faTachometerAlt, faUser } from '@fortawesome/free-solid-svg-icons'

export const footerNavigation = [
  {
    path: "/",
    label: "Market",
    index: 0,
    icon: <FontAwesomeIcon icon={faDollarSign} />
  },
  {
    path: "/dashboard",
    label: "Dashboard",
    index: 1,
    icon:  <FontAwesomeIcon icon={faTachometerAlt} />
  },
  {
    path: "/account",
    label: "Account",
    index: 2,
    icon:  <FontAwesomeIcon icon={faUser} />
  }
];
