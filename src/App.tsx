import { RouterProvider } from 'react-router/dom';

import { router } from '@/react-router/router.ts';

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
