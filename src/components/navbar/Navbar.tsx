import { Settings } from 'lucide-react';
import { NavLink } from 'react-router';

import Logo from '@/components/navbar/partials/logo/Logo.tsx';

import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Logo />

            <NavLink
                to="/settings"
                viewTransition={true}
                aria-label="Navigate to settings page"
            >
                <Settings />
            </NavLink>
        </nav>
    );
};

export default Navbar;
