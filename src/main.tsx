import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { ListProvider } from '@/contexts/ListContext.tsx';
import { SelectedListCardProvider } from '@/contexts/SelectedListCardContext.tsx';
import { TaskProvider } from '@/contexts/TaskContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <TaskProvider>
            <SelectedListCardProvider>
                <ListProvider>
                    <App />
                </ListProvider>
            </SelectedListCardProvider>
        </TaskProvider>
    </StrictMode>
);
