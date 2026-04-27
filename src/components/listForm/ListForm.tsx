import { type SubmitEventHandler, useState } from 'react';
import { useNavigate } from 'react-router';

import Input from '@/components/input/Input.tsx';
import Button from '@/components/button/Button.tsx';

import inputStyle from '@/components/input/Input.module.css';
import styles from './ListForm.module.css';
import { useListContext } from '@/hooks/useListContext.ts';
import type { List } from '@/types/types.ts';
import {
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
    const [resetDays, setResetDays] = useState('');

    const navigate = useNavigate();

    const {
        getList,
        error,
        setError,
        updateListTitle,
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

        if (isTitleDuplicate) {
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
            resetDays,
            startingDate: new Date(),
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

    const handleEditList = () => {
        const updatedList = getListValues();

        if (!updatedList) {
            return;
        }

        updateListTitle(editListId!, { ...updatedList });

        onClose?.();
        setError(null);
    };

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        isUpdate ? handleEditList() : handleCreateNewList();
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
                    <label htmlFor="reset">
                        Choose when to reset your tasks
                    </label>

                    <select
                        id="reset"
                        name="reset"
                        value={resetDays}
                        onChange={(e) => setResetDays(e.target.value)}
                        className={styles.selectInput}
                    >
                        <option value="">-- Optional --</option>
                        <option value="7">Every 7 days</option>
                    </select>
                </div>
            </div>

            <Button type="submit">{isUpdate ? 'Edit' : 'Create'}</Button>
        </form>
    );
};

export default ListForm;
