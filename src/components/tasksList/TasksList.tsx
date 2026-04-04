import { Plus } from 'lucide-react';
import { useEffect } from 'react';

import Button from '@/components/button/Button.tsx';
import Modal from '@/components/modal/Modal.tsx';
import CreateTasksListForm from '@/components/createTasksListForm/CreateTasksListForm.tsx';
import Empty from '@/components/empty/Empty.tsx';
import TasksListCard from '@/components/tasksListCard/TasksListCard.tsx';

import styles from './TasksList.module.css';
import { useModal } from '@/hooks/useModal.ts';
import { useTaskListsContext } from '@/hooks/useTaskListsContext.ts';

const TasksList = () => {
    const { dialogRef, handleOpenModal, handleCloseModal } = useModal();
    const { taskLists, getAllTaskLists, setError } = useTaskListsContext();

    useEffect(() => {
        getAllTaskLists();
    }, []);

    return (
        <section className={styles.taskListsContainer}>
            {!taskLists.length && (
                <>
                    <h2>Add a new list</h2>
                    <Empty />
                </>
            )}

            {taskLists.length > 0 && (
                <>
                    <h2>Your task lists</h2>
                    <div className={styles.cardsContainer}>
                        {taskLists.map((list) => (
                            <TasksListCard key={list.id} cardDetails={list} />
                        ))}
                    </div>
                </>
            )}

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
                <CreateTasksListForm />
            </Modal>
        </section>
    );
};

export default TasksList;
