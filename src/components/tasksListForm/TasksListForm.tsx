import { type SubmitEventHandler } from 'react';
import { useNavigate } from 'react-router';

import Input from '@/components/input/Input.tsx';
import Button from '@/components/button/Button.tsx';

import styles from './TasksListForm.module.css';
import { useTaskListsContext } from '@/hooks/useTaskListsContext.ts';
import {
    cleanUpTitle,
    convertTitleToId,
    saveListToLocalStorage,
} from '@/components/tasksListForm/helpers.ts';

interface TasksListFormProps {
    isUpdate?: boolean;
    editListId?: string;
    onClose?: () => void;
}

const TasksListForm = ({
    isUpdate = false,
    editListId,
    onClose,
}: TasksListFormProps) => {
    const navigate = useNavigate();

    const {
        getSingleTasksList,
        error,
        setError,
        updateSingleListTitle,
        title,
        setTitle,
    } = useTaskListsContext();

    const getListTitleAndId = () => {
        const titleValue = title.trim();

        if (!titleValue) {
            setError('Title is required.');
            return;
        }

        const newId = convertTitleToId(titleValue);
        const localStorageList = getSingleTasksList(newId);
        const isTitleDuplicate = localStorageList?.id === newId;

        if (isTitleDuplicate) {
            setTitle('');
            setError(`"${title}" is a duplicate. Title must be unique.`);
            return;
        }

        const newTitle = cleanUpTitle(titleValue);

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

        saveListToLocalStorage({
            id: newList.newId,
            title: newList.newTitle,
        });

        navigate(`/tasks/${newList.newId}`, { viewTransition: true });
    };

    const handleEditList = () => {
        const updatedList = getListTitleAndId();

        if (!updatedList) {
            return;
        }

        updateSingleListTitle(editListId!, {
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

export default TasksListForm;
