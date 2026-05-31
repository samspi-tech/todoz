import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import OptionContainer from '@/components/settingsDetails/partials/optionContainer/OptionContainer.tsx';

import styles from '../theme/Theme.module.css';

const Language = () => {
    const { t, i18n } = useTranslation();

    const handleChangeLanguage = (lang: string) => {
        localStorage.setItem('i18nextLng', lang);
        return i18n.changeLanguage(lang);
    };

    return (
        <OptionContainer label={t('language', 'Language')} icon={<Languages />}>
            <ul className={styles.container}>
                <li
                    onClick={() => handleChangeLanguage('en')}
                    className={`${i18n.resolvedLanguage === 'en' && styles.active}`}
                >
                    {t('english', 'English')}
                </li>
                <li
                    onClick={() => handleChangeLanguage('it')}
                    className={`${i18n.resolvedLanguage === 'it' && styles.active}`}
                >
                    {t('italian', 'Italiano')}
                </li>
            </ul>
        </OptionContainer>
    );
};

export default Language;
