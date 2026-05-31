import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import OptionContainer from '@/components/settingsDetails/partials/optionContainer/OptionContainer.tsx';

import styles from '../theme/Theme.module.css';
import { languages } from '@/components/settingsDetails/partials/language/dataSource.ts';

const Language = () => {
    const { t, i18n } = useTranslation();

    const handleChangeLanguage = (lang: string) => {
        localStorage.setItem('i18nextLng', lang);
        return i18n.changeLanguage(lang);
    };

    return (
        <OptionContainer label={t('language', 'Language')} icon={<Languages />}>
            <ul className={styles.container}>
                {languages.map((lang) => {
                    return (
                        <li
                            onClick={() => handleChangeLanguage(lang.code)}
                            className={`${i18n.resolvedLanguage === lang.code && styles.active}`}
                        >
                            {t(lang.language.toLowerCase(), lang.language)}
                        </li>
                    );
                })}
            </ul>
        </OptionContainer>
    );
};

export default Language;
