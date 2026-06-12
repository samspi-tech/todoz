import { isSortable } from '@dnd-kit/react/sortable';
import { DragDropProvider } from '@dnd-kit/react';

import TaskCard from '@/components/taskCard/TaskCard.tsx';

import { useTaskContext } from '@/hooks/useTaskContext.ts';
import type { Task } from '@/types/types.ts';

interface DragAndDropTasksProps {
    uncheckedTasks: Task[];
    checkedTasks: Task[];
    listId: string;
}

const DragAndDropTasks = ({
    uncheckedTasks,
    checkedTasks,
    listId,
}: DragAndDropTasksProps) => {
    const { getAllTasks } = useTaskContext();

    return (
        <DragDropProvider
            onDragEnd={(e) => {
                if (e.canceled) return;

                const { source } = e.operation;

                if (isSortable(source)) {
                    const { initialIndex, index } = source;

                    if (initialIndex !== index) {
                        const newItems = [...uncheckedTasks];
                        const [removed] = newItems.splice(initialIndex, 1);
                        newItems.splice(index, 0, removed);

                        localStorage.setItem(
                            listId,
                            JSON.stringify([...newItems, ...checkedTasks])
                        );

                        return getAllTasks(listId);
                    }
                }
            }}
        >
            <ul>
                {uncheckedTasks.map((task, i) => {
                    return (
                        <TaskCard
                            index={i}
                            task={task}
                            key={task.id}
                            listId={listId}
                        />
                    );
                })}
            </ul>
        </DragDropProvider>
    );
};

export default DragAndDropTasks;
