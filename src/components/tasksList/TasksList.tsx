import { Plus } from 'lucide-react';

import Button from '@/components/button/Button.tsx';

import styles from './TasksList.module.css';

const TasksList = () => {
    return (
        <section className={styles.taskListsContainer}>
            <h2>Your task lists</h2>

            <Button variant="rounded">
                <Plus />
            </Button>
        </section>
    );
};

export default TasksList;
