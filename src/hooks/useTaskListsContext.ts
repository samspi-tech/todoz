import { useContext } from 'react';

import { TaskListsContext } from '@/contexts/TaskListsContext.tsx';

export const useTaskListsContext = () => {
    const context = useContext(TaskListsContext);

    if (!context) {
        throw new Error('Task List Context must be used within the provider');
    }

    return context;
};
