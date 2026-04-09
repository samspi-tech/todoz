import { type SubmitEventHandler } from 'react';
import { useNavigate } from 'react-router';

import Input from '@/components/input/Input.tsx';
import Button from '@/components/button/Button.tsx';

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
    const navigate = useNavigate();

    const { getList, error, setError, updateListTitle, title, setTitle } =
        useListContext();

    const getListTitleAndId = () => {
        const titleValue = title.trim();

        if (!titleValue) {
            setError('Title is required.');
            return;
        }

        const newId = convertStringToId(titleValue);
        const localStorageList = getList(newId);
        const isTitleDuplicate = localStorageList?.id === newId;

        if (isTitleDuplicate) {
            setTitle('');
            setError(`"${title}" is a duplicate. Title must be unique.`);
            return;
        }

        const newTitle = cleanUpString(titleValue);

        return {
            newId,
            newTitle,
        };
    };

    const handleCreateNewList = () => {
        const newList = getListTitleAndId();

        if (!newList) {
            return;
        }

        saveItemToLocalStorage<List>('lists', {
            id: newList.newId,
            title: newList.newTitle,
        });

        navigate(`/lists/${newList.newId}`, { viewTransition: true });
    };

    const handleEditList = () => {
        const updatedList = getListTitleAndId();

        if (!updatedList) {
            return;
        }

        updateListTitle(editListId!, {
            id: updatedList.newId,
            title: updatedList.newTitle,
        });

        onClose?.();
        setError(null);
    };

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        isUpdate ? handleEditList() : handleCreateNewList();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input
                id="title"
                type="text"
                label="Title"
                error={error}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Your list title"
                autoFocus
            />
            <Button type="submit">{isUpdate ? 'Edit' : 'Create'}</Button>
        </form>
    );
};

export default ListForm;
