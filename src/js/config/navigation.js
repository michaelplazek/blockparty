import React from 'react';
import { Currency, Add, VirtualMachine, Dashboard, User } from 'grommet-icons';

export const footerNavigation = [
    {
        path: '/',
        label: 'Market',
        index: 0,
        icon: <Currency />,
    },
    {
        path: '/',
        label: 'Dashboard',
        index: 1,
        icon: <Dashboard />,
    },
    {
        path: '/post',
        label: 'Account',
        index: 2,
        icon: <User />,
    },
    // {
    //     path: '/about',
    //     label: 'About Us',
    //     index: 2,
    //     icon: <VirtualMachine />,
    // },
];

// export const footerNavigation = [
//     {
//         path: '/post',
//         label: 'Sign up',
//         index: 0
//     },
//     {
//         path: '/about',
//         label: 'Log In',
//         index: 1
//     },
// ];