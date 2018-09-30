import Market from "../screens/Market";
import Post from "../screens/Post";
import AboutUs from "../screens/AboutUs";

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
]