import { type SubmitEventHandler, useState } from 'react';

import Input from '@/components/input/Input.tsx';
import Button from '@/components/button/Button.tsx';
import Checkbox from '@/components/checkbox/Checkbox.tsx';

import styles from '@/components/listForm/ListForm.module.css';
import { useTaskContext } from '@/hooks/useTaskContext.ts';
import type { Task } from '@/types/types.ts';
import {
    checkItemToEditDuplicate,
    cleanUpString,
    convertStringToId,
    saveItemToLocalStorage,
} from '@/utils/helpers.ts';

interface TaskFormProps {
    listId: string;
    isUpdate?: boolean;
    taskId?: string;
    onClose: () => void;
}

const TaskForm = ({
    listId,
    isUpdate = false,
    taskId,
    onClose,
}: TaskFormProps) => {
    const [isKeepAddingTasks, setIsKeepAddingTasks] = useState(false);

    const {
        tasks,
        newTask,
        setNewTask,
        handleInputChange,
        checkTaskDuplicate,
        initialState,
        getAllTasks,
        updateTask,
        error,
        setError,
    } = useTaskContext();

    const getTaskValues = (): Task | undefined => {
        const descriptionValue = newTask.description.trim();

        if (!descriptionValue) {
            setError('This field is required');
            return;
        }

        const id = convertStringToId(descriptionValue);
        const isTaskDuplicate = checkTaskDuplicate(id);

        if (isTaskDuplicate && !isUpdate) {
            setNewTask(initialState);
            setError(`"${descriptionValue}" is already one of your tasks.`);
            return;
        }

        const description = cleanUpString(descriptionValue);
        const isChecked = isUpdate ? newTask.isChecked : false;

        return {
            id,
            description,
            quantity: newTask.quantity,
            weight: newTask.weight,
            weightUnit: newTask.weightUnit,
            isChecked,
        };
    };

    const handleCreateNewTask = () => {
        setNewTask(initialState);
        const payload = getTaskValues();

        if (!payload) {
            return;
        }

        saveItemToLocalStorage<Task>(listId, { ...payload });
        setError(null);

        if (!isKeepAddingTasks) {
            onClose();
        }
    };

    const handleUpdateTask = () => {
        const payload = getTaskValues();

        if (!payload) {
            return;
        }

        const isDuplicate = checkItemToEditDuplicate(
            tasks,
            taskId!,
            payload.id
        );

        if (isDuplicate) {
            setNewTask(initialState);
            setError(`"${payload.description}" is already one of your tasks.`);
            return;
        }

        updateTask(listId, taskId!, payload);
        setError(null);
        onClose();
    };

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        isUpdate ? handleUpdateTask() : handleCreateNewTask();

        getAllTasks(listId);
        setNewTask(initialState);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputsContainer}>
                <Input
                    autoFocus
                    type="text"
                    error={error}
                    id="description"
                    placeholder="Task"
                    label="Description"
                    value={newTask.description}
                    onChange={handleInputChange}
                />

                <div className={styles.smallInputsContainer}>
                    <Input
                        type="number"
                        id="quantity"
                        label="*Quantity"
                        placeholder="Nº"
                        value={newTask.quantity}
                        onChange={handleInputChange}
                    />

                    <div className={styles.optionsInput}>
                        <Input
                            id="weight"
                            type="number"
                            label="*Weight"
                            placeholder="gr — kg"
                            value={newTask.weight}
                            onChange={handleInputChange}
                        />

                        <select
                            id="weightUnit"
                            name="weightUnit"
                            value={newTask.weightUnit}
                            onChange={handleInputChange}
                            className={styles.selectInput}
                        >
                            <option value="gr">gr</option>
                            <option value="kg">kg</option>
                        </select>
                    </div>
                </div>

                {!isUpdate && (
                    <Checkbox
                        label="Keep adding"
                        name="isKeepAddingTasks"
                        checked={isKeepAddingTasks}
                        onChange={(e) => setIsKeepAddingTasks(e.target.checked)}
                    />
                )}
            </div>

            <Button type="submit">Add task</Button>

            <footer>
                <small>*optional</small>
            </footer>
        </form>
    );
};

export default TaskForm;
