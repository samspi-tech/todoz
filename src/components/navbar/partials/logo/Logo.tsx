import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';

import styles from './Logo.module.css';
import logo from '@/assets/dark-logo.svg';

const Logo = () => {
    const { t } = useTranslation();

    return (
        <NavLink
            to="/lists"
            viewTransition={true}
            className={styles.logoContainer}
            aria-label={t('navigateToListsPage', 'Navigate to lists page')}
        >
            <img src={logo} alt="Todoz logo" />
            <p>
                <span>To</span>
                <span>Doz</span>
            </p>
        </NavLink>
    );
};

export default Logo;
