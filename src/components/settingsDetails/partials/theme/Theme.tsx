import { Moon, Sun } from 'lucide-react';

import OptionContainer from '@/components/settingsDetails/partials/optionContainer/OptionContainer.tsx';

import styles from './Theme.module.css';
import { useThemeContext } from '@/hooks/useThemeContext.ts';

const Theme = () => {
    const { isDarkMode, handleToggleDarkMode } = useThemeContext();

    const labelIcon = isDarkMode ? <Moon /> : <Sun />;

    return (
        <OptionContainer icon={labelIcon} label="Theme">
            <ul className={styles.themeContainer}>
                <li
                    onClick={handleToggleDarkMode}
                    className={`${!isDarkMode && styles.active}`}
                >
                    <span>Light</span>
                </li>

                <li
                    onClick={handleToggleDarkMode}
                    className={`${isDarkMode && styles.active}`}
                >
                    <span>Dark</span>
                </li>
            </ul>
        </OptionContainer>
    );
};

export default Theme;
