import { EllipsisVertical } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

import styles from './TasksListCard.module.css';
import type { TasksListType } from '@/types/types.ts';
import Button from '@/components/button/Button.tsx';

interface TasksListCardProps {
    cardDetails: TasksListType;
}

const TasksListCard = ({ cardDetails }: TasksListCardProps) => {
    const [isPressed, setIsPressed] = useState(false);

    const navigate = useNavigate();

    const { id, title } = cardDetails;

    return (
        <article className={styles.card}>
            <header>
                <Button variant="square" size="small">
                    <EllipsisVertical />
                </Button>
            </header>

            <div
                className={`${styles.cardBody} ${isPressed && styles.pressed}`}
                onTouchStart={() => setIsPressed(true)}
                onTouchEnd={() => setIsPressed(false)}
                onClick={() =>
                    navigate(`/tasks/${id}`, { viewTransition: true })
                }
            >
                <h3>{title}</h3>
            </div>
        </article>
    );
};

export default TasksListCard;
