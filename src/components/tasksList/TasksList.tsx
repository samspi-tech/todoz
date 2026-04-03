import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

import Button from '@/components/button/Button.tsx';
import Modal from '@/components/modal/Modal.tsx';
import CreateTasksListForm from '@/components/createTasksListForm/CreateTasksListForm.tsx';
import Empty from '@/components/empty/Empty.tsx';
import TasksListCard from '@/components/tasksListCard/TasksListCard.tsx';

import styles from './TasksList.module.css';
import { useModal } from '@/hooks/useModal.ts';
import { useTaskListsContext } from '@/hooks/useTaskListsContext.ts';

const TasksList = () => {
    const [error, setError] = useState<string | null>(null);

    const { taskLists, getAllTaskLists } = useTaskListsContext();
    const { dialogRef, handleOpenModal, handleCloseModal } = useModal();

    useEffect(() => {
        getAllTaskLists();
    }, []);

    return (
        <section className={styles.taskListsContainer}>
            <h2>Your task lists</h2>

            {!taskLists.length && <Empty />}

            <div className={styles.cardsContainer}>
                {taskLists &&
                    taskLists.map((list) => (
                        <TasksListCard key={list.id} cardDetails={list} />
                    ))}
            </div>

            <div className={styles.addButtonContainer}>
                <Button variant="square" onClick={handleOpenModal}>
                    <Plus />
                </Button>
            </div>

            <Modal
                ref={dialogRef}
                title="Create list"
                onClose={() => {
                    setError(null);
                    handleCloseModal();
                }}
            >
                <CreateTasksListForm error={error} setError={setError} />
            </Modal>
        </section>
    );
};

export default TasksList;
