import Market from "../screens/Market";
import Ask from "../screens/Ask/index";
import Bid from "../screens/Bid/index";
import Policy from "../screens/Policy";
import Dashboard from "../screens/Dashboard";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Account from "../screens/Account";
import Settings from "../screens/Settings";
import Oops from "../screens/Oops";

export const protectedRoutes = [

  {
    path: "/about",
    exact: false,
    protected: true,
    component: Policy,
    index: 0
  },
  {
    path: "/dashboard",
    exact: true,
    protected: true,
    component: Dashboard,
    index: 1
  },
  {
    path: "/account",
    exact: false,
    protected: true,
    component: Account,
    index: 2
  },
  {
    path: "/settings",
    exact: false,
    protected: true,
    component: Settings,
    index: 3
  },
  {
    path: "/policy",
    exact: false,
    protected: true,
    component: Policy,
    index: 4
  }
];

export const unprotectedRoutes = [
  {
    path: "/",
    exact: true,
    protected: false,
    component: Market,
    index: 5
  },
  {
    path: "/bid",
    exact: false,
    protected: false,
    component: Bid,
    index: 6
  },
  {
    path: "/ask",
    exact: false,
    protected: false,
    component: Ask,
    index: 7
  },
  {
    path: "/register",
    exact: false,
    protected: false,
    component: Register,
    index: 8
  },
  {
    path: "/login",
    exact: false,
    protected: false,
    component: Login,
    index: 9
  },
  {
    path: "*",
    exact: true,
    protected: true,
    component: Oops,
    index: 10
  },
];

export default protectedRoutes.concat(unprotectedRoutes);
