import { createBrowserRouter } from 'react-router';

import Home from '@/pages/Home.tsx';
import Settings from '@/pages/Settings.tsx';
import Tasks from '@/pages/Tasks.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Home,
    },
    {
        path: '/tasks',
        Component: Tasks,
    },
    {
        path: '/settings',
        Component: Settings,
    },
]);
