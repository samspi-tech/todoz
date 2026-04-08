import { createBrowserRouter } from 'react-router';

import Home from '@/pages/Home.tsx';
import Settings from '@/pages/Settings.tsx';
import Lists from '@/pages/Lists.tsx';
import AppLayout from '@/pages/appLayout/AppLayout.tsx';
import ListTasks from '@/pages/ListTasks.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Home,
    },
    {
        Component: AppLayout,
        children: [
            {
                path: '/lists',
                Component: Lists,
            },
            {
                path: '/lists/:id',
                Component: ListTasks,
            },
            {
                path: '/settings',
                Component: Settings,
            },
        ],
    },
]);
