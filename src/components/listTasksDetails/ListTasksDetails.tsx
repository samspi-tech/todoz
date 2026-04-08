import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

import Button from '@/components/button/Button.tsx';

import { useTaskListsContext } from '@/hooks/useTaskListsContext.ts';
import type { TasksListType } from '@/types/types.ts';
import styles from './ListTasksDetails.module.css';

const ListTasksDetails = () => {
    const [tasksList, setTasksList] = useState<TasksListType | null>(null);

    const { id } = useParams();
    const { getSingleTasksList } = useTaskListsContext();

    useEffect(() => {
        const list = getSingleTasksList(id!);
        setTasksList(list!);

        return () => {
            setTasksList(null);
        };
    }, [id]);

    return (
        <section className={styles.tasksContainer}>
            <header>
                <h2>{tasksList?.title}</h2>
                <Button variant="square" size="small">
                    <Plus />
                </Button>
            </header>
        </section>
    );
};

export default ListTasksDetails;
