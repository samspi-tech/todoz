import { createContext, type PropsWithChildren, useState } from 'react';

import type { TasksListType } from '@/types/types.ts';

interface TaskListsContextValues {
    taskLists: TasksListType[];
    getAllTaskLists: () => void;
    getSingleTasksList: (id: string) => TasksListType | undefined;
    deleteLocalStorage: () => void;
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

    const getSingleTasksList = (id: string) => {
        const localStorageTaskLists = localStorage.getItem('taskLists');

        if (localStorageTaskLists) {
            const parsedTaskLists: TasksListType[] = JSON.parse(
                localStorageTaskLists
            );

            return parsedTaskLists.filter((list) => list.id === id).at(0);
        }
    };

    const deleteLocalStorage = () => {
        localStorage.clear();
        setTaskLists([]);
    };

    return (
        <TaskListsContext.Provider
            value={{
                taskLists,
                getAllTaskLists,
                getSingleTasksList,
                deleteLocalStorage,
            }}
        >
            {children}
        </TaskListsContext.Provider>
    );
};
