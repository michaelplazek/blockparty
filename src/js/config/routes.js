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
    path: "/",
    exact: true,
    protected: true,
    component: Market,
    index: 0
  },
  {
    path: "/ask",
    exact: false,
    protected: true,
    component: Ask,
    index: 1
  },
  {
    path: "/about",
    exact: false,
    protected: true,
    component: Policy,
    index: 2
  },
  {
    path: "/dashboard",
    exact: true,
    protected: true,
    component: Dashboard,
    index: 3
  },
  {
    path: "/account",
    exact: false,
    protected: true,
    component: Account,
    index: 4
  },
  {
    path: "/bid",
    exact: false,
    protected: true,
    component: Bid,
    index: 5
  },
  {
    path: "/settings",
    exact: false,
    protected: true,
    component: Settings,
    index: 6
  },
  {
    path: "/policy",
    exact: false,
    protected: true,
    component: Policy,
    index: 7
  },
];

export const unprotectedRoutes = [
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
  }
];

export default protectedRoutes.concat(unprotectedRoutes);
