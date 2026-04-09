import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

import Button from '@/components/button/Button.tsx';
import Modal from '@/components/modal/Modal.tsx';
import TaskForm from '@/components/taskForm/TaskForm.tsx';

import { useListContext } from '@/hooks/useListContext.ts';
import type { List } from '@/types/types.ts';
import styles from './TasksDetails.module.css';
import { useModal } from '@/hooks/useModal.ts';

const TasksDetails = () => {
    const [list, setList] = useState<List | null>(null);

    const { id } = useParams();
    const { getList } = useListContext();
    const { modalRef, handleOpenModal, handleCloseModal } = useModal();

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
                <Button variant="square" size="small" onClick={handleOpenModal}>
                    <Plus />
                </Button>
            </header>

            <Modal
                ref={modalRef}
                title={`${list?.title}`}
                onClose={handleCloseModal}
            >
                <TaskForm listId={list?.id!} />
            </Modal>
        </section>
    );
};

export default TasksDetails;
