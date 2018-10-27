import Market from "../screens/Market";
import Ask from "../screens/Ask";
import Bid from "../screens/Bid";
import AboutUs from "../screens/AboutUs";
import Details from '../screens/Details';
import Dashboard from '../screens/Dashboard';
import Login from '../screens/Login';
import Register from "../screens/Register";
import Account from "../screens/Account";

export const protectedRoutes = [
    {
        path: '/',
        exact: true,
        protected: true,
        component: Market,
        index: 0
    },
    {
        path: '/ask',
        exact: false,
        protected: true,
        component: Ask,
        index: 1
    },
    {
        path: '/about',
        exact: false,
        protected: true,
        component: AboutUs,
        index: 2
    },
    {
        path: '/dashboard',
        exact: true,
        protected: true,
        component: Dashboard,
        index: 3
    },
    {
        path: '/details',
        exact: false,
        protected: true,
        component: Details,
        index: 4
    },
	{
		path: '/account',
		exact: false,
		protected: true,
		component: Account,
		index: 5
	},
	{
		path: '/bid',
		exact: false,
		protected: true,
		component: Bid,
		index: 6
	},
];

export const unprotectedRoutes = [
    {
        path: '/register',
        exact: false,
        protected: false,
        component: Register,
        index: 7
    },
    {
        path: '/login',
        exact: false,
        protected: false,
        component: Login,
        index: 8
    },
];

export default protectedRoutes.concat(unprotectedRoutes);