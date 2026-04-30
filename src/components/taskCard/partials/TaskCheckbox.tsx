import type { Task } from '@/types/types.ts';
import { useTaskContext } from '@/hooks/useTaskContext.ts';
import styles from './TaskCheckbox.module.css';

interface TaskCheckboxProps {
    task: Task;
    listId: string;
}

const TaskCheckbox = ({ task, listId }: TaskCheckboxProps) => {
    const { updateTask, getAllTasks } = useTaskContext();

    const handleUpdateTask = () => {
        const check = {
            ...task,
            isChecked: true,
        };

        const uncheck = {
            ...task,
            isChecked: false,
        };

        const payload = task.isChecked ? uncheck : check;

        updateTask(listId, task.id, payload);
        getAllTasks(listId);
    };

    return (
        <input
            type="checkbox"
            id="completeTask"
            name="completeTask"
            onClick={handleUpdateTask}
            defaultChecked={task.isChecked}
            className={styles.checkbox}
        />
    );
};

export default TaskCheckbox;
