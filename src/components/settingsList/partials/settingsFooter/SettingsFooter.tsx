import { Trash2 } from 'lucide-react';
import { type Dispatch, type SetStateAction, useState } from 'react';

import styles from './SettingsFooter.module.css';

interface SettingsFooterProps {
    onOpen: () => void;
    setTimer: Dispatch<SetStateAction<number>>;
}

const SettingsFooter = ({ onOpen, setTimer }: SettingsFooterProps) => {
    const [isPressed, setIsPressed] = useState(false);

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
                <span>Delete all data</span>
            </button>
        </footer>
    );
};

export default SettingsFooter;
