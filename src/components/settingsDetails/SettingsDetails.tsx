import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Info } from 'lucide-react';

import Modal from '@/components/modal/Modal.tsx';
import Button from '@/components/button/Button.tsx';
import SettingsFooter from '@/components/settingsDetails/partials/settingsFooter/SettingsFooter.tsx';
import Theme from '@/components/settingsDetails/partials/theme/Theme.tsx';

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
        <>
            <section className={styles.settingsContainer}>
                <div className={styles.optionsContainer}>
                    <Theme />
                </div>

                {lists.length > 0 && (
                    <SettingsFooter
                        setTimer={setTimer}
                        onOpen={handleOpenModal}
                    />
                )}
            </section>

            <Modal
                ref={modalRef}
                timer={timer}
                setTimer={setTimer}
                onClose={handleCloseModal}
                title="Are you sure you want to delete all data?"
            >
                <div className={styles.dialogButtonContainer}>
                    <p>
                        <Info />

                        <span>
                            This will also revert the color theme to the initial
                            default value after reloading the app.
                        </span>
                    </p>

                    <Button
                        variant="danger"
                        disabled={isDisabled}
                        onClick={handleDeleteLocalStorage}
                    >
                        Delete {isDisabled && `(${timer}s)`}
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default SettingsDetails;
