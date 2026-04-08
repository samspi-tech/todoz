import { NavLink } from 'react-router';

import styles from './Logo.module.css';
import logo from '@/assets/dark-logo.svg';

const Logo = () => {
    return (
        <NavLink
            to="/lists"
            viewTransition={true}
            className={styles.logoContainer}
            aria-label="Navigate to tasks page"
        >
            <img src={logo} alt="todoz logo" />
            <p>
                <span>To</span>
                <span>Doz</span>
            </p>
        </NavLink>
    );
};

export default Logo;
