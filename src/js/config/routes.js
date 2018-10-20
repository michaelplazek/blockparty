import Market from "../screens/Market";
import Post from "../screens/Post";
import AboutUs from "../screens/AboutUs";
import Details from '../screens/Details';
import Dashboard from '../screens/Dashboard';
import Login from '../screens/Login';
import Register from "../screens/Register";

export const protectedRoutes = [
    {
        path: '/',
        exact: true,
        protected: true,
        component: Market,
        index: 0
    },
    {
        path: '/post',
        exact: false,
        protected: true,
        component: Post,
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
];

export const unprotectedRoutes = [
    {
        path: '/register',
        exact: false,
        protected: false,
        component: Register,
        index: 5
    },
    {
        path: '/login',
        exact: false,
        protected: false,
        component: Login,
        index: 6
    },
];

export default protectedRoutes.concat(unprotectedRoutes);