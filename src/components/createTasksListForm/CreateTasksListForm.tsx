import { type SubmitEventHandler, useState } from 'react';
import { useNavigate } from 'react-router';

import Input from '@/components/input/Input.tsx';
import Button from '@/components/button/Button.tsx';

import styles from './CreateTasksListForm.module.css';
import { useTaskListsContext } from '@/hooks/useTaskListsContext.ts';
import {
    cleanUpTitle,
    convertTitleToId,
    saveListToLocalStorage,
} from '@/components/createTasksListForm/helpers.ts';

const CreateTasksListForm = () => {
    const [title, setTitle] = useState('');

    const navigate = useNavigate();
    const { getSingleTasksList, error, setError } = useTaskListsContext();

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const titleValue = title.trim();

        if (!titleValue) {
            setError('Title is required.');

            return;
        }

        const id = convertTitleToId(titleValue);
        const localStorageList = getSingleTasksList(id);
        const isTitleDuplicate = localStorageList?.id === id;

        if (isTitleDuplicate) {
            setTitle('');
            setError(`"${title}" is a duplicate. Title must be unique.`);

            return;
        }

        const listTitle = cleanUpTitle(titleValue);

        const newList = {
            id,
            title: listTitle,
        };

        saveListToLocalStorage(newList);
        navigate(`/tasks/${id}`, { viewTransition: true });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input
                id="title"
                type="text"
                label="Title"
                value={title}
                error={error}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Your list title"
                autoFocus
            />
            <Button type="submit">create</Button>
        </form>
    );
};

export default CreateTasksListForm;
