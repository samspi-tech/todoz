import { type SubmitEventHandler } from 'react';
import { useNavigate } from 'react-router';

import Input from '@/components/input/Input.tsx';
import Button from '@/components/button/Button.tsx';

import inputStyle from '@/components/input/Input.module.css';
import styles from './ListForm.module.css';
import { useListContext } from '@/hooks/useListContext.ts';
import type { List } from '@/types/types.ts';
import {
    checkItemToEditDuplicate,
    cleanUpString,
    convertStringToId,
    saveItemToLocalStorage,
} from '@/utils/helpers.ts';

interface ListFormProps {
    isUpdate?: boolean;
    editListId?: string;
    onClose?: () => void;
}

const ListForm = ({ isUpdate = false, editListId, onClose }: ListFormProps) => {
    const navigate = useNavigate();

    const {
        lists,
        getList,
        error,
        setError,
        updateList,
        newList,
        setNewList,
        initialValues,
        handleInputChange,
    } = useListContext();

    const getListValues = (): List | undefined => {
        const titleValue = newList.title.trim();

        if (!titleValue) {
            setError('Title is required.');
            return;
        }

        const id = convertStringToId(titleValue);
        const localStorageList = getList(id);
        const isTitleDuplicate = localStorageList?.id === id;

        if (isTitleDuplicate && !isUpdate) {
            setNewList(initialValues);
            setError(
                `"${newList.title}" is a duplicate. Title must be unique.`
            );

            return;
        }

        const title = cleanUpString(titleValue);

        return {
            id,
            title,
            daysReset: newList.daysReset,
            dateCreated: new Date(),
        };
    };

    const handleCreateNewList = () => {
        const newList = getListValues();

        if (!newList) {
            return;
        }

        saveItemToLocalStorage<List>('lists', { ...newList });
        navigate(`/lists/${newList.id}`, { viewTransition: true });
    };

    const handleUpdateList = () => {
        const updatedList = getListValues();

        if (!updatedList) {
            return;
        }

        const isDuplicate = checkItemToEditDuplicate(
            lists,
            editListId!,
            updatedList.id
        );

        if (isDuplicate) {
            setNewList(initialValues);
            setError(`${updatedList.title} already exists.`);
            return;
        }

        updateList(editListId!, { ...updatedList });

        onClose?.();
        setError(null);
    };

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        isUpdate ? handleUpdateList() : handleCreateNewList();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputsContainer}>
                <Input
                    autoFocus
                    id="title"
                    type="text"
                    label="Title"
                    error={error}
                    value={newList.title}
                    onChange={handleInputChange}
                    placeholder="Your list title"
                />

                <div className={inputStyle.inputContainer}>
                    <label htmlFor="resetDays">
                        Choose when to reset your tasks
                    </label>

                    <select
                        id="daysReset"
                        name="daysReset"
                        value={newList.daysReset}
                        onChange={handleInputChange}
                        className={styles.selectInput}
                    >
                        <option value="">-- Optional --</option>
                        <option value="1">Every day</option>
                        <option value="7">Every 7 days</option>
                    </select>
                </div>
            </div>

            <Button type="submit">{isUpdate ? 'Edit' : 'Create'}</Button>
        </form>
    );
};

export default ListForm;
