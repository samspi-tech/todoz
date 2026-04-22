import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import Button from '@/components/button/Button.tsx';
import TaskCard from '@/components/taskCard/TaskCard.tsx';

import styles from './CompletedTasks.module.css';
import type { Task } from '@/types/types.ts';

interface CompletedTasksProps {
    tasks: Task[];
    listId: string;
}

const CompletedTasks = ({ tasks, listId }: CompletedTasksProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const completedTasks = useMemo(
        () => tasks.filter((task) => task.isChecked).length,
        [tasks]
    );

    const handleOpenCompletedTasks = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <div
            className={`${styles.completedTasksContainer} ${isOpen ? styles.show : styles.hide}`}
        >
            {isOpen ? (
                <Button
                    size="small"
                    variant="square"
                    onClick={handleOpenCompletedTasks}
                >
                    <ChevronDown />
                </Button>
            ) : (
                <Button
                    size="small"
                    variant="square"
                    onClick={handleOpenCompletedTasks}
                >
                    <ChevronUp />
                </Button>
            )}

            <h4>
                Completed
                <span>
                    {completedTasks} / {tasks.length}
                </span>
            </h4>

            {isOpen && (
                <ul>
                    {tasks.map((task) => {
                        return (
                            task.isChecked && (
                                <TaskCard
                                    isChecked
                                    task={task}
                                    key={task.id}
                                    listId={listId}
                                />
                            )
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default CompletedTasks;
