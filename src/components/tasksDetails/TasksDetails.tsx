import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DragDropProvider } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';

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
    const { t } = useTranslation();
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
                        aria-label={t('addNewTask', 'Add new task')}
                    >
                        <Plus />
                    </Button>
                </header>

                {!tasks.length && <Empty />}

                {tasks.length > 0 && (
                    <>
                        <DragDropProvider
                            onDragEnd={(e) => {
                                if (e.canceled) return;

                                const { source } = e.operation;

                                if (isSortable(source)) {
                                    const { initialIndex, index } = source;

                                    if (initialIndex !== index) {
                                        const checkedTasks = tasks.filter(
                                            (task) => task.isChecked
                                        );
                                        const uncheckedTasks = tasks.filter(
                                            (task) => !task.isChecked
                                        );

                                        const newItems = [...uncheckedTasks];
                                        const [removed] = newItems.splice(
                                            initialIndex,
                                            1
                                        );
                                        newItems.splice(index, 0, removed);

                                        localStorage.setItem(
                                            id!,
                                            JSON.stringify([
                                                ...newItems,
                                                ...checkedTasks,
                                            ])
                                        );
                                        return getAllTasks(id!);
                                    }
                                }
                            }}
                        >
                            <ul>
                                {tasks
                                    .filter((task) => !task.isChecked)
                                    .map((task, i) => {
                                        return (
                                            <TaskCard
                                                index={i}
                                                task={task}
                                                listId={id!}
                                                key={task.id}
                                            />
                                        );
                                    })}
                            </ul>
                        </DragDropProvider>

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
