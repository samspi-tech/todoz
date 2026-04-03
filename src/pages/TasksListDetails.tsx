import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

import type { TasksListType } from '@/types/types.ts';
import { useTaskListsContext } from '@/hooks/useTaskListsContext.ts';

const TasksListDetails = () => {
    const [tasksList, setTasksList] = useState<TasksListType | null>(null);

    const { id } = useParams();
    const { getSingleTasksList } = useTaskListsContext();

    useEffect(() => {
        const list = getSingleTasksList(id!);
        setTasksList(list!);

        return () => {
            setTasksList(null);
        };
    }, []);

    return (
        <div>
            <h1>{tasksList?.title}</h1>
        </div>
    );
};

export default TasksListDetails;
