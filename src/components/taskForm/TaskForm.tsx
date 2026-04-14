import { type SubmitEventHandler, useState } from 'react';

import Input from '@/components/input/Input.tsx';
import Button from '@/components/button/Button.tsx';

import styles from '@/components/listForm/ListForm.module.css';
import { useTaskContext } from '@/hooks/useTaskContext.ts';
import type { Task } from '@/types/types.ts';
import {
    cleanUpString,
    convertStringToId,
    saveItemToLocalStorage,
} from '@/utils/helpers.ts';

interface TaskFormProps {
    listId: string;
}

const TaskForm = ({ listId }: TaskFormProps) => {
    const [weightUnity, setWeightUnity] = useState('g');

    const {
        newTask,
        setNewTask,
        handleInputChange,
        initialState,
        getAllTasks,
    } = useTaskContext();

    const getTaskValues = (): Task | undefined => {
        const descriptionValue = newTask.description.trim();

        if (!descriptionValue) {
            return;
        }

        const id = convertStringToId(descriptionValue);
        const description = cleanUpString(descriptionValue);
        const weight = newTask.weight && `${newTask.weight}${weightUnity}`;

        return {
            id,
            description,
            quantity: newTask.quantity,
            weight,
            isChecked: false,
        };
    };

    const handleCreateNewTask = () => {
        const payload = getTaskValues();

        if (!payload) {
            return;
        }

        saveItemToLocalStorage<Task>(listId, { ...payload });
        setNewTask(initialState);
    };

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        handleCreateNewTask();
        getAllTasks(listId);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputsContainer}>
                <Input
                    type="text"
                    error={null}
                    id="description"
                    label="Description"
                    value={newTask.description}
                    onChange={handleInputChange}
                    placeholder="Describe your task"
                />

                <div className={styles.smallInputsContainer}>
                    <Input
                        type="number"
                        id="quantity"
                        error={null}
                        label="Quantity"
                        placeholder="Nº"
                        value={newTask.quantity}
                        onChange={handleInputChange}
                    />

                    <div className={styles.optionsInput}>
                        <Input
                            id="weight"
                            type="number"
                            error={null}
                            label="Weight"
                            placeholder="g — kg"
                            value={newTask.weight}
                            onChange={handleInputChange}
                        />
                        <select
                            id="weightUnity"
                            name="weightUnity"
                            value={weightUnity}
                            onChange={(e) => setWeightUnity(e.target.value)}
                        >
                            <option value="g">g</option>
                            <option value="kg">kg</option>
                        </select>
                    </div>
                </div>
            </div>

            <Button type="submit">Add task</Button>
        </form>
    );
};

export default TaskForm;
