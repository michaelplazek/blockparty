import Market from "../screens/Market";
import Post from "../screens/Post";
import AboutUs from "../screens/AboutUs";
import Details from '../screens/Details';
import Dashboard from '../screens/Dashboard';
import Login from '../screens/Login';

export default [
    {
        path: '/',
        exact: true,
        component: Market,
        index: 0
    },
    {
        path: '/post',
        exact: false,
        component: Post,
        index: 1
    },
    {
        path: '/about',
        exact: false,
        component: AboutUs,
        index: 2
    },
    {
        path: '/dashboard',
        exact: false,
        component: Dashboard,
        index: 3
    },
    {
        path: '/details',
        exact: false,
        component: Details,
        index: 4
    },
    {
        path: '/login',
        exact: false,
        component: Login,
        index: 5
    },
]