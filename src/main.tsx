import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { ListProvider } from '@/contexts/ListContext.tsx';
import { SelectedCardProvider } from '@/contexts/SelectedCardContext.tsx';
import { TaskProvider } from '@/contexts/TaskContext.tsx';
import { ThemeProvider } from '@/contexts/ThemeContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <TaskProvider>
                <SelectedCardProvider>
                    <ListProvider>
                        <App />
                    </ListProvider>
                </SelectedCardProvider>
            </TaskProvider>
        </ThemeProvider>
    </StrictMode>
);
