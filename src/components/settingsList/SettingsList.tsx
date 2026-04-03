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
    const { deleteLocalStorage, taskLists } = useTaskListsContext();
    const { dialogRef, handleOpenModal, handleCloseModal } = useModal();

    const handleDeleteLocalStorage = () => {
        deleteLocalStorage();

        const options: RouterNavigateOptions = {
            replace: true,
            viewTransition: true,
        };

        navigate('/', options);
    };

    useEffect(() => {
        if (timer <= 0) {
            return;
        }

        const intervalId = setInterval(() => {
            setTimer((prevState) => prevState - 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [isDisabled]);

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
