import {
    type ChangeEvent,
    createContext,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction,
    useState,
} from 'react';

import type { List } from '@/types/types.ts';
import { setNewTasksLocalStorageName } from '@/utils/helpers.ts';

interface ListContextValues {
    initialValues: List;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    newList: List;
    setNewList: Dispatch<SetStateAction<List>>;
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
    const initialValues: List = {
        id: '',
        title: '',
        resetDays: '',
        startingDate: new Date(),
    };

    const [lists, setLists] = useState<List[]>([]);
    const [newList, setNewList] = useState(initialValues);
    const [error, setError] = useState<string | null>(null);
    const [hasDataLoaded, setHasDataLoaded] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewList({
            ...newList,
            [name]: value,
        });
    };

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

    const updateListTitle = (id: string, updatedList: List) => {
        const localStorageTaskLists = localStorage.getItem('lists');

        if (localStorageTaskLists) {
            const parsedTaskLists: List[] = JSON.parse(localStorageTaskLists);

            const lists = parsedTaskLists.map((list) => {
                if (list.id === id) {
                    return { ...updatedList };
                } else {
                    return list;
                }
            });

            localStorage.setItem('lists', JSON.stringify(lists));

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
                initialValues,
                handleInputChange,
                lists,
                getAllLists,
                getList,
                updateListTitle,
                deleteList,
                deleteLocalStorage,
                hasDataLoaded,
                newList,
                setNewList,
                error,
                setError,
            }}
        >
            {children}
        </ListContext.Provider>
    );
};
