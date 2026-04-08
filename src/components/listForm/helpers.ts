import type { List } from '@/types/types.ts';

export const saveListToLocalStorage = (list: List) => {
    const localStorageLists = localStorage.getItem('lists');

    const parsedLocalStorageLists: List[] = localStorageLists
        ? JSON.parse(localStorageLists)
        : [];

    localStorage.setItem(
        'lists',
        JSON.stringify([list, ...parsedLocalStorageLists])
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
