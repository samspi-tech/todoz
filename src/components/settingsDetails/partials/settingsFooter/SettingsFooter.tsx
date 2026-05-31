import { Trash2 } from 'lucide-react';
import { type Dispatch, type SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './SettingsFooter.module.css';

interface SettingsFooterProps {
    onOpen: () => void;
    setTimer: Dispatch<SetStateAction<number>>;
}

const SettingsFooter = ({ onOpen, setTimer }: SettingsFooterProps) => {
    const [isPressed, setIsPressed] = useState(false);

    const { t } = useTranslation();

    return (
        <footer className={styles.footer}>
            <button
                onClick={() => {
                    onOpen();
                    setTimer(2);
                }}
                onTouchStart={() => setIsPressed(true)}
                onTouchEnd={() => setIsPressed(false)}
                className={`${styles.deleteBtn} ${isPressed && styles.pressed}`}
            >
                <Trash2 />
                <span>{t('deleteAllData', 'Delete all data')}</span>
            </button>
        </footer>
    );
};

export default SettingsFooter;
