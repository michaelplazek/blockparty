import React from 'react';
import { Currency, Dashboard, User } from 'grommet-icons';

export const footerNavigation = [
    {
        path: '/',
        label: 'Market',
        index: 0,
        icon: <Currency />,
    },
    {
        path: '/dashboard',
        label: 'Dashboard',
        index: 1,
        icon: <Dashboard />,
    },
    {
        path: '/account',
        label: 'Account',
        index: 2,
        icon: <User />,
    },
];