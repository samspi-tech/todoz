import { createContext, type PropsWithChildren, useState } from 'react';

import type { TasksListType } from '@/types/types.ts';

interface TaskListsContextValues {
    taskLists: TasksListType[];
    getAllTaskLists: () => void;
}

export const TaskListsContext = createContext<TaskListsContextValues | null>(
    null
);

export const TaskListsProvider = ({ children }: PropsWithChildren) => {
    const [taskLists, setTaskLists] = useState<TasksListType[]>([]);

    const getAllTaskLists = () => {
        const localStorageTaskLists = localStorage.getItem('taskLists');

        if (localStorageTaskLists) {
            setTaskLists(JSON.parse(localStorageTaskLists));
        }
    };

    return (
        <TaskListsContext.Provider
            value={{
                taskLists,
                getAllTaskLists,
            }}
        >
            {children}
        </TaskListsContext.Provider>
    );
};
