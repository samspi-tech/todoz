import { Sun } from 'lucide-react';

import OptionContainer from '@/components/settingsDetails/partials/optionContainer/OptionContainer.tsx';

import styles from './Theme.module.css';

const Theme = () => {
    return (
        <OptionContainer icon={<Sun />} label="Theme">
            <ul className={styles.themeContainer}>
                <li className={styles.active}>
                    <span>Light</span>
                </li>
                <li>
                    <span>Dark</span>
                </li>
            </ul>
        </OptionContainer>
    );
};

export default Theme;
