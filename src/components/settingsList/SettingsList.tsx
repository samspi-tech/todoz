import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import Modal from '@/components/modal/Modal.tsx';
import Button from '@/components/button/Button.tsx';
import SettingsFooter from '@/components/settingsList/partials/settingsFooter/SettingsFooter.tsx';

import styles from './SettingsList.module.css';
import { useModal } from '@/hooks/useModal.ts';
import { useTaskListsContext } from '@/hooks/useTaskListsContext.ts';
import { routerOptions } from '@/react-router/options.ts';

const SettingsList = () => {
    const navigate = useNavigate();

    const { dialogRef, handleOpenModal, handleCloseModal, timer, setTimer } =
        useModal();

    const { deleteLocalStorage, taskLists, getAllTaskLists } =
        useTaskListsContext();

    const isDisabled = timer > 0;

    const handleDeleteLocalStorage = () => {
        deleteLocalStorage();
        navigate('/', routerOptions);
    };

    useEffect(() => {
        getAllTaskLists();
    }, []);

    return (
        <section className={styles.settingsContainer}>
            {taskLists.length > 0 && (
                <SettingsFooter onOpen={handleOpenModal} setTimer={setTimer} />
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
