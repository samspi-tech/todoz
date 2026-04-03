import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { TaskListsProvider } from '@/contexts/TaskListsContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <TaskListsProvider>
            <App />
        </TaskListsProvider>
    </StrictMode>
);
