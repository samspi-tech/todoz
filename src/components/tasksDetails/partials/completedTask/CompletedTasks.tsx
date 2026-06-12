import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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

    const { t } = useTranslation();

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
            <Button
                size="small"
                variant="square"
                aria-expanded={isOpen}
                onClick={handleOpenCompletedTasks}
                aria-label={t(
                    'openOrCloseCompletedTasksList',
                    'Open or close completed tasks list'
                )}
            >
                {isOpen ? <ChevronDown /> : <ChevronUp />}
            </Button>

            <h4>
                {t('completed', 'Completed')}
                <span>
                    {completedTasks} / {tasks.length}
                </span>
            </h4>

            {isOpen && (
                <ul>
                    {tasks
                        .filter((task) => task.isChecked)
                        .map((task, i) => {
                            return (
                                <TaskCard
                                    index={i}
                                    isChecked
                                    task={task}
                                    key={task.id}
                                    listId={listId}
                                />
                            );
                        })}
                </ul>
            )}
        </div>
    );
};

export default CompletedTasks;
