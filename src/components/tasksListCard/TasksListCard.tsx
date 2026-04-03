import { EllipsisVertical } from 'lucide-react';

import styles from './TasksListCard.module.css';

interface TasksListCardProps {
    title: string;
    footerText?: string;
}

const TasksListCard = ({ title, footerText }: TasksListCardProps) => {
    return (
        <article className={styles.card}>
            <header>
                <EllipsisVertical />
            </header>

            <div className={styles.cardBody}>
                <h3>{title}</h3>
            </div>

            {footerText && (
                <footer>
                    <small>{footerText}</small>
                </footer>
            )}
        </article>
    );
};

export default TasksListCard;
