import { createBrowserRouter } from 'react-router';

import Welcome from '@/pages/Welcome.tsx';
import Settings from '@/pages/Settings.tsx';
import Tasks from '@/pages/Tasks.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Welcome,
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
