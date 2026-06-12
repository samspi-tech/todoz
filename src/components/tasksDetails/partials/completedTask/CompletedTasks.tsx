import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import Button from '@/components/button/Button.tsx';
import TaskCard from '@/components/taskCard/TaskCard.tsx';

import styles from './CompletedTasks.module.css';
import type { Task } from '@/types/types.ts';

interface CompletedTasksProps {
    listId: string;
    numTasks: number;
    checkedTasks: Task[];
}

const CompletedTasks = ({
    checkedTasks,
    numTasks,
    listId,
}: CompletedTasksProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const { t } = useTranslation();

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
                    {checkedTasks.length} / {numTasks}
                </span>
            </h4>

            {isOpen && (
                <ul>
                    {checkedTasks.map((task, i) => {
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
