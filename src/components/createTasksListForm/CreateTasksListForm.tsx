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

        if (!title.trim()) {
            return;
        }

        const id = title.toLowerCase().split(' ').join('-');

        const newList = {
            id,
            title,
        };

        const localStorageList = localStorage.getItem('tasksList');

        if (!localStorageList) {
            localStorage.setItem('tasksList', JSON.stringify([newList]));
        } else {
            const parsedList: TasksListType[] = JSON.parse(localStorageList);

            const updatedList = [newList, ...parsedList];

            localStorage.setItem('tasksList', JSON.stringify(updatedList));
        }

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
