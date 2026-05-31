import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import OptionContainer from '@/components/settingsDetails/partials/optionContainer/OptionContainer.tsx';

import styles from './Theme.module.css';
import { useThemeContext } from '@/hooks/useThemeContext.ts';

const Theme = () => {
    const { t } = useTranslation();
    const { isDarkMode, handleToggleDarkMode } = useThemeContext();

    const labelIcon = isDarkMode ? <Moon /> : <Sun />;

    return (
        <OptionContainer icon={labelIcon} label={t('theme', 'Theme')}>
            <ul className={styles.container}>
                <li
                    onClick={handleToggleDarkMode}
                    className={`${!isDarkMode && styles.active}`}
                >
                    {t('light', 'Light')}
                </li>

                <li
                    onClick={handleToggleDarkMode}
                    className={`${isDarkMode && styles.active}`}
                >
                    {t('dark', 'Dark')}
                </li>
            </ul>
        </OptionContainer>
    );
};

export default Theme;
