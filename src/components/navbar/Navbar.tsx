import { Settings, ClipboardList } from 'lucide-react';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';

import Logo from '@/components/navbar/partials/logo/Logo.tsx';

import styles from './Navbar.module.css';

const Navbar = () => {
    const { t } = useTranslation();

    return (
        <nav className={styles.container}>
            <div className={styles.navbar}>
                <Logo />

                <NavLink
                    to="/lists"
                    viewTransition={true}
                    aria-label={t(
                        'navigateToListsPage',
                        'Navigate to lists page'
                    )}
                >
                    <ClipboardList />
                </NavLink>

                <NavLink
                    to="/settings"
                    viewTransition={true}
                    aria-label={t(
                        'navigateToSettingsPage',
                        'Navigate to settings page'
                    )}
                >
                    <Settings />
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
