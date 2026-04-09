import type { List, Task } from '@/types/types.ts';

export const saveItemToLocalStorage = <T extends List | Task>(
    itemName: string,
    itemValue: T
) => {
    const localStorageItem = localStorage.getItem(itemName);

    const parsedLocalStorageItem: T[] = localStorageItem
        ? JSON.parse(localStorageItem)
        : [];

    localStorage.setItem(
        itemName,
        JSON.stringify([itemValue, ...parsedLocalStorageItem])
    );
};

export const convertStringToId = (string: string) => {
    return string
        .toLowerCase()
        .split(' ')
        .filter((item) => item !== '')
        .join('-');
};

export const cleanUpString = (string: string) => {
    return string
        .split(' ')
        .filter((item) => item !== '')
        .join(' ');
};
