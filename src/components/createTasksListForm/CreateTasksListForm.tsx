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
import { useTaskListsContext } from '@/hooks/useTaskListsContext.ts';

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

    const { getAllTaskLists } = useTaskListsContext();

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const titleValue = title.trim();

        if (!titleValue) {
            setError('Title is required.');

            return;
        }

        const id = titleValue
            .toLowerCase()
            .split(' ')
            .filter((item) => item !== '')
            .join('-');

        const localStorageList = localStorage.getItem('taskLists');

        const isTitleDuplicate = localStorageList?.includes(id);

        if (isTitleDuplicate) {
            setTitle('');
            setError(`"${title}" is a duplicate. Title must be unique.`);

            return;
        }

        const listTitle = titleValue
            .split(' ')
            .filter((item) => item !== '')
            .join(' ');

        const newList = {
            id,
            title: listTitle,
        };

        const parsedLocalStorageList: TasksListType[] = localStorageList
            ? JSON.parse(localStorageList)
            : [];

        localStorage.setItem(
            'taskLists',
            JSON.stringify([newList, ...parsedLocalStorageList])
        );

        setTitle('');
        setError(null);
        getAllTaskLists();
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
