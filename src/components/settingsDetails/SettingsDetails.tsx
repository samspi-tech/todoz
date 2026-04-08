import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import Modal from '@/components/modal/Modal.tsx';
import Button from '@/components/button/Button.tsx';
import SettingsFooter from '@/components/settingsDetails/partials/settingsFooter/SettingsFooter.tsx';

import styles from './SettingsDetails.module.css';
import { useModal } from '@/hooks/useModal.ts';
import { useListContext } from '@/hooks/useListContext.ts';
import { routerOptions } from '@/react-router/options.ts';

const SettingsDetails = () => {
    const navigate = useNavigate();
    const { deleteLocalStorage, lists, getAllLists } = useListContext();

    const { modalRef, handleOpenModal, handleCloseModal, timer, setTimer } =
        useModal();

    const isDisabled = timer > 0;

    const handleDeleteLocalStorage = () => {
        deleteLocalStorage();
        navigate('/', routerOptions);
    };

    useEffect(() => {
        getAllLists();
    }, []);

    return (
        <section className={styles.settingsContainer}>
            {lists.length > 0 && (
                <SettingsFooter onOpen={handleOpenModal} setTimer={setTimer} />
            )}

            <Modal
                ref={modalRef}
                timer={timer}
                setTimer={setTimer}
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

export default SettingsDetails;
