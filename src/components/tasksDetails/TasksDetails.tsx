import { useParams } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import Button from '@/components/button/Button.tsx';
import Modal from '@/components/modal/Modal.tsx';
import TaskForm from '@/components/taskForm/TaskForm.tsx';
import Empty from '@/components/empty/Empty.tsx';
import CompletedTasks from '@/components/tasksDetails/partials/completedTask/CompletedTasks.tsx';
import DragAndDropTasks from '@/components/tasksDetails/partials/dragAndDropTasks/DragAndDropTasks.tsx';

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

    const uncheckedTasks = useMemo(
        () => tasks.filter((task) => !task.isChecked),
        [tasks]
    );

    const checkedTasks = useMemo(
        () => tasks.filter((task) => task.isChecked),
        [tasks]
    );

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
                        <DragAndDropTasks
                            listId={id!}
                            checkedTasks={checkedTasks}
                            uncheckedTasks={uncheckedTasks}
                        />
                        <CompletedTasks
                            listId={id!}
                            numTasks={tasks.length}
                            checkedTasks={checkedTasks}
                        />
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
