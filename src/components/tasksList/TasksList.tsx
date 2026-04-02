import { Plus } from 'lucide-react';
import { useState } from 'react';

import Button from '@/components/button/Button.tsx';
import Modal from '@/components/modal/Modal.tsx';
import CreateTasksListForm from '@/components/createTasksListForm/CreateTasksListForm.tsx';

import styles from './TasksList.module.css';
import { useModal } from '@/hooks/useModal.ts';

const TasksList = () => {
    const [error, setError] = useState<string | null>(null);

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
                onClose={() => {
                    setError(null);
                    handleCloseModal();
                }}
            >
                <CreateTasksListForm
                    error={error}
                    setError={setError}
                    onClose={handleCloseModal}
                />
            </Modal>
        </section>
    );
};

export default TasksList;
