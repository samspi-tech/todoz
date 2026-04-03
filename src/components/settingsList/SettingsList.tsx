import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { type RouterNavigateOptions, useNavigate } from 'react-router';

import Modal from '@/components/modal/Modal.tsx';
import Button from '@/components/button/Button.tsx';

import styles from './SettingsList.module.css';
import { useModal } from '@/hooks/useModal.ts';
import { useTaskListsContext } from '@/hooks/useTaskListsContext.ts';

const SettingsList = () => {
    const [timer, setTimer] = useState(0);
    const [isPressed, setIsPressed] = useState(false);

    const isDisabled = timer > 0;

    const navigate = useNavigate();
    const { dialogRef, handleOpenModal, handleCloseModal } = useModal();
    const { deleteLocalStorage, taskLists, getAllTaskLists } =
        useTaskListsContext();

    const handleDeleteLocalStorage = () => {
        deleteLocalStorage();

        const options: RouterNavigateOptions = {
            replace: true,
            viewTransition: true,
        };

        navigate('/', options);
    };

    useEffect(() => {
        getAllTaskLists();
    }, []);

    return (
        <section className={styles.settingsContainer}>
            {taskLists.length > 0 && (
                <footer>
                    <button
                        onClick={() => {
                            handleOpenModal();
                            setTimer(2);
                        }}
                        onTouchStart={() => setIsPressed(true)}
                        onTouchEnd={() => setIsPressed(false)}
                        className={`${styles.deleteBtn} ${isPressed && styles.pressed}`}
                    >
                        <Trash2 />
                        <span>Delete all data</span>
                    </button>
                </footer>
            )}

            <Modal
                runInterval={true}
                setTimer={setTimer}
                timer={timer}
                ref={dialogRef}
                onClose={handleCloseModal}
                title="Are you sure you want to delete all data?"
            >
                <div className={styles.dialogButtonContainer}>
                    <Button
                        variant="danger"
                        disabled={isDisabled}
                        onClick={handleDeleteLocalStorage}
                    >
                        Delete {isDisabled && `(${timer}s)`}
                    </Button>
                </div>
            </Modal>
        </section>
    );
};

export default SettingsList;
