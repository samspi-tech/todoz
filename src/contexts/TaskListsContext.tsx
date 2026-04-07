import {
    createContext,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction,
    useState,
} from 'react';

import type { TasksListType } from '@/types/types.ts';

interface TaskListsContextValues {
    taskLists: TasksListType[];
    getAllTaskLists: () => void;
    getSingleTasksList: (id: string) => TasksListType | undefined;
    deleteSingleTasksList: (id: string) => void;
    deleteLocalStorage: () => void;
    hasDataLoaded: boolean;
    error: string | null;
    setError: Dispatch<SetStateAction<string | null>>;
}

export const TaskListsContext = createContext<TaskListsContextValues | null>(
    null
);

export const TaskListsProvider = ({ children }: PropsWithChildren) => {
    const [error, setError] = useState<string | null>(null);
    const [hasDataLoaded, setHasDataLoaded] = useState(false);
    const [taskLists, setTaskLists] = useState<TasksListType[]>([]);

    const getAllTaskLists = () => {
        const localStorageTaskLists = localStorage.getItem('taskLists');

        if (localStorageTaskLists) {
            setTaskLists(JSON.parse(localStorageTaskLists));
        }

        setHasDataLoaded(true);
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

    const deleteSingleTasksList = (id: string) => {
        const localStorageTaskLists = localStorage.getItem('taskLists');

        if (localStorageTaskLists) {
            const parsedTaskLists: TasksListType[] = JSON.parse(
                localStorageTaskLists
            );

            const updatedList = parsedTaskLists.filter(
                (list) => list.id !== id
            );

            localStorage.setItem('taskLists', JSON.stringify(updatedList));

            getAllTaskLists();
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
                deleteSingleTasksList,
                deleteLocalStorage,
                hasDataLoaded,
                error,
                setError,
            }}
        >
            {children}
        </TaskListsContext.Provider>
    );
};
