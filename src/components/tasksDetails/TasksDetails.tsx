import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

import Button from '@/components/button/Button.tsx';

import { useListContext } from '@/hooks/useListContext.ts';
import type { List } from '@/types/types.ts';
import styles from './TasksDetails.module.css';

const TasksDetails = () => {
    const [list, setList] = useState<List | null>(null);

    const { id } = useParams();
    const { getList } = useListContext();

    useEffect(() => {
        const listData = getList(id!);
        setList(listData!);

        return () => {
            setList(null);
        };
    }, [id]);

    return (
        <section className={styles.tasksContainer}>
            <header>
                <h2>{list?.title}</h2>
                <Button variant="square" size="small">
                    <Plus />
                </Button>
            </header>
        </section>
    );
};

export default TasksDetails;
