import { Plus } from 'lucide-react';
import { useEffect } from 'react';

import Button from '@/components/button/Button.tsx';
import Modal from '@/components/modal/Modal.tsx';
import TasksListForm from '@/components/tasksListForm/TasksListForm.tsx';
import Empty from '@/components/empty/Empty.tsx';
import TasksListCard from '@/components/tasksListCard/TasksListCard.tsx';

import styles from './TasksList.module.css';
import { useModal } from '@/hooks/useModal.ts';
import { useTaskListsContext } from '@/hooks/useTaskListsContext.ts';

const TasksList = () => {
    const { modalRef, handleOpenModal, handleCloseModal } = useModal();

    const { taskLists, getAllTaskLists, setError, setTitle } =
        useTaskListsContext();

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
                <Button
                    variant="square"
                    onClick={() => {
                        setTitle('');
                        handleOpenModal();
                    }}
                >
                    <Plus />
                </Button>
            </div>

            <Modal
                ref={modalRef}
                title="Create list"
                onClose={() => {
                    setError(null);
                    handleCloseModal();
                }}
            >
                <TasksListForm />
            </Modal>
        </section>
    );
};

export default TasksList;
