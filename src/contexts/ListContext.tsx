import {
    createContext,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction,
    useState,
} from 'react';

import type { List } from '@/types/types.ts';

interface ListContextValues {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    lists: List[];
    getAllLists: () => void;
    getList: (id: string) => List | undefined;
    updateListTitle: (id: string, updatedList: List) => void;
    deleteList: (id: string) => void;
    deleteLocalStorage: () => void;
    hasDataLoaded: boolean;
    error: string | null;
    setError: Dispatch<SetStateAction<string | null>>;
}

export const ListContext = createContext<ListContextValues | null>(null);

export const ListProvider = ({ children }: PropsWithChildren) => {
    const [title, setTitle] = useState('');
    const [lists, setLists] = useState<List[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [hasDataLoaded, setHasDataLoaded] = useState(false);

    const getAllLists = () => {
        const localStorageTaskLists = localStorage.getItem('lists');

        if (localStorageTaskLists) {
            setLists(JSON.parse(localStorageTaskLists));
        }

        setHasDataLoaded(true);
    };

    const getList = (id: string) => {
        const localStorageTaskLists = localStorage.getItem('lists');

        if (localStorageTaskLists) {
            const parsedTaskLists: List[] = JSON.parse(localStorageTaskLists);

            return parsedTaskLists.filter((list) => list.id === id).at(0);
        }
    };

    const setNewTasksLocalStorageName = (listId: string, newListId: string) => {
        const tasks = localStorage.getItem(listId);
        localStorage.setItem(newListId, tasks!);

        localStorage.removeItem(listId);
    };

    const updateListTitle = (id: string, updatedList: List) => {
        const localStorageTaskLists = localStorage.getItem('lists');

        if (localStorageTaskLists) {
            const parsedTaskLists: List[] = JSON.parse(localStorageTaskLists);

            const updatedLists = parsedTaskLists.map((list) => {
                if (list.id === id) {
                    return { ...updatedList };
                } else {
                    return list;
                }
            });

            localStorage.setItem('lists', JSON.stringify(updatedLists));

            setNewTasksLocalStorageName(id, updatedList.id);
            getAllLists();
        }
    };

    const deleteList = (id: string) => {
        const localStorageTaskLists = localStorage.getItem('lists');

        if (localStorageTaskLists) {
            const parsedTaskLists: List[] = JSON.parse(localStorageTaskLists);

            const updatedList = parsedTaskLists.filter(
                (list) => list.id !== id
            );

            localStorage.removeItem(id); // remove all tasks from the list

            localStorage.setItem('lists', JSON.stringify(updatedList));

            getAllLists();
        }
    };

    const deleteLocalStorage = () => {
        localStorage.clear();
        setLists([]);
    };

    return (
        <ListContext.Provider
            value={{
                lists,
                getAllLists,
                getList,
                updateListTitle,
                deleteList,
                deleteLocalStorage,
                hasDataLoaded,
                title,
                setTitle,
                error,
                setError,
            }}
        >
            {children}
        </ListContext.Provider>
    );
};
