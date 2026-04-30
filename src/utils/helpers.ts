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

export const setNewTasksLocalStorageName = (
    listId: string,
    newListId: string
) => {
    const hasNameChanged = listId !== newListId;

    if (hasNameChanged) {
        const tasks = localStorage.getItem(listId);
        localStorage.setItem(newListId, tasks!);

        localStorage.removeItem(listId);
    }
};

export const checkItemToEditDuplicate = (
    items: List[] | Task[],
    editId: string,
    newId: string
) => {
    const allItemsWithoutItemToEdit = items.filter(
        (item) => item.id !== editId
    );

    return allItemsWithoutItemToEdit.map((item) => item.id).includes(newId);
};

export const getDateTasksReset = (dateStart: Date, skipDays: number) => {
    const listDateCreated = new Date(dateStart);

    const listDateReset = listDateCreated.setDate(
        listDateCreated.getDate() + skipDays
    );

    return new Date(listDateReset);
};
