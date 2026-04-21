import type { Task } from '@/types/types.ts';
import { useTaskContext } from '@/hooks/useTaskContext.ts';

interface TaskCheckboxProps {
    task: Task;
    listId: string;
}

const TaskCheckbox = ({ task, listId }: TaskCheckboxProps) => {
    const { updateTask, getAllTasks } = useTaskContext();

    const handleUpdateTask = () => {
        const payload = {
            ...task,
            isChecked: true,
        };

        updateTask(listId, task.id, payload);
        getAllTasks(listId);
    };

    return (
        <input
            type="checkbox"
            id="completeTask"
            name="completeTask"
            onClick={handleUpdateTask}
        />
    );
};

export default TaskCheckbox;
