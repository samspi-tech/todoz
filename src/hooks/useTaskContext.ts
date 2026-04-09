import { useContext } from 'react';

import { TaskContext } from '@/contexts/TaskContext.tsx';

export const useTaskContext = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('Task Context must be used within its provider');
    }

    return context;
};
