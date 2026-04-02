import {
    type Dispatch,
    type SetStateAction,
    type SubmitEventHandler,
    useState,
} from 'react';

import Input from '@/components/input/Input.tsx';
import Button from '@/components/button/Button.tsx';

import styles from './CreateTasksListForm.module.css';
import type { TasksListType } from '@/types/types.ts';

interface CreateTasksListFormProps {
    onClose: () => void;
    error: string | null;
    setError: Dispatch<SetStateAction<string | null>>;
}

const CreateTasksListForm = ({
    onClose,
    error,
    setError,
}: CreateTasksListFormProps) => {
    const [title, setTitle] = useState('');

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const titleInput = title.trim();

        if (!titleInput) {
            setError('Title is required.');

            return;
        }

        const id = title.split(' ').join('-');

        const newList = {
            id,
            title,
        };

        const localStorageList = localStorage.getItem('tasksList');

        const isTitleDuplicate = localStorageList?.includes(titleInput);

        if (isTitleDuplicate) {
            setTitle('');
            setError(`"${title}" is a duplicate. Title must be unique.`);

            return;
        }

        const parsedLocalStorageList: TasksListType[] = localStorageList
            ? JSON.parse(localStorageList)
            : [];

        localStorage.setItem(
            'tasksList',
            JSON.stringify([newList, ...parsedLocalStorageList])
        );

        setTitle('');
        setError(null);
        onClose();
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
