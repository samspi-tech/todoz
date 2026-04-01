import { Plus } from 'lucide-react';

import Button from '@/components/button/Button.tsx';
import Modal from '@/components/modal/Modal.tsx';

import styles from './TasksList.module.css';
import { useModal } from '@/hooks/useModal.ts';

const TasksList = () => {
    const { dialogRef, handleOpenModal, handleCloseModal } = useModal();

    return (
        <section className={styles.taskListsContainer}>
            <h2>Your task lists</h2>

            <Button variant="rounded" onClick={handleOpenModal}>
                <Plus />
            </Button>

            <Modal
                ref={dialogRef}
                title="Create list"
                onClose={handleCloseModal}
            ></Modal>
        </section>
    );
};

export default TasksList;
