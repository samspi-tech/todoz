import { createBrowserRouter } from 'react-router';

import Home from '@/pages/Home.tsx';
import Settings from '@/pages/Settings.tsx';
import Tasks from '@/pages/Tasks.tsx';
import AppLayout from '@/pages/appLayout/AppLayout.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Home,
    },
    {
        Component: AppLayout,
        children: [
            {
                path: '/tasks',
                Component: Tasks,
            },
            {
                path: '/settings',
                Component: Settings,
            },
        ],
    },
]);
