import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import Modal from '@/components/modal/Modal.tsx';
import Button from '@/components/button/Button.tsx';
import SettingsFooter from '@/components/settingsDetails/partials/settingsFooter/SettingsFooter.tsx';
import Theme from '@/components/settingsDetails/partials/theme/Theme.tsx';
import Language from '@/components/settingsDetails/partials/language/Language.tsx';

import styles from './SettingsDetails.module.css';
import { useModal } from '@/hooks/useModal.ts';
import { useListContext } from '@/hooks/useListContext.ts';
import { routerOptions } from '@/react-router/options.ts';

const SettingsDetails = () => {
    const { t } = useTranslation();
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
                    <Language />
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
                title={t(
                    'areYouSureYouWantToDeleteAllData?',
                    'Are you sure you want to delete all data?'
                )}
            >
                <div className={styles.dialogButtonContainer}>
                    <p>
                        <Info />

                        <span>
                            {t(
                                'thisWillAlsoRevertTheColorThemeToTheInitialDefaultValueAfterReloadingTheApp',
                                'This will also revert the color theme to the initial default value after reloading the app.'
                            )}
                        </span>
                    </p>

                    <Button
                        variant="danger"
                        disabled={isDisabled}
                        onClick={handleDeleteLocalStorage}
                    >
                        {t('delete', 'Delete')} {isDisabled && `(${timer}s)`}
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default SettingsDetails;
