import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

import Button from '@/components/button/Button.tsx';
import Modal from '@/components/modal/Modal.tsx';
import TaskForm from '@/components/taskForm/TaskForm.tsx';
import Empty from '@/components/empty/Empty.tsx';
import TaskCard from '@/components/taskCard/TaskCard.tsx';
import CompletedTasks from '@/components/tasksDetails/partials/completedTask/CompletedTasks.tsx';

import { useListContext } from '@/hooks/useListContext.ts';
import type { List } from '@/types/types.ts';
import styles from './TasksDetails.module.css';
import { useModal } from '@/hooks/useModal.ts';
import { useTaskContext } from '@/hooks/useTaskContext.ts';

const TasksDetails = () => {
    const [list, setList] = useState<List | null>(null);

    const { id } = useParams();
    const { getList } = useListContext();
    const { tasks, getAllTasks, setError } = useTaskContext();
    const { modalRef, handleOpenModal, handleCloseModal } = useModal();

    useEffect(() => {
        const listData = getList(id!);
        setList(listData!);

        getAllTasks(id!);

        return () => {
            setList(null);
        };
    }, [id]);

    return (
        <>
            <section className={styles.tasksContainer}>
                <header>
                    <h2>{list?.title}</h2>
                    <Button
                        size="small"
                        variant="square"
                        onClick={handleOpenModal}
                    >
                        <Plus />
                    </Button>
                </header>

                {!tasks.length && <Empty />}

                {tasks.length > 0 && (
                    <>
                        <ul>
                            {tasks.map((task) => {
                                return (
                                    !task.isChecked && (
                                        <TaskCard
                                            task={task}
                                            listId={id!}
                                            key={task.id}
                                        />
                                    )
                                );
                            })}
                        </ul>

                        <CompletedTasks tasks={tasks} listId={id!} />
                    </>
                )}
            </section>

            <Modal
                ref={modalRef}
                title={`${list?.title}`}
                onClose={() => {
                    handleCloseModal();
                    setError(null);
                }}
            >
                <TaskForm onClose={handleCloseModal} listId={list?.id!} />
            </Modal>
        </>
    );
};

export default TasksDetails;
