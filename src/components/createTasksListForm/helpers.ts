import type { TasksListType } from '@/types/types.ts';

export const saveListToLocalStorage = (list: TasksListType) => {
    const localStorageAllLists = localStorage.getItem('taskLists');

    const parsedLocalStorageList: TasksListType[] = localStorageAllLists
        ? JSON.parse(localStorageAllLists)
        : [];

    localStorage.setItem(
        'taskLists',
        JSON.stringify([list, ...parsedLocalStorageList])
    );
};

export const convertTitleToId = (title: string) => {
    return title
        .toLowerCase()
        .split(' ')
        .filter((item) => item !== '')
        .join('-');
};

export const cleanUpTitle = (title: string) => {
    return title
        .split(' ')
        .filter((item) => item !== '')
        .join(' ');
};
