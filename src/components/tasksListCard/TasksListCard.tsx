import { EllipsisVertical } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

import styles from './TasksListCard.module.css';
import type { TasksListType } from '@/types/types.ts';

interface TasksListCardProps {
    cardDetails: TasksListType;
}

const TasksListCard = ({ cardDetails }: TasksListCardProps) => {
    const [isPressed, setIsPressed] = useState(false);

    const navigate = useNavigate();

    const { id, title } = cardDetails;

    return (
        <article
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => setIsPressed(false)}
            onClick={() => navigate(`/tasks/${id}`, { viewTransition: true })}
            className={`${styles.card} ${isPressed && styles.pressed}`}
        >
            <header>
                <EllipsisVertical />
            </header>

            <div className={styles.cardBody}>
                <h3>{title}</h3>
            </div>
        </article>
    );
};

export default TasksListCard;
