import { type SubmitEventHandler, useState } from 'react';

import Input from '@/components/input/Input.tsx';
import Button from '@/components/button/Button.tsx';

import styles from './CreateTasksListForm.module.css';
import type { TasksListType } from '@/types/types.ts';

interface CreateTasksListFormProps {
    onClose: () => void;
}

const CreateTasksListForm = ({ onClose }: CreateTasksListFormProps) => {
    const [title, setTitle] = useState('');

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const titleInput = title.trim();

        if (!titleInput) {
            return;
        }

        const id = title.toLowerCase().split(' ').join('-');

        const newList = {
            id,
            title,
        };

        const localStorageList = localStorage.getItem('tasksList');

        const isTitleDuplicate = localStorageList?.includes(titleInput);

        if (isTitleDuplicate) {
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
        onClose();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input
                id="title"
                type="text"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Your list title"
                autoFocus
            />
            <Button type="submit">create</Button>
        </form>
    );
};

export default CreateTasksListForm;
