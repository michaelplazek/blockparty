import React from 'react';
import { Currency, Add, VirtualMachine, Dashboard } from 'grommet-icons';

export const flyoutNavigation = [
    {
        path: '/',
        label: 'Marketplace',
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
        path: '/about',
        label: 'About Us',
        index: 2,
        icon: <VirtualMachine />,
    },
];

export const headerNavigation = [
    {
        path: '/post',
        label: 'Sign up',
        index: 0
    },
    {
        path: '/about',
        label: 'Log In',
        index: 1
    },
];